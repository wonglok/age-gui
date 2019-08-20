<template>
  <div class="full">
    <BoxesEngine :scenes="scenes" class="full" bloom="bubbles" @ready="(v) => { engine = v; }">
    </BoxesEngine>

    <div :key="preview.domID" v-for="preview in previewDOMs">
      <BoxSceneShaderPreview v-if="getWin({ wins, preview }).type === 'preview-box'" :scenes="scenes" :preview="preview" :win="getWin({ wins, preview })" :wins="wins"></BoxSceneShaderPreview>
    </div>

    <!-- <Bubbles v-if="engine && engine.renderer && engine.scene && engine.camera" :camera="engine.camera" :amount="20" :renderer="engine.renderer" :scene="engine.scene"></Bubbles> -->
  </div>
</template>

<script>
export default {
  props: {
    wins: {},
    previewDOMs: {}
  },
  components: {
    // Bubbles: require('../uis-gl/Bubbles.vue').default,
    BoxSceneShaderPreview: require('../uis-gl/BoxSceneShaderPreview.vue').default,
    BoxesEngine: require('../uis-gl/BoxesEngine.vue').default
  },
  data () {
    return {
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
