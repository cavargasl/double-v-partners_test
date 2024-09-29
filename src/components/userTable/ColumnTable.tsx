import { type User } from "@domain/models/userModel"
import { type ColumnDef } from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <Avatar>
          <AvatarImage src={row.original.avatarUrl} />
          <AvatarFallback>{row.original.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {row.original.username}
      </div>
    ),
  },
  {
    accessorKey: "profileUrl",
    header: () => <div className="text-end">Profile</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <a
          href={row.original.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
      </div>
    ),
  },
]
