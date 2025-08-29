export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  status: number;
}

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
