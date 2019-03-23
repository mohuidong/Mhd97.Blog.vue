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
        <el-row>
            <el-col class="zhanwei" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div id="nav-top">
                    <transition>
                        <p :class="H1_class" id="H1_id">Mhd97<br>非淡泊无以明志 非宁静无以致远</p>
                    </transition>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div id="home-arrow-down">
                <transition>
                <i :class="homeArrowDown"></i>
                </transition>
            </div>
        </el-row>
        <router-view></router-view>
    </div>
</template>

<script>
    import homeindex from '@/components/home/HomeIndex.vue'
    export default {
        name: "Myhome",
        components: {
            homeindex,
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
        },
    }
</script>

<style scoped>

</style>