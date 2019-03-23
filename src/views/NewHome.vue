<template>
    <div>
        <myNav></myNav>
        <div class="bg-wrapper">
            <img class="bg" src="../assets/images/bg.jpg" alt="" >
            <div class="slogan">
                <transition>
                    <p :class="H1_class" id="H1_id">Mhd97<br>非淡泊无以明志 非宁静无以致远</p>
                </transition>
            </div>
            <div class="down">
                <transition>
                    <i :class="homeArrowDown"></i>
                </transition>
            </div>
        </div>




        <el-row>
            <div id="home-arrow-down">
                <transition>
                    <i :class="homeArrowDown"></i>
                </transition>
            </div>
        </el-row>

    </div>

</template>

<script>
    import myNav from '@/components/nav/index.vue'
    export default {
        name: "NewHome",
        components: {
            myNav,
        },
        data(){
            return{
                H1_class:'H1_class',
                homeArrowDown:'el-icon-arrow-down',
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
            this.homeArrowDown = 'el-icon-arrow-down animated wobble';
            this.H1_class='H1_class animated lightSpeedIn';
        }

    }
</script>

<style lang="stylus" scoped>
    .bg-wrapper
        position: relative
        width:100%
        max-height: 100vh;
        overflow hidden
        img.bg
            width:100%
            max-height 100%
        .slogan
            position: absolute
            top 0
            left 0
            width:100%
            height 100%
            z-index 1
        .down
            position: absolute
            left: 0
            buttom 50px

</style>
