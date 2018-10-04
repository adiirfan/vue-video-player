<template>
    <div>
        <headers/>
        <div class="container" id="content">
            <div class="row mt-4 mb-3">
                <div class="col-md-12 text-center text-sm-left">
                    <h4>CATEGORY : </h4>
                </div>
                <div class="col-md-12 text-center text-sm-left">
                    <button type="button" class="btn btn-danger" v-for="item in categorylist" v-bind:key="item.key" v-html="item.nama">
                    </button>
                </div>
            </div>
            <div class="row mt-4 mb-3">
                <div class="col-md-12 text-center text-sm-left">
                    <h4>Tags : </h4>
                </div>
                <div class="col-md-12 text-center text-sm-left">
                    <button type="button" class="btn btn-danger" v-for="item in taglist" v-bind:key="item.key" v-html="item.nama">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    const url = "http://192.168.2.82:81/api/"
    import headers from '@/components/header'
    export default {
        name: "categoryandtag",
        data() {
            return{
                categorylist:[],
                taglist:[]
            }
        },
        mounted () {
            this.getcategory()
            this.gettag()
        },
        components:{
            headers
        },
        methods:{
            async getcategory(){
                const response = await axios.get(url + '/category/read.php')
                this.categorylist = response.data.data
            },
            async gettag(){
                const response = await axios.get(url + '/tags/read.php')
                this.taglist = response.data.data
            },
            openDetail(data) {
                //this.$store.commit('setData', data)
                this.$router.push({ 'name': 'player',query: { id: data.id } })
            }
        }
    }
</script>

<style scoped>
    .btn{
        margin-right: 10px !important;
        margin-bottom: 10px !important;
        padding: 7px 20px;
        border-radius: 16px;
        background: #ce2424 !important;
    }

</style>