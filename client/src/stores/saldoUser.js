import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export const useSaldoUserStore = defineStore('saldoUser', {
  state: () => ({
    BASE_URL:'https://39-tes.replikaadidas.shop'
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {

    async addSaldo(money){
        try {
          const { data } = await axios({
            method:'patch',
            url: this.BASE_URL + '/users/add-money',
            data:{money},
            headers:{
              access_token:localStorage.access_token
            }
         })
         Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'success',
          title: 'Pembayaran sukses',
          text: `${data.message}`
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

    async handleSaldoUser(money) {
      try {
        const { data } = await axios({
          method:'post',
          url:this.BASE_URL +'/users/generate-midtrans-token',
          data:{money},
          headers:{
            access_token:localStorage.access_token
          }
        })

        const cb = this.addSaldo
        window.snap.pay(data.token, {
          onSuccess: async function(result){
            /* You may add your own implementation here */
           cb(money)
          },
        })


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