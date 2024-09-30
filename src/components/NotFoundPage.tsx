import { Link, useLocation } from "react-router-dom"

import { buttonVariants } from "./ui/button"

export default function NotFoundPage() {
  const location = useLocation()
  const message = location.state?.message
    ? `🤷 ${location.state.message} 🤷`
    : "❌ Page Not Found ❌"

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-destructive/10">
      <h1 className="mb-4 text-6xl font-bold text-destructive/90">404</h1>
      <p className="mb-8 text-2xl text-gray-700">{message}</p>
      <Link to="/" className={buttonVariants({ variant: "link" })}>
        Go to Home
      </Link>
    </div>
  )
}
