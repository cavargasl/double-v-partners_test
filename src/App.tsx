import { useCallback, useEffect, useState } from "react"
import { type User } from "@domain/models/userModel"
import { userService } from "@domain/services/userService"
import { userRepositoryFake } from "@infrastructure/instances/userRepositoryFake"

function App() {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = useCallback(async () => {
    try {
      const response = await userService(userRepositoryFake).getUsers()
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
