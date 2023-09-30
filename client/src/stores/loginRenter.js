import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'

export const useLoginRenterStore = defineStore('loginRenter', {
  state: () => ({
    BASE_URL:'http://localhost:3000'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async handleLoginRenter(input) {
      try {
        const { data } = await axios({
          method:'post',
          url:this.BASE_URL +'/renters/login',
          data:input
        })
        localStorage.access_token = data.access_token
        localStorage.role = 'Renter'
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
      
    },
  },
})