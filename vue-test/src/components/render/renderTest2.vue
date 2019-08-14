<template>
  <div>
    123
    <div>{{myProp}}</div>
    <div>
      <button v-on:click="render2()">动态渲染</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "test",
  data: function() {
    return {
      someProp: null
    };
  },
  props: ["myProp"],
  methods: {
    render2: function() {
      console.log("children");
    }
  }
};
</script>
<style scoped></style>
