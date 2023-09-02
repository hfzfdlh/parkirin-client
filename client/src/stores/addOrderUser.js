import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export const useOrderUserStore = defineStore('orderUser', {
  state: () => ({
    BASE_URL:'https://39-tes.replikaadidas.shop'
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {


    async handleOrderUser(money,baseMoney, RenterId) {
      try {
        if(baseMoney < money) throw{name:"notEnough"}
        const { data } = await axios({
          method:'post',
          url:this.BASE_URL +'/users/generate-midtrans-token',
          data:{money},
          headers:{
            access_token:localStorage.access_token
          }
        })

        const cb = this.redSaldo
        window.snap.pay(data.token, {
          onSuccess: async function(result){
            /* You may add your own implementation here */
           cb(money,RenterId)
          },
        })


      } catch (err) {
        if(err.name==='notEnough') {
          Swal.fire({
            toast: true,
            showConfirmButton: false,
            // timer: 3000,
            // timerProgressBar: true,
      
            icon: 'error',
            title: 'Uang Tidak Mencukupi',
            text: `Silahkan isi ulang saldo terlebih dahulu`
          });
        }else{
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'error',
          title: 'Payment Failed',
          text: `${err.response.data.message}`
        });
      }
      }
      
    },

    async redSaldo(money,RenterId){
        try {
          const { data } = await axios({
            method:'patch',
            url: this.BASE_URL + '/users/red-money',
            data:{money},
            headers:{
              access_token:localStorage.access_token
            }
         })
         this.makeTransaction(money,RenterId)
        } catch (err) {
          Swal.fire({
            toast: true,
            showConfirmButton: false,
            // timer: 3000,
            // timerProgressBar: true,
      
            icon: 'error',
            title: 'Payment Failed',
            text: `${err.response.data.message}`
          });
        }
    },

    async makeTransaction(money,RenterId){
        try {
            const{ data } = await axios({
                method:'post',
                url:this.BASE_URL+'/users/order-park/'+RenterId,
                data:{money},
                headers:{
                    access_token:localStorage.access_token
                },
            })
            Swal.fire({
              toast: true,
              showConfirmButton: false,
              // timer: 3000,
              // timerProgressBar: true,
        
              icon: 'success',
              title: 'Pemesanan Sukses',
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
            title: 'Payment Failed',
            text: `${err.response.data.message}`
          });
        }
    }
  },
})