import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      icons : [
        {
          src: "/icons/937.jpg",
          sizes: "937x937",
          type : "image/jpg",
          purpose: "any maskable"
        }
      ]
    }
  })],
  server: {
    host: true, // Set to 'true' to make it accessible on the public network
    port: 3000, // Optional: specify the port (default is 5173)
  },
});
