<template>
    <footer>
        <span class="footer-left">
            <a href="https://beian.miit.gov.cn">© 2020 mhd97.top 版权所有 桂ICP备18009232号-1</a>
        </span>
        <span class="footer-right">
            Proudly Made By
            <a href="https://github.com/mohuidong/Mhd97.Blog.vue">MoHuiDong(914685196@qq.com)</a>
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
