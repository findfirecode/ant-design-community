<template>
  <div>
      <a-tabs defaultActiveKey="1" @change="">
        <a-tab-pane tab="关于我的评论" key="1" forceRender>
          <scrollList
            @addListData="pushScrollData"
          >
            <a-list
              :dataSource="dataList"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.description">
                  <a slot="title" :href="item.url">{{item.name}}</a>
                  <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </a-list-item-meta>
                <span style="color: blue;">我的评论：</span>
                <div>fffffffffffffffffffffffffff</div>
              </a-list-item>
            </a-list>
          </scrollList>
        </a-tab-pane>
        <a-tab-pane tab="关于我的物品" key="2">
          <a-list
            class="demo-loadmore-list"
            itemLayout="horizo  ntal"
            :dataSource="dataList"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a slot="actions" :href="`/chat/${item.id}`">聊天</a>
              <a-list-item-meta
                description="还想出售吗"
              >
                <a slot="title">{{item.name}}</a>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-list-item-meta>
              <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" width="50" height="50">
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane tab="关于我的技能" key="3"> <a-list
          class="demo-loadmore-list"
          itemLayout="horizo  ntal"
          :dataSource="dataList"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" :href="`/chat/${item.id}`">聊天</a>
            <a-list-item-meta
              description="还想出售吗"
            >
              <a slot="title">{{item.name}}</a>
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-list-item-meta>
            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" width="50" height="50">
          </a-list-item>
        </a-list></a-tab-pane>
        <a-tab-pane tab="物业通知" key="4">
          <a-list
            itemLayout="horizontal"
            :dataSource="dataList"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta
                :description="item.description"
              >
                <a slot="title" href="https://vue.ant.design/">{{item.name}}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </div>
</template>

<script>
  import scrollList from './util/scrollList'
  export default {
    name: 'notification',
    components: {
      scrollList
    },
    data () {
      return {
        dataList: [
          { id: '1', name: 'hmap', description: 'tjc就是个蠢驴', url: '#' },
          { id: '2', name: 'hmap', description: 'tjc就是个蠢驴', url: '#' },
          { id: '3', name: 'hmap', description: 'tjc就是个蠢驴', url: '#' },
          { id: '4', name: 'hmap', description: 'tjc就是个蠢驴', url: '#' }
        ]
      }
    },
    beforeMount () {
      // this.fetchData((res) => {
      //   this.data = res.results
      //   console.log('data-----', this.data)
      // })
    },
    methods: {
      pushScrollData(aData) {
        this.dataList = [...this.dataList,...aData]
      }
    }
  }
</script>

<style scoped>
  .ant-list-item-meta-content .ant-list-item-meta-description{
    text-align: left;
  }
  .ant-list-item-meta-content h4{
    text-align: left;
  }
  .demo-loadmore-list {
    min-height: 350px;
  }
</style>
