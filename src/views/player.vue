<template>
    <div class="container-fluid">
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
                <div class="row col-md-12 mt-3 py-3 px-3shadow">
                    <div class="col-md-3">
                        <img class="img-fluid cover" :src="allfilm.image_url" alt="Card image cap">
                    </div>
                    <div class="col-md-9 ">
                        <h5>{{allfilm.title}}</h5>
                        <span>Kategori : <span class="badge badge-primary p-2 m-1">{{allfilm.source}}</span></span><br>
                        <span>Genre : <span v-for="genres in allfilm.genre" class="badge badge-primary p-2 m-1">{{genres.name}}</span></span><br>
                        <span>Sinopsis : {{allfilm.synopsis}}</span><br>
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
</template>

<script>
    import axios from 'axios'

    export default {
        name: "player",
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
        max-width:130px !important;
    }
    .thumbnail{
        max-width:130px !important;
        max-height:130px !important;
    }
</style>