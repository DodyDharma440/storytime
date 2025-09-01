export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  status: number;
  data: T;
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
