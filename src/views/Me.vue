<template>
    <div class="Me" v-loading="loading">
        <myNav :ceiling="ceiling"></myNav>
        <div class="me-wrapper">
            <img class="bg" src="../assets/images/smalllufei.jpg" alt="" >
        </div>
        <main>
            <div class="myInfo">
                <h1>我的信息</h1>

                <div class="MyInfo">
                    <el-tabs type="border-card">

                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 我的提问</span>
                            <article v-for="(item) in personIssueData" :key="item['id']">
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
                                    <span class="time">{{handleFormatDateMinuteSec(item['created_at'])}}</span>
                                </div>
                            </article>
                            <myPage
                                    :currentPage="currentPage"
                                    :maxPage="maxPage"
                                    @pageTurning="pageTurning"
                            ></myPage>
                        </el-tab-pane>

                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 修改头像</span>
                            <el-tag><i class="el-icon-warning"></i>点击更换头像</el-tag>
                            <el-upload
                                    class="avatar-uploader"
                                    :action="actionUrl"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :http-request="httpRequest"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-tab-pane>

                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 修改信息</span>
                            <el-main>
                                <el-form :model="userInfo" status-icon :rules="rules" ref="userInfo" label-width="100px">
                                    <el-form-item label="昵称" prop="nickname">
                                        <el-input type="text" v-model="userInfo.nick" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机" prop="phone">
                                        <el-input type="text" v-model="userInfo.phone" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input type="text" v-model="userInfo.email" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-main>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </main>
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
            var validateNickname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }else if(value.length<6||value.length>16){
                    callback(new Error('请输入4到16位字符'));
                }else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电话号码'));
                }else if(value.length<6||value.length>16){
                    callback(new Error('请输入4到16位字符'));
                }else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                }else if(value.length<6||value.length>16){
                    callback(new Error('请输入4到16位字符'));
                }else {
                    callback();
                }
            };
            return {
                actionUrl: '/api/v1/users/avatar?',
                fileReader: '',
                ceiling:false,
                userData:[],
                personIssueData:[],
                first:true,
                loading:true,
                currentPage:'',
                maxPage:'',
                isNoQuestionData:'',
                imageUrl:'',
                userId:'',
                userInfo:{
                    nick:'',
                    phone:'',
                    email:'',
                    avatar:'',
                },
                rules:{
                    nick:[ { validator: validateNickname, trigger: 'blur' }],
                    phone:[ { validator: validatePhone, trigger: 'blur' }],
                    email:[ { validator: validateEmail, trigger: 'blur' }],
                }
            }
        },
        created:function () {
            this.listenScroll()
            this.getUserData()
            this.getIssuePersonData(1)
        },
        mounted () {
            this.fileReader = new FileReader()
        } ,
        methods:{
            httpRequest (options) {
                let vm = this
                let file = options.file
                if (file) {
                    this.fileReader.readAsDataURL(file)
                }
                this.fileReader.onload = () => {
                    let base64Str = this.fileReader.result
                    console.log(base64Str)
                    axios.post('/v1/users/avatar?',{
                        img:base64Str,
                    }).then(res => {
                        vm.$elementMessage('更新成功', 'success')
                        location.reload()
                        })
                        .catch(err => {
                        vm.$elementMessage('网络错误请联系管理员', 'warning')
                        })
                }
            },
            pageTurning:function(operating){
                switch (operating) {
                    case 'prevPage':
                        this.getIssuePersonData(this.currentPage - 1)
                        return
                    case 'nextPage':
                        this.getIssuePersonData(this.currentPage + 1)
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
            getUserData:function () {
                this.loading = true
                axios.get('/v1/users?').then(
                    (res)=>{
                        this.userInfo = res.data
                        this.userId = this.userInfo['id'];
                        this.imageUrl = this.userInfo['avatar']
                    },
                    () =>{
                        this.loading = false
                    }
                )
            },
            getIssuePersonData:function (page) {
                this.loading = true
                axios.get('/v1/issues/person?perPage=5&page=' + page).then(
                    (res)=>{
                        const data = res.data
                        this.personIssueData = [...data['items']]
                        this.currentPage = data['_meta']['currentPage']
                        this.maxPage = data['_meta']['pageCount']
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
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submitForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('/v1/users/'+ vm.userId +'?',{
                            nick:this.userInfo.nick,
                            phone:this.userInfo.phone,
                            email:this.userInfo.email,
                        }).then(function(response){
                            if (response.status === 200) {
                                vm.$elementMessage('修改成功', 'success')
                            } else {
                                vm.$elementMessage('网络错误请联系管理员', 'warning')
                            }
                        }).catch(function(error){
                            vm.$elementMessage(error.message, 'warning')
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
    .me-wrapper
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
        .myInfo
            margin 2rem auto
            width 85%
            max-width 720px
            padding 2rem 0
            border-bottom: 1px solid #ebf2f6;
            position: relative
            h1
                margin-bottom 2rem
            .el-tag
                margin 1rem 0
            .avatar-uploader .el-upload
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            .avatar-uploader .el-upload:hover
                border-color: #409EFF;
            .avatar-uploader-icon
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            .avatar
                width: 178px;
                height: 178px;
                display: block;
            a
                color gray
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