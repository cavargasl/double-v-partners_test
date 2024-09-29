/* eslint-disable @typescript-eslint/no-explicit-any */

export type Http = {
  get: <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => Promise<T>
  post: <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => Promise<T>
  put: <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => Promise<T>
  delete: <T>(path: string, params?: any, config?: any) => Promise<T>
}
