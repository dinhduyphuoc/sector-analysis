import http from "../utils/httpUtils";

const host = "http://localhost:8000/v1";

export const getStocksList = async () => {
  const { data } = await http.get(`${host}/stock/list`);
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

export const getSectorsList = async () => {
  const { data } = await http.get(`${host}/sector/list`);
  return data;
};

export const getSectorsFundamentalData = async () => {
  const { data } = await http.get(`${host}/sector/fundamental`);
  return data;
};

export const getSectorsChartFundamentalData = async (
  sectorsId,
  ratio = "pe",
  startDate = "2010-01-01",
  endDate = ""
) => {
  const joined =
    typeof sectorsId === "number" ? sectorsId : sectorsId.join(",");
  const { data } = await http.get(
    `${host}/chart/fundamental?ratio=${ratio}&sectorid=${joined}&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

export const getSectorScore = async (sectorId) => {
  const { data } = await http.get(`${host}/sector/score/${sectorId}`);
  return data;
};
