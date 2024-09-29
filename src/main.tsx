/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

const App = lazy(() => import("./App.tsx"))
const NotFoundPage = lazy(() => import("./components/NotFoundPage.tsx"))
const UserDetail = lazy(() => import("./components/userDetail/UserDetail.tsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:userId",
    element: <UserDetail />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-2xl">
          Loading ...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
)
