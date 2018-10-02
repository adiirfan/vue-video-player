<template>
    <div class="container">
        <div class="row mt-3 mb-3">
            <div class="col-md-12 text-center text-sm-left">
                <h4>CATEGORY</h4>
            </div>
                <div class="col-md-3 col-6">
                    <div class="card text-white mb-3 p-0 "  >
                        <router-link :to="{ name: 'hello' }">
                        <div class="card-body p-0">
                            <img class="image" src="https://cdn0-a.production.images.static6.com/PSL7KQbN_1STxMSkQ6ZdTCTMc2c=/250x150/smart/filters:quality(90):brightness(-20):saturation(0.4)/vidio-media-production/uploads/category/cover_image/35/funny-688ded.jpg"
                            style="width:100%;z-index:0;"
                            />
                            <div class="title">
                            <h3>Funny</h3>
                            </div>
                        </div>
                        </router-link>
                    </div>
                </div>

            <div class="col-md-3 col-6 ">
                <div class="card text-white mb-3 p-0 "  >
                    <router-link :to="{ name: 'hello' }">
                        <div class="card-body p-0">
                            <img class="image" src="https://cdn0-a.production.images.static6.com/PSL7KQbN_1STxMSkQ6ZdTCTMc2c=/250x150/smart/filters:quality(90):brightness(-20):saturation(0.4)/vidio-media-production/uploads/category/cover_image/35/funny-688ded.jpg"
                                 style="width:100%;z-index:0;"
                            />
                            <div class="title">
                                <h3>Funny</h3>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-md-3 col-6 ">
                <div class="card text-white mb-3 p-0 "  >
                    <router-link :to="{ name: 'hello' }">
                        <div class="card-body p-0">
                            <img class="image" src="https://cdn0-a.production.images.static6.com/PSL7KQbN_1STxMSkQ6ZdTCTMc2c=/250x150/smart/filters:quality(90):brightness(-20):saturation(0.4)/vidio-media-production/uploads/category/cover_image/35/funny-688ded.jpg"
                                 style="width:100%;z-index:0;"
                            />
                            <div class="title">
                                <h3>Funny</h3>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-md-3 col-6 ">
                <div class="card text-white mb-3 p-0 "  >
                    <router-link :to="{ name: 'hello' }">
                        <div class="card-body p-0">
                            <img class="image" src="https://cdn0-a.production.images.static6.com/PSL7KQbN_1STxMSkQ6ZdTCTMc2c=/250x150/smart/filters:quality(90):brightness(-20):saturation(0.4)/vidio-media-production/uploads/category/cover_image/35/funny-688ded.jpg"
                                 style="width:100%;z-index:0;"
                            />
                            <div class="title">
                                <h3>Funny</h3>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-12 text-center text-sm-left">
                <h4>VIDEO TERBARU</h4>
            </div>
            <div class="col-md-12">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="item in filmterbaru" v-bind:key="item.key">
                        <div class="card"  style="height: 600px;">

                            <img class="card-img-top img-" :src="item.image_url" alt="Card image cap">

                            <div class="card-body">
                                <h5 class="card-title">{{item.title}}</h5>
                                <p class="card-text">Genres :<span v-for="items in item.genre"> {{items.name}},</span></p>
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
            <div>
                <div class="card-columns card-columns-custom">
                    <div class="card" v-for="item in film" v-bind:key="item.key" @click="openDetail(item)">
                        <img class="card-img-top" :src="item.image_url" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{item.title}}</h5>
                            <p class="card-text">Genres :<span v-for="items in item.genre"> {{items.name}},</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    const url = "http://localhost:81/api/"
    export default {
        name: "home",
        data() {
            return {
                swiperOption: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    // init: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    breakpoints: {
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20
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
            }
        },
        mounted () {
            this.getvideoterbaru()
            this.getfilmrekomen()
        },
        methods:{
            async getvideoterbaru(){
                const response = await axios.get(url + '/video/read.php', {
                    params: {
                        terbaru: 1,
                    },
                })
                this.filmterbaru = response.data.data
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
                this.$router.push({ 'name': 'player',query: { id: data.mal_id } })
            }
        }

    }

</script>

<style scoped>

</style>