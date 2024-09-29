import { type User } from "@domain/models/userModel"
import { type ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { buttonVariants } from "../ui/button"

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
        <a
          className="cursor-pointer decoration-blue-400 decoration-2 underline-offset-4 hover:underline"
          href={row.original.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.original.username}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "profileUrl",
    header: () => <div className="text-end">Profile</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Link
          to={row.original.username}
          className={buttonVariants({
            variant: "link",
            className: "px-0 hover:bg-inherit",
          })}
        >
          View Detail
        </Link>
      </div>
    ),
  },
]
