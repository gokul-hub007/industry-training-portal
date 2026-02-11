import sqlite3
import os

def view_users():
    db_path = os.path.join(os.path.dirname(__file__), 'portal.db')
    if not os.path.exists(db_path):
        print(f"Error: Database file not found at {db_path}")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("\n" + "="*60)
    print(f"{'EMAIL':<30} | {'PASSWORD':<15} | {'ROLE'}")
    print("-" * 60)
    
    try:
        cursor.execute("SELECT email, password, role FROM user")
        rows = cursor.fetchall()
        for row in rows:
            print(f"{row[0]:<30} | {row[1]:<15} | {row[2]}")
    except sqlite3.OperationalError as e:
        print(f"Error: {e}")
    finally:
        conn.close()
    print("="*60 + "\n")

if __name__ == "__main__":
    view_users()
