export interface IError {
  error: {
    message: string;
  }
}

export interface IErrorApi {
  response: {
    data: IError;
    status: number;
  }
}
