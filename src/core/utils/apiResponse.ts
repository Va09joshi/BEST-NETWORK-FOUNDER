import { NextResponse } from 'next/server';
import { AppError } from '../errors/ErrorHandler';

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

export const apiSuccess = <T>(data: T, message?: string, status: number = 200) => {
  const response: SuccessResponse<T> = { success: true, data };
  if (message) response.message = message;
  
  return NextResponse.json(response, { status });
};

export const apiError = (error: unknown) => {
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
      },
    };
    return NextResponse.json(response, { status: error.statusCode });
  }

  // Handle standard errors or Zod errors
  if (error instanceof Error) {
    const response: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
      },
    };
    return NextResponse.json(response, { status: 500 });
  }

  // Fallback for unknown errors
  const response: ErrorResponse = {
    success: false,
    error: {
      message: 'An unexpected error occurred',
    },
  };
  return NextResponse.json(response, { status: 500 });
};
