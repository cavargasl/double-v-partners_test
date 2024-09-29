import { type User } from "@domain/models/userModel"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type FollowDataProps = {
  amount: number
  data: User[]
  title: string
}
export default function FollowData({ amount, data, title }: FollowDataProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold capitalize">{`${title} (${amount > 30 ? `30 of ${amount}` : amount})`}</h3>
      <ul className="flex h-[400px] flex-col gap-2 overflow-y-auto">
        {data.map((follow) => (
          <li key={follow.username} className="flex items-center">
            <div className="flex items-center gap-2 font-medium">
              <Avatar>
                <AvatarImage src={follow.avatarUrl} />
                <AvatarFallback>{follow.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <a
                className="cursor-pointer decoration-blue-400 decoration-2 underline-offset-4 hover:underline"
                href={follow.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {follow.username}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
