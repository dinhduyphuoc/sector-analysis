import catchAsync from "../utils/catchAsync";
import pool from "../models/db";

export const getStockInsightData = catchAsync(async (req, res) => {
    const { ticker } = req.query;

    const query = 'SELECT * FROM "fin_state_items"'

    const queryResult = await pool.query(query);

    res.json({
        ticker,
        data: queryResult.rows
    })
})

export const getStockClosePrices = catchAsync(async (req, res) => {
    const { ticker, start_date_end_date } = req.query;

    const query = `SELECT price, datetime,  from close_prices where tickersymbol = '${ticker}' and datetime BETWEEN '2022-01-01' AND '2022-03-01'`

    const queryResult = await pool.query(query);

    res.json({
        ticker,
        data: queryResult.rows
    })
})

export const getStocks = catchAsync(async (req, res) => {
    const query = "SELECT * FROM sector_ticker";

    const queryResult = await pool.query(query);

    res.json(
        queryResult.rows
    )
})

export const getStockInfo = catchAsync(async (req, res) => {
    const ticker = req.params.ticker;

    const query = `SELECT st.*, s."name" as sectorname, t.exchangeid, t.companyname
                    FROM sector_ticker st
                    JOIN tickers t
                    ON st.tickersymbol = t.tickersymbol
                    JOIN sectors s
                    ON st.sectorid = s.id
                    WHERE st.tickersymbol = '${ticker}'
                    AND st.sectorid = s.id`;

    const queryResult = await pool.query(query);

    res.json(
        queryResult.rows[0]
    )
})