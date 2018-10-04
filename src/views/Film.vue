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
                        <p class="card-text text-white">Genres :<span v-for="items in genre" v-bind:key="items.key" class="badge badge-primary p-2 m-1"> {{items.nama}},</span></p>
                    </div>
                    <div class="col-md-6" v-if="$mq != 'mobile'">
                        <br>
                        <p class="text-white">{{film.sinopsis}}</p>
                    </div>
                    <br>
                    <div class="col-md-6">
                        <a href="#" class="btn play-button">
                            <i class="material-icons">
                                play_arrow
                            </i>
                        </a>
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
            <div class="row">
            <div class="card col-md-3 my-3 m-3 px-0" v-for="items in video" v-bind:key="items.key" @click="openDetail(items.id)">
                <!--img class="card-img-top" alt="Card image cap" !-->
                <canvas width="300" height="200" v-bind:id="'test' + items.id"></canvas>
                <div class="card-body">
                    <h5 class="card-title">{{items.nama}}</h5>
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
                genre:[],
                bgc: {
                    backgroundImage: ''
                }
            }
        },
        mounted () {
            this.getfilm()
        },
        methods:{
            async getfilm(){
                const response = await axios.get(url + '/film/read.php', {
                    params: {
                        id: this.id,
                    },
                })
                this.film = response.data
                this.video = response.data.video
                this.genre = response.data.tag
                this.bgc.backgroundImage = 'url(' + 'https://myanimelist.cdn-dena.com/images/anime/1173/'+ this.film.cover + ')'
                this.video.map((item) => {
                    this.generate(item)
                })
            },
            generate(item){
                var i = 10;
                var video = document.createElement("video");

                video.addEventListener('loadeddata', function() {
                    video.currentTime = i;
                }, false);

                video.addEventListener('seeked', function() {
                    generateThumbnail(i);
                }, false);

                video.preload = "auto";
                video.src = url + 'assets/videos/' + item.file;

                function generateThumbnail() {
                    var c = document.getElementById("test" + item.id);
                    var ctx = c.getContext("2d");
                    ctx.drawImage(video, 0,0,300,200);
                }
            },
            openDetail(data) {
                this.$store.commit('setData', data)
                this.$router.replace({ 'path': '/player',query: { id: data } })
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