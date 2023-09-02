import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';


export const useHomeUserStore = defineStore('homeUser', {
  state: () => ({
    BASE_URL:'https://39-tes.replikaadidas.shop',
    user_data:'',
    parking_spot:'',
    trans_list:'',
    hist_list:''
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchUser() {
      try {
        const { data } = await axios({
          method:'get',
          url:this.BASE_URL +'/users/user',
          headers:{
            access_token:localStorage.access_token
          }
        })
        this.user_data = data


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
    async fetchParking(input) {
      try {
        console.log('input lho',input.lat)
        const { data } = await axios({
          method:'post',
          url:this.BASE_URL+'/users/parking',
          data:{lat:input.lat,lng:input.lng},
          headers:{
            access_token:localStorage.access_token
          }
        })
        this.parking_spot = data
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
    async fetchTransaction(){
      try {
        const { data } = await axios({
          method:'get',
          url:this.BASE_URL + '/users/active-transactions',
          headers:{
            access_token:localStorage.access_token
          }
        })

        this.trans_list = data
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

    async fetchAllTransaction(){
      try {
        const { data } = await axios({
          method:'get',
          url:this.BASE_URL + '/users/transactions',
          headers:{
            access_token:localStorage.access_token
          }
        })

        this.hist_list = data
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