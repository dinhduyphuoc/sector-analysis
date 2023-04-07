import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import pool from "../models/db";

const getStockInsightData = catchAsync(async (req, res) => {
    const { ticker } = req.query;

    res.json({
        ticker,
    })
})

export {
    getStockInsightData
};