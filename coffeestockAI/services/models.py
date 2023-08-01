from flask import Flask
from dotenv import load_dotenv
from pathlib import Path
import pandas as pd
import numpy as np
import json
import os

# import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVR
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler

# Create the Stacked LSTM model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM
from keras.models import load_model
import tensorflow as tf

# Import database
from models.db import Database

load_dotenv()

save_path = f"{Path(__file__).parents[1]}/resources/pre_trained"

def build_all_models():
# get all tickers top 10 
    tickers = Database.execute("SELECT DISTINCT tickersymbol FROM close_price_top_10")
    all_tickers = [ticker[0] for ticker  in tickers]

    # build all models
    for ticker in all_tickers:
        Database.cursor.execute(f"SELECT datetime, price FROM close_price_top_10 WHERE tickersymbol = '{ticker}'")
        result = Database.cursor.fetchall()

        # Get the column names from the cursor description
        columns = [desc[0] for desc in Database.cursor.description]

        # Create the DataFrame
        df = pd.DataFrame(result, columns=columns)
        df = df.sort_values(by='datetime').reset_index(drop=True)

        build_model(df, ticker)

def build_model(df, ticker):
    df_1 = df['price']

    scaler = MinMaxScaler(feature_range=(0,1))
    df_1 = scaler.fit_transform(np.array(df_1).reshape(-1,1))

    ##splitting dataset into train and test split
    training_size = int(len(df_1)*0.7)
    test_size = len(df_1) - training_size
    train_data, test_data = df_1[0:training_size,:], df_1[training_size:len(df_1),:1]

    # convert an array of values into a dataset matrix
    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset)-time_step-1):
            a = dataset[i:(i+time_step), 0]   ###i=0, 0,1,2,3-----99   100
            dataX.append(a)
            dataY.append(dataset[i + time_step, 0])
        return np.array(dataX), np.array(dataY)
    
    # reshape into X=t,t+1,t+2,t+3 and Y=t+4
    time_step = 150
    X_train, y_train = create_dataset(train_data, time_step)
    X_test, ytest = create_dataset(test_data, time_step)

    # reshape input to be [samples, time steps, features] which is required for LSTM
    X_train =X_train.reshape(X_train.shape[0],X_train.shape[1] , 1)
    X_test = X_test.reshape(X_test.shape[0],X_test.shape[1] , 1)

    model=Sequential()
    model.add(LSTM(50,return_sequences=True,input_shape=(150,1)))
    model.add(LSTM(50,return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error',optimizer='adam')

    lstm_epochs = int(os.getenv("LSTM_EPOCHS"))
    lstm_batch_size = int(os.getenv("LSTM_BATCH_SIZE"))
    lstm_verbose = int(os.getenv("LSTM_VERBOSE"))
    
    model.fit(X_train,y_train,validation_data=(X_test,ytest),epochs=lstm_epochs,batch_size=lstm_batch_size,verbose=lstm_verbose)

    model.save(f"{save_path}/{ticker}.h5")