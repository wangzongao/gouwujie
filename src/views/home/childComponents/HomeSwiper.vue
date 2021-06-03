<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="banner in banners" :key="banner.acm">
        <a :href="banner.link">
          <img :src="banner.image" @load="homeSwiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    homeSwiperImageLoad() {
      if (!this.isLoad) {
        this.$emit('homeSwiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
