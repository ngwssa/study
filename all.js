// ----------- all.js

import foo from './foo.vue'
import bar from './bar.vue'
import xxx from './xxx.vue'

const all = {
  [foo.name]: foo,
  [bar.name]: bar,
  [xxx.name]: xxx,
}

export const trans = role => all[role] || 'div'
export default all

// ----------- foo.js
<template>
  <div @click="clickHandle"><p>foo {{foo}}</p><slot></slot></div>
</template>

<script>
  export default {
    name: 'foo',
    data () {
      return {}
    },
    props: {
      foo: String
    },
    methods: {
      clickHandle () {
        console.log(this.$options.name, this.$parent.$options.name)
      }
    }
  }
</script>

<style lang="less" scoped>
  div {
    padding: 20px;
    color: blue;
  }
</style>


// ----------- bar.js
<template>
  <div><p>bar {{bar}}</p><slot></slot></div>
</template>

<script>
  export default {
    name: 'bar',
    data () {
      return {}
    },
    props: {
      bar: String
    }
  }
</script>

<style lang="less" scoped>
  div {
    padding: 20px;
    color: red;
  }
</style>


// ----------- data.js
window.data = {
  role: 'bar',
  ps: {
    bar: null
  },
  children: [
    {
      // role: 'xxx',
      ps: {
        bar: 'yyyyy'
      },
      children: []
    },
    {
      role: 'foo',
      ps: {
        foo: '2222'
      }
    },
    {
      role: 'foo',
      ps: {
        foo: '333'
      }
    }
  ]
}

export default window.data
