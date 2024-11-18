import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import user from '@/store/user'
const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        user
    }
})
export default store