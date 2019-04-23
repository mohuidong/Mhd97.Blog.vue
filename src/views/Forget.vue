<template>
    <div class="Forget">
        <el-container>
            <el-header><router-link to="login"><i class="el-icon-arrow-left"></i></router-link>找回密码</el-header>
            <el-main>
                <el-row><img src="" alt="" width="100%"></el-row>
                <el-form  label-width="80px" :model="forget" status-icon :rules="rules" ref="forget">
                    <el-form-item label="用户名：" prop="username">
                            <el-input v-model="forget.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密  码：" prop="password">
                        <el-input v-model="forget.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item id="forgetButton">
                        <el-button type="primary" @click="submitform('forget')">提交</el-button>
                        <!-- <el-button type="primary" @click="submitform('loginuser')">登录</el-button> -->
                        <el-button type="danger" ><router-link to="login">去登陆</router-link></el-button>
                        <el-button type="primary" ><router-link to="register">注册</router-link></el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios/index'
    export default {
        name: "Forget" ,
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
                }else if(value.length < 6|| value.length > 16){
                    callback(new Error('请输入6到16位字符'));
                } else {
                    callback();
                }
            };
            return{
                forget:{
                    username:'',
                    password:''
                },

                rules:{
                    username:[{validator:validateUser,trigger:'blur'}],
                    password:[{validator:validatePass,trigger:'blur'}],
                },
            };
        },
        methods:{
            submitform(forname){
                let vm = this
                this.$refs[forname].validate((valid) =>{
                    if (valid) {
                        axios.put('/v1/users/reset?',{
                        username:this.forget.username,
                        password:this.forget.password
                          }).then(function(response){
                              if (response.status === 200) {
                                  vm.$elementMessage('修改成功', 'success')
                              }
                          }).catch(function(error){
                              console.log(error)
                            // vm.$elementMessage(error.message, 'warning')
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
        #forgetButton a
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