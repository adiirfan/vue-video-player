<template>
    <div>
        <headers/>
        <div class="container-fluid" id="content">
            <div class="row">
            <div class="col-md-8 py-4">
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
                                <span>Genre : <span v-for="genres in genre" class="badge badge-primary p-2 m-1" v-bind:key="genres.key">{{genres.nama}}</span></span><br>
                                <!--span v-if="$mq != 'mobile'">Sinopsis : {{allfilm.synopsis}}</span><br!-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--div class="col-md-4 my-4 shadow-sm">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex">
                            <img class="img-fluid thumbnail mx-2" :src="allfilm.image_url" alt="Card image cap">
                            <h6>{{allfilm.title}}</h6>
                        </div>
                    </a>
                </div>
            </div!-->
            </div>
        </div>
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
                videosrc: ''
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
                this.videosrc = 'http://192.168.2.82:81/api/assets/videos/' + this.video.file
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