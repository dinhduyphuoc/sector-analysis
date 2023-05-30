import catchAsync from "../utils/catchAsync";
import pool from "../models/db";

const getSectorsList = catchAsync(async (req, res) => {
    const query = `SELECT * FROM sectors`;

    const queryResult = await pool.query(query);

    res.json(queryResult.rows);
});

const getSectorData = catchAsync(async (req, res) => {
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
        data: queryResult.rows
    })
})

const getFundamentalData = catchAsync(async (req, res) => {
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
                        2
                    ORDER BY
                        1`
    const queryResult = await pool.query(query);
    res.json(queryResult.rows)
});


export {
    getSectorsList,
    getSectorData,
    getFundamentalData
};