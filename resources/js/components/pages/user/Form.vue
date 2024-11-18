<template>
    <div class="m-auto w-25 mt-5">
        <form action="javascript:void(0)" method="post">
            <div class="form-outline mb-4">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="user.name"/>
                
            </div>
            <div class="form-outline mb-4">
                <label class="form-label">email</label>
                <input type="email" class="form-control" v-model="user.email"/>
                
            </div>
            <div class="form-outline mb-4">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="user.password"/>
                
            </div>
            <button  type="submit" class="btn btn-primary btn-block mb-4 mr-1" @click="back">Back</button>
            <button  type="submit" class="btn btn-primary btn-block mb-4" @click="this.createForm ? createUser() : updateChanges()">{{ this.createForm ? 'Create User' : 'Update Changes' }}</button>
        </form>
    </div>
</template>
<script>
import router from '@/router'
import { mapActions } from 'vuex';
    export default{
        data(){
            return{
                user:{
                    id:'',
                    name:'',
                    email:'',
                    password:''
                },
                createForm:false,
            }
        },
        mounted(){
            const id = this.$route.params.id;
            this.getUser(id);           

            this.createForm = id ? false : true;

        },
        methods:{
            ...mapActions({
                update:'user/update',
                create:'user/create'
            }),
            getUser(id){
                const user = this.$store.state.user.list.filter((item) => {return item.id == id})[0];
                this.user = user ? user : {};
            },
            updateChanges(){
                console.log(this.user);
                this.update(this.user).then(
                    (data) =>{
                        router.push({name:"home"});
                    });
            },
            createUser(){
                this.create(this.user).then(
                    (data) =>{
                        router.push({name:"home"});
                    });
            },
            back(){
                router.push({name:"home"});
            }
        }
    }
</script>