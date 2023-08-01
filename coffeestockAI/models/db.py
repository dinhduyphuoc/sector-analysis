import psycopg2 as pg
import os

class Database:
    connection = None
    cursor = None
    
    @staticmethod
    def connect(dbname, user, password, host, port):
        try:
            # check if there is a connection
            if Database.connection is None:
                Database.connection = pg.connect(
                    dbname=dbname,
                    user=user,
                    password=password,
                    host=host,
                    port=port
                )
                Database.cursor = Database.connection.cursor()
                print("Database connection established.")
        except pg.Error as e:
            print(f"Error: Unable to connect to the database: {e}")
            Database.connection = None
     
    @staticmethod
    def execute(query, params=None):
        try:
            Database.cursor.execute(query, params)
            Database.connection.commit()
            return Database.cursor.fetchall()
        except pg.Error as e:
            print(f"Error: Unable to execute query: {e}")
            
    @staticmethod
    def close():
        if Database.connection is not None:
            Database.cursor.close()
            Database.connection.close()
            print("Database connection closed.")
        else:
            print("No active database connection.")
    