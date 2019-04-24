<template>
  <div style="background-color: #ececec; ">
    <a-affix :offsetTop="this.top" :style="{ position: 'absolute', left:'13%',top: '1%'}">
      <a-button type="primary" @click=""><a-icon type="cloud-upload"/> 上传</a-button>
    </a-affix>
    <a-row>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="二手手机">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="数码">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="游戏交易">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="二手图书">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="家具家电">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="服饰鞋包">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="车位">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col span="6">
        <a-card
          hoverable
          style="width: 240px"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            title="超值租">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <h4>卖闲置也能换钱</h4>
      <a-col span="24">
        <a-button>发布闲置</a-button>
      </a-col>
    </a-row>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="关注" key="1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane tab="新鲜" key="2"><a-row style="padding-top: 50px;">
        <a-col :span="8" v-for="c in cartList" :key='c.daily_id'>
          <a-card
            :hoverable='true'
            @click="linkTo(c.daily_id)"
            style="width: 80%;margin: 10px auto;"
          >
            <img
              :alt="c.type"
              style="height: 500px;"
              :src='"http://localhost:8080/jeecg-boot/"+c.p_url'
              slot="cover"

            />
            <a-card-meta
              :title="c.title">
              <template slot="description">
                {{ c.content }}
                <p class="card-p">99人感兴趣</p>
              </template>
              <a-avatar slot="avatar" :src='"http://localhost:8080/jeecg-boot/"+c.avatar'/>
            </a-card-meta>
          </a-card>

        </a-col>
      </a-row></a-tab-pane>
      <a-tab-pane tab="排行榜" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
    <template>
      <a-pagination showQuickJumper :defaultCurrent="1" :total="totalNum" @change="chagePage" />
    </template>
  </div>
</template>

<script>
  import { axios } from '@/utils/request'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'
  export default {
    name: 'Daily',
    components: { ACol, ARow },
    data() {
      return {
        top: 20,
        cartList: [{ dailyId: '111' }, { dailyId: '2' }, { dailyId: '3' }, { dailyId: '4' }],
        totalNum:200
      }
    },
    beforeCreate:async function(){
      const data = await axios.get('/frontend/daily/list',
        {params:{
            pageNo: 1,
            pageSize:20,
          }})
      this.cartList = data.records
      this.totalNum = data.total
    },
    methods: {
      linkTo(key) {
        this.$router.push({
          name:'dailyDetail',
          params:{id:key}})
      },
      getList(params){
        console.log(params)
        return axios.get('/frontend/comments/list',
          {params})
      },
      chagePage() {

      }
    }
  }
</script>

<style>
  .card-p {
    margin-top: 10px;
    text-align: right;
    color: rebeccapurple;
  }
</style>
