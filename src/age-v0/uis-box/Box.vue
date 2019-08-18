<template>
  <div class="win-wrap" :style="getBoxLayoutStyle()" @click="focusApp">
    <BoxDefault :connectorDOMs="connectorDOMs"></BoxDefault>
    <div class="win-resize win-box-top-left" ref="top-left"></div>
    <div class="win-resize win-box-top-right" ref="top-right"></div>
    <div class="win-resize win-box-bottom-left" ref="bottom-left"></div>
    <div class="win-resize win-box-bottom-right" ref="bottom-right"></div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    BoxDefault: require('./BoxDefault.vue').default
  },
  props: {
    win: {},
    wins: {},
    connectorDOMs: {}
  },
  data () {
    return {
      ready: false,
      omg: 0
    }
  },
  methods: {
    // { _id: omg, val: omg, io: 'input', type: 'sampler2D', label: 'vec4' }
    focusApp () {
      AGE.focusApp({ wins: this.wins, win: this.win })
    },
    getTitleStyle () {
      let types = {
        statement: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
        uniform: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
        attribute: `linear-gradient(251deg, rgba(255,192,192,0.72) 9%, #FF1B1B 100%)`,
        varying: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
        function: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`,
        default: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`
      }
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
        minHeight: `calc(76px)`,
        minWidth: `calc(100px)`,
        transform: `translate3d(${this.win.pos.x}px, ${this.win.pos.y}px, 1px)`
      }
    },
    setupSubCompo ({ subCompo }) {
      let makeDrag = AGE.makeDrag
      makeDrag({
        dom: subCompo.$refs['win-title'],
        onMM: ({ api }) => {
          this.win.pos.x += api.dX
          this.win.pos.y += api.dY
        }
      })
    }
  },
  mounted () {
    this.omg = Math.random()
    this.ready = true

    let makeDrag = AGE.makeDrag

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
      }
    })
  }
}
</script>

<style>

</style>
