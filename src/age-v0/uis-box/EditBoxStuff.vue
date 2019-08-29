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
  <div class="full age-addbox-wrap scroller">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content scroller" ref="scroller">
      <h1>
        Edit Module
      </h1>
      <p>
        Resize Module Box
        <input type="checkbox" v-model="win.resize"  />
      </p>
      <div class="edit-mod-taller"></div>

      <div v-if="win && win.type === 'custom-function'">
        <h2>
          Function Output
        </h2>

        <div :key="output._id" v-for="(output) in win.outputs">
          Output Data Type:

          <select v-model="output.argType" @change="onChangeArgType({ output, value: $event.target.value })">
            <option value="float">Float</option>
            <option value="vec4">Vector4</option>
            <option value="vec3">Vector3</option>
            <option value="vec2">Vector2</option>
          </select>

          Argument Name:
          <input type="text" v-model="output.arg" @output="onChangeArgName({ output, value: output.arg })">

          <!-- Defaults:
          <input type="text" v-model="output.defaults"> -->
        </div>

        <h2>
          Function Input
        </h2>

        <div :key="input._id" v-for="(input, idx) in win.inputs">
          <div>
            Input Data Type:
            <select v-model="input.argType" @change="onChangeArgType({ input, value: $event.target.value })">
              <option value="float">Float</option>
              <option value="vec4">Vector4</option>
              <option value="vec3">Vector3</option>
              <option value="vec2">Vector2</option>
            </select>

            Argument Name:
            <input type="text" v-model="input.arg" @input="onChangeArgName({ input, value: input.arg })">

            Defaults:
            <input type="text" v-model="input.defaults">

            <button @click="removeInput({ input, idx, inputs: win.inputs })">Remove</button>
          </div>
        </div>

        <button @click="addInput({ win })">Add Inputs</button>
        <!-- <textarea v-model="win.fnInner" cols="30" rows="10" @input="compile"></textarea> -->
        <p>
          Library
        </p>
        <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnExt" :setter="(v) => { win.fnExt = v }"></Brace>
        <p>
          Function Body
        </p>
        <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnInner" :setter="(v) => { win.fnInner = v }"></Brace>
      </div>
      <button @click="removeWin({ win })">Remove This</button>
      <div>
        <p>JSON</p>
        <pre>{{ win }}</pre>
      </div>
    </div>
    <div class="age-addbox-close" @click="close()">
      <img src="../icons/close.svg" alt="" />
    </div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    Brace: require('./Brace.vue').default
  },
  props: {
    winID: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      win: this.wins.find(e => e._id === this.winID)
    }
  },
  watch: {
    win: {
      deep: true,
      handler () {
        this.save()
        this.compile()
        this.plot()
      }
    }
  },
  mounted () {
    // this.$refs['scroller'].addEventListener('scroller', (evt) => {
    //   evt.stopPropagation()
    // }, { passive: false })
    let close = (evt) => {
      if (evt.keyCode === 27) {
        // console.log(evt)
        window.removeEventListener('keydown', close)
        this.close()
      }
    }
    window.addEventListener('keydown', close, { passive: false })
  },
  methods: {
    plot () {
      window.dispatchEvent(new Event('ui-layout'))
      window.dispatchEvent(new Event('plot'))
    },
    removeInput ({ input, idx, inputs }) {
      this.$parent.onClickConnector(input)
      inputs.splice(idx, 1)
    },
    onChangeArgName ({ input, value }) {
      input.label = value
    },
    onChangeArgType ({ input, value }) {
      input.defaults = AGE.NS.DEFAULT_VALUES[value]
      input.type = value
      input.io = 'input'
    },
    addInput ({ win }) {
      AGE.BOX.addInputToFunction({ win })
      this.compile()
      this.save()
    },
    compile () {
      window.dispatchEvent(new Event('compile-shader'))
    },
    save () {
      this.$emit('save', true)
    },
    close () {
      this.compile()
      this.$parent.overlay = false
      this.$forceUpdate()
      this.save()
    },
    remove ({ win }) {
      win.inputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      win.outputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      this.wins.splice(this.wins.findIndex(w => w._id === win._id), 1)
      this.$root.$forceUpdate()
    },
    removeWin ({ win }) {
      this.remove({ win })

      if (this.win.alsoRemove) {
        let anotherWinID = this.win.alsoRemove
        let anotherWin = this.wins.find(w => w._id === anotherWinID)
        this.remove({ win: anotherWin })
      }
      this.close()
    }
  }
}
</script>

<style>

</style>
