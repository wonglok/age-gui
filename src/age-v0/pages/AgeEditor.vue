<template>
  <div class="age-editor full scroller age-layers">
    <ConnectionLines class="age-layer" :connections="connections" :connectorDOMs="connectorDOMs"></ConnectionLines>
    <PreviewArea class="age-layer" :wins="wins" :previewDOMs="previewDOMs"></PreviewArea>
    <Box @drop="onDropConnection" @clicker="onClickConnector" class="age-layer" :connections="connections" :previewDOMs="previewDOMs" :connectorDOMs="connectorDOMs" :wins="wins" v-for="(win) in wins" :key="win._id" :win="win"></Box>
    <div class="posabs top-right">
      <button @click="overlay = 'add-module'">Add Module +</button>
      <div class="flex-row">
        <pre>{{ getCode().vertexShader }}</pre>
        <pre>{{ getCode().fragmentShader }}</pre>
      </div>
    </div>

    <AddBoxMenu class="age-layer" v-if="overlay === 'add-module'"></AddBoxMenu>

  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    PreviewArea: require('../uis-gl/PreviewArea.vue').default,
    AddBoxMenu: require('../uis-box/AddBoxMenu.vue').default,
    ConnectionLines: require('../uis-box/ConnectionLines.vue').default,
    Box: require('../uis-box/Box.vue').default
  },
  data () {
    return {
      overlay: '',
      previewDOMs: [],
      connectorDOMs: [],
      connections: [],
      wins: []
    }
  },
  mounted () {
    this.createDefaultWin()
  },
  methods: {
    getCode () {
      return AGE.getCode({ wins: this.wins, connetions: this.connections })
    },
    onDropConnection (v) {
      let arr = [v.hand, v.land]
      let stuff = {
        [arr[0].io]: arr[0],
        [arr[1].io]: arr[1]
      }

      this.connections.push({
        input: stuff.input,
        output: stuff.output
      })
      console.log(JSON.stringify(this.connections, null, ' '))
    },
    onClickConnector (conn) {
      let idx = -1
      this.connections.forEach((c, idxo) => {
        if (c.input._id === conn._id || c.output._id === conn._id) {
          idx = idxo
        }
      })
      if (idx !== -1) {
        this.connections.splice(idx, 1)
      }

      console.log(JSON.stringify(conn, null, ' '))
    },
    popOpenWin () {
      // AGE.makeVertexRoot({ wins: this.wins })
    },
    createDefaultWin () {
      AGE.makeVertexRoot({ wins: this.wins })
      AGE.makeFragmentRoot({ wins: this.wins })
      AGE.makePreviwBox({ wins: this.wins })
    }
  }
}
</script>

<style>

</style>
