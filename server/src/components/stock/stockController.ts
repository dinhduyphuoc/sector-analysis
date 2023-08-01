import catchAsync from "../../utils/catchAsync";
import getDBConnectionPool from "../../models/db";
import logger from "../../utils/logger";

export const getStockInsightData = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { ticker } = req.query;

  const query = 'SELECT * FROM "fin_state_items"';

  const queryResult = await pool.query(query);

  res.json({
    ticker,
    data: queryResult.rows,
  });
});

export const getStockClosePrices = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { ticker, start_date_end_date } = req.query;

  const query = `SELECT price, datetime,  from close_prices where tickersymbol = '${ticker}' and datetime BETWEEN '2022-01-01' AND '2022-03-01'`;

  const queryResult = await pool.query(query);

  res.json({
    ticker,
    data: queryResult.rows,
  });
});

export const getStocks = catchAsync(async (req, res) => {
  const { sectorid } = req.query;
  const pool = getDBConnectionPool();

  let query = "SELECT * FROM sector_ticker";

  const values = [];
  if (req.query.sectorid) {
    query += " WHERE sectorid = $1";
    values.push(sectorid);
  }

  try {
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (e: any) {
    res.json({
      message: e.message,
    });
  }
});

export const getStockInfo = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
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
  const pool = getDBConnectionPool();

  const ticker = req.params.ticker;

  const query = `WITH latest_quarters AS (
    SELECT year
    FROM f_score
    WHERE year = EXTRACT(YEAR FROM CURRENT_DATE) 
    OR year = EXTRACT(YEAR FROM CURRENT_DATE) - 1
    GROUP BY year
    ORDER BY year DESC
    LIMIT 1
),
combined_quarters AS (
    SELECT *
    FROM f_score
    WHERE (year, quarter) IN (SELECT year, quarter FROM latest_quarters)
    AND tickersymbol = '${ticker}'
)
SELECT *
FROM combined_quarters
WHERE tickersymbol = '${ticker}'`;

  const queryResult = await pool.query(query);

  res.json(queryResult.rows[0]);
});
