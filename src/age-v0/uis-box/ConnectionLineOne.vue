<template>
  <g v-if="connection.input.type === 'vec3'">
    <path :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" />
    <path style="transform: translateY(3px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('g')" stroke-linecap="round" v-if="path" :d="path" />
    <path style="transform: translateY(-3px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('b')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else-if="connection.input.type === 'vec2'">
    <path style="transform: translateY(2px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('u')" stroke-linecap="round" v-if="path" :d="path" />
    <path style="transform: translateY(-2px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('v')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else-if="connection.input.type === 'mat4'">
    <!-- <path :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" /> -->
    <path :style="`transform: translateY(${1 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${2 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${3 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${4 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else-if="connection.input.type === 'vec4'">
    <!-- <path :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" /> -->
    <path :style="`transform: translateY(${1 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${2 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('g')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${3 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('b')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${4 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('a')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else>
    <path :fill="'transparent'" stroke-width="1" :stroke="getStroke()" stroke-linecap="round" v-if="path" :d="path" />
  </g>
</template>

<script>
import * as AGE from '../api/age'

export default {
  props: {
    connection: {},
    connections: {},
    connectorDOMs: {}
  },
  data () {
    return {
      path: ``
    }
  },
  methods: {
    getStroke (v = this.connection.input.type) {
      return AGE.connectorColorTypes[v]
    }
  },
  async mounted () {
    // console.log(this.connectorDOMs)
    // console.log(this.connections)

    let input = this.connection.input
    let output = this.connection.output

    let inputDOMInfo = this.connectorDOMs.find(e => e._id === input._id)
    let outputDOMInfo = this.connectorDOMs.find(e => e._id === output._id)

    let inputDOM = await AGE.UI.getDOM({ domID: inputDOMInfo.domID })
    let outputDOM = await AGE.UI.getDOM({ domID: outputDOMInfo.domID })

    window.addEventListener('plot', () => {
      let ri = inputDOM.getBoundingClientRect()
      let ro = outputDOM.getBoundingClientRect()
      let ix = ri.left + ri.width / 2
      let iy = ri.top + ri.height / 2
      let ox = ro.left + ro.width / 2
      let oy = ro.top + ro.height / 2

      let dx = (ox - ix) / 3 * 2

      // console.log(ri, ro)
      this.path = `M${ix},${iy} C${ix + dx},${iy} ${ox - dx},${oy} ${ox},${oy}`
    })

    window.addEventListener('resize', () => {
      window.dispatchEvent(new Event('plot'))
    })

    window.dispatchEvent(new Event('plot'))
  }
}
</script>

<style>

</style>
