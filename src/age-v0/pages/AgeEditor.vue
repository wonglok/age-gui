<template>
  <div class="age-editor full scroller age-layers">
    <ConnectionLines class="age-layer" :connections="connections" :connectorDOMs="connectorDOMs"></ConnectionLines>
    <Box class="age-layer" :previewDOMs="previewDOMs" :connectorDOMs="connectorDOMs" :wins="wins" v-for="(win) in wins" :key="win._id" :win="win"></Box>
    <PreviewArea class="age-layer noclick" :previewDOMs="previewDOMs"></PreviewArea>
    <button class="posabs top-right" @click="createWin">Create</button>
    <!-- <pre>{{ connectorDOMs }}</pre> -->
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    PreviewArea: require('../uis/PreviewArea.vue').default,
    ConnectionLines: require('../uis-box/ConnectionLines.vue').default,
    Box: require('../uis-box/Box.vue').default
  },
  data () {
    return {
      previewDOMs: [],
      connectorDOMs: [],
      connections: [],
      wins: []
    }
  },
  mounted () {
    this.createWin()
    this.createWin()
    this.createWin()
  },
  methods: {
    createWin () {
      let win = AGE.getWin()
      win.title = 'happy'
      win.type = 'statement'
      win.pos.w = 300

      win.inputs.push(
        AGE.getIO({ boxID: win._id, io: 'input', type: 'sampler2D', label: 'mapTexture' }),
        AGE.getIO({ boxID: win._id, io: 'input', type: 'float', label: 'apple' }),
        AGE.getIO({ boxID: win._id, io: 'input', type: 'vec3', label: 'position' }),
        AGE.getIO({ boxID: win._id, io: 'input', type: 'mat4', label: 'modelViewMatrix' })
      )

      win.outputs.push(
        AGE.getIO({ boxID: win._id, io: 'output', type: 'sampler2D', label: 'mapTexture' }),
        AGE.getIO({ boxID: win._id, io: 'output', type: 'float', label: 'apple' }),
        AGE.getIO({ boxID: win._id, io: 'output', type: 'vec3', label: 'position' }),
        AGE.getIO({ boxID: win._id, io: 'output', type: 'mat4', label: 'modelViewMatrix' })
      )

      this.wins.push(win)
      win.pos.h = 150
      win.pos.y = (this.wins.length - 1) * (win.pos.h + 10)
      win.pos.x = (this.wins.length - 1) * (win.pos.w + 10)
    }
  }
}
</script>

<style>

</style>
