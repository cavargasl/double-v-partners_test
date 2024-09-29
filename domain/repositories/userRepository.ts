import { type User } from "../models/userModel"

export type UserRepository = {
  getUsers: () => Promise<User[]>
  getUserById: (id: string) => Promise<User>
}
