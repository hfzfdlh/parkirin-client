<script>
import {mapActions} from 'pinia'
import {useOrderUserStore} from '../stores/addOrderUser'
export default {
    props:['el','user'],
    methods:{
        ...mapActions(useOrderUserStore,['handleOrderUser']),
        sendOrder(){
            this.handleOrderUser(this.el.price,this.user.money,this.el.RenterId)
        }
    }
}
</script>
<template>
     <div class="card col-4 mx-2 my-3" style="width: 18rem;">
                <img class="card-img-top" :src="el.photoUrl" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{el.name}}</h5>
                    <p class="card-text">Pemilik: {{el.Renter.RenterProfile.name}}</p>
                    <p class="card-text">Harga: {{el.price}}</p>
                    <a @click.prevent="sendOrder" class="btn btn-primary w-100">Pesan</a>
                </div>
            </div>
</template>
<style scoped>
img{
  height : 200px;
  width : 200px;
  object-fit:cover;
}
</style>