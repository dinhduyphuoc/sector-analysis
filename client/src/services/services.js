import http from "../utils/httpUtils";

const host = "http://localhost:8000/v1";

export const getSectorsList = async () => {
  const { data } = await http.get(`${host}/sector/list`);
  return data;
};

export const getSectorData = async (sectorId, startDate = "", endDate = "") => {
  const { data } = await http.get(
    `${host}/chart/sector?sectorid=${sectorId}&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};
