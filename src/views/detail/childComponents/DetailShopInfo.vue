<template>
  <div v-if="Object.keys(shop).length !== 0" class="shop-info">
    <div class="shop-top">
      <img :src="shop.shopLogo">
      <span>{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ shop.cSells | sellCountFilter }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.cGoods }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <div v-for="(item,index) in shop.score" :key="index" class="score-box">
          <span class="score-name">{{ item.name }}</span>
          <span class="score" :class="{'better-color':item.isBetter}">{{ item.score }}</span>
          <span class="better" :class="{'better-bgColor':item.isBetter}">{{ item.isBetter ? '高' : '低' }}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <span>进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      return value < 10000 ? value : (value / 10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.shop-top {
  line-height: 45px;
  display: flex;
}

.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, .1);
}

.shop-top span {
  margin-left: 10px;
}

.shop-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.shop-middle-item {
  flex: 1;
}

.shop-middle-left {
  display: flex;
  justify-content: space-around;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, .1);
}

.sells-count, .goods-count {
  font-size: 18px;
}

.sells-text, .goods-text {
  margin-top: 10px;
  font-size: 12px;
}

.shop-middle-right {
  font-size: 13px;
  color: #333;
}

.score-box {
  margin: 5px 0;
  display: flex;
  justify-content: space-evenly;
}

.score {
  width: 30px;
}

.score {
  color: #5ea732;
}

.better {
  color: #ffffff;
  background-color: #5ea732;
}

.better-color {
  color: #f13e3a;
}

.better-bgColor {
  background-color: #f13e3a;
}

.shop-bottom {
  margin-top: 15px;
  text-align: center;

}

.shop-bottom span {
  padding: 5px 20px;
  background-color: #f2f5f8;
  border-radius: 10px;
}
</style>
