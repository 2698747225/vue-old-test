<template>
  <div>
    <div style="color:blue;">111</div>
    <div>
      <keep-alive>
        <component :is="template" ref="dynamic" ttt="data"></component>
        <!-- <cTemplate></cTemplate> -->
      </keep-alive>
      <button @click="changeTemplate()">切换模板</button>
      <button @click="foo()">混入测试</button>
      <!-- <children2></children2> -->
    </div>
  </div>
</template>
<script>
var mixin = {
  methods: {
    foo: function() {
      console.log("foo");
    },
    conflicting: function() {
      console.log("from mixin");
    }
  }
};
import cTemplate from "./componentTemplate/cTemplate";
import cTemplate2 from "./componentTemplate/cTemplate2";
import App from "../App";
export default {
  name: "children2",
  inheritAttrs: false,
  mixins: [mixin],
  components: {
    // cTemplate
    // cTemplate2
  },
  data: function() {
    return {
      template: cTemplate,
      cTemplate: cTemplate,
      data: 1
    };
  },
  mounted: function() {
    console.log(this.$root);
    console.log(this.$parent);
  },
  methods: {
    changeTemplate: function() {
      if (this.template === cTemplate) {
        this.template = cTemplate2;
      } else {
        this.template = cTemplate;
      }
    }
  },
  provide: function() {
    return {
      changeTemplate: this.changeTemplate,
      param: this.data
    };
  }
};
</script>

<style scoped>
</style>
