<template>
    <div class="navegat" id="navegat">
        <div class="nav-scroller">
            <nav class="nav nav-underline">
                <router-link id="link" class="nav-link colors" :to="{ name: 'home'}">
                    Home
                </router-link>
                <router-link class="nav-link colors" :to="'/category/'">Category</router-link>
                <router-link class="nav-link colors" :to="'/genre/'" >Genre</router-link>
                <router-link class="nav-link colors" :to="'/favorite/'">Favorite</router-link>
                <router-link v-for="item in genre"
                   class="nav-link colors" :to="/genre/ + item.id">{{item.nama}}</router-link>
                <router-link v-for="item in category"
                   class="nav-link colors" :to="/category/ + item.id">{{item.nama}}</router-link>
                <span v-if="$mq == 'mobile'" class="nav-link colors" @click="toggle()" >Search</span>
                <div v-if="$mq != 'mobile'" class="nav searchbox float-right mx-2 pt-2">
                    <input type="text" class="form-control"  placeholder="Search"
                           v-on:keyup.enter="searching" v-model="search"
                    >
                </div>
            </nav>
        </div>
        <div class="container">
            <transition name="fade">
            <div v-if="$mq == 'mobile' && isOpen" class="nav searchboxmobile  pt-2 pb-2">
                <input type="text" class="form-control"  placeholder="Search" v-on:keyup.enter="searching" v-model="search">
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    const url = "http://192.168.2.82:81/api/"
    export default {
        data() {
          return{
              genre:[],
              category:[],
              isOpen:false,
              search:''
          }
        },
        mounted(){
            this.getcategory()
            this.getgenre()
            if(this.$route.name == "home" || this.$route.name == "film"){
                var myNav = document.getElementById("navegat");
                var link = document.getElementsByClassName("colors");
                window.onscroll = function() {
                    "use strict";
                    if (document.body.scrollTop >= 10 || document.documentElement.scrollTop >= 10) {
                        myNav.classList.add("scroll");
                        for(var i=0; i<link.length; i++) {
                            link[i].classList.add("colore");
                        }
                    } else {
                        myNav.classList.remove("scroll");
                        for(var i=0; i<link.length; i++) {
                            link[i].classList.remove("colore");
                        }
                    }
                };
            }else{
                var myNav = document.getElementById("navegat");
                var link = document.getElementsByClassName("colors");
                var content = document.getElementById("content");
                for(var i=0; i<link.length; i++) {
                    link[i].style.color = 'white';
                }
                content.classList.add("content");
                myNav.classList.remove("navegat");
                myNav.classList.add("navegatexcept");
            }
        },
        methods:{
            async getgenre(){
                const response = await axios.get(url + 'tags/read.php', {
                    params: {
                        top: 1
                    },
                })
                this.genre = response.data.data
            },
            async getcategory(){
                const response = await axios.get(url + 'category/read.php', {
                    params: {
                        top: 1
                    },
                })
                this.category = response.data.data
            },
            toggle: function(){
                this.isOpen = !this.isOpen
            },
            searching: function() {
                this.$router.push({ 'path': '/search', query: { search : this.search } })
            },
        }
    }
</script>
<style>
    .navegat{
        position:fixed;
        width:100%;
        z-index:2;
    }
    .navegatexcept{
        position:fixed;
        width:100%;
        z-index:2;
        top:0;
        background-color:#000000 !important;
    }
    .content{
        margin-top:60px;
    }
    .scroll {
        background-color:#000000 !important;
    }
    .colore{
        color:white ;
    }
    .navbar{
        z-index:2;
    }
    .router-link-exact-active {
        color: #ce2424 !important;
        cursor: pointer;
    }
    .searchbox{
        width:30%;
    }
    .searchboxmobile{
        width:100%;
    }
    .form-control{
        height:30px !important;
    }
    fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>