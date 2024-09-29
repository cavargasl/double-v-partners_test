import { useCallback, useEffect, useState } from "react"
import { type User } from "@domain/models/userModel"
import { userService } from "@domain/services/userService"
import { userRepositoryFake } from "@infrastructure/instances/userRepositoryFake"

import { Input } from "./components/ui/input"
import UserTable from "./components/userTable/UserTable"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")

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
    <div className="w-full gap-10 p-10">
      <h1 className="mb-14 text-center text-2xl font-bold">
        GitHub User Search Application - React Frontend
      </h1>
      <div className="mx-auto flex max-w-fit flex-col gap-10">
        <Input
          type="search"
          placeholder="Search user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <UserTable users={users} />
      </div>
    </div>
  )
}

export default App
