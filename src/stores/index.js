import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

export * from './modules/user'
export * from './modules/search'
// export * from './modules/job'
// export * from './modules/state'
// export * from './modules/admin'
