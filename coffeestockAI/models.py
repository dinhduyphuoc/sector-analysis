from flask import Flask
import pandas as pd
import numpy as np
import json

# import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVR
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler

### Create the Stacked LSTM model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM
from keras.models import load_model
import tensorflow as tf

import psycopg2 as pg

con = pg.connect(
dbname="defaultdb",
user="doadmin",
password="AVNS_jXust5tRZai7X26ZM61",
host="sector-analysis-postgresql-do-user-1970830-0.b.db.ondigitalocean.com",
port= '25060'
)

cursor_obj = con.cursor()

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

    model.fit(X_train,y_train,validation_data=(X_test,ytest),epochs=200,batch_size=64,verbose=1)

    model.save(f"./pre_trained_models/{ticker}.h5")




# # del model  # deletes the existing model

# # returns a compiled model
# # identical to the previous one
# model = load_model('my_model.h5')

# ### Lets Do the prediction and check performance metrics
# train_predict=model.predict(X_train)
# test_predict=model.predict(X_test)

# ##Transformback to original form
# train_predict=scaler.inverse_transform(train_predict)
# test_predict=scaler.inverse_transform(test_predict)

# print(train_predict.shape, test_predict.shape, df_1.shape)



# get all tickers top 10 
cursor_obj.execute("SELECT DISTINCT tickersymbol FROM close_price_top_10")
all_tickers = [i[0] for i in cursor_obj.fetchall()]

# build all models
for ticker in ['ACV']:
    cursor_obj.execute(f"SELECT datetime, price FROM close_price_top_10 WHERE tickersymbol = '{ticker}'")
    result = cursor_obj.fetchall()

    # Get the column names from the cursor description
    columns = [desc[0] for desc in cursor_obj.description]

    # Create the DataFrame
    df = pd.DataFrame(result, columns=columns)
    df = df.sort_values(by='datetime').reset_index(drop=True)

    build_model(df, ticker)