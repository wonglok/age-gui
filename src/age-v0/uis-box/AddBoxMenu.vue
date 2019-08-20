<template>
  <div class="full age-addbox-wrap">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content">
      <h1>
        Add Modules
      </h1>
      <div class="age-addbox-menu-item">
        <strong>Varying</strong>
        <div>
          Type
        </div>
        <div>
          <select v-model="varyingType">
            <option value="float">float</option>
            <option value="vec2">Vector 2</option>
            <option value="vec3">Vector 3</option>
            <option value="vec4">Vector 4</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          Name
        </div>
        <div>
          <input type="text" v-model="varyingName">
        </div>
        <div>
          <button @click="addVarying()">Add</button>
        </div>
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
  data () {
    return {
      varyingName: 'vUv',
      varyingType: 'vec2'
    }
  },
  methods: {
    close () {
      this.$parent.overlay = false
    },
    addVarying () {
      // AGE.addVarying()
      this.close()
    }
  }
}
</script>

<style>

</style>
