<template>
  <div id="detail">
    <DetailNavbar class="detail-nav"/>
    <Scroll class="wrapper" ref="detailScroller">
      <DetailSwiper :swiperImages="swiperImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="detailImageLoad"/>
      <DetailParamsInfo :itemParams="itemParams"/>
      <DetailCommentInfo :commentInfo="commentInfo"/>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailNavbar from "./childComponents/DetailNavbar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamsInfo from "./childComponents/DetailParamsInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";

import {getDetail, Goods, Shop, GoodsParams} from "network/detail";
import debounce from "common/debounce";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      swiperImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {}
    }
  },
  components: {
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo
  },
  methods: {
    detailImageLoad() {
      this.$refs.detailScroller.refresh()
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res => {
      const data = res.data.result
      this.swiperImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.itemParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      console.log(data)
      console.log(this.commentInfo)

    })
  },
  mounted() {
    const refresh = debounce(this.$refs.detailScroller.refresh, 2000)
    refresh()
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;

  overflow: hidden;
}
</style>
