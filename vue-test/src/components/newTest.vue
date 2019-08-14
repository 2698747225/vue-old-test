<template>
  <div>
    <newC :data="attrTest" :test="attrTest" pp="1"></newC>
    <div v-ee="1"></div>
  </div>
</template>
<script>
import newC from "./newChidren";
export default {
  components: {
    newC
  },
  data() {
    return {
      attrTest: 1
    };
  },
  directives: {
    ee: {
      inserted: function(el, binding) {
        console.log(el);
        console.log(binding);
      }
    }
  }
};
</script>
