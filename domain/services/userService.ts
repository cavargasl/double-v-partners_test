import { BASE_PER_PAGE } from "@domain/models/paginationModel"

import { type UserRepository } from "../repositories/userRepository"

export const userService = (repository: UserRepository): UserRepository => {
  return {
    getUsers: (pagination) =>
      repository.getUsers({
        per_page: pagination ? pagination.per_page : BASE_PER_PAGE,
      }),
    getUserById: (id) => repository.getUserById(id),
    getUserSearch: (name) => repository.getUserSearch(name),
  }
}
