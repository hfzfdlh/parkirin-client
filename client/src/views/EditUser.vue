<script>
import Navbar from '../components/Navbar.vue'
import {mapActions,mapState,mapWritableState} from 'pinia'
import {useHomeUserStore} from '../stores/homeUser'
import {useEditUserStore} from '../stores/editUser'
export default {
    components:{
        Navbar,
    },data(){
    },
    methods:{
        ...mapActions(useHomeUserStore,['fetchUser']),
        ...mapActions(useEditUserStore,['fetchEditUser','editUser']),
        onFileChange(event){
            this.photoUrl = event.target.files[0]
        },
        submitUser(){
            const fd = new FormData()
            fd.append('photoUrl',this.photoUrl)
            fd.append('name',this.name)
            fd.append('phoneNumber',this.phoneNumber)
            fd.append('address',this.address)
            this.editUser(fd)
        },
    },
    computed:{
        ...mapState(useHomeUserStore,['user_data']),
        ...mapWritableState(useEditUserStore,['name','address','phoneNumber','photoUrl'])
    },
    created(){
        this.fetchUser(),
        this.fetchEditUser()

    }
}
</script>
<template>
     <Navbar :user="user_data.UserProfile"/>

     <div class="mx-5 my-2 align-items-center " style="margin:0 50%">
        <img :src="photoUrl" />
        <form @submit.prevent="submitUser" enctype="multipart/form-data">  
                <div class="mb-3">
                    <label  class="form-label">Nama</label>
                    <input v-model="name" type="text" class="form-control" placeholder="cth: Adam" required>
                </div>
                <div class="mb-3">
                    <label  class="form-label">Foto Profil</label>
                    <input v-on:change="onFileChange" type="file" class="form-control" placeholder="cth: Adam" required>
                </div>
                <div class="mb-3">
                    <label  class="form-label">Nomor Telepon</label>
                    <input v-model="phoneNumber" type="text" class="form-control" placeholder="+62xxxxxxxxx" required>
                </div>
                <div class="mb-3">
                    <label  class="form-label">Alamat</label>
                    <textarea v-model="address" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100">Ubah</button>
            </form> 
    </div>
</template>
<style scoped>
img{
  height : 500px;
  width : 500px;
  object-fit:cover;
}
</style>