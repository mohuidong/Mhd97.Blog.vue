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
            <div class="article-reply">
                <div class="reply-header">
                    <h1>评论 <el-button style="float: right" @click="likesUp()" type="primary"><span v-if="isLikes">已点赞{{likes}}</span><span v-else>点赞{{likes}}</span></el-button></h1>
                </div>
                <div class="reply-body">
                    <ul class="reply-list" v-for="(item) in reply" :key="item['reply_id']">
                        <li class="reply-item">
                            <span class="name">{{item['userName']}}</span>
                            |
                            <span class="time">{{handleFormatDateMinuteSec(item['created_at'])}}</span>
                            <br/>
                            <p>{{item['content']}}</p>
                        </li>
                    </ul>
                    <div class="reply-input">
                        <el-form  label-width="80px" :model="sendReply" status-icon :rules="rules" ref="sendReply">

                                <el-input
                                        type="textarea"
                                        placeholder="请输入内容"
                                        :autosize="{ minRows: 3, maxRows: 10}"
                                        v-model="sendReply.replyContent">
                                </el-input>


                                <el-button type="primary" plain @click="submitForm('sendReply')">提交</el-button>

                        </el-form>
                    </div>
                </div>
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
        name: "Article",
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
                img:'',
                title:'',
                time:'',
                content:'',
                likes:'',
                loading:true,
                textArea:'',
                isLikes:false,
                sendReply:{
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
            this.getData(1)
            this.isLikesUp()
            axios.get('/v1/posts/'+this.$route.params['id']+'?').then(
                (res)=>{
                    const data = res.data
                    this.img = data['label_img']
                    this.title = data['title']
                    this.time = this.handleFormatDateMinuteSec(data['created_at'])
                    this.content = data['content']
                    this.likes = data['likes']
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
            getData:function (page) {
                this.loading = true
                axios.get('/v1/replies/'+this.$route.params['id'] +'?perPage=5&page='+page).then(
                    (res)=>{
                        const data = res.data
                        this.reply = [...data['items']]
                        this.currentPage = data['_meta']['currentPage']
                        this.maxPage = data['_meta']['pageCount']
                        this.loading = false
                        this.first = false
                    },
                    (err)=>{
                        this.loading = false
                        this.first = false
                    }
                )
            },
            likesUp:function () {
                axios.post('/v1/posts/likes?id='+this.$route.params['id']).then(
                    (res)=>{
                        if (res.data.likes_status === 1) {
                            this.likes += 1;
                            this.isLikes = true;
                            this.$elementMessage('感谢大佬的肯定', 'success')
                        }else if (res.data.likes_status === 2) {
                            this.likes -= 1;
                            this.isLikes = false;
                            this.$elementMessage('这真是一个该死的消息', 'info')
                        }
                        
                    },
                    (err)=>{
                        if (err.data.status === 401) {
                            this.$elementMessage('请先登陆', 'warning')
                        } else {
                            this.$elementMessage('操作失败请联系管理员', 'warning')
                        }

                    }
                )
            },
            isLikesUp:function () {
                let token = localStorage.getItem('access_token');
                if (token !== null) {
                    axios.get('/v1/likes/'+this.$route.params['id']+'?').then(
                        (res)=>{
                            if (res.data.status === 1) {
                                this.isLikes = true
                            }
                        },
                        (err)=>{
                            this.$elementMessage('出现一点小问题', 'warning')
                        }
                    )
                }
            },
            submitForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/v1/replies?id=' + this.$route.params['id'],{
                            replyContent:this.sendReply.replyContent,
                        }).then(function(response){
                            if (response.status === 200) {
                                vm.$elementMessage('评论成功', 'success');
                                location.reload()
                            } else {
                                vm.$elementMessage('网络错误请联系管理员', 'warning')
                            }
                        }).catch(function(error){
                            vm.$elementMessage('评论失败', 'warning')
                        });
                    } else {
                        alert('有信息填写错误请重新填写');
                        return false;
                    }
                });
            },
        }
    }

</script>
<style>
pre{
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: auto;
}
code, kbd, pre, samp {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
p {
    margin: 0 0 10px;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: 'Source Sans Pro',sans-serif;
}
h2, .h2 {
    font-size: 30px;
}
h1, .h1, h2, .h2, h3, .h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
}

h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
</style>
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
    .reply-input
        margin-top 20px
        .el-button
            margin-top 20px

</style>
