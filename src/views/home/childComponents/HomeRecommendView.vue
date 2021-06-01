<template>
  <div class="recommend">
    <div v-for="recommend in recommends" :key="recommend.acm" class="recommend-item">
      <a :href="recommend.link">
        <img :src="recommend.image" :alt="recommend.title">
        <div>{{ recommend.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;

  padding: 15px 0;
  border-bottom: 8px solid #eeeeee;
}

.recommend-item {
  flex: 1;
  margin: 5px;
}

.recommend-item img {
  width: 100%;
  margin-bottom: 10px;
}

</style>
