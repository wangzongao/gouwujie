<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="price">{{ goods.price }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount-desc">{{ goods.discountDesc }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #222
}

.info-price {
  margin-top: 10px;
}

.price {
  color: var(--color-high-text);
  font-size: 24px;
}

.old-price {
  font-size: 13px;
  text-decoration: line-through;
  margin-left: 10px;
}

.discount-desc {
  margin-left: 10px;
  padding: 2px 5px;
  color: #ffffff;
  background-color: var(--color-high-text);
  border-radius: 5px;
  font-size: 12px;

  position: relative;
  top: -5px;
}

.info-other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}


.info-service-item img {
  width: 14px;
  height: 14px;

  position: relative;
  top: 2px;
}

.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>
