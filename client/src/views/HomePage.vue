<script>
import { Loader } from "@googlemaps/js-api-loader"
import {mapActions,mapState,mapWritableState} from 'pinia'
import {useHomeUserStore} from '../stores/homeUser'
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
export default {
    components:{
        Navbar,
        Card
    },
    data(){
        return{
            loader: new Loader({
                apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
                libraries:['places']
            }),
             coords: {
                lat: -6.2440488,
                lng: 106.8862587,
            }, 
     
        }
    },
    methods:{
        ...mapActions(useHomeUserStore,['fetchUser','fetchParking','fetchTransaction']),
        fetchCurrentLocation() {
        navigator.geolocation.getCurrentPosition( //geolocation's browser
            (location) => { //success callback
            this.coords = {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
            console.log(this.coords)
            },
            () => { //error callback
            this.handleGeoLocationError()
                }
            );
        },
        async loadGMaps() {
            
            await this.loader.load() // load gmaps API
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const option = {
                center: this.coords,
                zoom: 11,
                mapId:"dc4b28c367ee75f8"
            }

            const map = new google.maps.Map(this.$refs.mapCanvas, option); // render maps to mapCanvas div
            const infoWindow = new google.maps.InfoWindow() // create info window element in gmaps

            const draggableMarker = new AdvancedMarkerElement({
                map,
                position: this.coords,
                gmpDraggable: true,
                title: "This marker is draggable.",
            });

            draggableMarker.addListener("dragend", (event) => {
                const position = draggableMarker.position;
                this.coords.lat = position.h
                this.coords.lng = position.j
                this.fetchParking(this.coords)
                infoWindow.close();
                infoWindow.setContent(
                `Pin dropped at: ${position.lat()}, ${position.lng()}`,
                );
                infoWindow.open(draggableMarker.map, draggableMarker);
            });


            // -- searchInput section --
            const searchBox = new google.maps.places.SearchBox(this.$refs.mapInputSearch)
            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });
            let markers = [];

            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                draggableMarker.setMap(null)
                if (places.length == 0) {
                return;
                }

                // Clear out the old markers.
                markers.forEach((marker) => {
                marker.setMap(null);
                });
                markers = [];

                // For each place, get name and location.
                const bounds = new google.maps.LatLngBounds();

                places.forEach((place, index) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                console.log('place',place.geometry.location.lat())
                this.coords = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
                this.fetchParking(this.coords)
                // Create a marker for each place.
                // window.setTimeout(() => {
                markers.push(
                    new AdvancedMarkerElement({
                    map,
                    title: place.name,
                    position: place.geometry.location,
                    gmpDraggable: true,
                    })
                );
                // }, index * 100);

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
                });
                console.log(markers);

                markers.forEach((marker) => {
                // marker.addListener("click", () => {
                //     console.log("test");
                //     infoWindow.close();
                //     infoWindow.setContent(marker.getTitle());
                //     infoWindow.open(marker.getMap(), marker);

                //     });
                marker.addListener("dragend", (event) => {
                    const position = marker.position;
                    console.log('marker',event)
                    this.coords.lat = event.latLng.lat()
                    this.coords.lng = event.latLng.lng()
                    this.fetchParking(this.coords)
                    infoWindow.close();
                    // infoWindow.setContent(
                    // `Pin dropped at: ${event.latLng.lat()}, ${event.latLng.lng()}`,
                    // );
                    infoWindow.open(marker.map, marker);
                })
                })

                map.fitBounds(bounds);
                map.setCenter(places[0].geometry.location)

                
            });
            // -- end of search input section --

                return { map, infoWindow } // return map and infoWindow element to future use
            },

        async loadCurrentLocation() {
            this.fetchCurrentLocation()
            const { map, infoWindow,draggableMarker } = await this.loadGMaps()
            infoWindow.setPosition(this.coords)
            infoWindow.setContent(`<strong>You are here</strong><br>LatLng: (${this.coords.lat}, ${this.coords.lng})`)
            infoWindow.open(map)
            map.setCenter(this.coords)
            map.setZoom(17)

            draggableMarker.addListener("dragend", (event) => {
                const position = draggableMarker.position;
                this.coords.lat = position.h
                this.coords.lng = position.j
                this.fetchParking(this.coords)
                infoWindow.close();
                infoWindow.setContent(
                `Pin dropped at: ${position.lat()}, ${position.lng()}`,
                );
                infoWindow.open(draggableMarker.map, draggableMarker);
            });
            },

        async handleGeoLocationError() {
            const { map, infoWindow } = await this.loadGMaps()
            infoWindow.setPosition(this.coords)
            infoWindow.setContent("Geo Location Service Error. It's either blocked by your browser or your browser doesn't support it")
            infoWindow.open(map)
            map.setCenter(this.coords)
        },
    },
    computed:{
        ...mapState(useHomeUserStore,['user_data','parking_spot','trans_list']),
        ...mapWritableState(useHomeUserStore,[])
    },
    created(){
         this.fetchCurrentLocation(),
         this.fetchUser(),
         this.fetchParking(),
         this.fetchTransaction()

    },
    mounted() {
        this.loadGMaps()
  },
}
</script>
<template>
<Navbar :user="user_data.UserProfile"/>
    <div class="container-fluid w-100 ">
        <div v-if="trans_list.length > 0" class="m-5 p-2 d-flex justify-content-between" id="active-box">
            <div class="my-0">Kamu punya pesanan aktif</div>
            <div>
                <router-link to="/history-user">
                <a class="btn btn-danger">Cek Disini</a>
                </router-link>
            </div>
        </div>
        
        </div><div ref="mapCanvas" id="mapCanvas" class="bg-white shadow border rounded-xl w-2/3 h-2/3 mx-5 my-2 object-cover" style="height:50vh">
         <div class="row mx-5 my-2">
            <input ref="mapInputSearch" class="p-2 my-2 border shadow bg-white " type="text" placeholder="Cari Lokasi">
            <button ref="mapLocationButton" @click.prevent="loadCurrentLocation()"
                class="p-2 btn btn-primary rounded-xl border  shadow">Lokasi Saat Ini</button>
        </div>
        <div v-if="parking_spot.length < 1" class="row mx-5 my-2 align-items-center text-center">
            <h2> Tidak ada tempat parkir tersedia</h2>
        </div>
        <div v-else class="row mx-5 my-2 g-4">
            <Card v-for="el in parking_spot" :key="el.id" :el="el" :user="user_data.UserProfile"/>
        </div>
     </div>
</template>
<style scoped>
#active-box{
    border: 2px solid rgba(251, 111, 111,0.8);
    border-radius:10px;
    background: rgba(221, 12, 12,0.1);
    margin:0 auto

}
</style>

