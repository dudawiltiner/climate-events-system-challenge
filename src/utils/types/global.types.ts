export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DateTimeFormatOptions {
  timeZone: string;
  locale: string;
}
