import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

// 路由懒加载
const Demo = lazy(() => import('./page/demo').then((module) => ({ default: module.Demo })))

console.log('import.meta.env.VITE_APP_ENV', import.meta.env.VITE_APP_ENV)

function App() {
  return (
    <Suspense fallback={<div style={{}}></div>}>
      <Routes>
        <Route path="/" element={<Demo />} />
      </Routes>
    </Suspense>
  )
}

export default App
