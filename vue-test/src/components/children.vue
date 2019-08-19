<template>
  <div>
    <button v-on:click="$emit('add',fdata)">子组件</button>
    <label v-bind:style="classObj">{{name}}</label>
    <!-- <button @click="name+=1">修改子组件props</button> -->
    <label v-bind:class="{testClass:bool}" v-if="bool">{{fdata}}</label>
    <input type="text" v-model="fData" />
    <input type="text" v-model="obj.a" />
    {{obj.b}}
    --------------------------------------
    {{value}}
    <button
      v-on:click="bool=!bool"
    >换class</button>
    <div v-if="show">
      <label>vue is the best</label>
    </div>
    <div v-else>
      <label>bing bu shi</label>
    </div>
    <div>
      <ul>
        <li v-for="(item,index) in list" v-bind:key="item.value">{{item.name}}+{{index}}</li>
      </ul>
    </div>
    <div>
      <button v-on:click="addList()">添加数组</button>
      <input type="text" v-model="list[0].name" />
    </div>
    <template v-for="item in items">{{item}}</template>
    <div>
      {{label}}_{{value}}
      <!-- <button @click="obj.name+=1">子组件对象</button> -->
      <!-- {{obj.name}} -->
    </div>
    <div>
      <button @click="add()">sync</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "children",
  data() {
    return {
      fData: 1,
      data: 1,
      obj: { a: 1 },
      value: null,
      bool: false,
      classObj: { color: "red" },
      show: true,
      list: [
        {
          name: "name1",
          value: "value1"
        },
        {
          name: "name2",
          value: "value2"
        },
        {
          name: "name3",
          value: "value3"
        },
        {
          name: "name4",
          value: "value4"
        }
      ],
      items: ["a", "b", "c"]
    };
  },
  created: function() {
    this.list[0].name = "123";
    this.items[0] = 1;
    console.log(this.items);
    this.classObj["font-size"] = "20px";
  },
  computed: {
    fdata: function() {
      return this.fData * 2;
    }
  },
  watch: {
    obj: {
      handler(newVal, oldVal) {
        this.value = newVal;
        this.obj.b = 2;
      },
      deep: true
    },
    items(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    }
  },
  props: ["name", "label", "pdata"],
  methods: {
    addList: function() {
      this.list.push({
        name: "name" + (this.list.length + 1),
        value: this.list.length + 1
      });
      /**
       * VUE的对象、数组检测机制，经过测试不会影响数据到模板的单向数据绑定，但第一种方法无法触发Vue数据检测，需要使用Vue.set方法修改引用类型
       */
      // this.items.length = 2;
      this.$set(this.items, 0, "d");
    },
    add: function() {
      this.$emit("update:pdata", false);
    }
  }
};
</script>
<style scoped>
.testClass {
  color: aqua;
}
</style>
