<template>
    <div style="border: 2px solid;" class="m-auto w-25 p-4 mt-4">
        <form action="javascript:void(0)" method="post">
            <div class="form-outline mb-4">
                <label class="form-label">email</label>
                <input type="email" class="form-control" v-model="auth.email"/>
                
            </div>
            <div class="form-outline mb-4">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="auth.password"/>
                
            </div>
            <button  type="submit" class="btn btn-primary btn-block mb-4"  @click="login">Sign in</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default{
    name:"login",
    data(){
        return{
            auth:{
                email:"",
                password:""
            },
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login',
            list:'user/list'
        }),
        async login(){
            this.processing = true;
            await axios.post('/api/login',this.auth).then(({data})=>{
                this.signIn(data);
                this.list(data)
            }).catch((error)=>{
                console.log('error',error);
            });
        }
    }
}

</script>