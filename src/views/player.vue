<template>
    <div>
        <headers/>
        <div class="container-fluid" id="content">
            <div class="row">
            <div class="col-md-8 py-4">
                <video id="player" preload="none" playsinline controls width="100%">
                    <source src="/assets/video/37210.mp4" type='video/mp4'>
                    <!-- Captions are optional -->
                    <!--track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default!-->
                </video>
                <div class="row mt-2">
                    <div class="col-md-12 py-3">
                        <h2 class="border-bottom pb-3">Title - Episode 9</h2>
                    </div>
                    <div class="col-md-12 pt-3 pr-0">
                        <div class="row px-3">
                            <div class="col-3 px-0">
                                <img class="card-img-top cover" :src="allfilm.image_url" alt="Card image cap">
                            </div>
                            <div class="col-8 pr-0">
                                <h5>{{allfilm.title}}</h5>
                                <span>Kategori : <span class="badge badge-primary p-2 m-1">{{allfilm.source}}</span></span><br>
                                <span>Genre : <span v-for="genres in allfilm.genre" class="badge badge-primary p-2 m-1" v-bind:key="genres.key">{{genres.name}}</span></span><br>
                                <span v-if="$mq != 'mobile'">Sinopsis : {{allfilm.synopsis}}</span><br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 my-4 shadow-sm">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex">
                            <img class="img-fluid thumbnail mx-2" :src="allfilm.image_url" alt="Card image cap">
                            <h6>{{allfilm.title}}</h6>
                        </div>
                    </a>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import headers from '@/components/header'

    export default {
        name: "player",
        components: {headers},
        data () {
            return {
                searchvalue : this.$route.query.id,
                film : [],
                allfilm:[],
                url: ''
            }
        },
        beforeCreate(){
            this.url = "https://api.jikan.moe/anime/" + this.$route.query.id
            this.loading = true
            axios.get(this.url)
                .then( ({ data }) => {
                    this.allfilm = data
                    this.loading = false
                });
        },
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