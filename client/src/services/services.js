import http from "../utils/httpUtils";

const host = "http://localhost:8000/v1";

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
  startDate = "",
  endDate = ""
) => {
  const joined =
    typeof sectorsId === "number" ? sectorsId : sectorsId.join(",");
  const { data } = await http.get(
    `${host}/chart/fundamental?ratio=${ratio}&sectorid=${joined}&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};
