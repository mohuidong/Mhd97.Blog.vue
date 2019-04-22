<template>
    <div class="Issue">
        <myNav :ceiling="ceiling"></myNav>
        <div class="issue-wrapper">
            <img class="bg" src="../assets/images/issue.jpg" alt="" >
        </div>
        <main v-loading="!first && loading">
            <div class="question-input">
                <h1>发起提问</h1>
                <el-tag type="danger">TIP:只有登陆用户才可以提交哦</el-tag>
                <el-form  label-width="80px" :model="question" status-icon :rules="rules" ref="question">
                    <el-form-item label="标题" prop="title">
                        <el-input
                                type="text"
                                v-model="question.title"
                                placeholder="请输入标题">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                :autosize="{ minRows: 5, maxRows: 10}"
                                v-model="question.content">
                        </el-input>
                    </el-form-item>
                    <el-button type="primary" plain @click="submitForm('question')">提交</el-button>
                </el-form>
            </div>
        </main>
    </div>
</template>

<script>
    import myNav from '@/components/nav'
    import myFooter from '@/components/footer'
    import axios from '../axios/index'
    export default {
        name: "Issue",
        components:{
            myNav,
            myFooter
        },
        data:function(){
            var validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('不写标题谁知道？'));
                } else if(value.length > 55){
                    callback(new Error('请输入不超过55位字符'));
                } else {
                    callback();
                }
            };
            var validateContent = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入内容'));
                } else {
                    callback();
                }
            };
            return {
                ceiling:false,
                first:true,
                loading:false,
                question:{
                    title:'',
                    content:'',
                },
                rules:{
                    title:[{validator:validateTitle,trigger:'blur'}],
                    content:[{validator:validateContent,trigger:'blur'}],
                },
            }
        },
        created:function () {
            this.listenScroll()
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
            submitForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/v1/issues?',{
                            title:this.question.title,
                            content:this.question.content,
                        }).then(function(response){
                            if (response.status === 200) {
                                vm.$elementMessage('创建成功,等待管理员审核', 'success')
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
        .el-tag
            margin 2rem auto
        .question-input
            margin 2rem auto
            width 85%
            max-width 720px
            padding 2rem 0
            border-bottom: 1px solid #ebf2f6;
            position: relative
            .el-button
                margin-left 2rem

</style>