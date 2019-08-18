<template>
  <svg class="full connectionlines" :width="screen.ww" :height="screen.hh" style="margin-bottom: -6px;" :viewBox="viewBox">
    <!-- <rect x="500" y="500" width="500" height="500" fill="red"></rect> -->
    <ConnectionLineOne :connection="connection" :connections="connections" :connectorDOMs="connectorDOMs" :key="connection.input._id + connection.output._id" v-for="connection in connections"></ConnectionLineOne>
  </svg>
</template>

<script>
export default {
  components: {
    ConnectionLineOne: require('./ConnectionLineOne.vue').default
  },
  props: {
    connections: {},
    connectorDOMs: {}
  },
  data () {
    return {
      offsetX: 0,
      offsetY: 0,
      viewBox: `0 0 1 1`,
      screen: {
        ww: window.innerWidth,
        hh: window.innerHeight
      },
      scale: 1
    }
  },
  mounted () {
    this.viewBox = this.calcViewBox()
  },
  methods: {
    calcViewBox () {
      let { offsetX, offsetY, scale, screen } = this
      return ((-offsetX) * scale) + ' ' + ((-offsetY) * scale) + ' ' + screen.ww * scale + ' ' + screen.hh * scale
    }
  }
}
</script>

<style>

</style>
