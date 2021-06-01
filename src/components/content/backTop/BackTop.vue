<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
export default {
  name: "BackTop",
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 50px;
  z-index: 10;
}

.back-top img {
  width: 43px;
}
</style>
