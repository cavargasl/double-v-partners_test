import { useCallback, useEffect, useState } from "react"
import { type UserDetail } from "@domain/models/userModel"
import { userService } from "@domain/services/userService"
import { httpAxios } from "@infrastructure/instances/httpAxios"
import { userRepository } from "@infrastructure/repositories/userRepository"
import { BookCopy, Eye, Star } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import FollowData from "./FollowData"

export default function UserDetail() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserDetail>()

  const getUserDetail = useCallback(async () => {
    if (!userId)
      return navigate("/404", {
        replace: true,
        state: { message: "User not found" },
      })
    try {
      const response = await userService(userRepository(httpAxios)).getUserById(
        userId
      )
      setUser(response)
    } catch (exception) {
      console.error(exception)
      navigate("/404", { replace: true, state: { message: "User not found" } })
    }
  }, [userId, navigate])

  useEffect(() => {
    getUserDetail()
  }, [getUserDetail])

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Loading ...
      </div>
    )
  return (
    <div className="container mx-auto grid grid-cols-2 justify-items-center gap-4 p-10">
      <div className="col-span-2 mb-4 flex items-center justify-center gap-4 md:col-span-1">
        <Avatar className="size-40">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold">
            <a
              className="cursor-pointer decoration-blue-400 decoration-2 underline-offset-4 hover:underline"
              href={user.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.name}
            </a>
          </h2>
          <h2 className="text-xl font-semibold">{user.username}</h2>
        </div>
      </div>
      <div className="col-span-2 flex gap-10 md:col-span-1">
        <FollowData
          amount={user.followers}
          data={user.followersUsers}
          title="followers"
        />
        <FollowData
          amount={user.following}
          data={user.followingUsers}
          title="following"
        />
      </div>
      <div className="col-span-2">
        <h3 className="text-center text-3xl font-semibold">{`Repositories (${user.amountRepos > 30 ? `30 of ${user.amountRepos}` : user.amountRepos})`}</h3>
        <ul className="space-y-4">
          {user.repos.map((repo) => (
            <li key={repo.id} className="border-b pb-2">
              <h4 className="text-lg font-bold">
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description || "No description available."}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1 font-semibold">
                  {repo.stargazersCount}{" "}
                  <Star className="fill-yellow-300 text-yellow-300" />
                </span>

                <span className="flex items-center gap-1 font-semibold">
                  {repo.forksCount} <BookCopy className="text-gray-600" />
                </span>

                <span className="flex items-center gap-1 font-semibold">
                  {repo.watchersCount} <Eye className="text-gray-600" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
