<template>
  <div id="home">
    <Navbar class="home-navbar">
      <div slot="center">购物街</div>
    </Navbar>
    <TabControl class="tab-control" :titles="['流行','新款','精选']" @titleClick="titleClick" ref="tab-control1"
                v-show="isTabControlFixed"/>
    <Scroll class="wrapper" :probeType="3" :pullupLoad="true"
            @scroll="contentScroll" @pullingUp="pullingUp" ref="scroller">
      <HomeSwiper :banners="banners" class="home-swiper" @homeSwiperImageLoad="homeSwiperImageLoad"/>
      <HomeRecommendView :recommends="recommends" @recommendImageLoad="recommendImageLoad"/>
      <HomeFeatureView @featureImageLoad="featureImageLoad"/>
      <TabControl :titles="['流行','新款','精选']" @titleClick="titleClick" ref="tab-control2"/>
      <GoodsList :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backTopClick('scroller')" v-show="isBackTopShow"/>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommendView from "./childComponents/HomeRecommendView";
import HomeFeatureView from "./childComponents/HomeFeatureView";

import {getHomeMultidata, getHomeGoods} from "network/home";
import debounce from "common/debounce";
import {backTopMixin} from "common/mixin";
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
      tabOffsetTop: 0,
      isTabControlFixed: false
    }
  },
  mixins:[backTopMixin],
  components: {
    Navbar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //图片加载相关
    homeSwiperImageLoad() {
      this.tabOffsetTop = this.$refs["tab-control2"].$el.offsetTop
    },
    recommendImageLoad() {
      this.tabOffsetTop = this.$refs["tab-control2"].$el.offsetTop
    },
    featureImageLoad() {
      this.tabOffsetTop = this.$refs["tab-control2"].$el.offsetTop
    },
    //Scroll组件的方法
    contentScroll(pos) {
      this.isBackTopShow = -pos.y > 1000

      this.isTabControlFixed = -pos.y > this.tabOffsetTop
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

      this.$refs["tab-control1"].currentIndex = index
      this.$refs["tab-control2"].currentIndex = index
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
    const refresh = debounce(this.$refs.scroller.refresh, 200)
    this.$bus.$on('itemHomeImageLoad', () => {
      refresh()
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
  overflow: hidden;
}

.home-navbar {
  background-color: var(--color-tint);
  color: white;
}

.tab-control {
  position: relative;
  z-index: 9;
}

</style>
