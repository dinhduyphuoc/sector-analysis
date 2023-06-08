from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator

default_args = {
    "owner": "phuocdd",
    "retries": 5,
    "retry_delay": timedelta(minutes=1),
}

with DAG(
    dag_id="our_first_dag_v2",
    default_args=default_args,
    description="First airflow dag",
    start_date=datetime(2023, 6, 6, 2),
    schedule_interval="@daily") as dag:
    # Tasks go here
    task1 = BashOperator(
        task_id="first_task",
        bash_command="echo hello world hehe"
    )
    task2 = BashOperator(
        task_id="second_task",
        bash_command="echo hello world on second task"
    )
    
    task1 >> task2