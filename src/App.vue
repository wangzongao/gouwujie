<template>
  <div id="app">
    <router-view/>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "./components/common/tabbar/MainTabbar";

export default {
  name: 'app',
  components: {
    MainTabbar
  }
}
</script>
<style>
@import "assets/css/base.css";
</style>
