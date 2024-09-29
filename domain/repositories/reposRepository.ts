import { type Repo } from "@domain/models/reposModel"

export type ReposRepository = {
  getRepos: () => Promise<Repo[]>
}
