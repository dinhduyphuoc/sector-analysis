import catchAsync from "../../utils/catchAsync";
import pool from "../../models/db";
import getDBConnectionPool from "../../models/db";

export const getSectorsList = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const query = `SELECT * FROM sectors`;

  const queryResult = await pool.query(query);

  res.json(queryResult.rows);
});

export const getSectorData = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { sectorid, startDate, endDate } = req.query;
  const query = `SELECT datetime, sectorid, ROUND(AVG(price)::numeric, 2) AS price
                   FROM price_top_five 
                   WHERE sectorid = ${sectorid} 
                   AND datetime BETWEEN '${startDate}' AND '${endDate}'
                   GROUP BY 1, 2
                   ORDER BY 1, 2`;

  const queryResult = await pool.query(query);

  res.json({
    sectorid,
    data: queryResult.rows,
  });
});

export const getSectorFundamentalData = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();

  const { sectorid, startDate, endDate } = req.query;
  const query = `SELECT
                        sectorid,
                        "name",
                        ROUND(AVG(pe)::numeric, 2) AS pe,
                        ROUND(AVG(pb)::numeric, 2) AS pb,
                        ROUND(AVG(eps)::numeric, 2) AS eps,
                        ROUND(AVG(roa)::numeric, 2) AS roa,
                        ROUND(AVG(roe)::numeric, 2) AS roe
                    FROM
                        stock_index_by_date_table
                    GROUP BY
                        1,
                        2`;
  const queryResult = await pool.query(query);
  res.json(queryResult.rows);
});

export const getSectorScore = catchAsync(async (req, res) => {
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
