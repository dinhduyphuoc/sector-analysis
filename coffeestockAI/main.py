import psycopg2 as pg
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from numpy import array


con = pg.connect(
dbname="defaultdb",
user="doadmin",
password="AVNS_jXust5tRZai7X26ZM61",
host="sector-analysis-postgresql-do-user-1970830-0.b.db.ondigitalocean.com",
port= '25060'
)

cursor_obj = con.cursor()

#Lấy khoảng thời gian cần predict và cổ phiếu muốn coi của người dùng
predict_range = 45
ticker = 'ACV'

# get actual price from database 
cursor_obj.execute(f"SELECT datetime, price FROM close_price_top_10 where tickersymbol = '{ticker}'")

result = cursor_obj.fetchall()

# Get the column names from the cursor description
columns = [desc[0] for desc in cursor_obj.description]

# Create the DataFrame
df = pd.DataFrame(result, columns=columns)
df = df.sort_values(by='datetime').reset_index(drop=True)

# get actual and test compared 
def actual_and_test(df, ticker, predict_range):
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

    model = load_model(f"./pre_trained_models/{ticker}.h5")

    ### Lets Do the prediction and check performance metrics
    train_predict=model.predict(X_train)
    test_predict=model.predict(X_test)

    ##Transformback to original form
    train_predict=scaler.inverse_transform(train_predict)
    test_predict=scaler.inverse_transform(test_predict)

    # plot baseline and predictions
    # plt.figure(figsize=(8, 5))
    # plt.title("Stock Price Prediction using LSTM")
    # plt.xlabel("Time")
    # plt.ylabel("Stock Price")

    # plt.plot(scaler.inverse_transform(df_1[df_1.shape[0]-test_predict.shape[0]+200:]), label="Actual Stock Prices")
    # plt.plot(test_predict[200:], label="Test Set Predictions", linestyle='dashed')
    # # Add legend
    # plt.legend()

    # plt.show()

    x_input=test_data[test_data.shape[0]-150:].reshape(1,-1)
    temp_input=list(x_input)
    temp_input=temp_input[0].tolist()  


    lst_output=[]
    n_steps=150
    i=0
    while(i<predict_range):
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
    
    day_new=np.arange(1,151)
    day_pred=np.arange(151,151+predict_range)

    # plot baseline and predictions
    plt.figure(figsize=(8, 5))
    plt.title("Stock Price Prediction using LSTM")
    plt.xlabel("Time")
    plt.ylabel("Stock Price")

    plt.plot(scaler.inverse_transform(df_1[df_1.shape[0]-150:]), label="Actual Stock Prices")
    plt.plot(day_pred,scaler.inverse_transform(lst_output), label="Next 45 days prediction", linestyle='dashed')

    # Add legend
    plt.legend()

    plt.show()

    # return [scaler.inverse_transform(df_1[df_1.shape[0]-test_predict.shape[0]+200:]), test_predict[200:]]


actual_and_test(df, ticker, predict_range)










