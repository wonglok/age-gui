<template>
  <div>
    <!-- <input type="text" v-model="ui.url" @input="onInput" class="age-reset" style="width: 80px; font-size: 10px; border: black solid 1px;" />
    <br /> -->
    <!-- <input accept="audio/*" type="file" ref="file" class="age-reset" @change="onChange" v-show="false"> -->
    <button style="width: 80px; font-size: 10px; border: black solid 1px; cursor: pointer;" class="age-reset" @click="setupAudio();">Request Mic</button>
  </div>
</template>

<script>
import * as Audio from '../media/mic-history.js'
export default {
  props: {
    ui: {}
  },
  mounted () {
  },
  methods: {
    setupAudio () {
      Audio.APIs[this.ui._id] = Audio.setup()
      window.dispatchEvent(new Event('compile-shader'))
      this.$nextTick(() => {
        window.dispatchEvent(new Event('compile-shader'))
      })
    },
    onInput () {
      window.dispatchEvent(new Event('compile-shader'))
      this.$nextTick(() => {
        window.dispatchEvent(new Event('compile-shader'))
      })
    },
    onChange (evt) {
      let files = evt.target.files
      if (files[0]) {
        let link = URL.createObjectURL(files[0])
        this.ui.url = link
        window.dispatchEvent(new Event('compile-shader'))
      }
    }
  }
}
</script>

<style>

</style>
