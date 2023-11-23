export interface DateRange {
  start: Date;
  end: Date;
}

export interface DateRangeWithCount extends DateRange {
  days: number;
}
