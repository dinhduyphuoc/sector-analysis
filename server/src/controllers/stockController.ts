import catchAsync from "../utils/catchAsync";
import pool from "../models/db";

const getStockInsightData = catchAsync(async (req, res) => {
    const { ticker } = req.query;

    const query = 'SELECT * FROM "fin_state_items"'

    const queryResult = await pool.query(query);

    res.json({
        ticker,
        data: queryResult.rows
    })
})

const getStockClosePrices = catchAsync(async (req, res) => {
    const { ticker, start_date_end_date } = req.query;

    const query = `SELECT price, datetime from close_prices where tickersymbol = '${ticker}' and datetime BETWEEN '2022-01-01' AND '2022-03-01'`

    const queryResult = await pool.query(query);

    res.json({
        ticker,
        data: queryResult.rows
    })
})

const getSectorsList = catchAsync(async (req, res) => {
    const query = `SELECT * FROM sectors`;

    const queryResult = await pool.query(query);

    res.json([
        queryResult.rows
    ])
})

const getStocks = catchAsync(async (req, res) => {
    const query = `SELECT * FROM sector_ticker`;

    const queryResult = await pool.query(query);

    res.json([
        queryResult.rows
    ])
})

export {
    getStockInsightData,
    getStockClosePrices,
    getSectorsList,
    getStocks
};