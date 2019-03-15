<template>
    <div class="login">
        <el-container>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="login">
                    <el-main>
                        <!--<el-row><img src="../assets/images/loginicon.png" alt="" width="100%"></el-row>-->
                        <el-form  label-width="80px" :model="loginuser" status-icon :rules="rules" ref="loginuser">
                            <el-form-item label="用户名：" prop="username">
                                <el-col :span="6">
                                    <el-input v-model="loginuser.username"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="密  码：" prop="password">
                                <el-col :span="6">
                                <el-input v-model="loginuser.password" type="password"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item id="loginbutton">
                                <el-button type="primary" @click="submitform('loginuser')"><router-link to="/userindex">登录</router-link></el-button>
                                <!-- <el-button type="primary" @click="submitform('loginuser')">登录</el-button> -->
                                <el-button type="danger" ><router-link to="forgetpass">忘记密码？</router-link></el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">注册
                    <el-main>
                        <!--<el-row><img src="../assets/images/loginicon.png" alt="" width="100%"></el-row>-->
                        <el-form  label-width="80px" :model="register" status-icon :rules="rulesRes" ref="register">
                            <el-form-item label="用户名：" prop="username">
                                <el-input v-model="register.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密  码：" prop="password">
                                <el-input v-model="register.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item id="registerbutton">
                                <el-button type="primary"  @click="submitform('register')"><router-link to="/register">注册</router-link></el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-tab-pane>
            </el-tabs>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Login" ,
        data(){
            //登录用户名验证
            var validateUser=(rule,value,callback)=>{
                if (value==='') {
                    callback(new Error('请输入用户名'));
                }else if(value.length<4||value.length>16){
                    callback(new Error('用户名长度不符'));
                }else{
                    callback();
                }
            };
            //登录密码验证
            var validatePass=(rule,value,callback)=>{
                if (value==='') {
                    callback(new Error('请输入密码！'));
                }else{
                    callback();
                }
            };

            var validateRePass=(rule,value,callback)=>{
                if (value==='') {
                    callback(new Error('请输入密码！'));
                }else{
                    callback();
                }
            };
            return{
                loginuser:{
                    username:'',
                    password:''
                },
                register:{
                    username:'',
                    password:''
                },

                rules:{
                    username:[{validator:validateUser,trigger:'blur'}],
                    password:[{validator:validatePass,trigger:'blur'}],
                },
                rulesRes:{
                    username:[{validator:validateUser,trigger:'blur'}],
                    password:[{validator:validatePass,trigger:'blur'}],
                    repassword:[{validator:validateRePass,trigger:'blur'}],
                },
                activeName: 'login'
            };
        },
        methods:{
            submitform(forname){
                this.$refs[forname].validate((valid) =>{
                    if (valid) {
                        alert('提交成功');
                        axios.post('../api/connect.php/connect/test',{
                        username:this.loginuser.username,
                        password:this.loginuser.password
                          }).then(function(response){
                            console.log(response.body.data);
                          }).catch(function(error){
                            console.log(error.response);
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

<style scoped>

</style>