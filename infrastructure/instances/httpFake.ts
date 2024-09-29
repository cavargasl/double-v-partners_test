/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Http } from "@domain/repositories/http"
import { usersMock } from "@mocks/users"

export const httpFake: Http = {
  get: async <T>(
    _path: string,
    _params?: Record<string, any>,
    _config?: any
  ) => {
    const response = await usersMock
    return response as T
  },
  post: async <T>(
    _path: string,
    _params?: Record<string, any>,
    _config?: any
  ) => {
    const response = await usersMock
    return response as T
  },
  put: async <T>(
    _path: string,
    _params?: Record<string, any>,
    _config?: any
  ) => {
    const response = await usersMock[0]
    return response as T
  },
  delete: async <T>(_path: string, _params?: any, _config?: any) => {
    const response = await usersMock[0]
    return response as T
  },
}
