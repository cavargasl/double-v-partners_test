import { type UserRepository } from "../repositories/userRepository"

export const userService = (repository: UserRepository): UserRepository => {
  return {
    getUsers: () => repository.getUsers(),
    getUserById: (id) => repository.getUserById(id),
  }
}
