import sqlite3
import os

def interactive_shell():
    db_path = os.path.join(os.path.dirname(__file__), 'portal.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("\n--- SQLite Interactive Shell (Type 'exit' to quit) ---")
    while True:
        query = input("sqlite> ")
        if query.lower() in ['exit', 'quit', '.exit']:
            break
        
        try:
            cursor.execute(query)
            if query.lower().startswith('select'):
                rows = cursor.fetchall()
                for row in rows:
                    print(row)
            else:
                conn.commit()
                print("Command executed successfully.")
        except Exception as e:
            print(f"Error: {e}")
            
    conn.close()

if __name__ == "__main__":
    interactive_shell()
