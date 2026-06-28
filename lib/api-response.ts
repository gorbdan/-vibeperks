import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

export function okResponse(body: ApiSuccessResponse = { ok: true }) {
  return Response.json(body);
}

export function jsonResponse<T>(body: T, init?: ResponseInit) {
  return Response.json(body, init);
}

export function errorResponse(message: string, status: number) {
  const body: ApiErrorResponse = {
    error: message
  };

  return Response.json(body, { status });
}
