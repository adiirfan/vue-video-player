<template>
    <div>
        <headers/>
        <div class="container" id="content">
            <div class="mt-3"></div>
            <input type="text" v-model="searchvalue" class="form-control" id="searchbox" placeholder="Search">
            <div v-if="$mq === 'mobile'" class="col-md-12 text-sm-left my-3">
                <div class="card-columns card-columns-custom">
                    <div class="card p-2" v-for="item in filteredList" v-bind:key="item.key" @click="openDetail(item)">
                        <div class="fluid-container">
                            <div class="row">
                                <div class="col-4">
                                    <img class="card-img-top" :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover" alt="Card image cap">
                                </div>
                                <div class="col-8 p-0">
                                    <h5 class="card-title">{{item.nama}}</h5>
                                    <p class="card-text">Genres :<span v-for="items in item.tag" v-bind:key="items.key" class="badge badge-primary p-2 m-1"> {{items.nama}}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="col-md-12 my-3">
                <div v-if="filteredList.length < 1">
                    <p class="text-center">
                        Film Tidak Ditemukan :(
                    </p>
                </div>
                <div v-else class="card-columns card-columns-custom">
                    <div  class="card" v-for="item in filteredList" v-bind:key="item.key">
                        <div >
                            <img class="card-img-top"
                                 :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover"  @click="openDetail(item)" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">{{item.nama}}</h5>
                                <p class="card-text">Genres :<span class="badge badge-primary p-2 m-1"
                                                                   v-for="items in item.tag" v-bind:key="items.key"
                                                                   @click="openTag(items.id)">
                                    {{items.nama}}</span></p>
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
        name: "Search",
        components:{
            headers
        },
        data() {
            return {
                film:[],
                allfilm:[],
                searchvalue:'',
            }
        },
        mounted () {
            if(this.$route.query.search != undefined){
            this.searchvalue = this.$route.query.search;
            }
            this.getfilm()
        },
        computed: {
            filteredList() {
                return this.allfilm.filter(film => {
                    return film.nama.toLowerCase().includes(this.searchvalue.toLowerCase())
                })
            }
        },
        methods:{
            async getfilm(){
                const response = await axios.get(url + '/film/read.php')
                this.allfilm = response.data.data
            }
        }
    }
</script>

<style scoped>

</style>