<template>
  <div class="dndot" @click="onClick()" v-if="userdata" v-dragme v-dropme :userdata="userdata" :drop="onDrop">
    123123
  </div>
</template>

<script>
import * as AGE from '../api/age'
let directive = AGE.DnDFactory()()

export default {
  props: {
    userdata: {}
  },
  directives: {
    ...directive
  },
  data () {
    return {
    }
  },
  methods: {
    onClick () {
      console.log(this.userdata)
    },
    onDrop (v) {
      console.log(v)
    }
  }
}
</script>

<style>

</style>
