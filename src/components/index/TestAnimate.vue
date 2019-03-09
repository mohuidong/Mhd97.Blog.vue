
<template>
    <transition>
        <div :class="animate_class" @click="fade">bounceInUp</div>
    </transition>
</template>

<script>
    export default {
        name:'FadeAnimation',
        data(){
            return {
                animate_class:'',
            }
        },
        methods:{
            fade:function(){
                this.animate_class='test_animate animated bounceOut';
            }
        },
        created:function () {
            this.animate_class='test_animate animated fadeInLeftBig';
        },
    }
</script>
