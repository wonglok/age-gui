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
  <div v-if="ui.type === 'ui-float'">
    <input class="age-reset ui-input nosel" ref="input" type="number" @keydown.left="ui.value -= 0.01" @keydown.right="ui.value -= 0.01" step="0.05" v-model="ui.value" @input="tryUpdate()" />
  </div>
  <div class="flex-row vector-inputs" v-else-if="ui.type === 'ui-vec4'">
    <input class="age-reset ui-input nosel" ref="input0" type="number" @keydown.left="ui.value0 -= 0.01" @keydown.right="ui.value0 -= 0.01" step="0.05" v-model="ui.value0" @input="tryUpdate()" />
    <input class="age-reset ui-input nosel" ref="input1" type="number" @keydown.left="ui.value1 -= 0.01" @keydown.right="ui.value1 -= 0.01" step="0.05" v-model="ui.value1" @input="tryUpdate()" />
    <input class="age-reset ui-input nosel" ref="input2" type="number" @keydown.left="ui.value2 -= 0.01" @keydown.right="ui.value2 -= 0.01" step="0.05" v-model="ui.value2" @input="tryUpdate()" />
    <input class="age-reset ui-input nosel" ref="input3" type="number" @keydown.left="ui.value3 -= 0.01" @keydown.right="ui.value3 -= 0.01" step="0.05" v-model="ui.value3" @input="tryUpdate()" />
  </div>
  <div class="flex-row vector-inputs" v-else-if="ui.type === 'ui-vec3'">
    <input class="age-reset ui-input nosel" ref="input0" type="number" @keydown.left="ui.value0 -= 0.01" @keydown.right="ui.value0 -= 0.01" step="0.05" v-model="ui.value0" @input="tryUpdate()" />
    <input class="age-reset ui-input nosel" ref="input1" type="number" @keydown.left="ui.value1 -= 0.01" @keydown.right="ui.value1 -= 0.01" step="0.05" v-model="ui.value1" @input="tryUpdate()" />
    <input class="age-reset ui-input nosel" ref="input2" type="number" @keydown.left="ui.value2 -= 0.01" @keydown.right="ui.value2 -= 0.01" step="0.05" v-model="ui.value2" @input="tryUpdate()" />
  </div>
  <div class="flex-row vector-inputs" v-else-if="ui.type === 'ui-vec2'">
    <input class="age-reset ui-input nosel" ref="input0" type="number" @keydown.left="ui.value0 -= 0.01" @keydown.right="ui.value0 -= 0.01" step="0.05" v-model="ui.value0" @input="tryUpdate()" />
    <input class="age-reset ui-input nosel" ref="input1" type="number" @keydown.left="ui.value1 -= 0.01" @keydown.right="ui.value1 -= 0.01" step="0.05" v-model="ui.value1" @input="tryUpdate()" />
  </div>
</template>

<script>
import * as AGE from '../api/age'
import _ from 'lodash'
export default {
  props: {
    ui: {}
  },
  mounted () {
    if (this.ui.type === 'ui-float') {
      this.setupInput({ idx: '' })
    } else if (this.ui.type === 'ui-vec4') {
      this.setupInput({ idx: 0 })
      this.setupInput({ idx: 1 })
      this.setupInput({ idx: 2 })
      this.setupInput({ idx: 3 })
    } else if (this.ui.type === 'ui-vec3') {
      this.setupInput({ idx: 0 })
      this.setupInput({ idx: 1 })
      this.setupInput({ idx: 2 })
    } else if (this.ui.type === 'ui-vec2') {
      this.setupInput({ idx: 0 })
      this.setupInput({ idx: 1 })
    }
  },
  methods: {
    setupInput ({ idx = '' }) {
      AGE.UI.makeDrag({
        dom: this.$refs['input' + idx],
        onMM: ({ api, ev }) => {
          let kn = `value${idx}`
          this.ui[kn] = Number(-api.dY * 0.01) + Number(this.ui[kn])
          this.ui[kn] = Number(api.dX * 0.01) + Number(this.ui[kn])
          this.ui[kn] = Number(this.ui[kn]).toFixed(2)
          this.tryUpdate()
        }
      })
    },
    tryUpdate: _.debounce(function () {
      this.goUpdate()
    }, 5),
    goUpdate () {
      // console.log(this.ui.value)
      this.$forceUpdate()

      window.dispatchEvent(new Event('compile-shader'))
    }
  }
}
</script>

<style>

</style>
