<template>
    <div class="about" v-loading="!first && loading">
        <myNav :ceiling="ceiling"></myNav>
            <div class="about-wrapper">
                <img class="bg" src="../assets/images/about.jpg" alt="" >
            </div>
        <main>
            <div class="about-main">
              <br>
              <h2>邮箱:{{systemData.customer_service_email}}</h2>
              <br>
              <h2>手机:{{systemData.customer_service_phone}}</h2>
              <br>
              <h2>微信号:{{systemData.wechat}}</h2>
              <br>
            </div>
        </main>
        <myFooter></myFooter>
    </div>
</template>

<script>
    import myNav from '@/components/nav'
    import myFooter from '@/components/footer'
    import axios from '../axios/index'
    export default {
        name: "about",
        components:{
            myNav,
            myFooter,
        },
        data:function(){
            return {
                ceiling:false,
                first:false,
                loading:true,
                systemData:[],
            }
        },
        created:function () {
            this.listenScroll()
            this.getSystemData()
        },
        methods:{
            pageTurning:function(operating){
                switch (operating) {
                    case 'prevPage':
                        this.getIssueData(this.currentPage - 1)
                        return
                    case 'nextPage':
                        this.getIssueData(this.currentPage + 1)
                        return
                    default:
                        return
                }
            },
            listenScroll:function () {
                window.onscroll = ()=>{
                    if(document.documentElement.scrollTop > 0){
                        this.ceiling = true
                    }else {
                        this.ceiling = false
                    }
                }
            },
            handleFormatDateMinuteSec:(stamp)=>{
                let date = new Date(stamp * 1000)
                if ( stamp === undefined ) { return ''}
                return `${date.getFullYear()}-${ date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours()>=10?date.getHours(): '0'+date.getHours()}:${date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes()}:${date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds()}`
            },
            scrollTo800:function () {
                window.scrollTo(0,800);
            },
            getSystemData:function () {
                axios.get('/v1/system-settings?').then(
                    (res)=>{
                        this.systemData = res.data
                        console.log(this.systemData)
                        this.loading = false
                    },
                    () =>{
                        this.loading = false
                    }
                )
            },
        }
    }

</script>

<style lang="stylus" scoped>
  .about-wrapper
    position: relative
    width:100%
    max-height: 100vh;
    overflow hidden
    img.bg
      width:100%
      max-height 100%

  main
    padding 1rem 0
    text-align left
    .about-main
      margin 2rem auto
      width 85%
      max-width 720px
      padding 2rem 0
      border-bottom: 1px solid #ebf2f6;
      position: relative

</style>