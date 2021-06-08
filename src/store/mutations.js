import {ADD_TO_CART, ADD_COUNTER, CLEAR_CART} from './mutation-type'

export default {
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [CLEAR_CART](state){
    state.cartList.splice(0,state.cartList.length)
  }
}
