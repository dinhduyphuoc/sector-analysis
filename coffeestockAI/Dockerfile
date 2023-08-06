FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["gunicorn", "wsgi:app","-w", "4", "-b", "0.0.0.0:5000"]