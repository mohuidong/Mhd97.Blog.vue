<template>
    <div>
        <myNav :ceiling="ceiling"></myNav>
        <div class="bg-wrapper">
            <img class="bg" src="../assets/images/bg.jpg" alt="" >
            <div class="slogan">
                <transition>
                    <p :class="H1_class" id="H1_id">Mhd97<br>非淡泊无以明志 非宁静无以致远</p>
                </transition>
            </div>
            <div class="down" @click="scrollTo800">
                <transition>
                    <i :class="homeArrowDown"></i>
                </transition>
            </div>
        </div>

        <main v-loading="!first && loading">

            <article v-for="(item) in posts" :key="item['id']">
                <router-link :to="'/article/'+item['id']"><h5>{{item['title']}}</h5></router-link>
                <p>{{item['summary']}}</p>
                <div>
                    <span class="name">{{item['user_name']}}</span>
                    |
                    <span class="time">{{handleFormatDateMinuteSec(item['created_at'])}}</span>
                </div>
            </article>


        </main>
        <myPage
            :currentPage="currentPage"
            :maxPage="maxPage"
            @pageTurning="pageTurning"
        ></myPage>
        <myFooter></myFooter>
    </div>

</template>

<script>
    import myNav from '@/components/nav'
    import myFooter from '@/components/footer'
    import myPage from '@/components/page'
    import axios from 'axios'
    export default {
        name: "NewHome",
        components: {
            myNav,
            myFooter,
            myPage
        },
        data(){
            return{
                H1_class:'H1_class',
                homeArrowDown:'el-icon-arrow-down',
                activeIndex2:'1',
                currentPage:1,
                maxPage:1,
                loading:false,
                ceiling:false,
                posts:[],
                first:true
            }
        },
        methods: {
            pageTurning:function(operating){
                switch (operating) {
                    case 'prevPage':
                        this.getData(this.currentPage - 1)
                        return
                    case 'nextPage':
                        this.getData(this.currentPage + 1)
                        return
                    default:
                        return
                }
            },
            getData:function (page) {
                if(this.loading){
                    return
                }
                // this.posts = []
                // window.scrollTo(0,0);
                this.loading = true
                axios.get('/v1/posts?debug=1&perPage=5&page='+page).then(
                    (res)=>{
                        const data = res.data
                        this.posts = [...data['items']]
                        this.currentPage = data['_meta']['currentPage']
                        this.maxPage = data['_meta']['pageCount']
                        this.loading = false
                        this.first = false
                    },
                    ()=>{
                        this.loading = false
                        this.first = false
                    }
                )
            },
            handleFormatDateMinuteSec:(stamp)=>{
                let date = new Date(stamp * 1000)
                if ( stamp === undefined ) { return ''}
                return `${date.getFullYear()}-${ date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours()>=10?date.getHours(): '0'+date.getHours()}:${date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes()}:${date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds()}`
            },
            scrollTo800:function () {
                window.scrollTo(0,800);
            },
            listenScroll:function () {
                window.onscroll = ()=>{
                    if(document.documentElement.scrollTop > 0){
                        this.ceiling = true
                    }else {
                        this.ceiling = false
                    }
                }
            }
        },
        created:function () {
            //进入页面animated插件特效
            this.homeArrowDown = 'el-icon-arrow-down animated wobble';
            this.H1_class='H1_class animated lightSpeedIn';
            this.listenScroll()
            this.getData(1)
        }

    }
</script>

<style lang="stylus" scoped>
    .bg-wrapper
        position: relative
        width:100%
        max-height: 100vh;
        overflow hidden
        img.bg
            width:100%
            max-height 100%
        .slogan
            position: absolute
            top 0
            left 0
            width:100%
            height 100%
            z-index 1
            display: flex
            justify-content center
            align-items center
            p
                font-size 2rem
                color: #fff
        .down
            position: absolute
            left: 50%
            margin-left -16px
            bottom 10%
            color: #fff
            font-size 32px
            z-index 1
            cursor pointer

    main
        padding 1rem 0
        text-align left
        article
            width 85%
            max-width 720px
            margin 4rem auto
            padding 4rem 0
            border-bottom: 1px solid #ebf2f6;
            position: relative
            &::after
                content: "";
                width: 7px;
                height: 7px;
                display: block;
                border: 1px solid #e7eef2;
                position: absolute;
                left: 50%;
                bottom: -5px;
                border-radius: 100%;
                box-shadow: 0 0 0 5px #fff;
                background-color: #fff;

            h5
                font-size 2.6rem
                color: #4a4a4a
            p
                font-size: 1.2rem;
                line-height: 1.9rem;
                padding: .5rem 0 2.2rem;
            div
                color: #8492a6;
                display: flex
                .name
                    padding-right 9px
                .time
                    padding-left 9px

</style>
