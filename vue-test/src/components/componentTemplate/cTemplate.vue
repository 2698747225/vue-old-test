<template>
  <div>
    <div>
      <input type="text" v-focus:param="'1111'">
    </div>
    <div>这是一个模板组件</div>
  </div>
</template>
<script>
export default {
  name: "ctemplate",
  created: function() {
    console.log(this.$attrs);
    console.log(this.$props);
  }
};
</script>
<style scoped>
</style>
