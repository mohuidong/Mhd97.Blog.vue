<template>
    <div class="article" v-loading="loading">
        <myNav :ceiling="ceiling"></myNav>
        <div class="bg" :style="{backgroundImage:'url('+ img +')'}"></div>
        <main>
            <div class="title">
                <h3>{{title}}</h3>
                <div class="time">{{time}}</div>
            </div>
            <div class="content" v-html="content"></div>
        </main>
        <myFooter></myFooter>

    </div>

</template>

<script>
    import myNav from '@/components/nav'
    import myFooter from '@/components/footer'
    import axios from 'axios'
    export default {
        name: "Article",
        components:{
            myNav,
            myFooter
        },
        data:function(){
            return {
                ceiling:false,
                img:'',
                title:'',
                time:'',
                content:'',
                loading:true

            }
        },
        created:function () {
            this.listenScroll()
            axios.get('/v1/posts/'+this.$route.params['id']+'?debug=1').then(
                (res)=>{
                    const data = res.data
                    this.img = data['label_img']
                    this.title = data['title']
                    this.time = this.handleFormatDateMinuteSec(data['created_at'])
                    this.content = data['content']
                    this.loading = false
                },
                () =>{
                    this.loading = false

                }
            )


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
        }
    }

</script>

<style lang="stylus" scoped>
.article
    .bg
        height:65vh
        background-position center center
        background-repeat no-repeat
        background-size cover
        @media screen and (max-width: 900px)
            height:45vh
    main
        max-width 710px
        width:85%
        margin: 4rem auto;
        text-align left
        .title
            h3
                color: #2e2e2e;
                font-size: 3.2rem;
                font-weight: 700;
            .time
                color: #9eabb3;
                line-height: 2.2rem;
                font-size: 1.3rem;
        .content
            margin: 5rem 0;
            font-size: 1.2rem;

</style>
