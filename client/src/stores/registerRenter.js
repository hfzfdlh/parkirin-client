import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export const useRegisterRenterStore = defineStore('registerRenter', {
  state: () => ({
    BASE_URL:'https://39-tes.replikaadidas.shop'
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async handleRegisterRenter(input) {
      try {
        const { data } = await axios({
          method:'post',
          url:this.BASE_URL +'/renters/register',
          data:input
        })
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'success',
          title: 'Berhasil Mendaftar'
        });
        this.$router.push('/login-renter')
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
  },
})