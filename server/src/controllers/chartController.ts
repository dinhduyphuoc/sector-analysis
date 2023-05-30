import catchAsync from "../utils/catchAsync";
import pool from "../models/db";
import { config } from "dotenv";
import { ChartData } from "../../types";

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
    const query = `SELECT datetime, sectorid, AVG(price) AS price
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

const getFundamentalChartInformation = catchAsync(async (req, res) => {
    const { sectorid, ratio, startDate, endDate } = req.query;

    // split the sectorid by comma
    const sectors = sectorid ? (sectorid as string).split(",").map((id) => parseInt(id)) : null;

    const query = `SELECT
                    datetime,   
                    sectorid,
                    name,
                    AVG(${ratio}) AS price
                FROM
                    stock_index_by_date_table
                WHERE
                    datetime BETWEEN '${startDate || process.env.DEFAULT_START_DATE}' AND '${endDate || "now()"}'
                    AND (${sectors ? sectors.map((sector) => `sectorid = ${sector} OR`).join(" ").slice(0, -2) : ""})
                    AND pe IS NOT NULL
                    AND pb IS NOT NULL
                    AND eps IS NOT NULL
                    AND roe IS NOT NULL
                    AND roa IS NOT NULL
                GROUP BY
                    datetime,
                    sectorid,
                    name
                ORDER BY 
                    datetime`
    const queryResult: any = await pool.query(query);
    const sectorsData = sectors?.map((sector) => {
        return {
            sectorid: sector,
            // Append every price data which sectrid is equal to sector
            datetime: queryResult.rows.filter((row: any) => row.sectorid === sector).map((row: any) => row.datetime),
            price: queryResult.rows.filter((row: any) => row.sectorid === sector).map((row: any) => row.price)
        }
    })
    res.json(sectorsData)
})

export {
    getStockChartInformation,
    getSectorChartInformation,
    getFundamentalChartInformation
}