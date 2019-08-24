<template>
  <div>
    <input type="file" ref="file" class="age-reset" @change="onChange" v-show="false">
    <button @click="$refs['file'].click()">Opne File</button>
  </div>
</template>

<script>
export default {
  props: {
    ui: {}
  },
  methods: {
    onChange (evt) {
      let files = evt.target.files
      if (files[0]) {
        let link = URL.createObjectURL(files[0])
        this.ui.url = link
        window.dispatchEvent(new Event('compile-shader'))
      }
    }
  }
}
</script>

<style>

</style>
