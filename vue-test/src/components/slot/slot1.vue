<template>
  <div>
    子slot模板
    <div>
      <slot></slot>
      <slot name="h2" v-bind:test="user">{{user.userName}}</slot>
      <slot name="h1"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "asd",
  data: function() {
    return {
      user: {
        userName: "呵呵哒",
        userField: "木有"
      }
    };
  },
  created() {
    console.log();
  }
};
</script>
