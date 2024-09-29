import { type User } from "@domain/models/userModel"
import { type Http } from "@domain/repositories/http"
import { type UserRepository } from "@domain/repositories/userRepository"
import { type RepoDTO } from "@infrastructure/http/dto/repoDTO"
import {
  type UserByIdDTO,
  type UserDTO,
  type UserSearchDTO,
} from "@infrastructure/http/dto/userDTO"

export const userRepository = (client: Http): UserRepository => {
  return {
    getUsers: async (pagination) => {
      const users = await client.get<UserDTO[]>(`/users`, {
        per_page: pagination ? pagination.per_page : null,
      })
      return users.map(
        (dto): User => ({
          avatarUrl: dto.avatar_url,
          profileUrl: dto.html_url,
          username: dto.login,
        })
      )
    },
    getUserById: async (id) => {
      const user = await client.get<UserByIdDTO>(`/users/${id}`)
      const followers = await client.get<UserDTO[]>(
        `/users/${user.login}/followers`
      )
      const following = await client.get<UserDTO[]>(
        `/users/${user.login}/following`
      )
      const repos = await client.get<RepoDTO[]>(user.repos_url)
      return {
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        username: user.login,
        name: user.name ?? undefined,
        followersUsers: followers.map(
          (dto): User => ({
            avatarUrl: dto.avatar_url,
            profileUrl: dto.html_url,
            username: dto.login,
          })
        ),
        followingUsers: following.map(
          (dto): User => ({
            avatarUrl: dto.avatar_url,
            profileUrl: dto.html_url,
            username: dto.login,
          })
        ),
        followers: user.followers,
        following: user.following,
        amountRepos: user.public_repos,
        repos: repos.map((dto) => ({
          id: dto.id,
          description: dto.description,
          fullName: dto.full_name,
          name: dto.name,
          htmlUrl: dto.html_url,
          forksCount: dto.forks_count,
          stargazersCount: dto.stargazers_count,
          watchersCount: dto.watchers_count,
          createdAt: dto.created_at,
          updatedAt: dto.updated_at,
        })),
      }
    },
    getUserSearch: async (name) => {
      const users = await client.get<UserSearchDTO>(`/search/users`, {
        q: name,
      })
      return users.items.map(
        (dto): User => ({
          avatarUrl: dto.avatar_url,
          profileUrl: dto.html_url,
          username: dto.login,
        })
      )
    },
  }
}
