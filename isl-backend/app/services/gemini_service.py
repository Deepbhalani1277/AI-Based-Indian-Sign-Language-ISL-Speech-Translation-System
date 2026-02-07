"""
Google Gemini AI Service
Handles text generation and translation using Google's Gemini API
"""

import google.generativeai as genai
from app.config import settings
import logging

logger = logging.getLogger(__name__)


class GeminiService:
    """Service for Google Gemini AI operations"""
    
    def __init__(self):
        """Initialize Gemini API with API key"""
        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-pro')
            logger.info("✅ Gemini AI initialized successfully")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Gemini AI: {e}")
            self.model = None
    
    def generate_sentence(self, words: list) -> dict:
        """
        Generate a grammatically correct sentence from detected words
        
        Args:
            words: List of detected words/gestures
            
        Returns:
            dict with 'success', 'sentence', and optional 'error'
        """
        if not self.model:
            return {
                "success": False,
                "error": "Gemini AI not initialized",
                "sentence": " ".join(words)  # Fallback to simple join
            }
        
        try:
            # Create prompt for sentence generation
            words_text = " ".join(words)
            prompt = f"""You are helping a sign language user communicate. 
They have signed the following words in sequence: {words_text}

Please create a natural, grammatically correct sentence from these words. 
Keep the meaning as close as possible to the original words.
Only return the sentence, nothing else.

Sentence:"""
            
            # Generate response
            response = self.model.generate_content(prompt)
            generated_sentence = response.text.strip()
            
            logger.info(f"Generated sentence: {generated_sentence}")
            
            return {
                "success": True,
                "sentence": generated_sentence,
                "original_words": words
            }
            
        except Exception as e:
            logger.error(f"Error generating sentence: {e}")
            return {
                "success": False,
                "error": str(e),
                "sentence": " ".join(words)  # Fallback
            }
    
    def translate_text(self, text: str, target_language: str) -> dict:
        """
        Translate text to target language
        
        Args:
            text: Text to translate
            target_language: Target language (hindi, marathi, gujarati, english)
            
        Returns:
            dict with 'success', 'translated_text', and optional 'error'
        """
        if not self.model:
            return {
                "success": False,
                "error": "Gemini AI not initialized",
                "translated_text": text
            }
        
        # Language mapping
        language_map = {
            "hindi": "Hindi (हिंदी)",
            "marathi": "Marathi (मराठी)",
            "gujarati": "Gujarati (ગુજરાતી)",
            "english": "English"
        }
        
        target_lang = language_map.get(target_language.lower(), "English")
        
        # Skip translation if already in English and target is English
        if target_language.lower() == "english":
            return {
                "success": True,
                "translated_text": text,
                "target_language": "English"
            }
        
        try:
            prompt = f"""Translate the following English text to {target_lang}.
Only return the translation, nothing else.

English text: {text}

Translation:"""
            
            response = self.model.generate_content(prompt)
            translated_text = response.text.strip()
            
            logger.info(f"Translated to {target_language}: {translated_text}")
            
            return {
                "success": True,
                "translated_text": translated_text,
                "target_language": target_lang,
                "original_text": text
            }
            
        except Exception as e:
            logger.error(f"Error translating text: {e}")
            return {
                "success": False,
                "error": str(e),
                "translated_text": text
            }
    
    def generate_and_translate(self, words: list, target_language: str = "english") -> dict:
        """
        Generate sentence from words and translate to target language
        
        Args:
            words: List of detected words
            target_language: Target language for translation
            
        Returns:
            dict with complete processing result
        """
        # Step 1: Generate sentence
        sentence_result = self.generate_sentence(words)
        
        if not sentence_result["success"]:
            return sentence_result
        
        # Step 2: Translate if needed
        if target_language.lower() != "english":
            translation_result = self.translate_text(
                sentence_result["sentence"],
                target_language
            )
            
            return {
                "success": True,
                "original_words": words,
                "generated_sentence": sentence_result["sentence"],
                "translated_text": translation_result.get("translated_text"),
                "target_language": target_language,
                "translation_success": translation_result["success"]
            }
        else:
            return {
                "success": True,
                "original_words": words,
                "generated_sentence": sentence_result["sentence"],
                "translated_text": sentence_result["sentence"],
                "target_language": "english",
                "translation_success": True
            }


# Create singleton instance
gemini_service = GeminiService()
