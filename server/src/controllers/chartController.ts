import catchAsync from "../utils/catchAsync";
import pool from "../models/db";
import { config } from "dotenv";

config();

const getStockChartInformation = catchAsync(async (req, res) => {
    const { ticker, startDate, endDate } = req.query;

    const query = `SELECT price, datetime FROM close_prices where tickersymbol = '${ticker}' and datetime BETWEEN '${startDate}' AND '${endDate}'`

    const queryResult = await pool.query(query)
    const sortedQueryResult = queryResult.rows.sort((a, b) => {
        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    })
    const dateData = sortedQueryResult.map((row) => row.datetime)
    const priceData = sortedQueryResult.map((row) => row.price)

    res.json({
        ticker,
        date: dateData,
        price: priceData
    })
})

const getSectorChartInformation = catchAsync(async (req, res) => {
    const { sectorid, startDate, endDate } = req.query;
    const query = `SELECT datetime, sectorid, ROUND(AVG(price)::NUMERIC, 2) AS price
                   FROM price_top_five 
                   WHERE sectorid = ${sectorid} 
                   AND datetime BETWEEN '${startDate || process.env.DEFAULT_START_DATE}' AND '${endDate || "now()"}'
                   GROUP BY 1, 2
                   ORDER BY 1, 2`;

    const queryResult = await pool.query(query);
    const sortedQueryResult = queryResult.rows.sort((a, b) => {
        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    })
    const dateData = sortedQueryResult.map((row) => row.datetime)
    const priceData = sortedQueryResult.map((row) => row.price)

    res.json({
        sectorid: queryResult.rows[0].sectorid,
        date: dateData,
        price: priceData
    })
})

export {
    getStockChartInformation,
    getSectorChartInformation
}