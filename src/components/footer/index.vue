<template>
    <footer>
        <span class="footer-left">
            <a href="javascript:;">Mhd97.top</a>
            
            © 2019 mhd97.top 版权所有 桂ICP备18009232号

        </span>
        <span class="footer-right">
            Proudly Made By
            <a href="javascript:;">Mohuidong</a>
        </span>
    </footer>

</template>

<script>
    export default {
        name: "myFooter",
        data:function () {
            return {
                footerData:[],
            }
        },
        // created:function () {
        //     this.getFooterData()
        // },
        // methods: {
        //     getFooterData:function () {
        //         axios.get('/v1/system-settings?').then(
        //             (res)=>{
        //                 this.footerData = res.data
        //                 this.first = false
        //             },
        //             ()=>{
        //                 this.first = false
        //             }
        //         )
        //     },
        // }
    }
</script>

<style lang="stylus" scoped>
    footer
        display: flex
        justify-content space-between
        font-size: .75em;
        color: #bbc7cc;
        padding: 1em 15px;
        a
            text-decoration: none;
            color: #2c3e50;
</style>