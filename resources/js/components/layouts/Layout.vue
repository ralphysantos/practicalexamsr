<template>
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Home</router-link>     

            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link">{{ user.name }}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="logout">Logout</a>
                </li>
            </ul>
        </div>


    </nav>


    <main>
        
        <router-view/>
    </main>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import router from '@/router'

export default{
    
    data(){
        return{
            authenticated:this.$store.state.auth.authenticated,
            user: this.$store.state.auth.user
        }
    },
    methods:{
        ...mapActions({
            signOut:'auth/logout',
            clearList:'user/clear'
        }),
        async logout(){

            const config = {
                headers: { Authorization: `Bearer ${this.$store.state.auth.access_token}` }
            };
            
            await axios.post('/api/logout',[],config).then(()=>{
                this.signOut();
                this.clearList();
                router.push({name:'login'});
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

}
</script>