<template>

    <div class="m-auto w-75 mt-5">
        <button class="btn btn-primary" @click="gotoCreate">Create User</button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>time created</th>
                    <th>last updated</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in user_list" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ formattedDate(user.created_at) }}</td>
                    <td>{{ formattedDate(user.updated_at) }}</td>
                    <td><button class="btn btn-primary" @click="gotoUpdate(user.id)">Update</button> <button class="btn btn-danger" @click="openDeleteModal(user)">Delete</button></td>
                </tr>
                <tr>
                    
                </tr>
            </tbody>
        </table>
    </div>

<div class="modal" tabindex="-1" id="deleteModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this user</p>
        <p> {{ this.selectedUser.name }} </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteUser()">Delete</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import dayjs from 'dayjs';
import { Modal } from "bootstrap";
import { mapActions } from 'vuex';
import router from '@/router';

    export default{
        name: 'homes',
        data(){
            return{
                user_list: this.$store.state.user.list,
                deleteModal:null,
                selectedUser:''
            }
        },
        mounted(){
            this.list();
        },
        methods:{
            ...mapActions({
                list:'user/list',
                delete:'user/delete'
            }),
            formattedDate(date){
                const d = dayjs(date);

                return d.format('MMM D, YYYY');
            },
            openDeleteModal(user){
                this.deleteModal = new Modal(document.getElementById("deleteModal"),{ keyboard: false });
                this.deleteModal.show();
                this.selectedUser = user;
            },
            deleteUser(){    
                this.delete(this.selectedUser).then(()=>{
                    this.deleteModal.hide();
                    const i = this.user_list.map(item => item.id).indexOf(this.selectedUser.id);
                    this.user_list.splice(i,1);
                    this.list();      
                });
            },
            gotoUpdate(id){
                router.push({ path: `/users/update/${id}` });
            },
            gotoCreate(){
                router.push({ path: `/users/create` });
            },
            

        }
    }


</script>