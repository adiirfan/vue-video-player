<template>
    <div>
    <headers/>
    <div class="container" id="content">
        <div class="row mt-3 mb-3">
            <div class="col-md-12 text-center text-sm-left">
                <h4>CATEGORY : {{film.nama}}</h4>
            </div>
            <div v-if="$mq === 'mobile'" class="col-md-12 text-sm-left">
                <div class="card-columns card-columns-custom">
                    <div class="card p-2" v-for="item in film.film" v-bind:key="item.key" >
                        <div class="fluid-container">
                            <div class="row">
                                <div class="col-4" @click="openDetail(item)">
                                    <img class="card-img-top" :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover" alt="Card image cap">
                                </div>
                                <div class="col-8 pl-0">
                                    <h5 class="card-title">{{item.nama}}</h5>
                                    <p class="card-text">Genres :<span v-for="items in item.tag"
                                                                       v-bind:key="items.key" @click="openTag(items.id)"
                                                                       class="badge badge-primary p-2 m-1"> {{items.nama}}</span></p>
                                    <i v-if="cekfavorites(item.id)" class="fas fa-heart fa-lg fa-red text-right" @click="removeFavorite(item)"></i>
                                    <i v-else class="far fa-heart fa-lg text-right" @click="addtoFavorite(item)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="col-md-12 text-center text-sm-left">
                <div class="card-columns card-columns-custom">
                    <div class="card" v-for="item in film.film" v-bind:key="item.key" >
                        <div>
                        <img @click="openDetail(item)" class="card-img-top" :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover" alt="Card image cap">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{item.nama}}</h5>
                            <p class="card-text">Genres :<span v-for="items in item.tag" v-bind:key="items.key"
                                                               @click="openTag(items.id)" class="badge badge-primary p-2 m-1"> {{items.nama}}</span></p>
                            <i v-if="cekfavorites(item.id)" class="fas fa-heart fa-lg fa-red" @click="removeFavorite(item)"></i>
                            <i v-else class="far fa-heart fa-lg" @click="addtoFavorite(item)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import headers from '@/components/header'
    const url = "http://192.168.2.82:81/api/"
    export default {
        name: "Category",
        data() {
            return {
                film :[],
                filsm: "test",
                allfilm:[],
                loading: true,
                id : this.$route.params.id,
                favoriteid:[],
                favorite: this.$store.state.favorite,
            }
        },
        mounted () {
            this.getfilm()
            this.favorite.map((item) => {
                this.favoriteid.push(item.id)
            })
        },
        components:{
            headers
        },
        methods:{
            async getfilm(){
                const response = await axios.get(url + '/category/read.php', {
                    params: {
                        id: this.id,
                    },
                })
                this.film = response.data
            },
            openDetail(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': '/film/' + data.id })
            },
            openTag(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': '/genre/' + data })
            },
            cekfavorites(data){
                var n = this.favoriteid.includes(data);
                return n
            },
            addtoFavorite(data){
                this.$store.commit('addfavorite', data)
                this.favoriteid.push(data.id)
                //console.log()
            },
            removeFavorite(data){
                const locationInFav = this.favorite.findIndex(p => {
                    return p.id === data.id
                })
                if (locationInFav != -1) {
                    this.favorite.splice(locationInFav, 1)
                    this.favoriteid.splice(locationInFav, 1)
                    this.$store.commit('removefavorite', locationInFav)
                }
            }
        }
    }
</script>

<style scoped>

</style>