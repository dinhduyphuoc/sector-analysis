import psycopg2 
import financevn as fv
import json

attr = {
    "Tổng doanh thu hoạt động kinh doanh": 10,
    "Doanh thu thuần": 20,
    "Giá vốn hàng bán": 21,
    "Lợi nhuận gộp": 30,
    "Lưu chuyển tiền thuần từ hoạt động kinh doanh": 140,
    "Tài sản lưu động và đầu tư ngắn hạn": 1000,
    "Nợ ngắn hạn": 3100
}

con = psycopg2.connect(
    host="sector-analysis-postgresql-do-user-1970830-0.b.db.ondigitalocean.com",
    dbname="defaultdb",
    user="doadmin",
    password="AVNS_jXust5tRZai7X26ZM61",
    port="25060"
)

cur = con.cursor()

cur.execute('''
            CREATE TABLE IF NOT EXISTS financial_data (
                tickersymbol varchar(255),
                year INT, 
                quarter INT,
                code INT,
                value FLOAT
            );
            ''')

con.commit()

cur.execute("SELECT tickersymbol FROM sector_ticker")

# Get all tickers
ticker_db = cur.fetchall()
tickers = []
for ticker in ticker_db:
    tickers.append(ticker[0])

data = fv.get_income_statement(["SSI"], 2020, 2022)
with open("income_statement.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
    
data = fv.get_balance_sheet(["SSI"], 2020, 2022)
with open("balance_sheet.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
    
data = fv.get_cashflow_statement(["SSI"], 2020, 2022)
with open("cashflow_statement.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
    
    
# for item in data:
#     for key in item:
#         if key in attr:
#             print(item["cophieu"], key)


# income_statement = fv.get_income_statement(tickers, 2020, 2022)