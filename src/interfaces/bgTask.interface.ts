export interface iRespBgTas {
  id?: string;
  payload: any;
  error?: string;
  progress?: number | object;
  queue: string;
  taskName: string;
  state: string;
  data?: any;
}
