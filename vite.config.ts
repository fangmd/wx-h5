import path from "path"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { analyzer } from 'vite-bundle-analyzer'

const CDN_PATH = 'https://fawivi-static-public-cdn.faw.cn/file-service/web_static/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log('mode', mode)
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('process.env.VITE_APP_ENV', process.env.VITE_APP_ENV)
  console.log('process.env.ANALYSIS', process.env.ANALYSIS)

  return {
    base: '',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      assetsDir: 'bjfawh5/chatg/static',
      rollupOptions: {
        output: {
          // 自定义文件名规则
          entryFileNames: `bjfawh5/chatg/static/${mode}-[name]-[hash].js`,
          chunkFileNames: `bjfawh5/chatg/static/${mode}-[name]-[hash].js`,
          assetFileNames: (assetInfo) => {
            return `bjfawh5/chatg/static/${mode}-[name]-[hash][extname]`
          },
          manualChunks(id) {
            // console.log('id', id)

            if (id.includes('node_modules')) {
              // 精确匹配核心 React 库，排除其他包含 'react' 的库（如 @ai-sdk/react）
              // 只匹配特定的核心库包名
              const isReactCore =
                /node_modules[\/\\]react[\/\\]/.test(id) ||
                /node_modules[\/\\]react-dom[\/\\]/.test(id) ||
                /node_modules[\/\\]react-router[\/\\]/.test(id) ||
                /node_modules[\/\\]react-router-dom[\/\\]/.test(id)

              if (isReactCore) {
                return 'react-vendor'
              }
            }
            return null
          },
        },
      },
    },
    experimental: {
      renderBuiltUrl(filename: string) {
        // console.log('filename', filename)

        // if (
        //   filename.endsWith('.js') ||
        //   filename.endsWith('.css') ||
        //   filename.endsWith('.jpg') ||
        //   filename.endsWith('.gif')
        // ) {
        //   const name = filename.replace('assets/images/', '')
        //   return `${CDN_PATH}${name}`
        // }

        // return filename
        return `${CDN_PATH}${filename}`
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      nodePolyfills({ include: ['stream', 'util'] }),
      ...(process.env.ANALYSIS === 'true'
        ? [
            analyzer({
              analyzerMode: 'static',
              openAnalyzer: false,
            }),
          ]
        : []),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 可根据需要添加全局 less 变量或 mixin 文件
          // additionalData: `@import "src/assets/styles/variables.less";`
        },
      },
    },
  }
})
