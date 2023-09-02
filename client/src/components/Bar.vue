<script>
export default {
    props:['el']
}
</script>
<template>
    <div  class="mx-5 my-3 p-2 d-flex justify-content-between align-items-center" id="active-box">
        <div class="my-0">
            <h2> {{el.Renter.ParkingSpaces[0].name}}</h2>
            <span> Terbayar: {{el.paid}}</span>
        </div>
        <div>Status: {{el.status}}</div>
    </div>
</template>

<style scoped>
#active-box{
    border: 2px solid rgba(168, 168, 168, 0.8);
    border-radius:10px;
    background: rgba(212, 212, 212, 0.1);
    margin:0 auto;

}
</style>