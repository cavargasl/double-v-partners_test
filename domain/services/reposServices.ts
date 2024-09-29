import { type ReposRepository } from "@domain/repositories/reposRepository"

export const userService = (repository: ReposRepository): ReposRepository => {
  return {
    getRepos: () => repository.getRepos(),
  }
}
