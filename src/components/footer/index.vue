<template>
    <footer>
        <span class="footer-left">
            <a href="javascript:;">rbs负责人博客</a>
            © 2019
        </span>
        <span class="footer-right">
            Proudly Made By
            <a href="javascript:;">大神莫惠东</a>
        </span>
    </footer>

</template>

<script>
    export default {
        name: "myFooter",
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
