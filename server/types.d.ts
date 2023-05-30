export interface ChartDataRows {
    id: number | string;
    datetime: string[];
    price: string[];
}

export interface ChartData {
    rows: ChartDataRows;
}