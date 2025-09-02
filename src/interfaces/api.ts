export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  status: number;
  data: T;
  meta?: {
    current_page: string;
    last_page: number;
    per_page: string;
    total: number;
  };
};

export interface ErrorResponse<T extends Record<string, any>> {
  response: {
    _data?: {
      success: boolean;
      message: string;
      errors: T;
      status: number;
    };
  };
}
