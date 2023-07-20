import catchAsync from "../../utils/catchAsync";
import getDBConnectionPool from "../../models/db";
import { log } from "console";
import { convertISO8601ToMilliseconds, roundNum } from "../../utils/utils";

const getStockChartInformation = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { ticker, startDate, endDate } = req.query;

  const query = `SELECT price, datetime FROM close_prices where tickersymbol = '${ticker}' and datetime BETWEEN '${startDate}' AND '${endDate}'`;

  const queryResult = await pool.query(query);
  const sortedQueryResult = queryResult.rows.sort((a, b) => {
    return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
  });
  const dateData = sortedQueryResult.map((row) => row.datetime);
  const priceData = sortedQueryResult.map((row) => row.price);

  res.json({
    ticker,
    date: dateData,
    price: priceData,
  });
});

const getSectorChartInformation = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { sectorid, startDate, endDate } = req.query;
  const query = `SELECT datetime, sectorid, AVG(price) AS price
                   FROM price_top_five 
                   WHERE sectorid = ${sectorid} 
                   AND datetime BETWEEN '${
                     startDate || process.env.DEFAULT_START_DATE
                   }' AND '${endDate || "now()"}'
                   GROUP BY 1, 2
                   ORDER BY 1, 2`;

  const queryResult = await pool.query(query);
  const sortedQueryResult = queryResult.rows.sort((a, b) => {
    return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
  });
  const dateData = sortedQueryResult.map((row) => row.datetime);
  const priceData = sortedQueryResult.map((row) => row.price);

  res.json({
    sectorid: queryResult.rows[0].sectorid,
    date: dateData,
    price: priceData,
  });
});

const getDailyFundamentalChartData = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { id, interval, type, ratio, startDate, endDate } = req.query;

  const typeMap = type === "sector" ? "sectorid" : "tickersymbol";

  let query;

  if (interval === "daily") {
    query = `SELECT
                    datetime,   
                    ${typeMap},
                    ${ratio},
                    name
                FROM
                    data_${interval}_${type}
                WHERE
                    datetime BETWEEN '${
                      startDate || process.env.DEFAULT_START_DATE
                    }' AND '${endDate || "now()"}'
                    AND ${typeMap} = ${type === "sector" ? id : `'${id}'`}
                    AND ${ratio} IS NOT NULL
                GROUP BY
                    datetime, ${typeMap}, ${ratio}, name
                ORDER BY
                    datetime`;
  } else {
    query = `SELECT
                    year,   
                    quarter,
                    ${typeMap},
                    ${ratio}
                FROM
                    data_${interval}_${type}
                WHERE
                    year BETWEEN 2020 AND 2023
                    AND ${typeMap} = ${type === "sector" ? id : `'${id}'`}
                    AND ${ratio} IS NOT NULL
                GROUP BY
                    year, quarter, ${typeMap}, ${ratio}
                ORDER BY
                    year, quarter`;
  }

  const queryResult: any = await pool.query(query);

  if (interval === "daily") {
    return res.json({
      id: queryResult.rows[0][typeMap],
      interval: interval,
      data: queryResult.rows.map((row: any) => {
        // @ts-ignore
        return [
          convertISO8601ToMilliseconds(row.datetime),
          // @ts-ignore
          roundNum(row[ratio]),
        ];
      }),
    });
  }
  return res.json({
    id: queryResult.rows[0][typeMap],
    interval: interval,
    data: queryResult.rows.map((row: any) => {
      // @ts-ignore
      return [row.year, row.quarter, row[ratio]];
    }),
  });
});

const getQuarterlyFundamentalChartData = catchAsync(async (req, res) => {
  const pool = getDBConnectionPool();
  const { id, interval, type, ratio, startDate, endDate } = req.query;

  const typeMap = type === "sector" ? "sectorid" : "tickersymbol";

  const query = `SELECT
                    year,   
                    quarter,
                    ${typeMap},
                    ${ratio}
                FROM
                    data_${interval}_${type}
                WHERE
                    datetime BETWEEN '${
                      startDate || process.env.DEFAULT_START_DATE
                    }' AND '${endDate || "now()"}'
                    AND ${type === "sector" ? "sectorid" : "tickersymbol"} = ${
    type === "sector" ? id : `'${id}'`
  }
                    AND ${ratio} IS NOT NULL
                GROUP BY
                    datetime, ${typeMap}, ${ratio}
                ORDER BY
                    datetime`;

  const queryResult: any = await pool.query(query);

  return res.json({
    id: queryResult.rows[0][type === "sector" ? "sectorid" : "tickersymbol"],
    date: queryResult.rows.map((row: any) => row.datetime),
    ratio: queryResult.rows.map((row: any) => row.ratio),
  });
});

export {
  getStockChartInformation,
  getSectorChartInformation,
  getDailyFundamentalChartData,
  getQuarterlyFundamentalChartData,
};
