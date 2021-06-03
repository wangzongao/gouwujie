<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="(swiperImage,index) in swiperImages" :key="index">
      <img :src="swiperImage">
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  props: {
    swiperImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper {
  width: 100vw;
  height: 400px;
}
</style>
