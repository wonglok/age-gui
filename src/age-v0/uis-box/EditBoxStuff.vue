<template>
  <div class="full age-addbox-wrap scroller">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content ">
      <h1>
        Edit Module
      </h1>
      <button @click="remove()">Remove this</button>
      <div>
        <p>JSON</p>
        <pre>{{ win }}</pre>
      </div>
    </div>
    <div class="age-addbox-close" @click="close()">
      <img src="../icons/close.svg" alt="" />
    </div>
  </div>
</template>

<script>
// import * as AGE from '../api/age'

export default {
  props: {
    winID: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      win: this.wins.find(e => e._id === this.winID)
    }
  },
  methods: {
    close () {
      this.$parent.overlay = false
      this.$emit('save', true)
    },
    remove () {
      this.win.inputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      this.win.outputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      this.wins.splice(this.wins.findIndex(w => w._id === this.winID), 1)
      this.$root.$forceUpdate()
      this.close()
    }
  }
}
</script>

<style>

</style>
