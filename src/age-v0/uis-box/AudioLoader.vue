<!--

/**
 * Copyright 2019 WONG LOK

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */
 -->

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
