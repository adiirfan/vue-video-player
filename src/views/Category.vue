<template>
    <div class="container">
        <div class="row mt-3 mb-3">
            <div class="col-md-12 text-center text-sm-left">
                <h4>CATEGORY : Animasi</h4>
            </div>
            <div>
                <div class="card-columns card-columns-custom">
                    <div class="card" v-for="item in film" v-bind:key="item.key" @click="openDetail(item)">
                        <img class="card-img-top" :src="item.image_url" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{item.title}}</h5>
                            <p class="card-text">Genres :<span v-for="items in item.genre" v-bind:key="items.key"> {{items.name}},</span></p>
                            <p class="card-text">{{item.synopsis.substring(0,150)+".."}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    const url = "https://api.jikan.moe/season/2018/summer"
    export default {
        name: "Category",
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
                allfilm:[],
                loading: true,
            }
        },
        beforeCreate(){
            this.loading = true
            axios.get(url)
                .then( ({ data }) => {
                    this.allfilm = data
                    data.season.map((item) => {
                        if (item.title !== null && this.film.length < 10 ) {
                            this.film.push(item)
                        }
                        if (item.title !== null && this.film.length < 8) {
                            this.filmterbaru.push(item)
                        }

                    })




                    //this.$store.commit('setInitialData', this.listtoko)
                    this.loading = false
                });
        },
        methods:{
            openDetail(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'path': '/player',query: { id: data.mal_id } })
            }
        }
    }
</script>

<style scoped>

</style>