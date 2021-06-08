<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img :src="img" alt="" v-for="(img,index) in detailInfo.detailImage[0].list" :key="index" @load="detailImageLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imgListLength: 0
    }
  },
  methods: {
    detailImageLoad() {
      if (++this.counter === this.imgListLength) {
        this.$emit('detailImageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      this.imgListLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.start, .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.end {
  left: 72%;
}

.start::before, .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.end::after {
  right: 0;
}

.desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 20px;
}

.info-list img {
  width: 100%;
}
</style>
