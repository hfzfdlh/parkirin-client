<script>
import Swal from 'sweetalert2/dist/sweetalert2';

export default{
    props:['user'],
    data(){
        return{
            currentRole:''
        }
    },
    methods:{
        doLogout(){
            localStorage.clear()
            Swal.fire({
                toast: true,
                showConfirmButton: false,
                // timer: 3000,
                // timerProgressBar: true,
            
                icon: 'success',
                title: 'Logout Berhasil'
        });
            this.$router.push('/login')
        }
    },
    created(){
        this.currentRole = localStorage.role
   
    }
    //{{user_data.UserProfile.money}}
    //{{user_data.UserProfile.name}}
    //
}
</script>
<template>
    <nav v-if="currentRole === 'User'" class="navbar navbar-expand-lg  shadow sticky-top p-2">
        <div class="container-fluid">
        <router-link to="/">
        <img id="top-logo" src="../assets/parkirin_logo.png" />
        </router-link>
        
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li class="nav-item">
                <router-link to="">
                <a class="nav-link " aria-current="page" >Message</a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/history-user">
                <a  class="nav-link" aria-current="page"  >History</a>
                </router-link>
            </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link to="/add-saldo">
               <a class="nav-link">Saldo: {{user.money}}</a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/edit-user">
                <a class="nav-link">{{user.name}}</a>
                </router-link>
            </li>
            <li class="nav-item">
                <a @click.prevent="doLogout" class="nav-link">Logout</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav{
  background-color:#0077b6;
  color:white

}
a {
    color:white;
    font-size: 1.4rem;
    text-decoration: none;
}

#top-logo{
  height : 80px;
  width : 300px;
  object-fit:cover;
}
</style>
