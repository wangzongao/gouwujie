<template>
  <div id="detail">
    <DetailNavbar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <Scroll class="wrapper" ref="detailScroller" @scroll="contentScroll">
      <DetailSwiper :swiperImages="swiperImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <DetailParamsInfo :itemParams="itemParams" ref="paramsInfo"/>
      <DetailCommentInfo :commentInfo="commentInfo" ref="commentInfo"/>
      <GoodsList :goods="recommends" ref="recommendInfo"/>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"/>
    <BackTop v-show="isBackTopShow" @click.native="backTopClick('detailScroller')"/>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


import DetailNavbar from "./childComponents/DetailNavbar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamsInfo from "./childComponents/DetailParamsInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "network/detail";
import debounce from "common/debounce";
import {backTopMixin} from "common/mixin";
import {mapActions} from 'vuex'

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
      commentInfo: {},
      recommends: [],
      themeTopY: [0],
      currentIndex: null
    }
  },
  mixins: [backTopMixin],
  components: {
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  methods: {
    ...mapActions({
      addCart: 'addToCart'
    }),
    // 导航栏切换跳相应位置
    titleClick(index) {
      this.$refs.detailScroller.scrollTo(0, -this.themeTopY[index])
    },
    // Scroll组件的方法 根据滚动的位置切换导航栏
    contentScroll(pos) {
      this.isBackTopShow = -pos.y > 1000

      if (-pos.y >= 0 && -pos.y < this.themeTopY[1] && this.currentIndex !== 0) {
        this.currentIndex = 0
        this.$refs.detailNav.currentIndex = this.currentIndex
      } else if (-pos.y >= this.themeTopY[1] && -pos.y < this.themeTopY[2] && this.currentIndex !== 1) {
        this.currentIndex = 1
        this.$refs.detailNav.currentIndex = this.currentIndex
      } else if (-pos.y >= this.themeTopY[2] && -pos.y < this.themeTopY[3] && this.currentIndex !== 2) {
        this.currentIndex = 2
        this.$refs.detailNav.currentIndex = this.currentIndex
      } else if (-pos.y >= this.themeTopY[3] && this.currentIndex !== 3) {
        this.currentIndex = 3
        this.$refs.detailNav.currentIndex = this.currentIndex
      }
    },
    // 详情图片的加载
    detailImageLoad() {
      this.$refs.detailScroller.refresh()
      this.themeTopY.push(this.$refs.paramsInfo.$el.offsetTop)
      this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommendInfo.$el.offsetTop)
      console.log(this.themeTopY)
    },
    // 添加到购物车
    addToCart() {
      const goods = {}
      goods.image = this.swiperImages[0]
      goods.title = this.goods.title
      goods.desc = this.detailInfo.desc
      goods.lowNowPrice = this.goods.lowNowPrice
      goods.iid = this.iid
      goods.count = 1
      goods.checked = true
      this.addCart(goods).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.query.iid

    // 根据iid请求详情数据
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
    })

    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })
  },
  mounted() {
    const refresh = debounce(this.$refs.detailScroller.refresh)

    this.$bus.$on('itemDetailImageLoad', () => {
      refresh()
    })
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
