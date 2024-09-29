import { useCallback, useEffect, useState } from "react"
import { type User } from "@domain/models/userModel"
import { userService } from "@domain/services/userService"
import { httpAxios } from "@infrastructure/instances/httpAxios"
import { userRepository } from "@infrastructure/repositories/userRepository"

function App() {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = useCallback(async () => {
    try {
      const response = await userService(userRepository(httpAxios)).getUsers()
      setUsers(response)
    } catch (exception) {
      console.error(exception)
    }
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <>
      <p>{JSON.stringify(users)}</p>
    </>
  )
}

export default App
