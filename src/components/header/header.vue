<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <!--使用v-if，因为ajax是异步请求-->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail" >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <!--如果span，某些安卓浏览器会有兼容问题-->
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class=supports>
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <!--如果span，某些安卓浏览器会有兼容问题-->
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">

    import star from "components/star/star"

    export default{
    //prop 是父组件用来传递数据的一个自定义属性。
    //子组件需要显式地用 props 选项 声明 “prop”：
        props: {
            seller: {
                type: Object
            }
        },
        //Vue的data永远是个function，因为可能会有多个组件实例
        data(){
            return {//需要跟踪依赖的变量
                //当实例化变量时，会对data返回的对象里的变量进行遍历，添加getter和setter
                detailShow:false
            }
        },
        methods:{
          showDetail(){
            this.detailShow = true;
          },
          hideDetail(){
            this.detailShow = false;
          }
        },
        created(){
            this.classMap = ['decrease','discount','special','invoice','guarantee']
        },
        components:{
          star
        }

    };





</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      font-size: 0
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            font-size: 12px
            line-height: 10px

      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          font-size: 10px
          line-height: 24px

    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      /*点点点的三个组合*/
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        /*vertical-align: top*/
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 10px
        font-size: 10px

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)

     .detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        transition all  .5s
        &.fade-enter-active
           opacity 1
           background: rgba(7, 17, 27, 0.8)
        &.fade-leave-active,&.fade-enter
          /*transition all   ease*/
          opacity 0
          /*background: rgba(7, 17, 27, 0)*/

        .detail-wrapper
          width: 100%
          min-height: 100%
          .detail-main
            margin-top: 64px
            padding-bottom: 64px //padding而不是margin
            .name
              line-height: 16px
              text-align: center
              font-size: 16px
              font-weight: 700
            .star-wrapper
              margin-top: 18px
              padding: 2px
              text-align: center
            .title
              width: 80%
              margin: 28px auto 24px auto
              display: flex
              .text
                padding: 0 12px
                font-size: 14px
                font-weight: 700
              .line
                position: relative
                top: -6px
                flex: 1
                border-bottom: 1px solid rgb(255, 255, 255, 0.2)
            .supports
              width: 80%
              margin: 0 auto
              .support-item
                padding: 0 12px
                margin-bottom: 12px
                font-size: 0
                &:last-child
                  margin-bottom: 0
                .icon
                  display: inline-block
                  width: 16px
                  height: 16px
                  vertical-align: top
                  margin-right: 6px
                  background-size: 16px 16px
                  background-repeat no-repeat
                  &.decrease
                    bg-img('decrease_2')
                  &.discount
                    bg-img('discount_2')
                  &.guarantee
                    bg-img('guarantee_2')
                  &.invoice
                    bg-img('invoice_2')
                  &.special
                    bg-img('special_2')
                .text
                  font-size: 12px
                  line-height: 16px
                  font-weight: 700
            .bulletin
              width: 80%
              margin: 0 auto
              .content
                padding: 0 12px
                line-height: 24px
                font-size: 12px

        .detail-close
          position: relative
          width: 32px
          height: 32px
          margin: -64px auto 0 auto
          clear: both
          font-size: 32px

</style>


