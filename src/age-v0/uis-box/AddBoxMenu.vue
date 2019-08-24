<template>
  <div class="full age-addbox-wrap">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content">
      <h1>
        Add Modules
      </h1>
      <div class="age-addbox-row">

        <div class="age-addbox-menu-item">
          <p>
            <strong>Reset / Examples</strong>
          </p>
          <button @click="addJSONTemplate('./templates/t1-basic-fragment-vertex-shader.json')">Basic Starter</button>
          <button @click="addJSONTemplate('./templates/t2-two-v4-glFragColor.json')">GL FragColor Mixer</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Number UI</strong>
          </p>
          <button @click="adder('makeUIVector4')">Vector 4</button>
          <button @click="adder('makeUIVector3')">Vector 3</button>
          <button @click="adder('makeUIVector2')">Vector 2</button>
          <button @click="adder('makeUINumber')">Float</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Number Multiply</strong>
          </p>

          <button @click="adder('makeUIMultiplyVec4')">Vector 4</button>
          <button @click="adder('makeUIMultiplyVec3')">Vector 3</button>
          <button @click="adder('makeUIMultiplyVec2')">Vector 2</button>
          <button @click="adder('makeUIMultiplyFloat')">Float</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Number Multiply</strong>
          </p>

          <button @click="adder('makeUIMultiplyFloat')">Float</button>
          <button @click="adder('makeUIMultiplyVec4')">Vector 4</button>
          <button @click="adder('makeUIMultiplyVec3')">Vector 3</button>
          <button @click="adder('makeUIMultiplyVec2')">Vector 2</button>
        </div>
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
  props: {
    wins: {},
    connections: {}
  },
  data () {
    return {
    }
  },
  mounted () {
    let close = (evt) => {
      window.removeEventListener('close', close)
      if (evt.keyCode === 127) {
        this.close()
      }
    }
    window.addEventListener('keydown', close)
  },
  methods: {
    close () {
      this.$parent.overlay = false
      this.$emit('save', true)
    },
    adder (method) {
      AGE.BOX[method]({ wins: this.wins })
      this.close()
    },
    async loadJSON (v) {
      if (v === './templates/t1-basic-fragment-vertex-shader.json') {
        return (await import('./templates/t1-basic-fragment-vertex-shader.json')).default
      } else if (v === './templates/t2-two-v4-glFragColor.json') {
        return (await import('./templates/t2-two-v4-glFragColor.json')).default
      }
    },
    async addJSONTemplate (str) {
      if (window.prompt(`type "reset all" to reset all`)) {
        let { wins, connections } = await this.loadJSON(str)
        console.log(wins, connections)
        this.$emit('wins', [])
        this.$emit('connections', [])
        this.$root.$forceUpdate()

        this.$nextTick(() => {
          this.$emit('wins', wins)
          this.$emit('connections', connections)
          this.close()
        })
      }
    }
  }
}
</script>

<style>

</style>
