import { sectorsList } from "../common/common";
import http from "../utils/httpUtils";

const host = "http://localhost:8000/v1";

export const getStocksList = async (sectorid) => {
  let url = `${host}/stock/list`;
  if (sectorid) url += `?sectorid=${sectorid}`;
  const { data } = await http.get(url);
  return data;
};

export const getStockInfo = async (ticker) => {
  const { data } = await http.get(`${host}/stock/info/${ticker}`);
  return data;
};

export const getStockLogo = (ticker) => {
  return `https://cdn.simplize.vn/simplizevn/logo/${ticker}.jpeg`;
};

export const getStockScore = async (ticker) => {
  const { data } = await http.get(`${host}/stock/score/${ticker}`);
  return data;
};

export const getSectorsList = () => {
  const sectors = sectorsList;
  return sectors;
};

export const getSectorsFundamentalData = async () => {
  const { data } = await http.get(`${host}/sector/fundamental`);
  return data;
};

export const getDailyChartFundamentalData = async (
  id,
  type,
  ratio = "pe",
  interval = "daily",
  startDate = "2010-01-01",
  endDate = ""
) => {
  const { data } = await http.get(
    `${host}/chart/fundamental?id=${id}&ratio=${ratio}&interval=${interval}&type=${type}&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

export const getSectorScore = async (sectorId) => {
  const { data } = await http.get(`${host}/sector/score/${sectorId}`);
  return data;
};

export const getFScore = async (sectorid, year = 2022) => {
  const url = `${host}/sector/f-score?sectorid=${sectorid}&year=${year}`;
  const { data } = await http.get(url);
  return data;
};
