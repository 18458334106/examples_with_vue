import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base:'./',
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  },
  server:{
    port:5173,
    host:'0.0.0.0',
    open:true,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:5000',
        changeOrigin:true,
        rewrite(path) {
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
