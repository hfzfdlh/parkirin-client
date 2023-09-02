<script>
import {mapActions} from 'pinia'
import {useRegisterUserStore} from '../stores/registerUser'
import {useRegisterRenterStore} from '../stores/registerRenter'
// import {useLoginRenterStore} from '../stores/loginRenter'
export default{
    data(){
        return{
            email:'',
            password:'',
            name:'',
            phoneNumber:'',
            address:'',
            photoUrl:''
        
        }
    },
    methods:{
        ...mapActions(useRegisterUserStore,['handleRegisterUser']),
        ...mapActions(useRegisterRenterStore,['handleRegisterRenter']),
        onFileChange(event){
            this.photoUrl = event.target.files[0]
        },
        submitUser(){
            const fd = new FormData()
            fd.append('photoUrl',this.photoUrl)
            fd.append('email',this.email)
            fd.append('password',this.password)
            fd.append('name',this.name)
            fd.append('phoneNumber',this.phoneNumber)
            fd.append('address',this.address)
            console.log(fd)
            this.handleRegisterUser(fd)
        },
        submitRenter(){
            const fd = new FormData()
            fd.append('photoUrl',this.photoUrl)
            fd.append('email',this.email)
            fd.append('password',this.password)
            fd.append('name',this.name)
            fd.append('phoneNumber',this.phoneNumber)
            fd.append('address',this.address)

            this.handleRegisterRenter(fd)
        }
    }
}
</script>
<template>
  <div v-if="$route.name ==='registerUser'" class="container-fluid h-100 p-0">
        <div class="row align-items-center" style="background:linear-gradient(90deg, rgba(41,34,162,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)">
            <div class="d-none d-md-block col-md-6" id="side-cover" >
                <img src="../assets/register_bg.jpg"  />

            </div>
            <div class="col-sm-12 col-md-6" >
                <div id="handle-login" class="p-5 mx-5 text-white">
                    <h1>Daftar Pengguna Baru</h1>
                    <h5>Sudah Punya akun? <router-link to="/login"><a> Masuk</a></router-link></h5>
                    <form @submit.prevent="submitUser" enctype="multipart/form-data">
                        <div class="mb-3 ">
                            <label class="form-label">Email</label>
                            <input v-model="email" type="email" class="form-control" id="inputEmail4" placeholder="Email">
                        </div>
                        <div class="mb-3 ">
                            <label class="form-label">Password</label>
                            <input v-model="password" type="password" class="form-control" id="inputPassword4" placeholder="Password">
                        </div>
                        
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
                        <button type="submit" class="btn btn-primary w-100">Daftar</button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    <div v-else class="container-fluid h-100 p-0">
        <div class="row align-items-center"  style="background:linear-gradient(90deg, rgba(233,175,102,1) 0%, rgba(251,133,0,1) 35%, rgba(238,55,14,1) 100%)">
            <div class="d-none d-md-block col-md-6" id="side-cover" >
                <img src="../assets/register_bg.jpg"  />

            </div>
            <div class="col-sm-12 col-md-6" >
                <div id="handle-login" class="p-5 mx-5 text-white">
                    <h1>Daftar Penyewa Baru</h1>
                    <h5>Sudah Punya akun? <router-link to="/login-renter"><a> Masuk</a></router-link></h5>
                    <form @submit.prevent="handleRegisterRenter" enctype="multipart/form-data">
                        <div class="mb-3 ">
                            <label class="form-label">Email</label>
                            <input v-model="email" type="email" class="form-control" id="inputEmail4" placeholder="Email">
                        </div>
                        <div class="mb-3 ">
                            <label class="form-label">Password</label>
                            <input v-model="password" type="password" class="form-control" id="inputPassword4" placeholder="Password">
                        </div>
                        
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
                        <button type="submit" class="btn btn-warning w-100">Daftar</button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body{
    margin:0;
    height:100vh;

}
img{
    object-fit: cover;
    width:100%;
    height:100vh;
    object-position: left; 
}

a{
    text-decoration:none;
    color:white
}
a:hover{
    color:rgb(187, 187, 187)
}


#handle-login{
    margin-left: auto;
    margin-right: auto;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    background-color:rgba(255, 255, 255, 0.1);

    
}
</style>