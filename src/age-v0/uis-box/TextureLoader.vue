<template>
  <div>
    <input type="text" v-model="ui.url" @input="onInput" class="age-reset" style="width: 80px; font-size: 10px; border: black solid 1px;" />
    <br />
    <input accept="image/*" type="file" ref="file" class="age-reset" @change="onChange" v-show="false">
    <button style="width: 80px; font-size: 10px; border: black solid 1px;" class="age-reset" @click="$refs['file'].click()">Opne File</button>
  </div>
</template>

<script>
export default {
  props: {
    ui: {}
  },
  methods: {
    onInput () {
      window.dispatchEvent(new Event('compile-shader'))
      this.$nextTick(() => {
        window.dispatchEvent(new Event('compile-shader'))
      })
    },
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
