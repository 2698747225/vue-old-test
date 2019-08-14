<template>
  <div>
    <div style="margin:20px 0;">
      <children v-bind:name="data" v-on:add="fAdd"></children>
      父组件{{obj.name}}
    </div>
    <div>----------------------------------------------------------------------------</div>
    <button v-on:click="add" v-if="btnVisible">父按钮</button>
    <label>父组件 {{cdata}}</label>
    <div style="margin:20px 0;" v-html="html"></div>
    <div style="margin:20px 0;">
      <button v-on:click="btnVisible=!btnVisible">隐藏父组件按钮</button>
    </div>
    <div>
      {{data2}}+
      <children :pdata.sync="data2"></children>
    </div>
    <div>------------------------------------------------------------------</div>
    <children2 style="font-weight:bold;" aaa="123"></children2>
    <div>------------------------------------------------------------------</div>
    <button @click="changeRoute()">路由切换</button>
    <div>{{userId}}</div>
  </div>
</template>
<script>
import children from "./children.vue";
import children2 from "./children2.vue";
export default {
  name: "parent",
  data: function() {
    return {
      data: 1,
      cdata: null,
      html: '<label style="color:red;">虚拟模板</label>',
      btnVisible: true,
      obj: {
        name: 1
      },
      data2: null
    };
  },
  components: {
    // children
  },
  methods: {
    add: function() {
      this.data += 1;
    },
    fAdd: function($event) {
      this.cdata = $event;
    },
    changeRoute: function() {
      this.$router.push({ name: "parent", params: { userId: "456" } });
    }
  },
  props: ["userId"],
  mounted: function() {
    console.log("mounted finished!");
    import("./children.vue").then(children => {
      console.log(children);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    console.log(from);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm);
    });
  }
};
</script>
<style scoped>
</style>
