import { type User } from "@domain/models/userModel"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type UserTableProps = { users: User[] }
export default function UserTable({ users }: UserTableProps) {
  return (
    <Table>
      <TableCaption>A list of GitHub users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead className="text-end">Profile</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center gap-2 font-medium">
              <Avatar>
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {user.username}
            </TableCell>
            <TableCell className="text-right">
              <a
                href={user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
