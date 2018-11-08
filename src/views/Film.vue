<template>
    <div>
        <headers/>
        <div class="cover" style="min-height:300px;" v-bind:style="bgc">
            <div class="container p-5" style="min-height:300px;">
                <div class="py-3">
                    <div class="col-md-6">
                        <h5 class="text-white">{{film.nama}}</h5>
                    </div>
                    <div class="col-md-6">
                        <p class="card-text text-white">Genres :<span v-for="items in genre" v-bind:key="items.key"
                                                                      @click="openTag(items.id)"
                                                                      class="badge badge-primary p-2 m-1"> {{items.nama}},</span></p>
                    </div>
                    <div class="col-md-6" v-if="$mq != 'mobile'">
                        <br>
                        <p class="text-white">{{film.sinopsis}}</p>
                    </div>
                    <br>
                    <div class="col-md-6">
                        <div class="btn play-button">
                            <i v-if="cekfavorites(film.id)" class="fas fa-heart m-1" @click="removeFavorite(film)">
                            </i>
                            <i v-else class="far fa-heart m-1" @click="addtoFavorite(film)">
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container my-3">
            <div v-if="$mq == 'mobile'">
                <div class="card col-md-12 btn" data-toggle="collapse" data-target="#sinopsis" aria-expanded="false" aria-controls="sinopsis">
                    Sinopsis
                </div>
                <div class="collapse" id="sinopsis">
                    <div class="card card-body mt-1">
                       {{film.sinopsis}}
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center " v-if="$mq != 'mobile'">
                <div  class="card col-md-3 my-3 m-3 px-0" v-for="items in video" v-bind:key="items.key">
                    <!--img class="card-img-top" alt="Card image cap" !-->
                    <div @click="openDetail(items.id)">
                        <vue-plyr id="thumb">
                            <video preload="metadata"  v-if="items.source" :src="items.source" width="100%">

                            </video>
                        </vue-plyr>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{items.nama}}</h5>
                    </div>
                </div>
            </div>
            <ul v-else class="list-group my-3">
                <button type="button" class="list-group-item list-group-item-action"
                        v-for="items in video" v-bind:key="items.key" @click="openDetail(items.id)">{{items.nama}}</button>
            </ul>
        </div>
        <footer>
            <div class="row text-center">
                <div class="col-lg-12">
                    <p>© Copyright 2018 by Lytogame. All Right Reserved</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import axios from 'axios'
    import headers from '@/components/header'
    const url = "http://192.168.2.82:81/api/"
    export default {
        name: "Film",
        components:{
            headers
        },
        data() {
            return {
                film :[],
                allfilm:[],
                loading: true,
                id : this.$route.params.id,
                video:[],
                videoall:[],
                genre:[],
                bgc: {
                    backgroundImage: ''
                },
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
        methods:{
            async getfilm(){
                const response = await axios.get(url + '/film/read.php', {
                    params: {
                        id: this.id,
                    },
                })
                this.film = response.data
                this.videoall = response.data.video
                this.genre = response.data.tag
                this.bgc.backgroundImage = 'url(' + 'https://myanimelist.cdn-dena.com/images/anime/1173/'+ this.film.cover + ')'
                this.videoall.map((item) => {
                    this.video.push({
                        id: item.id,
                        nama: item.nama,
                        source: 'http://192.168.2.82:81/api/assets/videos/' + item.file
                    })
                })
            },
            openDetail(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': '/player',query: { id: data } })
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
    .cover{
        background-color: rgba(0,0,0,0.5);
        background-blend-mode: multiply;
        background-size: cover;
    }
    .play-button{
        background: #ce2424;
        color: #FFF;
        border-radius: 10px;
        border: 0px;
        margin-right: 20px;
        padding:5px 15px;
    }
</style>