from flask import Flask
import os
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from models.db import Database
from controllers.charts import chart_module
from controllers.models import model_module

load_dotenv()

app = Flask(__name__)
CORS(app)

def initiateDatabase():
    Database.connect(
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT')
    )

def registerBlueprints():
    app.register_blueprint(chart_module, name='chart_module')
    app.register_blueprint(model_module, name='model_module')

if __name__ == "__main__":
    initiateDatabase()
    registerBlueprints()
    
    app.run(host="0.0.0.0", port=os.getenv('FLASK_PORT'), debug=True)