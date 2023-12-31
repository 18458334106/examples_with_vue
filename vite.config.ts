import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import requireTransform from 'vite-plugin-require-transform';
export default defineConfig({
  plugins: [
    vue(),
    requireTransform({
      fileRegex: /.js$|.vue$|.png$|.ts$|.jpg$/
    })
  ],
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
        target:'https://flask-py.vercel.app',
        // target:'http://127.0.0.1:5001',
        changeOrigin:true,
        rewrite(path) {
          return path.replace(/^\/api/, '/')
        }
      }
    }
  }
})
