import {ADD_TO_CART, ADD_COUNTER, CLEAR_CART} from "./mutation-type";

export default {
  addToCart(context, payload) {
    return new Promise(resolve => {
      let oldGoods = context.state.cartList.find(goods => goods.iid === payload.iid)
      if (oldGoods) {
        context.commit(ADD_COUNTER, oldGoods)
        resolve('当前的商品数量+1')
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve('加入购物车成功')
      }
    })
  },
  clearCart(context) {
    return new Promise(resolve => {
      context.commit(CLEAR_CART)
      resolve('清除成功')
    })
  }
}
