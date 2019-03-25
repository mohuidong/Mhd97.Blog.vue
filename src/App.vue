<template>
  <div id="app">
      <div id="nav-headed">

      </div>
      <transition name="el-zoom-in-bottom">
          <router-view class="router_view"/>
      </transition>
  </div>
</template>
<script>
    export default {
        name: 'home',
        data(){
            return{
                activeIndex2:'1',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>
<style lang="stylus">

</style>
