<script>
import Navbar from '../components/Navbar.vue'
import {mapActions,mapState} from 'pinia'
import {useHomeUserStore} from '../stores/homeUser'
import Bar from '../components/Bar.vue'

export default {
    components:{
        Navbar,
        Bar
    },
    methods:{
        ...mapActions(useHomeUserStore,['fetchUser','fetchAllTransaction']),
    },
    computed:{
        ...mapState(useHomeUserStore,['user_data','hist_list']),
    },
    created(){
        this.fetchUser(),
        this.fetchAllTransaction()

    }
}
</script>
<template>
    <Navbar :user="user_data.UserProfile"/>

    <div class="container-fluid w-100">
         <div v-if="hist_list.length < 1" class="row mx-5 my-2 align-items-center text-center">
            <h2> Tidak Riwayat Pemesanan</h2>
        </div>
        <Bar v-for="el in hist_list" :key="el.id" :el="el"/>
        
    </div>
</template>
