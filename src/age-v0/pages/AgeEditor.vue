<template>
  <div class="age-editor">
    <button class="posabs top-right" @click="createWin">Create</button>
    <Box :wins="wins" v-for="(win) in wins" :key="win._id" :win="win"></Box>
  </div>
</template>

<script>
import * as AGE from '../api/age'
export default {
  components: {
    Box: require('../uis-box/Box.vue').default
  },
  data () {
    return {
      wins: []

      // wins: [
      //   {
      //     pos: {
      //       x: 0,
      //       y: 0,
      //       w: 200,
      //       h: 200
      //     }
      //   },
      //   {
      //     pos: {
      //       x: 0,
      //       y: 0,
      //       w: 200,
      //       h: 200
      //     }
      //   },
      //   {
      //     pos: {
      //       x: 0,
      //       y: 0,
      //       w: 200,
      //       h: 200
      //     }
      //   },
      //   {
      //     pos: {
      //       x: 0,
      //       y: 0,
      //       w: 200,
      //       h: 200
      //     }
      //   },
      //   {
      //     pos: {
      //       x: 0,
      //       y: 0,
      //       w: 200,
      //       h: 200
      //     }
      //   },
      //   {
      //     pos: {
      //       x: 0,
      //       y: 0,
      //       w: 200,
      //       h: 200
      //     }
      //   }
      // ]
    }
  },
  methods: {
    createWin () {
      let win = AGE.getWin()
      this.wins.push(win)
    }
  }
}
</script>

<style>

</style>
