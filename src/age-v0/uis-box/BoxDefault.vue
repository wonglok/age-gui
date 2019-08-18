<template>
  <div class="win-box full">
    <div class="win-title nosel" :style="$parent.getTitleStyle()" ref="win-title">
      <div class="space-between">
        <div>
          {{ $parent.win.title || 'New Box' }}
        </div>
        <div class="center">
          <img class="age-gear click" src="../icons/gear.svg" alt="">
        </div>
      </div>
    </div>
    <!-- OMG -->
    <div class="win-content" ref="win-content">
      <div class="space-between">
        <div class="flex-list age-connector-list">
          <Connector :connectorDOMs="connectorDOMs" class="age-input" :key="input._id" v-for="input in $parent.win.inputs" :userdata="input"></Connector>
        </div>
        <div>

        </div>
        <div class="flex-list age-connector-list">
          <Connector :connectorDOMs="connectorDOMs" class="age-output" :key="output._id" v-for="output in $parent.win.outputs" :userdata="output"></Connector>
        </div>
      </div>
      <div class="center">
        <div class="age-preview-area"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    connectorDOMs: {}
  },
  components: {
    Connector: require('./Connector.vue').default
  },
  mounted () {
    this.$parent.setupSubCompo({ subCompo: this })
  }
}
</script>

<style>

</style>
