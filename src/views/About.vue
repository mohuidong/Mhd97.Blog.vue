<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!--<TestDemo></TestDemo>-->
    <!--<hr/>-->
    <!--<TestAnimate>lalalla</TestAnimate>-->
  </div>

</template>
<script>
  import TestDemo from '@/components/index/TestDemo.vue'
  import TestAnimate from '@/components/index/TestAnimate.vue'
  export default {
  name: 'About',
    components: {
      TestDemo,
        TestAnimate
    }
  }
</script>
