import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@domain": path.resolve(__dirname, "./domain"),
      "@infrastructure": path.resolve(__dirname, "./infrastructure"),
      "@mocks": path.resolve(__dirname, "./mocks"),
    },
  },
})
