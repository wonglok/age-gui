<template>
  <div class="full age-addbox-wrap">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content scroller">
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
          <button @click="addJSONTemplate('./templates/t3-textureloader.json')">GL Texture Mixer</button>

        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>System</strong>
          </p>
          <button @click="adder('makeVertexRoot')">Vertex Root</button>
          <button @click="adder('makeFragmentRoot')">Fragment Root</button>
          <button @click="adder('makePreviwBox')">Preview Box</button>
          <button @click="adder('makeTextureReader')">Texture Reader</button>
          <button @click="adder('makeAttributPosition')">Position Attribute</button>
          <button @click="adder('makeUniformResolution')">Resolution Uniform</button>
        </div>
        <div class="age-addbox-menu-item">
          <p>
            <strong>System</strong>
          </p>
          <button @click="adder('makeVaryingV2UV')">UV Varying</button>
          <button @click="adder('makeVaryingV3Noraml')">Normal Varying</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Numbers</strong>
          </p>
          <button @click="adder('makeUIVector4')">Vector 4</button>
          <button @click="adder('makeUIVector3')">Vector 3</button>
          <button @click="adder('makeUIVector2')">Vector 2</button>
          <button @click="adder('makeUINumber')">Float</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Multiply</strong>
          </p>

          <button @click="adder('makeUIMultiplyVec4')">Vector 4</button>
          <button @click="adder('makeUIMultiplyVec3')">Vector 3</button>
          <button @click="adder('makeUIMultiplyVec2')">Vector 2</button>
          <button @click="adder('makeUIMultiplyFloat')">Float</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Duplicate</strong>
          </p>
          <button @click="adder('makeDuplicateV4')">Vector 4</button>
          <button @click="adder('makeDuplicateV3')">Vector 3</button>
          <button @click="adder('makeDuplicateV2')">Vector 2</button>
          <button @click="adder('makeDuplicateFloat')">Float</button>
        </div>

        <!-- <div class="age-addbox-menu-item">
          <p>
            <strong>Spread</strong>
          </p>
          <button @click="adder('makeSpreadV4')">Vector 4</button>
          <button @click="adder('makeSpreadV3')">Vector 3</button>
          <button @click="adder('makeSpreadV2')">Vector 2</button>
        </div> -->

        <!--

        <div class="age-addbox-menu-item">
          <p>
            <strong>Merge</strong>
          </p>
          <button @click="adder('makeMergeV4')">Vector 4</button>
          <button @click="adder('makeMergeV3')">Vector 3</button>
          <button @click="adder('makeMergeV2')">Vector 2</button>
        </div> -->

        <div class="age-addbox-menu-item">
          <p>
            <strong>Function</strong>
          </p>
          <button @click="adder('makeVertexFunction')">Vertex Function</button>
          <button @click="adder('makeFragmentFunction')">Fragment Function</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Varying</strong>
          </p>
          <button @click="adder('makeVaryingV4')">Varying 4</button>
          <button @click="adder('makeVaryingV3')">Varying 3</button>
          <button @click="adder('makeVaryingV2')">Varying 2</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Uniforms</strong>
          </p>
          <button @click="adder('makeUniformTimer')">iTime</button>
          <button @click="adder('makeUniformTexture')">Texture</button>
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
    offset: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
    }
  },
  mounted () {
    let close = (evt) => {
      if (evt.keyCode + '' === '127') {
        this.close()
        window.removeEventListener('keydown', close)
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
      let output = AGE.BOX[method]({ wins: this.wins })
      if (output.hasBoth) {
        output.vertex.pos.x = -this.offset.x + 30
        output.vertex.pos.y = -this.offset.y + 30
        output.fragment.pos.x = -this.offset.x + 60
        output.fragment.pos.y = -this.offset.y + 60
      } else {
        output.pos.x = -this.offset.x + 30
        output.pos.y = -this.offset.y + 30
      }
      this.close()
    },
    async loadJSON (v) {
      if (v === './templates/t1-basic-fragment-vertex-shader.json') {
        return (await import('./templates/t1-basic-fragment-vertex-shader.json')).default
      } else if (v === './templates/t2-two-v4-glFragColor.json') {
        return (await import('./templates/t2-two-v4-glFragColor.json')).default
      } else if (v === './templates/t3-textureloader.json') {
        return (await import('./templates/t3-textureloader.json')).default
      }
    },
    async addJSONTemplate (str) {
      if (window.prompt(`type "reset" to reset`)) {
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
