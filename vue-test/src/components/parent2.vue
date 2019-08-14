<template>
  <div>
    <slot1>
      <div>非具名插槽</div>
      <template slot="h1">父组件内h1模板</template>
      <template>父组件内普通模板</template>
      <template #h2="{test}">父组件内h2模板{{test.userName}}</template>
    </slot1>
    <div>
      <button @click="jump()">路由跳转</button>
    </div>
    <div>
      <rendertest></rendertest>
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import slot1 from "./slot/slot1";
import rendertest from "./render/rendertest";
export default {
  name: "parent222",
  data: function() {
    return {
      param1: 1
    };
  },
  components: {
    slot1,
    rendertest
  },
  created: function() {
    console.log("created");
    var handler = {
      get: function(target, name) {
        if (name === "prototype") {
          return Object.prototype;
        }
        return "Hello, " + name;
      },

      apply: function(target, thisBinding, args) {
        return args[0];
      },

      construct: function(target, args) {
        return { value: args[1] };
      }
    };
    var fproxy = new Proxy(function(x, y) {
      return x + y;
    }, handler);
    console.log(fproxy(1, 2));
    console.log(new fproxy(1, 2));
  },
  methods: {
    jump: function() {
      this.$router.push({ name: "parent", params: { userId: "123" } });
    }
  }
};
</script>
