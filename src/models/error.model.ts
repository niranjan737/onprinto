class CustomError extends Error {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    super(message);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

class ResourceNotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 404;
  }
}

export { CustomError, ResourceNotFoundError };
