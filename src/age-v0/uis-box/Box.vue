<template>
  <div class="win-wrap" :style="getStyle()" @click="focusApp">
    <div class="win-box full">
      <div class="win-title nosel" ref="win-title">
        123
      </div>
      <div class="win-content" ref="win-content">
        <DDDot v-if="ready" :userdata="{ _id: omg, val: omg }"></DDDot>
      </div>
    </div>
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
    DDDot: require('./DDDot.vue').default
  },
  props: {
    win: {},
    wins: {}
  },
  data () {
    return {
      ready: false,
      omg: 0
    }
  },
  methods: {
    focusApp () {
      AGE.focusApp({ wins: this.wins, win: this.win })
    },
    getStyle () {
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
    }
  },
  mounted () {
    this.omg = Math.random()
    this.ready = true

    let makeDrag = AGE.makeDrag

    makeDrag({
      dom: this.$refs['win-title'],
      onMM: ({ api }) => {
        this.win.pos.x += api.dX
        this.win.pos.y += api.dY
      }
    })

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
