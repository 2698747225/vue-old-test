<template></template>
<script>
export default {
  name: "newC",
  created() {
    console.log(this.$attrs);
    console.log(this.$props);
  },
  props: ["data"]
};
</script>
