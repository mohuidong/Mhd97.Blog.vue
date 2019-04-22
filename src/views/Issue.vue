<template>
    <div class="Issue" v-loading="!first && loading">
        <myNav :ceiling="ceiling"></myNav>
        <div class="issue-wrapper">
            <img class="bg" src="../assets/images/issue.jpg" alt="" >
        </div>
        <main>
            <div class="to-question">
                <h2>问题列表 <router-link to="/sendQuestion"> <i class="el-icon-question"></i>去提问？</router-link></h2>
                <!--<el-button type="primary"  icon="el-icon-question" plain>我要提问</el-button>-->
            </div>
            <article v-for="(item) in issueData" :key="item['id']">
                <router-link :to="'/question/'+item['id']">
                    <h5>
                        <span v-if="item.status == 1">
                            <i class="el-icon-warning" ></i>
                        </span>
                        <span v-else-if="item.status == 2">
                            <i class="el-icon-error" ></i>
                        </span>
                        <span v-else-if="item.status == 3">
                            <i class="el-icon-success" ></i>
                        </span>
                        {{item['question']}}
                    </h5>
                </router-link>
                <br>
                <div>
                    <span class="name">{{item['nickname']}}</span>
                    |
                    <span class="time">{{handleFormatDateMinuteSec(item['created_at'])}}</span>
                </div>
            </article>

            <div class="no-postData" v-if="isNoQuestionData">
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
        name: "Issue",
        components:{
            myNav,
            myFooter,
            myPage
        },
        data:function(){
            return {
                ceiling:false,
                issueData:[],
                first:false,
                loading:true,
                currentPage:'',
                maxPage:'',
                isNoQuestionData:''
            }
        },
        created:function () {
            this.listenScroll()
            this.getIssueData(1)
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
            getIssueData:function (page) {
                axios.get('/v1/issues?perPage=10&page=' + page).then(
                    (res)=>{
                        const data = res.data
                        this.issueData = [...data['items']]
                        this.isNoQuestionData = false
                        if (this.issueData.length === 0) {
                            this.isNoQuestionData = true
                        }
                        this.currentPage = data['_meta']['currentPage']
                        this.maxPage = data['_meta']['pageCount']
                        this.content = data['content']
                        this.loading = false
                    },
                    () =>{
                        this.loading = false
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
        }
    }

</script>

<style lang="stylus" scoped>
    .issue-wrapper
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
        .to-question
            margin 2rem auto
            width 85%
            max-width 720px
            padding 2rem 0
            border-bottom: 1px solid #ebf2f6;
            position: relative
            a
                color mediumseagreen
        article
            width 85%
            max-width 720px
            margin 2rem auto
            padding 2rem 0
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
            .el-icon-warning
                color orangered
            .el-icon-success
                color mediumseagreen
            h5
                font-size 2rem
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