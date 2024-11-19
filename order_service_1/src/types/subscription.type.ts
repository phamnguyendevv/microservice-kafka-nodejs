export enum OrderEvent {
  CREATE_ORDER = "create_order",
  CANCEL_ORDER = "cancel_order",
  CHECK_BALANCE = "check_balance",
}

export type TOPIC_TYPE =
  | "payment-transactions"
  | "payment-success"
  | "payment-retry"
  | "payment-deadletter"
  | "payment-failed"
  | "user-balance-request";

export interface MessageType {
  headers?: Record<string, any>;
  event: OrderEvent;
  data: Record<string, any>;
}
