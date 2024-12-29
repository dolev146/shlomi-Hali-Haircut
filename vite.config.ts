import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Set to 'true' to make it accessible on the public network
    port: 3000, // Optional: specify the port (default is 5173)
  },
});
