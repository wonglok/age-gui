<template>
  <div class="full">
    <BoxesEngine :scenes="scenes" class="full" bloom="bubbles" @ready="(v) => { engine = v; }">
    </BoxesEngine>

    <BoxScene :scenes="scenes" :key="preview.domID" :preview="preview" :win="getWin({ wins, preview })" :wins="wins" v-for="preview in previewDOMs"></BoxScene>
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
    BoxScene: require('../uis-gl/BoxScene.vue').default,
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

    }
  }
}
</script>

<style>

</style>
