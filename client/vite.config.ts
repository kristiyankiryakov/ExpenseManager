import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {

    host: 'localhost', // Set the host to 'localhost'
    port: 3000, // Set the port to your preferred value
    open: false
  }
})
