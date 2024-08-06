import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import browserslistToEsbuild from 'browserslist-to-esbuild'

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    // depending on your application, base can also be "/"

    base: '',
    plugins: [react()],
    build: {
      target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
    },
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 3005,
      host: true,
    },
  })
}
