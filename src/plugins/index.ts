console.log('plugin init')

// if (import.meta.env.VITE_APP_ENV === 'uat') {
  console.log('eruda init')
  import('eruda').then((eruda) => eruda.default.init())
// }
