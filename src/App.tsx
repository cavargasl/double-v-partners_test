import { useCallback, useEffect, useRef, useState } from "react"
import { type User } from "@domain/models/userModel"
import { userService } from "@domain/services/userService"
import { httpAxios } from "@infrastructure/instances/httpAxios"
import { userRepository } from "@infrastructure/repositories/userRepository"
import { useSearchParams } from "react-router-dom"

import { Input } from "./components/ui/input"
import UserTable from "./components/userTable/UserTable"
import { useDebounce } from "./hooks/useDebounce"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")
  const isFirstRender = useRef(true)

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

  const debouncedSearchable = useDebounce(search, 500)

  const getUsersByName = useCallback(async () => {
    if (isFirstRender.current) return (isFirstRender.current = false)
    if (search.trim().length <= 0) return getUsers()

    try {
      const response = await userService(
        userRepository(httpAxios)
      ).getUserSearch(debouncedSearchable)
      setUsers(response)
    } catch (exception) {
      console.error(exception)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchable])

  useEffect(() => {
    getUsersByName()
  }, [getUsersByName])

  return (
    <div className="w-full gap-10 p-10">
      <h1 className="mb-14 text-center text-2xl font-bold">
        GitHub User Search Application - React Frontend
      </h1>
      <div className="mx-auto flex w-[300px] flex-col gap-10">
        <Input
          type="search"
          placeholder="Search user by username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {users.length ? (
          <UserTable users={users} isSearching={!!search.trim().length} />
        ) : (
          <p className="text-center font-semibold italic">No find user</p>
        )}
      </div>
    </div>
  )
}

export default App
