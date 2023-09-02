import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    BASE_URL:'https://39-tes.replikaadidas.shop'
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async handleLoginUser(input) {
      console.log('masuk sini')
      try {
        const { data } = await axios({
          method:'post',
          url:this.BASE_URL +'/users/login',
          data:input
        })
        localStorage.access_token = data.access_token
        localStorage.role = 'User'
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'success',
          title: 'Selamat Datang'
        });
        this.$router.push('/')
      } catch (err) {
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'error',
          title: 'Permission denied',
          text: `${err.response.data.message}`
        });
      }
      
    },
    async handleLoginGoogle(response){
      try {
        const {data} = await axios({
          method:'post',
          url:`${this.BASE_URL}/users/google-login`,
          headers:{
            google_token : response.credential
          }
        })
        localStorage.access_token = data.access_token
        localStorage.role = 'User'
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'success',
          title: 'Selamat Datang'
        });
        this.$router.push('/')
      
      } catch (err) {
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'error',
          title: 'Permission denied',
          text: `${err.response.data.message}`
        });
      }
    }
  },
})