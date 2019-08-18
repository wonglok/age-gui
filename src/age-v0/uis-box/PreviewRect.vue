<template>
  <div :id="`${rID}`" class="age-preview-area"></div>
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
      rID: AGE.getID()
    }
  },
  mounted () {
    this.previewDOMs.push({
      ...this.win,
      domID: this.rID
    })
  }
}
</script>

<style>

</style>
