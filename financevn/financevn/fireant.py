import requests
import json
from typing import List, Dict
import re

def format_name(string: str) -> str:
    string = re.sub(r'^[A-Za-z0-9]+\.\s*|- .*', '', string)
    string = re.sub(r'\s*\(\d+\)\s*[-+]\s*\(\d+\)\s*', '', string)
    return string

def get_financial_ratio(tickers: List[str], from_year: int, to_year: int, from_quarter: int = 1, to_quarter: int = 4) -> List[Dict]:
    result = []
    for ticker in tickers:
        for year in range(from_year, to_year + 1):
            try:
                url = f"https://svr8.fireant.vn/api/Data/Finance/QuarterlyFinancialInfo?symbol={ticker}&fromYear={year}&fromQuarter={from_quarter}&toYear={year}&toQuarter={to_quarter}"
                response = requests.get(url)
                parsed = response.content.decode("utf-8")
                parsed = json.loads(parsed)

                for data in parsed:
                    t_data = {
                        "cophieu": data["Symbol"],
                        "nam": data["Year"],
                        "quy": data["Quarter"],
                        "EPSPhaLoang": data["DilutedEPS_TTM"],
                        "ROE": data["ROE_TTM"],
                        "ROA": data["ROA_TTM"],
                        "BVPS": data["BookValuePerShare_MRQ"],
                        "CoPhieuDangLuuHanh": data["SharesOutstanding_MRQ"]
                    }
                    result.append(t_data)
            except Exception as e:
                print(f"Error: An exception occurred for ticker '{ticker}', year {year}: {e}")
    
    return result

def get_income_statement(tickers: List[str], from_year: int, to_year: int, quarter: int = 4) -> List[Dict]:
    result = []
    for ticker in tickers:  
        try:
            url = f"https://svr6.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol={ticker}&type=2&year={to_year}&quarter={quarter}&count={(to_year - from_year) * 4 if quarter == 4 else (to_year - from_year) * 4}" 
            response = requests.get(url)
            parsed = response.content.decode("utf-8")
            parsed = json.loads(parsed)
            t_data = {
                "cophieu": ticker,
            }
            for data in parsed:
                if data["Name"]:
                    new_data = {
                        format_name(data["Name"]): [{"quarter": item["Quarter"], "year": item["Year"], "values": item["Value"]} for item in data["Values"]]
                    }
                t_data.update(new_data)
            result.append(t_data)
                
        except Exception as e:
            print(f"Error: An exception occurred for ticker '{ticker}', year {from_year}: {e}")
    
    return result

def get_balance_sheet(tickers: List[str], from_year: int, to_year: int, quarter: int = 4) -> List[Dict]:
    result = []
    for ticker in tickers:
        try:
            url = f"https://svr6.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol={ticker}&type=1&year={to_year}&quarter={quarter}&count={(to_year - from_year) * 4 if quarter == 4 else (to_year - from_year) * 4}" 
            response = requests.get(url)
            parsed = response.json()
            t_data = {
                "cophieu": ticker,
            }
            for data in parsed:
                if data["Name"]:
                    new_data = {
                        format_name(data["Name"]): [{"quarter": item["Quarter"], "year": item["Year"], "values": item["Value"]} for item in data["Values"]]
                    }
                t_data.update(new_data)
            result.append(t_data)
        except Exception as e:
            print(f"Error: An exception occurred for ticker '{ticker}', year {from_year}: {e}")
                
    return result
    
def get_cashflow_statement(tickers: List[str], from_year: int, to_year: int, quarter: int = 4) -> List[Dict]:
    result = []
    for ticker in tickers:
        t_data = {"cophieu": ticker}
        types = [3, 4]
        for report_type in types:
            try:
                url = f"https://svr8.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol={ticker}&type={report_type}&year={to_year}&quarter={quarter}&count={(to_year - from_year) * 4 if quarter == 4 else (to_year - from_year) * 4}"
                response = requests.get(url)
                parsed = response.json()
                for data in parsed:
                    if data["Name"]:
                        new_data = {
                            format_name(data["Name"]): [{"quarter": item["Quarter"], "year": item["Year"], "values": item["Value"]} for item in data["Values"]]
                        }
                        t_data.update(new_data)
            except Exception as e:
                print(f"Error: An exception occurred for ticker '{ticker}', year {from_year}: {e}")
        result.append(t_data)
    return result