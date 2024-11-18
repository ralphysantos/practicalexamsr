import axios from 'axios'
import router from '@/router'
export default {
    namespaced: true,
    state:{
        list:{}
    },
    getters:{
        list(state){
            return state.list
        }
    },
    mutations:{
        SET_USERLIST (state, value) {
            state.list = value
        }
    },
    actions:{
        list({commit},payload){  
            const access_token = this.state.auth.access_token ? this.state.auth.access_token : payload.access_token;

            const config = {
                headers: { Authorization: `Bearer ${access_token}` }
            };
            return axios.get('/api/users/list',config).then(({data})=>{
                commit('SET_USERLIST',data.list)
            }).catch(({response:{data}})=>{
                commit('SET_USERLIST',{})
            })
        },
        delete({commit},payload){
            const config = {
                headers: { Authorization: `Bearer ${this.state.auth.access_token}` }
            };

            return axios.post('/api/users/delete',{"user_id": payload.id},config);
        },
        clear({commit}){
            commit('SET_USERLIST',{});
        },
        update({commit},payload){
            const config = {
                headers: { Authorization: `Bearer ${this.state.auth.access_token}` }
            };

            return axios.post('/api/users/update',payload,config);
        },
        create({commit},payload){
            const config = {
                headers: { Authorization: `Bearer ${this.state.auth.access_token}` }
            };

            return axios.post('/api/users/create',payload,config);
        }
    }
}