import requests
import json
from typing import List, Dict
import re

def get_financial_ratio(ticker: str, from_year: int, to_year: int, from_quarter: int = 1, to_quarter: int = 4) -> List[Dict]:
    result = []
    for year in range(from_year, to_year + 1):
        try:
            url = f"https://svr8.fireant.vn/api/Data/Finance/QuarterlyFinancialInfo?symbol={ticker}&fromYear={year}&fromQuarter={from_quarter}&toYear={year}&toQuarter={to_quarter}"
            response = requests.get(url)
            parsed = response.json()

            for data in parsed:
                t_data = {
                    "tickersymbol": data["Symbol"],
                    "year": data["Year"],
                    "quarter": data["Quarter"],
                    "DilutedEPS": data["DilutedEPS_TTM"],
                    "ROE": data["ROE_TTM"],
                    "ROA": data["ROA_TTM"],
                    "BVPS": data["BookValuePerShare_MRQ"],
                    "SharesOutstanding": data["SharesOutstanding_MRQ"]
                }
                result.append(t_data)
                # write to database
        except Exception as e:
            print(f"Error: An exception occurred for ticker '{ticker}', year {year}: {e}")
    
    return result

def get_income_statement(ticker: str, from_year: int, to_year: int, quarter: int = 4) -> List[Dict]:
    result = []
    try:
        url = f"https://svr6.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol={ticker}&type=2&year={to_year}&quarter={quarter}&count={(to_year - from_year) * 4 if quarter == 4 else (to_year - from_year) * 4}"
        response = requests.get(url)
        parsed = response.json()
        for data in parsed:
            if data["Name"]:
                new_data = {
                    "tickersymbol": ticker,
                    "name": data["Name"],
                    "values": [{"quarter": item["Quarter"], "year": item["Year"], "value": item["Value"]} for item in data["Values"]]
                }
            result.append(new_data)     
    except Exception as e:
        print(f"Error: An exception occurred for ticker '{ticker}', year {from_year}: {e}")
    
    return result
        

def get_balance_sheet(ticker: str, from_year: int, to_year: int, quarter: int = 4) -> List[Dict]:
    result = []
    try:
        url = f"https://svr6.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol={ticker}&type=1&year={to_year}&quarter={quarter}&count={(to_year - from_year) * 4 if quarter == 4 else (to_year - from_year) * 4}" 
        response = requests.get(url)
        parsed = response.json()
        for data in parsed:
            if data["Name"]:
                new_data = {
                    "tickersymbol": ticker,
                    "name": data["Name"],
                    "values": [{"quarter": item["Quarter"], "year": item["Year"], "value": item["Value"]} for item in data["Values"]]
                }
            result.append(new_data)     
    except Exception as e:
        print(f"Error: An exception occurred for ticker '{ticker}', year {from_year}: {e}")
    
    return result
    
def get_cashflow_statement(ticker: str, from_year: int, to_year: int, quarter: int = 4) -> List[Dict]:
    result = [] 
    # Type 3: Truc Tiep, Type 4: Gian Tiep
    types = [3, 4]
    for report_type in types:
        try:
            t_data = {"tickersymbol": ticker}
            url = f"https://svr8.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol={ticker}&type={report_type}&year={to_year}&quarter={quarter}&count={(to_year - from_year) * 4 if quarter == 4 else (to_year - from_year) * 4}"
            response = requests.get(url)
            parsed = response.json()
            for data in parsed:
                if data["Name"]:
                    new_data = {
                    "tickersymbol": ticker,
                    "name": data["Name"],
                    "values": [{"quarter": item["Quarter"], "year": item["Year"], "value": item["Value"]} for item in data["Values"]]
                }
                result.append(new_data) 
        except Exception as e:
            print(f"Error: An exception occurred for ticker '{ticker}', year {from_year}: {e}")
            
    return result