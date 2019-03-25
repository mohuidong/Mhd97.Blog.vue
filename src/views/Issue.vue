<template>
    <div class="Issue">
        <myNav :ceiling="ceiling"></myNav>
    </div>
</template>

<script>
    import myNav from '@/components/nav'
    import myFooter from '@/components/footer'
    import axios from 'axios'
    export default {
        name: "Issue",
        components:{
            myNav,
            myFooter
        },
        data:function(){
            return {
                ceiling:false,
            }
        },
        created:function () {
            this.listenScroll()
            // axios.get('/v1/issue/'+this.$route.params['id']+'?debug=1').then(
            //     (res)=>{
            //         const data = res.data
            //         this.img = data['label_img']
            //         this.title = data['title']
            //         this.time = this.handleFormatDateMinuteSec(data['created_at'])
            //         this.content = data['content']
            //         this.loading = false
            //     },
            //     () =>{
            //         this.loading = false
            //
            //     }
            // )


        },
        methods:{
            listenScroll:function () {
                window.onscroll = ()=>{
                    if(document.documentElement.scrollTop > 0){
                        this.ceiling = true
                    }else {
                        this.ceiling = false
                    }
                }
            },
        }
    }

</script>

<style lang="stylus" scoped>

</style>