<template>
    <div class="class-post" v-loading="loading">
        <myNav :ceiling="ceiling"></myNav>
        <div class="class-wrapper">
            <img class="bg" src="../assets/images/lufei.jpg" alt="" >
        </div>
        <div class="tag-list">
            <ul>
                <li v-for="(item, index) in postClass" :key="item.id">
                    <a @click="getClassData(1,item.id)" :class="[ activeClass === item.id ? tagListActive : '' ]">
                        {{item.class_name}}
                    </a>
                </li>
            </ul>
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

            <div class="no-postData" v-if="isNoPostClassData">
                <h2>抱歉，暂时没有属于这个分类的文章</h2>
                <br>
                <h2>抱歉，暫時沒有屬於這個分類的文章</h2>
                <br>
                <h2>Sorry, there are no articles belonging to this category at this time.</h2>
                <br>
                <h2>申し訳ありませんが、現在このカテゴリに属する記事はありません。</h2>
                <br>
                <h2>죄송합니다. 현재이 카테고리에 속하는 기사가 없습니다.</h2>
                <br>
            </div>
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
    import axios from '../axios/index'
    export default {
        name: "Class",
        components:{
            myNav,
            myFooter,
            myPage
        },
        data(){
            return{
                currentPage:1,
                maxPage:1,
                loading:false,
                ceiling:false,
                posts:[],
                first:true,
                postClass: [],
                activeClass:4,
                tagListActive:'tag-list-active',
                isNoPostClassData:false,
            }
        },
        created:function () {
            this.listenScroll()
            this.getClassData(1,4)
            axios.get('/v1/post-classes?').then(
                (res)=>{
                    this.postClass = res.data
                    this.loading = false
                },
                () =>{
                    this.loading = false
                }
            )
        },
        methods:{
            handleFormatDateMinuteSec:(stamp)=>{
                let date = new Date(stamp * 1000)
                if ( stamp === undefined ) { return ''}
                return `${date.getFullYear()}-${ date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours()>=10?date.getHours(): '0'+date.getHours()}:${date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes()}:${date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds()}`
            },
            scrollTo800:function () {
                window.scrollTo(0,800);
            },
            getClassData:function (page, t) {
                if(this.loading){
                    return
                }
                this.activeClass = t;
                this.loading = true;
                axios.get('/v1/posts?perPage=10&page=' + page + '&t=' + t).then(
                    (res)=>{
                        const data = res.data
                        this.posts = [...data['items']]
                        this.isNoPostClassData = false
                        if (this.posts.length === 0) {
                            this.isNoPostClassData = true
                        }
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
            pageTurning:function(operating){
                switch (operating) {
                    case 'prevPage':
                        this.getClassData(this.currentPage - 1, this.activeClass)
                        return
                    case 'nextPage':
                        this.getClassData(this.currentPage + 1, this.activeClass)
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
        }
    }
</script>

<style lang="stylus" scoped>
    .class-wrapper
        position: relative
        width:100%
        max-height: 100vh;
        overflow hidden
        img.bg
            width:100%
            max-height 100%

    .tag-list
        margin: 2rem auto;
        ul
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            li
                list-style: none;
                margin: .3rem;
                @media screen and (max-width: 768px)
                    margin: .2rem;

                a
                    display: block;
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: .3rem 1.6rem;
                    margin: 0;
                    border: 1px solid #d2d2d2;
                    border-radius: .5rem;
                    color: rgba(0, 0, 0, .8);
                    background-color: #f7f7f7;
                    transition: all .4s;
                    @media screen and (max-width: 768px)
                        padding: .2rem .5rem;
                    &:hover
                        background-color: #555555;
                        border-color: #555555;
                        color: #fff;
        .tag-list-active
            background-color: #555555;
            border-color: #555555;
            color: #fff;

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
        .no-postData
            text-align center
</style>