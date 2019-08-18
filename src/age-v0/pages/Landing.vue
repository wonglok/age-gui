<template>
  <div class="age-edit age-layers">
    <div class="age-layer">
      <TopNav  @overlay="overlay = $event" v-if="width >= 768"></TopNav>
      <TopNavMobile @overlay="overlay = $event" v-else></TopNavMobile>
      <ContentBox>
        <Hero></Hero>
      </ContentBox>
    </div>
    <div class="age-layer" v-if="overlay === 'fullmenu'">
      <FullMenu class="full" @overlay="overlay = $event"></FullMenu>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Hero: require('../uis/Hero.vue').default,
    FullMenu: require('../uis/FullMenu.vue').default,
    TopNavMobile: require('../uis/TopNavMobile.vue').default,
    TopNav: require('../uis/TopNav.vue').default,
    ContentBox: require('../uis/ContentBox.vue').default
  },
  data () {
    return {
      width: window.innerWidth,
      overlay: false
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
    })
  }
}
</script>

<style>

</style>
