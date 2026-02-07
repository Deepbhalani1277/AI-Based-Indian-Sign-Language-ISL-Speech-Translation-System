"""
Quick script to check database connection and tables
"""
from sqlalchemy import create_engine, inspect
from app.config import settings

try:
    # Create engine
    engine = create_engine(settings.DATABASE_URL)
    
    # Test connection
    with engine.connect() as conn:
        print("✅ Database connection successful!")
        print(f"📍 Database URL: {settings.DATABASE_URL}")
    
    # Check tables
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    print(f"\n📊 Found {len(tables)} tables:")
    for table in tables:
        print(f"  - {table}")
        columns = inspector.get_columns(table)
        print(f"    Columns: {len(columns)}")
        for col in columns:
            print(f"      • {col['name']} ({col['type']})")
    
    if not tables:
        print("\n⚠️  No tables found! Database needs initialization.")
        print("💡 Run: python -c \"from app.utils.database import init_db; init_db()\"")
    
except Exception as e:
    print(f"❌ Database error: {e}")
