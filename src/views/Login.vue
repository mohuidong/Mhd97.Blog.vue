<template>
    <div class="login">
        <el-container>
            <el-header><router-link to="/"><i class="el-icon-arrow-left"></i></router-link>欢迎登陆</el-header>
            <el-main>
                <el-row><img src="" alt="" width="100%"></el-row>
                <el-form  label-width="80px" :model="loginuser" status-icon :rules="rules" ref="loginuser">
                    <el-form-item label="用户名：" prop="username">
                            <el-input v-model="loginuser.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密  码：" prop="password">
                        <el-input v-model="loginuser.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item id="loginButton">
                        <el-button type="primary" @click="submitform('loginuser')">登录</el-button>
                        <!-- <el-button type="primary" @click="submitform('loginuser')">登录</el-button> -->
                        <el-button type="danger" ><router-link to="forget">忘记密码？</router-link></el-button>
                        <el-button type="primary" ><router-link to="register">注册</router-link></el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios/index'
    import { mapMutations } from 'vuex';
    export default {
        name: "Login" ,
        data(){
            //用户名验证
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确的手机号码'));
                    }
                    callback();
                }
            };
            //密码验证
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(value.length<4||value.length>16){
                    callback(new Error('请输入6到16位字符'));
                } else {
                    // if (this.newRag.password !== '') {
                    //   this.$refs.newRag.validateField('password');
                    // }
                    callback();
                }
            };
            return{
                loginuser:{
                    username:'',
                    password:''
                },

                rules:{
                    username:[{validator:validateUser,trigger:'blur'}],
                    password:[{validator:validatePass,trigger:'blur'}],
                },
                activeName: 'login',
                token:'',
                uid:'',
                username:''
            };
        },
        methods:{
            ...mapMutations(['changeLogin']),
            submitform(forname){
                let vm = this
                this.$refs[forname].validate((valid) =>{
                    if (valid) {
                        axios.post('/v1/sessions?',{
                        username:this.loginuser.username,
                        password:this.loginuser.password
                          }).then(function(response){
                              if (response.status === 200) {
                                  let resData = response.data;
                                  vm.token = resData['access_token'];
                                  vm.changeLogin({access_token:vm.token});
                                  vm.$router.push({  //核心语句
                                      path:'/',   //跳转的路径
                                  })
                              }
                          }).catch(function(error){
                            let errorInfo = error.message
                            vm.$elementMessage(errorInfo, 'warning')
                          });
                    }else{
                        alert('请重新填写正确的信息');
                        return false;
                    }
                });
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }

        },
    }
</script>

<style lang="stylus" scoped>
    .el-container
        margin:auto;
        width: 30%;
        font-weight: bold;

    .el-main
        font-size: 36px;
        #loginButton a
            color white

    .el-header
        margin-top 200px
        color: #333;
        font-size: 23px;
        text-align: center;
        line-height: 60px;

    .el-header i
        float: left;
        line-height: 60px;

</style>