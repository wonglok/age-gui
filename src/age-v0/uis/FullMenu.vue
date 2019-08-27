<template>
  <div class="full full-menu posrel">
    <div class="full-menu-taller">
    </div>
    <router-linker to="/" class="full-menu-item">
      Home
    </router-linker>
    <!-- <div class="full-menu-item">
      Get Started
    </div> -->
    <a href="https://wonglok.com" target="_blank" class="full-menu-item linker click">About Author</a>
    <a class="full-menu-item linker" href="https://instagram.com/wonglok831" target="_blank">
      Instagram
    </a>
    <a class="full-menu-item linker" href="https://github.com/wonglok/age-gui" target="_blank">
      Github
    </a>
    <!-- <div class="full-menu-item">
      Login
    </div>
    <div class="full-menu-item">
      Sign Up
    </div> -->
    <div class="posabs full-menu-close click">
      <img src="../icons/close.svg" @click="$emit('overlay', false)" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
