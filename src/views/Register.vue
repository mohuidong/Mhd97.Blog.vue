<template>
    <div class="register">
        <el-container>
            <el-header><router-link to="Login"><i class="el-icon-arrow-left"></i></router-link>欢迎注册</el-header>
            <el-main>
                <el-form :model="newRag" status-icon :rules="rules" ref="newRag" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="username">
                        <el-input type="text" v-model="newRag.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="newRag.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repassword">
                        <el-input type="password" v-model="newRag.repassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('newRag')">提交</el-button>
                        <el-button @click="resetForm('newRag')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios/index'
    export default {
        data (){
            //用户名验证
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }else if(value.length<6||value.length>16){
                    callback(new Error('请输入4到16位字符'));
                }else {
                    callback();
                }
            };
            //密码验证
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(value.length<4||value.length>16){
                    callback(new Error('请输入4到16位字符'));
                } else {
                    // if (this.newRag.password !== '') {
                    //   this.$refs.newRag.validateField('password');
                    // }
                    callback();
                }
            };
            //第二次密码验证
            var validateRePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.newRag.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                newRag:{
                    username:'',
                    password:'',
                    repassword:'',
                },
                rules:{
                    username:[ { validator: validateUser, trigger: 'blur' }],
                    password:[ { validator: validatePass, trigger: 'blur' }],
                    repassword:[ { validator: validateRePass, trigger: 'blur' }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/v1/users?',{
                            username:this.newRag.username,
                            password:this.newRag.password,
                            rePassword:this.newRag.rePassword,
                        }).then(function(response){
                            if (response.status === 200) {
                                vm.$elementMessage('注册成功，快去登陆吧', 'success')
                            } else {
                                vm.$elementMessage('网络错误请联系管理员', 'warning')
                            }
                        }).catch(function(error){
                            vm.$elementMessage(error.response.data.message, 'warning')
                        });
                    } else {
                        alert('有信息填写错误请重新填写');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .el-container{
        margin:auto;
        width: 30%;
        font-weight: bold;
    }
    .el-main{
        font-size: 36px;
    }
    .el-header{
        margin-top 200px
        color: #333;
        font-size: 23px;
        text-align: center;
        line-height: 60px;
    }
    .el-header i{
        float: left;
        line-height: 60px;
    }
</style>