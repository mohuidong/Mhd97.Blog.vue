<template>
    <div class="issue-question" v-loading="loading">
        <myNav :ceiling="ceiling"></myNav>
        <div class="question-wrapper">
            <img class="bg" src="../assets/images/issue.jpg" alt="" >
        </div>
        <main v-loading="!first && loading">
            <div class="title">
                <h3>
                    <span v-if="issueData.status == 1">
                        <i class="el-icon-warning" ></i>
                    </span>
                    <span v-else-if="issueData.status == 2">
                            <i class="el-icon-error" ></i>
                    </span>
                    <span v-else-if="issueData.status == 3">
                            <i class="el-icon-success" ></i>
                    </span>
                    {{issueData.question}}
                    <router-link to="/issue" style="float: right"><i class="el-icon-back" >列表</i></router-link>
                </h3>
                <div class="avatar" :style="{backgroundImage:'url('+ avatar +')'}"></div>
                <div class="time">
                    {{issueData.nickname}} | {{this.handleFormatDateMinuteSec(issueData.created_at)}}
                </div>
            </div>
            <div class="content" v-html="issueData.content"></div>

            <div class="issue-answer-header">
                <h1>回答</h1>
            </div>
            <div class="issue-answer-best" v-if="bestId > 0">
                <el-card class="box-card">
                    <h2>最优回答</h2>
                    <h4>{{bestData.nickname}} | {{handleFormatDateMinuteSec(bestData.created_at)}}</h4>
                    <p>{{bestData.answer}}</p>
                </el-card>
            </div>
            <div class="issue-answer">
                <article v-for="(item) in answerData" :key="item['id']">
                    <div class="answer-avatar" :style="{backgroundImage:'url('+ item.avatar +')'}"></div>
                    <div class="answer-title">
                        <h4>{{item['nickname']}} | {{handleFormatDateMinuteSec(item['created_at'])}} <i style="float: right" @click="pick(item.id)" class="el-icon-success" v-if="isQuestioner == 1">采纳</i></h4>
                    </div>
                    <p>{{item['answer']}}</p>
                </article>
            </div>

            <div class="no-answerData" v-if="isNoAnswerData">
                <br>
                <h2>抱歉，暂时没有人回答。</h2>
                <br>
                <h2>抱歉，暫時沒有人回答。</h2>
                <br>
                <h2>Sorry, no one answered.</h2>
                <br>
                <h2>すみません、誰も答えませんでした。</h2>
                <br>
                <h2>죄송합니다. 아무도 대답하지 않았습니다.</h2>
                <br>
            </div>

            <div class="issue-answer-reply">
                <el-form  label-width="80px" :model="sendAnswer" status-icon :rules="rules" ref="sendAnswer">
                    <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :autosize="{ minRows: 3, maxRows: 10}"
                            v-model="sendAnswer.replyContent">
                    </el-input>
                    <el-button type="primary" plain @click="submitForm('sendAnswer')">提交</el-button>
                </el-form>
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
        name: "Question",
        components:{
            myNav,
            myFooter
        },
        data:function(){
            var validateReply = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }else if(value.length > 55){
                    callback(new Error('请输入不超过55位字符'));
                }else {
                    callback();
                }
            };
            return {
                ceiling:false,
                avatar:'',
                bestId:'',
                issueData:[],
                answerData:[],
                bestData:[],
                currentPage:'',
                first:true,
                loading:true,
                isNoIssueData:'',
                isNoAnswerData:'',
                isQuestioner:false,
                sendAnswer:{
                    replyContent:''
                },
                reply:[],

                rules:{
                    replyContent:[{validator:validateReply,trigger:'blur'}],
                },
            }
        },
        created:function () {
            this.listenScroll()
            this.getIssueData()
            this.getAnswerData(1)
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
            getIssueData:function () {
                axios.get('/v1/issues/'+ this.$route.params['id']+'?').then(
                    (res)=>{
                        this.issueData = res.data;
                        this.isNoIssueData = false;
                        if (this.issueData.length === 0) {
                            this.isNoIssueData = true
                        }
                        this.bestId = this.issueData.best_id;
                        this.isQuestioner = this.issueData.isWriter;
                        if (this.bestId > 0) {
                            this.getBestAnswerData()
                        }
                        this.avatar = this.issueData.avatar;
                    },
                    () =>{
                        this.loading = false

                    }
                )
            },
            getAnswerData:function (page) {
                axios.get('/v1/answers?id='+ this.$route.params['id']+'&perPage=20&page=' + page).then(
                    (res)=>{
                        const data = res.data;
                        this.answerData = [...data['items']];
                        this.currentPage = data['_meta']['currentPage'];
                        this.maxPage = data['_meta']['pageCount'];
                        this.isNoAnswerData = false;
                        if (this.answerData.length === 0) {
                            this.isNoAnswerData = true
                        }
                        this.loading = false
                    },
                    () =>{
                        this.loading = false

                    }
                )
            },
            getBestAnswerData:function () {
                axios.get('/v1/answers/'+ this.$route.params['id']+'?').then(
                    (res)=>{
                        this.bestData = res.data
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
            submitForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/v1/answers?id=' + this.$route.params['id'],{
                            replyContent:this.sendAnswer.replyContent,
                        }).then(function(response){
                            if (response.status === 200) {
                                vm.$elementMessage('谢谢你的回答', 'success')
                                location.reload()
                            } else {
                                vm.$elementMessage('网络错误请联系管理员', 'warning')
                            }
                        }).catch(function(error){
                            vm.$elementMessage('好像是出了一点意外', 'warning')
                        });
                    } else {
                        alert('有信息填写错误请重新填写');
                        return false;
                    }
                });
            },
            pick:function (answer) {
                let vm = this
                axios.put('/v1/issues/' + this.$route.params['id'] + '?answer=' + answer)
                    .then(function(response){
                    if (response.status === 200) {
                        vm.$elementMessage('哇，终于找到答案了', 'success')
                        location.reload()
                    } else {
                        vm.$elementMessage('网络错误请联系管理员', 'warning')
                    }
                }).catch(function(error){
                    vm.$elementMessage('好像是出了一点意外', 'warning')
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .question-wrapper
        position: relative
        width:100%
        max-height: 100vh;
        overflow hidden
        img.bg
            width:100%
            max-height 100%

    main
        max-width 710px
        width:85%
        margin: 4rem auto;
        text-align left
        .title
            h3
                color: #2e2e2e;
                font-size: 2.6rem;
                font-weight: 700;
                padding-bottom 1.5rem
                .el-icon-warning
                    color orangered
                .el-icon-success
                    color mediumseagreen
                a
                    color darkgray
            .time
                color: #9eabb3;
                line-height: 2.2rem;
                font-size: 1.8rem;
                float:left;
                padding-top 0.4 rem
                padding-left 1 rem
            .avatar
                border-radius 50%
                width  3 rem;
                height 3 rem;
                background-position center center
                background-repeat no-repeat
                background-size cover
                float:left;
        .content
            margin: 5rem 0;
            font-size: 1.2rem;
        .issue-answer
            font-size  1.2rem
            .answer-avatar
                border-radius 50%
                width  2 rem;
                height 2 rem;
                background-position center center
                background-repeat no-repeat
                background-size cover
                float:left;
            .answer-title
                line-height: 2rem;
                padding-left 3rem
            p
                padding 0.5 rem
            article
                margin 1.5 rem
        .issue-answer-best
            margin 1rem
            h2
                color  mediumseagreen
        .reply-input
            margin-top 20px
        .el-button
            margin-top 20px
</style>