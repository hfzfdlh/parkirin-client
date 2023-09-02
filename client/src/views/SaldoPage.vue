<script >

import Navbar from '../components/Navbar.vue'
import {mapState, mapActions} from 'pinia'
import {useHomeUserStore} from '../stores/homeUser'
import {useSaldoUserStore} from '../stores/saldoUser'

export default{
    components:{
        Navbar
    },data(){
        return{
            money:''
        }
    },
    methods:{
        ...mapActions(useHomeUserStore,['fetchUser']),
        ...mapActions(useSaldoUserStore,['handleSaldoUser'])
    },
    computed:{
        ...mapState(useHomeUserStore,['user_data'])
    },
    created(){
        this.fetchUser()
    }
}
</script>

<template>
    <Navbar :user="user_data.UserProfile"/>
    <div class="" style="margin:10% 30%;">
        <form @submit.prevent="handleSaldoUser(money)">
            <div class="form-group">
                <label >Nominal</label>
                <input v-model="money" type="number" class="form-control" id="exampleFormControlFile1">
            </div>
            <button type="submit" class="btn btn-primary my-2 w-100">Bayar</button>
        </form>
    </div>


</template>