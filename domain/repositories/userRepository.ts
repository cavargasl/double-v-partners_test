import { type Pagination } from "@domain/models/paginationModel"
import { type User, type UserDetail } from "@domain/models/userModel"

export type UserRepository = {
  getUsers: (pagination?: Pick<Pagination, "per_page">) => Promise<User[]>
  getUserById: (id: string) => Promise<UserDetail>
  getUserSearch: (name: string) => Promise<User[]>
}
