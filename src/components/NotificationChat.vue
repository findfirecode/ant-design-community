<template>
  <div>
    <wxChat
      :options="options"
      :showShade="false"
      :getUpperData="getUpperData"
      :getUnderData="getUnderData">
    </wxChat>
    <a-input-search placeholder="请输入内容" @search="" size="large" style="position: fixed;bottom: 0px;width: 100%;left: 0;">
      <a-button type="primary" slot="enterButton">发送</a-button>
    </a-input-search>
  </div>
</template>

<script>
  import wxChat from './util/wxChat'
  export default {
    name: 'notificationChat',
    components: {
      wxChat
    },
    data() {
      return {
        options: {
          ownerAvatarUrl: require('../assets/img/1.jpg'),
          contactAvatarUrl: require('../assets/img/2.jpg'),
          contactNickname: '简叔',
          data: [{
            direction: 2, // 为2表示微信主人发出的消息，1表示联系人
            id: 1, // 根据这个来排序消息
            type: 1, // 1为文本，2为图片
            content: '你好!!', // 当type为1时这里是文本消息，当type2为2时这里要存放图片地址；后续会支持语音的显示
            ctime: new Date().toLocaleString() // 显示当前消息的发送时间
          },
          {
            direction: 1,
            id: 2,
            type: 1,
            content: '你也好。',
            ctime: new Date().toLocaleString()
          }]
        },
        upperTimes: 0,
        underTimes: 0,
        upperId: 0,
        underId: 6
      }
    },
    methods: {
      // 向上滚动加载数据
      getUpperData() {
        const me = this;
        // 这里为模拟异步加载数据
        // 实际上你可能要这么写:
        // return axios.get('xxx').then(function(result){
        //     return result;  //result的格式需要类似下面resolve里面的数组
        // })
        return new Promise(function (resolve) {
          setTimeout(function () {
            // 模拟加载完毕
            if (me.upperTimes > 3) {
              return resolve([]);
            }

            // 加载数据
            resolve([{
              direction: 2,
              id: me.upperId - 1,
              type: 1,
              content: '向上滚动加载第 ' + me.upperTimes + ' 条！',
              ctime: new Date().toLocaleString()
            },
            {
              direction: 1,
              id: me.upperId - 2,
              type: 1,
              content: '向上滚动加载第 ' + me.upperTimes + ' 条！',
              ctime: new Date().toLocaleString()
            }])
            return ''
          }, 1000);
          me.upperId = me.upperId + 2;
          me.upperTimes++;
        })
      },

      getUnderData() {
        const me = this;
        // 意义同getUpperData()
        return new Promise(function (resolve) {
          setTimeout(() => {
            // 模拟加载完毕
            if (me.underTimes > 3) {
              return resolve([]);
            }

            // 加载数据
            resolve(
              [{
                direction: 1,
                id: me.underId + 1,
                type: 1,
                content: '向下滚动加载第 ' + me.underTimes + ' 条！',
                ctime: new Date().toLocaleString()
              },
              {
                direction: 2,
                id: me.underId + 2,
                type: 1,
                content: '向下滚动加载第 ' + me.underTimes + ' 条！',
                ctime: new Date().toLocaleString()
              }]
            )
            return ''
          }, 1000);

          me.underId = me.underId + 2;
          me.underTimes++;
        })
      }
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
  }
</style>
