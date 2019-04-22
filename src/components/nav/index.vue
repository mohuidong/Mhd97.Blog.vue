<template>
    <div id="nav" :class="{ceiling:ceiling}">
        <el-row>
            <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
                <div class="Non-existent"><p>占位符</p></div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                <div id="app_nav">
                    <ul id="app_nav_ul">
                        <li class="app_nav_li" v-if="isLoginStatus"><a href="javascript:;" @click="loginOut()">退&nbsp;&nbsp;出</a></li>
                        <li class="app_nav_li" v-else><router-link to="/login">登&nbsp;&nbsp;录</router-link></li>
                        <li class="app_nav_li active"><router-link to="/homeIndex">主&nbsp;&nbsp;页</router-link></li>
                        <li class="app_nav_li"><router-link to="/class">分&nbsp;&nbsp;类</router-link></li>
                        <li class="app_nav_li"><router-link to="/issue">问&nbsp;&nbsp;答</router-link></li>
                        <li class="app_nav_li" v-if="isLoginStatus"><router-link to="/me">我&nbsp;&nbsp;的</router-link></li>
                        <li class="app_nav_li"><router-link to="/about">关&nbsp;&nbsp;于</router-link></li>
                        <li class="app_nav_li"><router-link to="/reward">打&nbsp;&nbsp;赏</router-link></li>
                    </ul>
                </div>
            </el-col>
            <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
                <div class="Non-existent"><p>占位符</p></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:['ceiling'],
        data(){
            return {
                isLoginStatus : false,
            }
        },
        methods: {
            isLogin:function () {
                let token = localStorage.getItem('access_token');
                if (token !== null) {
                    this.isLoginStatus = true;
                }
            },
            loginOut:function () {
                localStorage.removeItem('access_token');
                let token = localStorage.getItem('access_token');
                if (token === null) {
                    this.isLoginStatus = false;
                }
            }
        },
        created:function () {
            this.isLogin()
        },
    }
</script>

<style lang="stylus" scoped>
#nav
    position: fixed
    width 100%
    top 0
    right: 0;
    z-index 100
    &.ceiling
        opacity 0.85
        background: #fff
        border-bottom: 1px solid #bababa;
        #app_nav .app_nav_li a
            color: #333
            &:hover
                text-shadow none
                &:after
                    border-bottom: 0.6rem solid #333;

    #nav-bottom
        height 100%
        width 100%
    //空白的占位符
    .Non-existent>p
        color transparent
        height 6rem
    #app-headed
        a
            text-decoration none
    #app_nav
        #app_nav_ul
            width 100%
            min-width 575px
            height 6rem

        .app_nav_li
            float left
            list-style none
            height 3rem
            //background-color black
            line-height 50px
            padding 1rem 1rem
            position:relative
        a,a:link
            color #fff
            font-size 1.5rem
            text-decoration none
            text-align center
        //三角下标
        a:after
            content ""
            width 0px
            height 0px
            border-right:0.6rem solid transparent
            border-left:0.6rem solid transparent
            border-bottom:0.6rem solid transparent
            position: absolute
            transform scale(0,0)
            bottom: 0
            left: 45%
            transition: all .3s
        a:hover:after
            left: 45%
            width 0
            transform scale(1,1)
            border-right:0.6rem solid transparent
            border-left:0.6rem solid transparent
            border-bottom:0.6rem solid #fff
        //background #2bff64
        a:hover,a:focus
            //font-weight bold
            color #fff
            text-shadow 2px 2px #000
            transition: all .2s
        //height: 0px;
        a:focus:after,a:active:after
            left: 45%
            width 0
            transform scale(1,1)
            border-right:0.6rem solid transparent
            border-left:0.6rem solid transparent
            border-bottom:0.6rem solid #fff
</style>
