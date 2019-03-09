<template>
  <div id="app">
      <div id="nav-headed">
          <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#0A425E"
                  text-color="#fff"
                  active-text-color="#fff"
                  router="true"
          >
              <!--<el-menu-item index="Home">主页</el-menu-item>-->
              <el-menu-item index="Myhome">主页</el-menu-item>
              <!--<el-submenu index="2">-->
                  <!--<template slot="title">我的工作台</template>-->
                  <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
                  <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
                  <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
                  <!--<el-submenu index="2-4">-->
                      <!--<template slot="title">选项4</template>-->
                      <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
                      <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
                      <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
                  <!--</el-submenu>-->
              <!--</el-submenu>-->
              <el-menu-item index="About">关于</el-menu-item>
              <el-menu-item index="Login">登录</el-menu-item>
          </el-menu>
      </div>
      <router-view class="router_view"/>
  </div>
</template>
<script>
    export default {
        name: 'home',
        data(){
            return{
                H1_class:'H1_class',
                activeIndex2:'1',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created:function () {
            //进入页面animated插件特效
            this.H1_class='H1_class animated lightSpeedIn';
        },
    }
</script>
<style lang="stylus">

</style>
