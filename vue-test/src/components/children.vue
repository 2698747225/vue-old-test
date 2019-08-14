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
        console.log("test");
      },
      deep: true
    }
  },
  props: ["name", "label", "pdata"],
  methods: {
    addList: function() {
      this.list.push({
        name: "name" + (this.list.length + 1),
        value: this.list.length + 1
      });
      this.items.length = 2;
    },
    add: function() {
      this.$emit("update:pdata", false);
    }
    /**
     * 1、sass-store，该项目为toB端 项目职责为针对B端品牌保养项目做技术支持，
     * 前端框架为angular6、UI组件库为ant-design，整体使用的是angularJS支持比较好的TypeScript作为开发语言
     * 项目为单页面，表单页面采用了响应式表单，舍去了ngModel、指令等数据绑定和校验的方式，全权交给form处理
     * 和后端的数据传输等异步操作方面没有用es6的promise，而是采用了angular以及rxjs支持的观察者模式进行
     *
     * 2、common-operation 该项目为公司内部针对toB方面进行管理的一套系统
     * 整体项目框架和B端相同。主要做的业务是权限管理、帮助中心、消息推送、店铺管理、组织架构等
     * 项目大数据统计等通过可视化展现在项目中，这一块相对用的比较多的是echarts。
     * 此外项目刚构建时，业务逻辑大多都在前端，因此还用到了一些获取神策地址解析以及通过xlsx插件实现纯前端表格导出等
     *
     * 3、saas-insurance  该项目为公司对于保险项目的前端支持
     * 该项目的业务逻辑比较复杂，大多数的页面为了当前页数据不丢失，都采用了Url保存query参数、以及浏览器缓存保存数据。
     * 项目中采用了crypto-js的Hmac加密方式调用了腾讯云的文字识别服务，用来实现车牌识别。
     * 由于保险数据量比较大，而公司的nginx也支持http2，因此导入文件采用了将文件拆分，通过forkJoin同时发送多个小的formData
     * 的方式传至后台
     *
     *
     * 1、sass-store、common-operation、common-store、saas-insurance
     *
     *
     *
     */
  }
};
</script>
<style scoped>
.testClass {
  color: aqua;
}
</style>
