<template>
    <div>
        <headers/>
        <div>
            <swiper style="height:100%;">
                <swiper-slide v-for="item in filmrekomen" v-bind:key="item.key">
                    <div class="cover" style="background-image: url('http://192.168.2.87:244/assets/images/cover/1.jpg');background-size: cover;min-height:300px;">
                        <div class="container p-5" style="min-height:300px;">
                            <div class="py-3">
                            <div class="col-md-6">
                                <h5 class="text-white">{{item.nama}}</h5>
                            </div>
                            <div class="col-md-6">
                                <p class="card-text text-white">Genres :<span v-for="items in item.tag" v-bind:key="items.key"
                                                                              class="badge badge-primary p-2 m-1"
                                                                              @click="openTag(items.id)"> {{items.nama}}</span></p>
                            </div>
                            <div class="col-md-6" v-if="$mq != 'mobile'">
                                <br>
                                <p class="text-white">{{item.sinopsis}}</p>
                            </div>
                            <br>
                            <div class="col-md-6">
                                <a href="#" class="btn play-button">
                                    <i class="fas fa-play m-1">
                                    </i>
                                </a>
                                <div class="btn play-button">
                                    <i v-if="cekfavorites(item.id)" class="fas fa-heart m-1" @click="removeFavorite(item)">
                                    </i>
                                    <i v-else class="far fa-heart m-1" @click="addtoFavorite(item)">
                                    </i>
                                </div>

                            </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="container">
            <div class="row mt-3 mb-3">
                <div class="col-md-12 text-center text-sm-left">
                    <h4>VIDEO TERBARU</h4>
                </div>
                <div class="col-md-12">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="item in filmterbaru" v-bind:key="item.key">
                            <div class="card" style="height: 100%;max-height:400px;">
                                <div @click="openDetail(item)">
                                <vue-plyr id="thumb" @click="openDetail(items.id)">
                                    <video preload="metadata"  v-if="item.source" :src="item.source" width="100%">

                                    </video>
                                </vue-plyr>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">{{item.nama}}</h5>
                                    <p class="card-text">Genres :<span v-for="items in item.genre" v-bind:key="items.key" class="badge badge-primary p-2 m-1"> {{items.nama}}</span></p>
                                </div>
                            </div>
                        </swiper-slide>

                        <div class="swiper-pagination" slot="pagination"></div>

                    </swiper>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-12 text-center text-sm-left">
                    <h4>REKOMENDASI</h4>
                </div>
                <div v-if="$mq === 'mobile'" class="col-md-12 text-sm-left">
                    <div class="card-columns card-columns-custom">
                        <div class="card p-2" v-for="item in filmrekomen" v-bind:key="item.key">
                            <div class="fluid-container">
                                <div class="row">
                                    <div class="col-4">
                                        <img class="card-img-top" :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover" alt="Card image cap">
                                    </div>
                                    <div class="col-8 pl-0">
                                        <h5 class="card-title">{{item.nama}}</h5>
                                        <p class="card-text">Genres :<span v-for="items in item.tag" v-bind:key="items.key" @click="openTag(items.id)"
                                                                           class="badge badge-primary p-2 m-1" > {{items.nama}}</span></p>
                                        <br>
                                        <i v-if="cekfavorites(item.id)" class="fas fa-heart fa-lg fa-red text-right" @click="removeFavorite(item)"></i>
                                        <i v-else class="far fa-heart fa-lg text-right" @click="addtoFavorite(item)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="col-md-12">
                    <div class="card-columns card-columns-custom">
                        <div class="card" v-for="item in filmrekomen" v-bind:key="item.key">
                            <img class="card-img-top"
                                 :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover"  @click="openFilm(item.id)" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">{{item.nama}}</h5>
                                <p class="card-text">Genres :<span class="badge badge-primary p-2 m-1"
                                                                   v-for="items in item.tag" v-bind:key="items.key"
                                                                   @click="openTag(items.id)">
                                    {{items.nama}}</span></p>
                                <br>
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
        name: "home",
        components:{
            headers
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                    // init: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    breakpoints: {
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        },
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        }
                    }
                },
                film : [],
                filmterbaru : [],
                filmrekomen:[],
                loading: true,
                favoriteid:[],
                favorite: this.$store.state.favorite,
            }
        },
        mounted () {
            this.getvideoterbaru()
            this.getfilmrekomen()
            this.favorite.map((item) => {
                this.favoriteid.push(item.id)
            })
            console.log(this.favoriteid)
        },
        methods:{
            async getvideoterbaru(){
                const response = await axios.get(url + '/video/read.php', {
                    params: {
                        terbaru: 1,
                    },
                })
                this.film = response.data.data
                this.film.map((item, key) => {
                    this.filmterbaru.push({
                        id: item.id,
                        genre: item.tag,
                        nama: item.namavideo,
                        source: 'http://192.168.2.82:81/api/assets/videos/' + item.file
                    })
                })
            },
            async getfilmrekomen(){
                const response = await axios.get(url + '/film/read.php')
                this.filmrekomen = response.data.data
                function compare(a,b) {
                    if (a.favorite < b.favorite)
                        return -1;
                    if (a.favorite > b.favorite)
                        return 1;
                    return 0;
                }
                this.filmrekomen.sort(compare);
            },
            openDetail(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'name': 'player',query: { id: data.id } })
            },
            openTag(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': 'genre/' + data })
            },
            openFilm(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': 'film/' + data })
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
    .crop {
        width: 100%;
        height: 400px;
        overflow: hidden;
    }
    .crop img {
        width: 100%;
        height: 100%;
    }
    .cover{
        background-color: rgba(0,0,0,0.7);
        background-blend-mode: multiply;
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