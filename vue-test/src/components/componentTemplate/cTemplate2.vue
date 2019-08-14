

<script>
// import ctemplate2 from "./cTemplate2.vue";
export default {
  name: "ctemplate2",
  template:
    "<div><div>这是一个模板组件2</div><div><button @click='changeTemplate()'>子组件切换模板</button></div></div>",
  created: function() {
    console.log(this.changeTemplate);
  },
  // methods: function() {},
  inject: ["changeTemplate", "param"],
  components: {
    // ctemplate2
  }
};
</script>
<style scoped>
</style>
