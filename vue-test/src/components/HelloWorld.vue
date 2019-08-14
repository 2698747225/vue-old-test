<template>
  <div>
    <div class="hello">{{count}}</div>
    <div class="hello">{{countParse}}</div>
    <div class="hello">{{caculateCount}}</div>
    <div class="hello">{{test}}</div>
    <div>
      <button @click="updateStore()">修改store树</button>
      <button @click="increment()">修改store树2</button>
      <button @click="asyncIncrement()">异步修改store树3</button>
    </div>
    <div>
      {{sex}}
      <button @click="updateObject()">修改对象</button>
    </div>
    <div>
      <button @click="incrementSelf()">修改namespace下的mu</button>
    </div>
    <div>
      <native @click.native="nativeTest()"></native>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Vue from "vue";
import native from "./nativeTest/native";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: { native },
  computed: {
    ...mapState({
      count: state => state.moduleA.count,
      countParse: function(state) {
        return state.moduleA.count + this.msg;
      },
      sex: state => state.moduleA.student.sex
    }),
    ...mapGetters(["caculateCount"]),
    test: function() {
      return (
        this.$store.state.moduleA.count + "__" + this.$store.state.moduleB.count
      );
    }
  },
  methods: {
    updateStore: function() {
      this.$store.commit("increment", {
        amount: this.$store.state.moduleA.count
      });
    },
    updateObject: function() {
      // this.$store.state.student.sex = "man";
      Vue.set(this.$store.state.moduleA.student, "sex", "man");
    },
    ...mapMutations(["increment"]),
    ...mapMutations("moduleB", ["incrementSelf"]),
    ...mapActions(["asyncIncrement"]),
    nativeTest() {
      console.log("success!!!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
