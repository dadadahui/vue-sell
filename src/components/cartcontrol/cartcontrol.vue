<template>
  <div class="cartcontrol">
    <transition name ="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show = "food.count > 0" @click.stop.prevent = "decreaseCart">
        <span class="inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show = "food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default{

      props:{
        food:{
          type:Object
        }
      },
      created(){
        // console.log(this.food);
      },
      methods:{
        addCart(event){
          if(!event._constructed){
            return;
          }
          // 判断逻辑，不能强行让count一开始就等于0 吧~
          if(!this.food.count){
            // this.food.count = 1;

            //一开始count这个属性并不存在，所以不能"this.food.count = 1;"
            Vue.set(this.food,'count',1);
          }else{
            this.food.count++;
          }
          //派发事件
          // this.$dispatch('cart.add',event.target);
          this.$emit('cart-add',event.target);
        },
        decreaseCart(event){
          if(!event._constructed){
            return;
          }
          if(this.food.count){
            this.food.count--;
          }
        }
      }
      // vuex:{
      //   actions:{
      //     add:function ({dispatch}, value) {
      //       dispatch('cart.add',event.target);
      //     }
      //   }
      // }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display: inline-block
      padding 6px
      font-size 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      transition all 0.4s linear
      .inner
        display: inline-block
        /*transition all 0.4s ease*/
      &.move-enter,&.move-leave-active
        transform translate3d(24px,0,0)
        /*.inner
          transform rotate(180deg)*/
      /*&.move-leave-active
        .inner
          transform rotate(0)*/
    .cart-count
      display: inline-block
      vertical-align top
      width: 12px
      font-size 10px
      text-align center
      padding-top 6px
      line-height: 24px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding 6px
      font-size 24px
      line-height: 24px
      color: rgb(0, 160, 220)

</style>
