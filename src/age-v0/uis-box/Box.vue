<template>
  <div class="win-wrap" :style="getBoxLayoutStyle()" @click="focusApp">
    <BoxDefault @gear="$emit('gear', $event)" @drop="$emit('drop', $event)" @clicker="$emit('clicker', $event)" :connections="connections" :win="win" :previewDOMs="previewDOMs" :connectorDOMs="connectorDOMs"></BoxDefault>
    <div v-if="useResize" class="win-resize win-box-top-left" ref="top-left"></div>
    <div v-if="useResize" class="win-resize win-box-top-right" ref="top-right"></div>
    <div v-if="useResize" class="win-resize win-box-bottom-left" ref="bottom-left"></div>
    <div v-if="useResize" class="win-resize win-box-bottom-right" ref="bottom-right"></div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    BoxDefault: require('./BoxDefault.vue').default
  },
  props: {
    offset: {},
    type: {},
    win: {},
    wins: {},
    connections: {},
    previewDOMs: {},
    connectorDOMs: {}
  },
  data () {
    return {
      useResize: false,
      ready: false,
      omg: 0
    }
  },
  methods: {
    enableResize ({ subCompo }) {
      this.useResize = true
      this.$nextTick(() => {
        let makeDrag = AGE.UI.makeDrag

        let resize = () => {
          window.dispatchEvent(new Event('plot'))
          window.dispatchEvent(new Event('resize'))
        }

        makeDrag({
          dom: this.$refs['top-left'],
          onMM: ({ api }) => {
            this.win.pos.x += api.dX
            this.win.pos.y += api.dY
            this.win.pos.w -= api.dX
            this.win.pos.h -= api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            if (this.win.pos.h < 100) {
              this.win.pos.h = 100
            }
            resize()
          }
        })

        makeDrag({
          dom: this.$refs['top-right'],
          onMM: ({ api }) => {
            // this.win.pos.x += api.dX
            this.win.pos.y += api.dY
            this.win.pos.w += api.dX
            this.win.pos.h -= api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            if (this.win.pos.h < 100) {
              this.win.pos.h = 100
            }
            resize()
          }
        })

        makeDrag({
          dom: this.$refs['bottom-right'],
          onMM: ({ api }) => {
            // this.win.pos.x += api.dX
            // this.win.pos.y += api.dY
            this.win.pos.w += api.dX
            this.win.pos.h += api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            if (this.win.pos.h < 100) {
              this.win.pos.h = 100
            }
            resize()
          }
        })

        makeDrag({
          dom: this.$refs['bottom-left'],
          onMM: ({ api }) => {
            this.win.pos.x += api.dX
            // this.win.pos.y += api.dY
            this.win.pos.w -= api.dX
            this.win.pos.h += api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            if (this.win.pos.h < 100) {
              this.win.pos.h = 100
            }
            resize()
          }
        })
      })
    },
    // { _id: omg, val: omg, io: 'input', type: 'sampler2D', label: 'vec4' }
    focusApp () {
      AGE.UI.getDOM({ wins: this.wins, win: this.win })
    },
    getTitleStyle () {
      let types = AGE.boxColorTypes
      // console.log(types[this.win.type])
      return {
        color: 'white',
        textShadow: 'rgb(37, 37, 37) 0px 0px 3px',
        backgroundImage: types[this.win.type] || ''
      }
    },
    getBoxLayoutStyle () {
      return {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: `${this.win.pos.w}px`,
        height: `${this.win.pos.h}px`,
        minHeight: `calc(56px)`,
        minWidth: `calc(100px)`,
        transform: `translate3d(${this.offset.x + this.win.pos.x}px, ${this.offset.y + this.win.pos.y}px, 1px)`
      }
    },
    setupSubCompo ({ subCompo }) {
      let makeDrag = AGE.UI.makeDrag
      makeDrag({
        dom: subCompo.$refs['win-title'],
        onMM: ({ api }) => {
          this.win.pos.x += api.dX
          this.win.pos.y += api.dY

          window.dispatchEvent(new Event('plot'))
        }
      })
    }
  },
  mounted () {
    this.ready = true
    if (this.win.resize) {
      this.enableResize({ subCompo: this })
    }
  }
}
</script>

<style>

</style>
