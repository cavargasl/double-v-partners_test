import { type User } from "@domain/models/userModel"

import { columns } from "./ColumnTable"
import { DataTable } from "./DataTable"

type UserTableProps = { users: User[]; isSearching: boolean }
export default function UserTable({ users, isSearching }: UserTableProps) {
  return <DataTable columns={columns} data={users} isSearching={isSearching} />
}
