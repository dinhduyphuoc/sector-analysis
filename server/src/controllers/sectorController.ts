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

export {
    getSectorsList,
    getSectorData,
};