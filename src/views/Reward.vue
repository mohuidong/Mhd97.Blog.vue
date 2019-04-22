<template>
    <div class="Reward" v-loading="!first && loading">
        <myNav :ceiling="ceiling"></myNav>
        <div class="reward-wrapper">
            <img class="bg" src="../assets/images/reward.jpg" alt="" >
        </div>
        <main>
            <div class="reward-qrcode">
                <h2>感谢老板的支持，祝老板新年快乐、财源滚滚</h2>
                <br>
                <h2>Thanks to the support of the boss, I wish the boss a happy new year, the financial resources are rolling</h2>
                <br>
                <img src="../assets/images/alipay.jpg" alt="">
            </div>
        </main>
        <myFooter></myFooter>
    </div>
</template>

<script>
    import myNav from '@/components/nav'
    import myFooter from '@/components/footer'
    export default {
        name: "Reward",
        components:{
            myNav,
            myFooter,
        },
        data:function(){
            return {
                ceiling:false,
                first:false,
                loading:true,
            }
        },
        created:function () {
            this.listenScroll()
        },
        mounted:function () {
            this.loading = false
        },
        methods:{
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
        }
    }

</script>

<style lang="stylus" scoped>
    .reward-wrapper
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
        .reward-qrcode
            margin 2rem auto
            width 85%
            max-width 720px
            padding 2rem 0
            border-bottom: 1px solid #ebf2f6;
            position: relative
        img
            margin 0rem 10rem
            width 30 rem
</style>