import firebase_admin
from firebase_admin import credentials, firestore
import os
from functools import lru_cache

@lru_cache(maxsize=1)
def initialize_firebase():
    cred = credentials.Certificate(os.path.join(os.path.dirname(__file__), "keys/firebase-key.json"))
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    return firestore.client()
