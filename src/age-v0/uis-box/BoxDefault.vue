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
      <div class="space-between connectorsarea" ref="connectorsarea">
        <div class="flex-list age-connector-list">
          <Connector @drop="$emit('drop', $event)" @clicker="$emit('clicker', $event)" :connectorDOMs="connectorDOMs" :connections="connections" class="age-input" :key="input._id" v-for="input in $parent.win.inputs" :userdata="input"></Connector>
        </div>
        <div class="flex-list age-ui-inputs">
          <div :key="ui.id" v-for="ui in $parent.win.uis || []" class="full center">
            <MagicInput :ui="ui"></MagicInput>
          </div>
        </div>
        <div class="flex-list age-connector-list">
          <Connector @drop="$emit('drop', $event)" @clicker="$emit('clicker', $event)" :connectorDOMs="connectorDOMs" :connections="connections" class="age-output" :key="output._id" v-for="output in $parent.win.outputs" :userdata="output"></Connector>
        </div>
      </div>
      <div class="center full" v-if="win.preview">
        <PreviewRect :win="win" :previewDOMs="previewDOMs"></PreviewRect>
      </div>
    </div>

  </div>
</template>

<script>
// import * as AGE from '../api/age'
export default {
  props: {
    win: {},
    connections: {},
    previewDOMs: {},
    connectorDOMs: {}
  },
  components: {
    MagicInput: require('./MagicInput.vue').default,
    PreviewRect: require('./PreviewRect.vue').default,
    Connector: require('./Connector.vue').default
  },
  data () {
    return {
    }
  },
  mounted () {
    if (this.win.preview) {
      this.win.pos.h = this.$refs['connectorsarea'].getBoundingClientRect().height + 200 + 26
    } else {
      this.win.pos.h = this.$refs['connectorsarea'].getBoundingClientRect().height + 26
    }
    this.$parent.setupSubCompo({ subCompo: this })
  }
}
</script>

<style>

</style>
