import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { analyzer } from 'vite-bundle-analyzer'

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
      assetsDir: 'static',
      rollupOptions: {
        output: {
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
    experimental: {},
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
