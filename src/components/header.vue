<template>
    <div class="navegat" id="navegat">
        <div class="nav-scroller shadow-sm">
            <nav class="nav nav-underline">
                <a id="link" class="nav-link colors" href="#">
                    Video
                </a>
                <a class="nav-link active colors" href="#">Dashboard</a>
                <a class="nav-link colors" href="#">
                    Friends
                    <span class="badge badge-pill bg-light align-text-bottom">27</span>
                </a>
                <a class="nav-link colors" href="#">Explore</a>
                <a class="nav-link colors" href="#">Suggestions</a>
                <a class="nav-link colors" href="#">Link</a>
                <a class="nav-link colors" href="#">Link</a>
                <a class="nav-link colors" href="#">Link</a>
                <a class="nav-link colors" href="#">Link</a>
                <a class="nav-link colors" href="#">Link</a>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            if(this.$route.name == "home" || this.$route.name == "film"){
                var myNav = document.getElementById("navegat");
                var link = document.getElementsByClassName("colors");
                window.onscroll = function() {
                    "use strict";
                    if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
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
                    link[i].style.color = 'black';
                }
                content.classList.add("content");
                myNav.classList.remove("navegat");
                myNav.classList.add("navegatexcept");
            }
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
        background-color:white
    }
    .content{
        margin-top:60px;
    }
    .scroll {
        background-color: white;
    }
    .colore{
        color:black !important;
    }
    .navbar{
        z-index:2;
    }
</style>