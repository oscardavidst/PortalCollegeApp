export interface ResponseApi<T> {
  succeded: boolean;
  message: string;
  errors: string[];
  data: T;
}
