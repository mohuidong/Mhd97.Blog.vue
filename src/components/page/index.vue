<template>
    <div class="page">
        <span
                :class="{'page-button':true,'hide':currentPage===1}"
                @click="()=>{ this.$emit('pageTurning','prevPage') }"
        >← Newer Post</span>
        <span> Page {{currentPage}} of {{maxPage}} </span>
        <span
                :class="{'page-button':true,'hide':maxPage===currentPage}"
                @click="()=>{ this.$emit('pageTurning','nextPage') }"
        >Older Post →</span>
    </div>
</template>
<script>
    export default {
        name: "page",
        props:[
            'currentPage',
            'maxPage',
        ]
    }
</script>

<style lang="stylus" scoped>
    .page
        width 85%
        max-width 720px
        margin 0 auto
        padding-bottom 2rem
        display: flex
        justify-content space-between
        color: #9eabb3
        .page-button
            padding: 6px 15px;
            border: 1px solid #bfc8cd;
            border-radius: 4px;
            cursor pointer
            &.hide
                visibility hidden

</style>
