export type ToastStatus = "success" | "warning" | "error";

export interface ToastItem {
  text: string;
  status: ToastStatus;
  id: number;
}

export interface ToastPayload {
  timeout?: number;
  text: string;
}
