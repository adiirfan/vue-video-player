<template>
    <div>
        <headers/>
        <div class="container" id="content">
            <div class="row">
                <div class="col-md-9 py-4">
                    <vue-plyr>
                    <video id="player" preload="metadata" playsinline controls width="100%">
                        <source v-if="videosrc" :src="videosrc" type='video/mp4'>
                        <!-- Captions are optional -->
                        <!--track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default!-->
                    </video>
                    </vue-plyr>
                    <div class="row mt-2">
                        <div class="col-md-12 py-3">
                            <h2 class="border-bottom pb-3">{{video.namavideo}}</h2>
                        </div>
                        <div class="col-md-12 pt-3 pr-0">
                            <div class="row px-3">
                                <div class="col-3 px-0">
                                    <img class="card-img-top cover" :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ video.cover" alt="Card image cap">
                                </div>
                                <div class="col-8 pr-0">
                                    <h5>{{video.nama}}</h5>
                                    <span>Kategori : <span v-for="categorys in category" class="badge badge-primary p-2 m-1"  v-bind:key="categorys.key">{{categorys.nama}}</span></span><br>
                                    <span>Genre : <span v-for="genres in genre" class="badge badge-primary p-2 m-1" @click="openTag(genres.id)" v-bind:key="genres.key">{{genres.nama}}</span></span><br>
                                    <!--span v-if="$mq != 'mobile'">Sinopsis : {{allfilm.synopsis}}</span><br!-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 my-4 shadow-sm">
                <div class="col-md-12 text-center text-sm-left">
                    <h4>Episode Lain</h4>
                </div>
                <div class="row d-flex justify-content-center">
                    <div  class="card col-md-12 my-3 m-3 px-0" v-for="items in episodelain" v-bind:key="items.key">
                        <!--img class="card-img-top" alt="Card image cap" !-->
                        <div @click="openDetail(items.id)">
                            <vue-plyr id="thumb">
                                <video preload="metadata"  v-if="items.file" :src="'http://192.168.2.82:81/api/assets/videos/' + items.file" width="100%">
                                </video>
                            </vue-plyr>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{items.namavideo}}</h5>
                        </div>
                    </div>
                </div>
            </div>
            </div>
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
        name: "player",
        components: {headers},
        data() {
            return {
                loading: true,
                id : this.$route.query.id,
                video:[],
                genre:[],
                category:[],
                videosrc: '',
                episodelain:[],
            }
        },
        mounted () {
            this.getfilm()
        },
        methods: {
            async getfilm() {
                const response = await axios.get(url + '/video/read.php', {
                    params: {
                        id: this.id,
                    },
                })
                this.video = response.data
                this.genre = response.data.tag
                this.category = response.data.category
                this.getanotherfilm(this.video.id_film)
                this.videosrc = 'http://192.168.2.82:81/api/assets/videos/' + this.video.file
            },
            async getanotherfilm(data) {
                const response = await axios.get(url + '/video/read.php', {
                    params: {
                        id: data,
                        episode: this.id,
                    },
                })
                this.episodelain = response.data.data
            },
            openDetail(data) {
                this.$router.push({ 'path': '/player',query: { id: data } })
            },
            openTag(data) {
                this.$router.push({ 'path': 'genre/' + data })
            },
        }
    }
</script>

<style scoped>
    .cover{
        max-width:200px !important;
    }
    .thumbnail{
        max-width:130px !important;
        max-height:130px !important;
    }
</style>