from flask import jsonify
from models.db import Database
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from numpy import array

load_path = f"{Path(__file__).parents[1]}/resources/pre_trained"

# convert an array of values into a dataset matrix
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step-1):
        a = dataset[i:(i+time_step), 0]   ###i=0, 0,1,2,3-----99   100
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

def get_lstm_actual_and_test(ticker, predict_range):
    Database.cursor.execute(f"SELECT datetime, price FROM close_price_top_10 where tickersymbol = '{ticker}'")
    result = Database.cursor.fetchall()

    # Get the column names from the cursor description
    columns = [desc[0] for desc in Database.cursor.description]

    # Create the DataFrame
    df = pd.DataFrame(result, columns=columns)
    df = df.sort_values(by='datetime').reset_index(drop=True)
        
    df_1 = df['price']

    scaler = MinMaxScaler(feature_range=(0,1))
    df_1 = scaler.fit_transform(np.array(df_1).reshape(-1,1))

    ##splitting dataset into train and test split
    training_size = int(len(df_1)*0.7)
    test_size = len(df_1) - training_size
    train_data, test_data = df_1[0:training_size,:], df_1[training_size:len(df_1),:1]
    
    # reshape into X=t,t+1,t+2,t+3 and Y=t+4
    time_step = 150
    X_train, ytrain = create_dataset(train_data, time_step)
    X_test, ytest = create_dataset(test_data, time_step)

    # reshape input to be [samples, time steps, features] which is required for LSTM
    X_train =X_train.reshape(X_train.shape[0],X_train.shape[1] , 1)
    X_test = X_test.reshape(X_test.shape[0],X_test.shape[1] , 1)

    model = load_model(f"{load_path}/{ticker}.h5")

    ### Lets Do the prediction and check performance metrics
    train_predict=model.predict(X_train)
    test_predict=model.predict(X_test)

    ##Transformback to original form
    train_predict=scaler.inverse_transform(train_predict)
    test_predict=scaler.inverse_transform(test_predict)

    x_input=test_data[test_data.shape[0]-150:].reshape(1,-1)
    temp_input=list(x_input)
    temp_input=temp_input[0].tolist()  


    lst_output=[]
    n_steps=150
    i=0
    while(i < predict_range):
        if(len(temp_input)>150):
            #print(temp_input)
            x_input=np.array(temp_input[1:])
            # print("{} day input {}".format(i,x_input))
            x_input=x_input.reshape(1,-1)
            x_input = x_input.reshape((1, n_steps, 1))
            #print(x_input)
            yhat = model.predict(x_input, verbose=0)
            # print("{} day output {}".format(i,yhat))
            temp_input.extend(yhat[0].tolist())
            temp_input=temp_input[1:]
            #print(temp_input)
            lst_output.extend(yhat.tolist())
            i=i+1
        else:
            x_input = x_input.reshape((1, n_steps,1))
            yhat = model.predict(x_input, verbose=0)
            # print(yhat[0])
            temp_input.extend(yhat[0].tolist())
            # print(len(temp_input))
            lst_output.extend(yhat.tolist())
            i=i+1
    
    actual = scaler.inverse_transform(df_1[df_1.shape[0]-test_predict.shape[0]+200:]).tolist()
    test = test_predict[200:].tolist()
    predict = scaler.inverse_transform(lst_output).tolist()
    
    print("predict_actual: ", actual[-1][0])
    print("predict: ", predict[0][0])
    
    
    mapped_actual = [[i + 1, item[0]] for i, item in enumerate(actual)]
    mapped_test = [[i + 1, item[0]] for i, item in enumerate(test)]
    mapped_predict = [[i + 114, item[0]] for i, item in enumerate(predict)]
    
    return [mapped_actual, mapped_test, mapped_predict]