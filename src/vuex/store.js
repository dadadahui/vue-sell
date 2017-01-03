/**
 * Created by jhh on 2016/12/28.
 */
import Vue from 'vue';
import Vuex from 'Vuex';

// 告诉 vue “使用” vuex
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态

const state = {
  ratingType:2,
  onlyContent:false
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  SET_RATINGTYPE(state,type){
    state.ratingType = type;
  },
  TOGGLE_CONTENT(state){
    state.onlyContent = !state.onlyContent;
  }

}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})
