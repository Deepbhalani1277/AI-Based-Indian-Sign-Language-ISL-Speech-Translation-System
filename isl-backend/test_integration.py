"""
Quick verification script for ISL Translation System
Tests database connection, backend API, and end-to-end integration
"""
import sys
import requests
import json
from sqlalchemy import create_engine, text
from datetime import datetime

# Colors for terminal output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_success(msg):
    print(f"{Colors.GREEN}✅ {msg}{Colors.END}")

def print_error(msg):
    print(f"{Colors.RED}❌ {msg}{Colors.END}")

def print_warning(msg):
    print(f"{Colors.YELLOW}⚠️  {msg}{Colors.END}")

def print_info(msg):
    print(f"{Colors.BLUE}ℹ️  {msg}{Colors.END}")

def test_database():
    """Test database connection and tables"""
    print("\n" + "="*60)
    print("🗄️  TESTING DATABASE CONNECTION")
    print("="*60)
    
    try:
        from app.config import settings
        engine = create_engine(settings.DATABASE_URL)
        
        with engine.connect() as conn:
            print_success("Database connection successful")
            print_info(f"Database URL: {settings.DATABASE_URL}")
            
            # Check tables
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
            tables = [row[0] for row in result]
            
            if tables:
                print_success(f"Found {len(tables)} tables: {', '.join(tables)}")
                
                # Check translation_history table
                if 'translation_history' in tables:
                    result = conn.execute(text("SELECT COUNT(*) FROM translation_history"))
                    count = result.scalar()
                    print_info(f"Translation history records: {count}")
                else:
                    print_error("translation_history table not found!")
                    return False
            else:
                print_error("No tables found! Database needs initialization.")
                print_info("Run: python -c \"from app.utils.database import init_db; init_db()\"")
                return False
                
        return True
        
    except Exception as e:
        print_error(f"Database error: {e}")
        return False

def test_backend_health():
    """Test if backend server is running"""
    print("\n" + "="*60)
    print("🔧 TESTING BACKEND SERVER")
    print("="*60)
    
    try:
        response = requests.get("http://localhost:5000/health", timeout=5)
        if response.status_code == 200:
            print_success("Backend server is running")
            data = response.json()
            print_info(f"Status: {data.get('status')}")
            return True
        else:
            print_error(f"Backend returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print_error("Cannot connect to backend server on http://localhost:5000")
        print_warning("Make sure backend is running: python run.py")
        return False
    except Exception as e:
        print_error(f"Backend health check error: {e}")
        return False

def test_speech_to_sign_api():
    """Test speech-to-sign endpoint"""
    print("\n" + "="*60)
    print("🗣️  TESTING SPEECH-TO-SIGN API")
    print("="*60)
    
    try:
        payload = {
            "text": "Hello, this is a test"
        }
        
        print_info("Sending request to /api/speech-to-sign...")
        response = requests.post(
            "http://localhost:5000/api/speech-to-sign",
            json=payload,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print_success("Speech-to-sign API working")
                print_info(f"Gestures returned: {len(data.get('gestures', []))}")
                print_info(f"Gestures: {', '.join(data.get('gestures', []))}")
                return True
            else:
                print_error(f"API returned success=False: {data.get('error')}")
                return False
        else:
            print_error(f"API returned status code: {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Speech-to-sign API error: {e}")
        return False

def test_translation_history_api():
    """Test translation history endpoint"""
    print("\n" + "="*60)
    print("📜 TESTING TRANSLATION HISTORY API")
    print("="*60)
    
    try:
        print_info("Fetching translation history...")
        response = requests.get(
            "http://localhost:5000/api/translation-history?limit=5",
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print_success("Translation history API working")
            print_info(f"Records returned: {len(data)}")
            
            if data:
                print_info("Latest translation:")
                latest = data[0]
                print(f"    Type: {latest.get('type')}")
                print(f"    Input: {latest.get('input_data', 'N/A')[:50]}...")
                print(f"    Created: {latest.get('created_at')}")
            else:
                print_warning("No translation history found (database might be empty)")
                
            return True
        else:
            print_error(f"API returned status code: {response.status_code}")
            return False
            
    except Exception as e:
        print_error(f"Translation history API error: {e}")
        return False

def verify_database_save():
    """Verify that API calls are actually saving to database"""
    print("\n" + "="*60)
    print("💾 VERIFYING DATABASE SAVE FUNCTIONALITY")
    print("="*60)
    
    try:
        from app.config import settings
        engine = create_engine(settings.DATABASE_URL)
        
        # Get count before
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM translation_history"))
            count_before = result.scalar()
            print_info(f"Records before test: {count_before}")
        
        # Make API call
        print_info("Making test API call...")
        payload = {"text": f"Test at {datetime.now().isoformat()}"}
        response = requests.post(
            "http://localhost:5000/api/speech-to-sign",
            json=payload,
            timeout=10
        )
        
        if response.status_code != 200 or not response.json().get('success'):
            print_error("API call failed")
            return False
        
        # Get count after
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM translation_history"))
            count_after = result.scalar()
            print_info(f"Records after test: {count_after}")
        
        if count_after > count_before:
            print_success(f"Database save verified! New record created.")
            return True
        else:
            print_error("No new record created in database!")
            print_warning("Check backend logs for database errors")
            return False
            
    except Exception as e:
        print_error(f"Database verification error: {e}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("🚀 ISL TRANSLATION SYSTEM - INTEGRATION TEST")
    print("="*60)
    
    results = {
        "Database Connection": test_database(),
        "Backend Server": test_backend_health(),
        "Speech-to-Sign API": test_speech_to_sign_api(),
        "Translation History API": test_translation_history_api(),
        "Database Save": verify_database_save()
    }
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST SUMMARY")
    print("="*60)
    
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print("\n" + "-"*60)
    print(f"Results: {passed}/{total} tests passed")
    
    if passed == total:
        print_success("🎉 ALL TESTS PASSED! System is fully integrated.")
    else:
        print_error(f"⚠️  {total - passed} test(s) failed. Check errors above.")
        print_info("See INTEGRATION_STATUS.md for troubleshooting steps")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
