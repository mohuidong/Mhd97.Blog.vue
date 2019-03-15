<template>
  <div class="home">
    <el-row>
      <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="Non-existent"><p>占位符</p></div>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="home_body">
        <el-row>
          <el-container>
            <el-aside class="home_menu">
              <el-card>
                <router-link to="/">test</router-link>
              </el-card>
              <calendar></calendar>
            </el-aside>
            <el-main>
              <el-container v-for="item in 5" class="text_card">
                <el-aside width="10rem">
                  这里会是一个图片
                </el-aside>
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
      <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="Non-existent"><p>占位符</p></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Row_Header from '@/components/index/Header.vue'
import calendar from '@/components/index/calendar.vue'
import homeIndex from '@/components/home/HomeIndex.vue'

export default {
  name: 'home',
  components: {
      HelloWorld,
      Row_Header,
      calendar,
      homeIndex,
  },
  beforeCreate:{

  },
  methods:{

  }
}
</script>
