// TODO: Add more date ranges
export enum DateRange {
  Last7Days = "last7days",
  LastMonth = "lastmonth",
  LastYear = "lastyear",
  All = "all",
}

export interface InvestmentTypeRecord {
  type: string;
  value: number;
}
