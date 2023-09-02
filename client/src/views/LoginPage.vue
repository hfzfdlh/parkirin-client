<script>
import {mapActions} from 'pinia'
import {useLoginUserStore} from '../stores/loginUser'
import {useLoginRenterStore} from '../stores/loginRenter'

export default{
    data(){
        return{
            formLogin:{
                email:'',
                password:''
            }
        }
    },
    methods:{
    ...mapActions(useLoginUserStore,['handleLoginUser','handleLoginGoogle']),
    ...mapActions(useLoginRenterStore,['handleLoginRenter']),
    callback(response){
            this.handleLoginGoogle(response)
        }
    }
}
</script>
<template>

  <div v-if="$route.name ==='loginUser'" class="container-fluid h-100 p-0">
        <div class="row align-items-center" style="background:linear-gradient(90deg, rgba(41,34,162,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)">
            <div class="col-md-6" id="side-cover" >
                <img src="../assets/login_bg.jpg"  />
            </div>
            <div class="col-12 col-md-6" >
                <div id="handle-login" class="p-5 mx-5 text-white">
                    <h1>Siap Cari Parkiran?</h1>
                    <h5>Belum punya akun? <router-link to="/register"><a> Daftar</a></router-link></h5>
                    <h5>Mau sewa lahan parkir?<router-link to="/login-renter"> <a> Jadi Penyewa</a></router-link></h5>
                    <form @submit.prevent="handleLoginUser(formLogin)">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Alamat Email</label>
                            <input v-model="formLogin.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input v-model="formLogin.password" type="password" class="form-control" id="exampleInputPassword1" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Masuk</button>
                    </form> 
                    <GoogleLogin :callback="callback" prompt  class="my-2 mx-auto" />
                </div>
                
            </div>
        </div>
    </div>
    <div v-else class="container-fluid h-100 p-0">
        <div class="row align-items-center" style="background:linear-gradient(90deg, rgba(233,175,102,1) 0%, rgba(251,133,0,1) 35%, rgba(238,55,14,1) 100%)" >
            <div class="col-md-6" id="side-cover" >
                <img src="../assets/login_bg.jpg"  />
            </div>
            <div class="col-12 col-md-6" >
                <div id="handle-login" class="p-5 mx-5 text-white">
                    <h1>Siap Buka Lahan Parkir?</h1>
                    <h5>Belum punya akun? <router-link to="/register-renter"><a> Daftar</a></router-link></h5>
                    <h5>Mau cari lahan parkir? <router-link to="/login"><a> Jadi Pengguna</a></router-link></h5>
                    <form @submit.prevent="handleLoginRenter(formLogin)"> 
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Alamat Email</label>
                            <input v-model="formLogin.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input v-model="formLogin.password" type="password" class="form-control" id="exampleInputPassword1" required>
                        </div>
                        <button type="submit" class="btn btn-warning w-100">Masuk</button>
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