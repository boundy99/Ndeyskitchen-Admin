import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      port: env.VITE_PORT,
      proxy: {
        '/api': {
          target: env.VITE_PROXY,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
