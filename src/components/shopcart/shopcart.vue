<template>
  <div class="wrapper">
    <div class="shopcart">
      <div class="content" @click = "toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class = "{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class = "{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show = "totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class = "{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <!--阻止冒泡，阻止默认事件-->
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class = "payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <!--<transition name="drop">-->
        <div v-for="ball in balls" v-show = "ball.show" class="ball" >
          <!--两个方向，所以inner-->
          <!--inner-hook,js用-->
          <div class="inner inner-hook"></div>
        </div>
        <!--</transition>-->
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food border-1px" v-for ="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
  </div>
</template>


<script type="text/ecmascript-6">
  import cartcontrol from "components/cartcontrol/cartcontrol";
  import BScroll from "better-scroll";

  export default{
    props:{
      selectFoods:{
        type:Array,
        // array或object，默认是个函数
        default(){
          // return [];
          return [
            {
              count:2,
              price:5.0
            }
          ]
          }
      },
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
        balls:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ],
        dropBalls:[],
        // 折叠
        fold:true
      }
    },
    computed:{
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc(){
        if (this.totalPrice === 0){
          // es6语法，反引号
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }else {
          return '去结算';
        }

      },
      payClass(){
        if(this.totalPrice < this.minPrice){
          return 'not-enough';
        }else {
          return 'enough';
        }
      },
      listShow(){
        if (!this.totalCount){
          // 中间变量fold
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show){
          this.$nextTick(()=>{
            // 不用每次fold变化，都要初始化一遍scroll，所以判断一下咯~
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.listContent,{
                click:true
              });
          }else{
            this.scroll.refresh();
        }});
        }
        return show;
      }
    },
    methods:{
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count = 0;
          //导致totalCount = 0了
        })
      },
      drop(el){
        // for (let i = 0;i<this.balls.length;i++){
        //   //从所有隐藏的ball里面，找到一个小球，show设为true
        //   let ball = this.balls[i];
        //   if (!ball.show){
        //     ball.show = true;
        //     ball.el = el;
        //     this.dropBalls.push(ball);
        //
        //   }
        // }
      },
      // beforeEnter(el){
      //   let count = this.balls.length;
      //   while(count--){
      //     let ball = this.balls[count];
      //     if (ball.show){
      //       //元素相对于视口的位置
      //       let rect = ball.el.getBoundingClientRect();
      //       let x = rec.left-32;
      //       let y = -(window.innerHeight-rec.top-22);
      //       // 显示小球
      //       el.style.display='';
      //       el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      //       el.style.transform = `translate3d(0,${y}px,0)`;
      //       let inner = el.getElementsByClassName('inner-hook')[0];
      //       inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
      //       inner.style.transform = `translate3d(${x}px,0,0)`;
      //     }
      //   }
      // },
      // enter(el){
      //   // 主动触发浏览器重绘
      //   let rf = el.offsetHeight;
      //   this.$nextTick(()=>{
      //     el.style.webkitTransform = 'translate3d(0,0,0)';
      //     el.style.transform = 'translate3d(0,0,0)';
      //     let inner = el.getElementsByClassName('inner-hook')[0];
      //     inner.style.webkitTransform = 'translate3d(0,0,0)';
      //     inner.style.transform = 'translate3d(0,0,0)';
      //   })
      // },
      // afterEnter(el){
      //   let ball = this.dropBalls.shift();
      //   if (ball){
      //     ball.show = false;
      //     el.style.display="none";
      //   }
      // },
      toggleList(){
        // 有两种状态，所以需要判断
        if (!this.totalCount){
          //无效
          return;
        }
        this.fold = !this.fold;
      },
      hideList(){
        this.fold = true;
      },
      pay(){
        if (this.totalPrice< this.minPrice){
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    // transitions:{
    //   drop:{
    //     beforeEnter(el){
    //       let count = this.balls.length;
    //       while(count--){
    //         let ball = this.balls[count];
    //         if (ball.show){
    //           //元素相对于视口的位置
    //           let rect = ball.el.getBoundingClientRect();
    //           let x = rec.left-32;
    //           let y = -(window.innerHeight-rec.top-22);
    //           // 显示小球
    //           el.style.display='';
    //           el.style.webkitTransform = `translate3d(0,${y}px,0)`;
    //           el.style.transform = `translate3d(0,${y}px,0)`;
    //           let inner = el.getElementsByClassName('inner-hook')[0];
    //           inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    //           inner.style.transform = `translate3d(${x}px,0,0)`;
    //         }
    //       }
    //     },
    //     enter(el){
    //       // 主动触发浏览器重绘
    //       let rf = el.offsetHeight;
    //       this.$nextTick(()=>{
    //         el.style.webkitTransform = 'translate3d(0,0,0)';
    //         el.style.transform = 'translate3d(0,0,0)';
    //         let inner = el.getElementsByClassName('inner-hook')[0];
    //         inner.style.webkitTransform = 'translate3d(0,0,0)';
    //         inner.style.transform = 'translate3d(0,0,0)';
    //       })
    //     },
    //     afterEnter(el){
    //       let ball = this.dropBalls.shift();
    //       if (ball){
    //         ball.show = false;
    //         el.style.display="none";
    //       }
    //     }
    //   }
    // }
    components:{
      cartcontrol
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .wrapper
    .shopcart
      position: fixed
      left:0
      bottom: 0
      width:100%
      height: 48px
      z-index:999
      .content
        display: flex
        font-size 0
        background: #141d27
        color: rgba(255, 255, 255, 0.4)
        .content-left
          flex:1
          .logo-wrapper
            display: inline-block
            vertical-align top
            position relative
            top: -10px
            margin 0 12px
            padding 6px
            width: 56px
            height: 56px
            background: #141d27
            border-radius 50%
            .logo
              width:100%
              height: 100%
              border-radius 50%
              background #2B343C
              text-align center
              &.highlight
                background #00A0DC
              .icon-shopping_cart
                font-size 24px
                line-height: 44px
                color: rgba(255,255,255,0.4)
                &.highlight
                  color: #fff

          .num
            position absolute
            top:0
            right:0
            width: 24px
            height: 16px
            line-height: 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight:700
            color: #fff
            background #F01111
            box-shadow 0 4px 8px rgba(0,0,0,0.4)

          .price
            display: inline-block
            vertical-align top
            margin-top 12px
            line-height:24px
            box-sizing border-box
            padding-right 12px
            border-right 1px solid rgba(255,255,255,0.1)
            font-size 16px
            font-weight:700
            &.highlight
              color: #fff
          .desc
            display: inline-block
            vertical-align top
            margin: 12px 0 0 12px
            line-height: 24px
            font-size 10px
        .content-right
          flex: 0 0 105px
          width: 105px
          .pay
            height 48px
            line-height: 48px;
            text-align center
            font-size 12px
            font-weight 700
            &.not-enough
              background  #2B343B
            &.enough
              background  #00b43c
              color #fff


      .ball-container
        .ball
          position: fixed
          left: 32px
          bottom 22px
          z-index:999
          transition all 0.4s linear
          .inner
            width: 16px
            height: 16px
            border-radius 50%
            background rgb(0,160,220)
      .shopcart-list
        position absolute
        top:0
        left: 0
        z-index:-1
        width:100%
        .list-header
          height 40px
          line-height: 40px;
          padding 0 18px
          background #f3f5f7
          border-bottom 1px solid rgba(7,17,27,0.1)
          .title
            float left
            font-size 14px
            color: rgb(7, 17, 27)
          .empty
            float: right
            font-size 12px
            color: rgb(0, 160, 220)
        .list-content
          padding 0 18px
          max-height: 217px
          /*超过最大高度隐藏*/
          overflow: hidden
          background #fff
          .food
            position relative
            padding:12px 0
            box-sizing border-box
            border-1px(rgba(7,17,27,0.1))
            .name
              line-height: 24px;
              font-size 14px
              color: rgb(7, 17, 27)
            .price
              position absolute
              right: 90px
              bottom 12px
              line-height: 24px;
              font-size 14px
              font-weight:700
              color: rgb(240, 20, 20)
            .cartcontrol-wrapper
              position absolute
              right:0
              bottom: 6px


      /*.fold-enter,.fold-leave-active
        transition all 0.4s
        transform  translate3d(0,0,0)*/
      .fold-enter-active
        transition all 9999s
        transform  translate3d(0,-100%,0)

    .list-mask
      position fixed
      top:0
      left:0
      width:100%
      height:100%
      z-index:998
      backdrop-filter blur
      background:rgba(7,17,27,0.6)


</style>
