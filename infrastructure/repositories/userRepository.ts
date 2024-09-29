import { type User } from "@domain/models/userModel"
import { type Http } from "@domain/repositories/http"
import { type UserRepository } from "@domain/repositories/userRepository"

import { type UserDTO } from "../http/dto/userDTO"

export const userRepository = (client: Http): UserRepository => {
  return {
    getUsers: async () => {
      const users = await client.get<UserDTO[]>(`/users`)
      return users.map(
        (dto): User => ({
          avatarUrl: dto.avatar_url,
          profileUrl: dto.html_url,
          username: dto.login,
        })
      )
    },
    getUserById: async (id) => {
      const user = await client.get<UserDTO>(`/users/${id}`)
      return {
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        username: user.login,
      }
    },
  }
}
