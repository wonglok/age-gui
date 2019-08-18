<template>
  <path fill="none" stroke="black" stroke-linecap="round" v-if="path" :d="path" />
</template>

<script>
import * as AGE from '../api/age'
export default {
  props: {
    connection: {},
    connections: {},
    connectorDOMs: {}
  },
  data () {
    return {
      path: ``
    }
  },
  async mounted () {
    console.log(this.connectorDOMs)
    console.log(this.connections)

    let input = this.connection.input
    let output = this.connection.output

    let inputDOMInfo = this.connectorDOMs.find(e => e._id === input._id)
    let outputDOMInfo = this.connectorDOMs.find(e => e._id === output._id)

    let inputDOM = await AGE.getDOM({ domID: inputDOMInfo.domID })
    let outputDOM = await AGE.getDOM({ domID: outputDOMInfo.domID })

    window.addEventListener('plot', () => {
      let ri = inputDOM.getBoundingClientRect()
      let ro = outputDOM.getBoundingClientRect()
      let ix = ri.left + ri.width / 2
      let iy = ri.top + ri.height / 2
      let ox = ro.left + ro.width / 2
      let oy = ro.top + ro.height / 2

      let dx = (ox - ix) / 3 * 2

      // console.log(ri, ro)
      this.path = `M${ix},${iy} C${ix + dx},${iy} ${ox - dx},${oy} ${ox},${oy}`
    })

    window.dispatchEvent(new Event('plot'))
  }
}
</script>

<style>

</style>
