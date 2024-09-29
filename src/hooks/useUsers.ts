import { useCallback, useEffect, useState } from "react"
import { type User } from "@domain/models/userModel"
import { userService } from "@domain/services/userService"
import { httpAxios } from "@infrastructure/instances/httpAxios"
import { userRepository } from "@infrastructure/repositories/userRepository"
import { useSearchParams } from "react-router-dom"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [searchParams] = useSearchParams()
  const per_page = searchParams.get("per_page")

  const getUsers = useCallback(async () => {
    try {
      const response = await userService(userRepository(httpAxios)).getUsers({
        per_page: Number(per_page),
      })
      setUsers(response)
    } catch (exception) {
      console.error(exception)
    }
  }, [per_page])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return { users, getUsers, setUsers }
}
