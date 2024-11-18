import axios from 'axios'
import router from '@/router'
export default {
    namespaced: true,
    state:{
        authenticated:false,
        access_token:'',
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        },
        access_token(state){
            return access_token
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        SET_ACCESSTOKEN(state,value){
            state.access_token = value
        }
    },
    actions:{
        login({commit},payload){  
            const config = {
                headers: { Authorization: `Bearer ${payload.access_token}` }
            };
            
            return axios.get('/api/user',config).then(({data})=>{
                commit('SET_USER',data.user)
                commit('SET_AUTHENTICATED',true)
                commit('SET_ACCESSTOKEN',payload.access_token);
                router.push({name:'home'})
            }).catch(({response:{data}})=>{
                commit('SET_USER',{})
                commit('SET_AUTHENTICATED',false)
                commit('SET_ACCESSTOKEN','');
            })
        },
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false);
            commit('SET_ACCESSTOKEN','');
        }
    }
}