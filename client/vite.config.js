import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Specify the port for the Vite server
    open: true,  // Automatically open the browser when the server starts
    // Uncomment the following lines if you have issues with WebSocket connections
    // host: 'localhost', // Specify the host
    // strictPort: true, // Fail if the port is already in use
    // cors: true, // Enable CORS if needed for API requests
    // hmr: { // Configure Hot Module Replacement settings
    //   protocol: 'ws',
    //   host: 'localhost',
    // },
  },
  build: {
    outDir: 'dist', // Specify the output directory for build
    sourcemap: true, // Enable source maps for easier debugging
  },
});
