<template>
  <div>
    first
    <input v-model="firstName.a" />
    last
    <input v-model="lastName" />
    com
    <input v-model="fullName" />
    <div>{{fullName}}</div>
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

import App from "../App";
export default {
  name: "children2",
  components: {
    // cTemplate
    // cTemplate2
  },
  data: function() {
    return {
      lastName: null,
      firstName: {
        a: 1
      }
    };
  },
  mounted: function() {},
  methods: {
    changeTemplate: function() {
      if (this.template === cTemplate) {
        this.template = cTemplate2;
      } else {
        this.template = cTemplate;
      }
    }
  },
  computed: {
    fullName: {
      // getter
      get: function() {
        console.log("getChange");
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        console.log("setChange");
        this.firstName = newValue[0];
        this.lastName = newValue[newValue.length - 1];
      }
    }
  },
  watch: {
    "firstName.a"() {
      this.$set(this.firstName, "a", 3);
      return this.firstName.a;
    }
  }
};
</script>

<style scoped>
</style>
