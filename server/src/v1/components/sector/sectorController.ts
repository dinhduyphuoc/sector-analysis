import catchAsync from "../../../utils/catchAsync";
import pool from "../../models/db";

export const getSectorsList = catchAsync(async (req, res) => {
  const query = `SELECT * FROM sectors`;

  const queryResult = await pool.query(query);

  res.json(queryResult.rows);
});

export const getSectorData = catchAsync(async (req, res) => {
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
  const sectorid = req.params.sectorid;

  const query = `WITH latest_quarters AS (
                  SELECT
                    year,
                    quarter
                  FROM
                    score_ticker_table
                  WHERE (year = EXTRACT(YEAR FROM CURRENT_DATE)
                    AND quarter >= EXTRACT(QUARTER FROM CURRENT_DATE) - 3)
                  OR(year = EXTRACT(YEAR FROM CURRENT_DATE) - 1
                    AND quarter >= EXTRACT(QUARTER FROM CURRENT_DATE) + 1)
                ORDER BY
                  year DESC,
                  quarter DESC
                LIMIT 4
                ),
                missing_quarters AS (
                  SELECT
                    EXTRACT(YEAR FROM CURRENT_DATE) - 1 AS year,
                    generate_series(1,
                      4) AS quarter
                  EXCEPT
                  SELECT
                    year,
                    quarter
                  FROM
                    latest_quarters
                )
                SELECT
                  sectorid,
                  year,
                  quarter,
                  AVG(liquidity_score) AS liquidity_score,
                  AVG(growth_rate_score) AS growth_rate_score,
                  AVG(sustainable_management_score) AS sustainable_management_score,
                  AVG(valuation_score) AS valuation_score,
                  AVG(health_score) AS health_score
                FROM (
                  SELECT
                    stt.*,
                    st.sectorid
                  FROM
                    score_ticker_table stt
                    JOIN sector_ticker st ON stt.tickersymbol = st.tickersymbol
                  WHERE (stt.year, stt.quarter)
                  IN(
                    SELECT
                      year, quarter FROM latest_quarters)
                  AND sectorid = ${sectorid}
                UNION ALL
                SELECT
                  stt.*,
                  st.sectorid
                FROM
                  score_ticker_table stt
                  JOIN sector_ticker st ON stt.tickersymbol = st.tickersymbol
                WHERE (stt.year, stt.quarter)
                IN(
                  SELECT
                    year, quarter FROM missing_quarters)
                AND sectorid = ${sectorid}) AS combined_quarters
                GROUP BY
                  sectorid,
                  year,
                  quarter
                ORDER BY
                  year,
                  quarter;`;

  const queryResult = await pool.query(query);

  res.json(queryResult.rows);
});
