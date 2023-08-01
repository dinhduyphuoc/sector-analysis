export const sectorsList = [
  {
    id: 30,
    name: "Hàng hóa thiết yếu",
  },
  {
    id: 25,
    name: "Hàng hóa không thiết yếu",
  },
  {
    id: 10,
    name: "Năng lượng",
  },
  {
    id: 15,
    name: "Nguyên vật liệu",
  },
  {
    id: 60,
    name: "Bất động sản",
  },
  {
    id: 55,
    name: "Tiện ích",
  },
  {
    id: 45,
    name: "Công nghệ",
  },
  {
    id: 20,
    name: "Công nghiệp",
  },
  {
    id: 35,
    name: "Chăm sóc sức khỏe",
  },
  {
    id: 50,
    name: "Dịch vụ Học thuật và Giáo dục",
  },
  // {
  //   id: 40,
  //   name: "Tài chính",
  // },
];

export const ratioList = [
  { value: 10, label: "P/E" },
  { value: 20, label: "P/B" },
  { value: 30, label: "Market Cap" },
  { value: 40, label: "EPS" },
  { value: 50, label: "ROE" },
  { value: 60, label: "ROA" },
];

export const ratioOptionsAPI = {
  10: { ratio: "pe", interval: "daily" },
  20: { ratio: "pb", interval: "daily" },
  30: { ratio: "market_cap", interval: "daily" },
  40: { ratio: "eps", interval: "quarterly" },
  50: { ratio: "roe", interval: "quarterly" },
  60: { ratio: "roa", interval: "quarterly" },
};

export const ratioOptionsLabel = {
  10: "P/E",
  20: "P/B",
  30: "EPS",
  40: "ROE",
  50: "ROA",
};
