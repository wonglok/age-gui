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
  <div class="full age-addbox-wrap">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content scroller">
      <h1>
        Reset / Examples
      </h1>
      <div class="age-addbox-row">
        <div class="age-addbox-menu-item">
          <p>
            <strong>Examples (Basic)</strong>
          </p>
          <button @click="addJSONTemplate('../code-templates/t1-basic-fragment-vertex-shader.json')">Basic Starter</button>
          <button @click="addJSONTemplate('../code-templates/t2-two-v4-glFragColor.json')">FragColor Mixer</button>
          <button @click="addJSONTemplate('../code-templates/t3-textureloader.json')">Texture Mixer</button>
        </div>
        <div class="age-addbox-menu-item">
          <p>
            <strong>Examples (GLSL Function)</strong>
          </p>
          <button @click="addJSONTemplate('../code-templates/t4-waterball.json')">Water Ball</button>
        </div>
        <div class="age-addbox-menu-item">
          <p>
            <strong>Examples (Mic)</strong>
          </p>
          <button @click="addJSONTemplate('../code-templates/t5-audio-ball-amaze.json')">Space Ball</button>
          <button @click="addJSONTemplate('../code-templates/t6-orb.json')">Magic Orb</button>
        </div>
      </div>
      <h1>
        Logic Modules
      </h1>
      <div class="age-addbox-row">
        <div class="age-addbox-menu-item">
          <p>
            <strong>Functions</strong>
          </p>
          <button @click="adder('makeVertexFunction')">Vertex Function</button>
          <button @click="adder('makeFragmentFunction')">Fragment Function</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Base System</strong>
          </p>
          <button @click="adder('makeVertexRoot')">Vertex Root</button>
          <button @click="adder('makeFragmentRoot')">Fragment Root</button>
          <button @click="adder('makePreviwBox')">Preview Box</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Uniforms</strong>
          </p>
          <button @click="adder('makeUniformTimer')">Uniform iTime</button>
          <button @click="adder('makeUniformResolution')">Uniform iResolution</button>

        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Texture</strong>
          </p>
          <button @click="adder('makeUniformAudioHistory')">Uniform Mic Texture</button>
          <button @click="adder('makeUniformTexture')">Uniform iTexture</button>
          <button @click="adder('makeTextureReader')">Texture Reader</button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Attributes</strong>
          </p>
          <button @click="adder('makeAttributPosition')">Attribute Position </button>
          <button @click="adder('makeAttributNormal')">Attribute Normal </button>
        </div>

        <div class="age-addbox-menu-item">
          <p>
            <strong>Varying</strong>
          </p>
          <button @click="adder('makeVaryingV2UV')">UV Varying</button>
          <button @click="adder('makeVaryingV3Noraml')">Varying Normal </button>

          <button @click="adder('makeVaryingV4')">Varying 4</button>
          <button @click="adder('makeVaryingV3')">Varying 3</button>
          <button @click="adder('makeVaryingV2')">Varying 2</button>
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
      if (evt.keyCode + '' === '27') {
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
      if (v === '../code-templates/t1-basic-fragment-vertex-shader.json') {
        return (await import('../code-templates/t1-basic-fragment-vertex-shader.json')).default
      } else if (v === '../code-templates/t2-two-v4-glFragColor.json') {
        return (await import('../code-templates/t2-two-v4-glFragColor.json')).default
      } else if (v === '../code-templates/t3-textureloader.json') {
        return (await import('../code-templates/t3-textureloader.json')).default
      } else if (v === '../code-templates/t4-waterball.json') {
        return (await import('../code-templates/t4-waterball.json')).default
      } else if (v === '../code-templates/t5-audio-ball-amaze.json') {
        return (await import('../code-templates/t5-audio-ball-amaze.json')).default
      } else if (v === '../code-templates/t6-orb.json') {
        return (await import('../code-templates/t6-orb.json')).default
      }
    },
    async addJSONTemplate (str) {
      if (window.prompt(`type "reset" to reset`).toLowerCase() === 'reset') {
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
