<template>
    <div  id="home-content" class="homeIndex">
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="home_body">
            <el-row>
                <el-container>
                    <el-main>
                        <el-container :key="index" v-for="(item,index) in 5" class="text_card">
                            <el-main>
                                <div >
                                    <h2>标题{{item}}</h2><hr>
                                    <div>
                                    </div>
                                </div>
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>
            </el-row>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "HomeIndex",

    }
</script>

<style scoped>

</style>
