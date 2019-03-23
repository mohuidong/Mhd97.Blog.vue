<template>
    <div id="nav">
        <el-row>
            <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
                <div class="Non-existent"><p>占位符</p></div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                <div id="app_nav">
                    <ul id="app_nav_ul">
                        <li class="app_nav_li"><router-link to="">登&nbsp;&nbsp;录</router-link></li>
                        <li class="app_nav_li active"><router-link to="/homeIndex">主&nbsp;&nbsp;页</router-link></li>
                        <li class="app_nav_li"><router-link to="/homePost">我的文章</router-link></li>
                        <li class="app_nav_li"><router-link to="">给我留言</router-link></li>
                        <li class="app_nav_li"><router-link to="">正在开发</router-link></li>
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
        // data(){
        //     return{
        //         H1_class:'H1_class',
        //         homeArrowDown:'el-icon-arrow-down',
        //         activeIndex2:'1',
        //     }
        // },
        // methods: {
        //     handleSelect(key, keyPath) {
        //         console.log(key, keyPath);
        //     }
        // },
        created:function () {
            // //进入页面animated插件特效
            // this.homeArrowDown = 'el-icon-arrow-down animated wobble';
            // this.H1_class='H1_class animated lightSpeedIn';
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
