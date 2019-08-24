<template>
  <div :id="`${rID}`" :style="{ height: height }" class="age-preview-area"></div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  props: {
    win: {},
    previewDOMs: {}
  },
  data () {
    return {
      height: 200,
      rID: AGE.getID()
    }
  },
  mounted () {
    this.previewDOMs.push({
      ...this.win,
      domID: this.rID
    })

    window.addEventListener('resize', () => {
      let dom = this.$parent.$refs['win-content']
      let connectorsDOM = this.$parent.$refs['connectorsarea']
      if (dom && connectorsDOM) {
        let h2 = connectorsDOM.getBoundingClientRect().height
        this.height = (dom.getBoundingClientRect().height - h2) + 'px'
        // if (this.win.type === 'preview-box') {
        // }
      }
    }, false)

    window.dispatchEvent(new Event('resize'))

    this.$nextTick(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }
}
</script>

<style>

</style>
