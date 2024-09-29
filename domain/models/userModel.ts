import { type Repo } from "./reposModel"

export type User = {
  username: string
  avatarUrl: string
  profileUrl: string
}
export type UserDetail = {
  username: string
  name?: string
  avatarUrl: string
  profileUrl: string
  followers: number
  following: number
  followersUsers: User[]
  followingUsers: User[]
  repos: Repo[]
  amountRepos: number
}
