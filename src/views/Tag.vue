<template>
    <div>
        <headers/>
        <div class="container" id="content">
            <div class="row mt-3 mb-3">
                <div class="col-md-12 text-center text-sm-left">
                    <h4>TAG : {{tag.nama}}</h4>
                </div>
                <div v-if="$mq === 'mobile'" class="col-md-12 text-sm-left">
                    <div class="card-columns card-columns-custom">
                        <div class="card p-2" v-for="item in tag.film" v-bind:key="item.key" @click="openDetail(item)">
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
                <div v-else class="col-md-12 text-center text-sm-left">
                    <div class="card-columns card-columns-custom">
                        <div class="card" v-for="item in tag.film" v-bind:key="item.key" @click="openDetail(item)">
                            <img class="card-img-top" :src="'https://myanimelist.cdn-dena.com/images/anime/1173/'+ item.cover" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">{{item.nama}}</h5>
                                <p class="card-text">Genres :<span v-for="items in item.tag" v-bind:key="items.key" class="badge badge-primary p-2 m-1"> {{items.nama}}</span></p>

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
        name: "Tag",
        data() {
            return {
                tag :[],
                allfilm:[],
                loading: true,
                id : this.$route.params.id,
            }
        },
        components:{
            headers
        },
        mounted () {
            this.getfilm()
        },
        methods:{
            async getfilm(){
                const response = await axios.get(url + 'tags/read.php', {
                    params: {
                        id: this.id,
                    },
                })
                this.tag = response.data
            },
            openDetail(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': '/player',query: { id: data.mal_id } })
            }
        }
    }
</script>

<style scoped>

</style>