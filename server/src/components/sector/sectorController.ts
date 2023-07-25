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
  const { sectorid, year } = req.query;
  const pool = getDBConnectionPool();

  const query = `
    SELECT *
    FROM f_score
    WHERE year = ${year}
    AND sectorid = ${sectorid}
    AND tickersymbol IN (SELECT tickersymbol FROM sector_ticker_top_10)`;

  try {
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (err: any) {
    res.json({ message: err.message });
  }
});
