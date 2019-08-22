<template>
  <div class="full age-layers">
    <BoxesEngine :scenes="scenes" class="full age-layer" bloom="bubbles" @ready="(v) => { engine = v; }">
    </BoxesEngine>

    <div :key="preview.domID" v-for="preview in previewDOMs">
      <BoxSceneShaderPreview @shader="shader = $event" v-if="connections && getWin({ wins, preview }).type === 'preview-box'" :scenes="scenes" :preview="preview" :win="getWin({ wins, preview })" :wins="wins" :connections="connections"></BoxSceneShaderPreview>
    </div>
    <div class="nomouse age-layer" ref="dom" style="display: flex; justify-content: flex-end; align-items: flex-end;">
      <div  style="display: flex; justify-content: flex-end;">
        <pre  v-if="shader" class="">{{ shader.vertexShader }}
  ------------
  {{ shader.fragmentShader }}</pre>
      </div>
    </div>
    <!-- <Bubbles v-if="engine && engine.renderer && engine.scene && engine.camera" :camera="engine.camera" :amount="20" :renderer="engine.renderer" :scene="engine.scene"></Bubbles> -->
  </div>
</template>

<script>
export default {
  props: {
    offset: {},
    wins: {},
    connections: {},
    previewDOMs: {}
  },
  components: {
    // Bubbles: require('../uis-gl/Bubbles.vue').default,
    BoxSceneShaderPreview: require('../uis-gl/BoxSceneShaderPreview.vue').default,
    BoxesEngine: require('../uis-gl/BoxesEngine.vue').default
  },
  data () {
    return {
      shader: false,
      scenes: {},
      engine: false
    }
  },
  mounted () {
  },
  methods: {
    getWin ({ wins, preview }) {
      let found = wins.find(w => w._id === preview._id)
      return found
    }
  }
}
</script>

<style>

</style>
