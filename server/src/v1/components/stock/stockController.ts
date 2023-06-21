import catchAsync from "../../../utils/catchAsync";
import pool from "../../models/db";

export const getStockInsightData = catchAsync(async (req, res) => {
  const { ticker } = req.query;

  const query = 'SELECT * FROM "fin_state_items"';

  const queryResult = await pool.query(query);

  res.json({
    ticker,
    data: queryResult.rows,
  });
});

export const getStockClosePrices = catchAsync(async (req, res) => {
  const { ticker, start_date_end_date } = req.query;

  const query = `SELECT price, datetime,  from close_prices where tickersymbol = '${ticker}' and datetime BETWEEN '2022-01-01' AND '2022-03-01'`;

  const queryResult = await pool.query(query);

  res.json({
    ticker,
    data: queryResult.rows,
  });
});

export const getStocks = catchAsync(async (req, res) => {
  const query = "SELECT * FROM sector_ticker";

  const queryResult = await pool.query(query);

  res.json(queryResult.rows);
});

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

  res.json(queryResult.rows[0]);
});

export const getStockScore = catchAsync(async (req, res) => {
  const ticker = req.params.ticker;

  const query = `WITH latest_quarters AS (
                    SELECT year, quarter
                    FROM score_ticker_table
                    WHERE (year = EXTRACT(YEAR FROM CURRENT_DATE) AND quarter >= EXTRACT(QUARTER FROM CURRENT_DATE) - 3)
                    OR (year = EXTRACT(YEAR FROM CURRENT_DATE) - 1 AND quarter >= EXTRACT(QUARTER FROM CURRENT_DATE) + 1)
                    ORDER BY year DESC, quarter DESC
                    LIMIT 4
                ),
                missing_quarters AS (
                    SELECT EXTRACT(YEAR FROM CURRENT_DATE) - 1 AS year, generate_series(1, 4) AS quarter
                    EXCEPT
                    SELECT year, quarter
                    FROM latest_quarters
                )
                SELECT tickersymbol, year, quarter, liquidity_score, growth_rate_score, sustainable_management_score, valuation_score, health_score
                FROM (
                    SELECT *
                    FROM score_ticker_table
                    WHERE (year, quarter) IN (SELECT year, quarter FROM latest_quarters)
                    AND tickersymbol = '${ticker}'
                    UNION ALL
                    SELECT *
                    FROM score_ticker_table
                    WHERE (year, quarter) IN (SELECT year, quarter FROM missing_quarters)
                    AND tickersymbol = '${ticker}'
                ) AS combined_quarters
                ORDER BY year, quarter;
                `;

  const queryResult = await pool.query(query);

  res.json(queryResult.rows);
});

export const getStockAnalysis = catchAsync(async (req, res) => {
  const ticker = req.params.ticker;
});
