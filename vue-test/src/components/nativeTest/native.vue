<template>
  <button @click="onclick()">native测试</button>
</template>
<script>
export default {
  name: "native",
  methods: {
    onclick() {
      console.log("nativeSuccess");
    }
  }
};
</script>
