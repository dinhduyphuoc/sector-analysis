FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["gunicorn", "app:app","-w", "5", "-b", "0.0.0.0:5000", "--timeout", "0"]