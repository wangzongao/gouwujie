<template>
  <div id="home">
    <navbar class="home-navbar">
      <div slot="center">购物街</div>
    </navbar>
    <Scroll class="wrapper" :probeType="3" :pullupLoad="true"
            @scroll="contentScroll" @pullingUp="pullingUp" ref="scroller">
      <HomeSwiper :banners="banners" class="home-swiper"/>
      <HomeRecommendView :recommends="recommends"/>
      <HomeFeatureView/>
      <TabControl :titles="['流行','新款','精选']" @titleClick="titleClick" class="tab-control"/>
      <GoodsList :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backTopClick" v-show="isBackTopShow"/>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommendView from "./childComponents/HomeRecommendView";
import HomeFeatureView from "./childComponents/HomeFeatureView";

import {getHomeMultidata, getHomeGoods} from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isBackTopShow: false
    }
  },
  components: {
    Navbar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //backTop回到顶部
    backTopClick() {
      this.$refs.scroller.scrollTo(0, 0)
    },
    //Scroll组件的方法
    contentScroll(pos) {
      this.isBackTopShow = -pos.y > 1000
    },
    pullingUp() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroller.finishPullUp()
    },
    //TabControl组件的方法，用来切换tab栏
    titleClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    //网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(
        res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page++
          console.log(res)
        }
      )
    }
  },
  created() {
    // 请求轮播图数据和推荐视图数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 监听图片的加载后，刷新scroll
    this.$bus.$on('goodsItemHomeImageLoad', () => {
      this.$refs.scroller.refresh()
    })
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.home-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  background-color: var(--color-tint);
  color: white;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
