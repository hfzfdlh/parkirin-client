import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export const useEditUserStore = defineStore('editUser', {
  state: () => ({
    BASE_URL:'https://39-tes.replikaadidas.shop',
    name:'',
    address:'',
    photoUrl:'',
    phoneNumber:''
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {

    async fetchEditUser(){
        try {
          const { data } = await axios({
            method:'get',
            url: this.BASE_URL + '/users/user',
            headers:{
              access_token:localStorage.access_token
            }
         })
         this.name = data.UserProfile.name
         this.address = data.UserProfile.address
         this.phoneNumber = data.UserProfile.phoneNumber
         this.photoUrl = this.BASE_URL + '/static/' + data.UserProfile.photoUrl

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

    async editUser(input) {
      try {
        const { data } = await axios({
          method:'put',
          url:this.BASE_URL +'/users/edit-user',
          data:input,
          headers:{
            'Content-Type': 'multipart/form-data',
            access_token:localStorage.access_token
          }
        })
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'success',
          title: 'Berhasil',
          text: `Data telah dirubah`
        });
        this.$router.push('/')

      } catch (err) {
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          // timer: 3000,
          // timerProgressBar: true,
    
          icon: 'error',
          title: 'Editing gagal',
          text: `${err.response.data.message}`
        });
      }
      
    },
  },
})