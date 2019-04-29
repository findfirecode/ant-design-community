<template>
  <div style="background-color: #ececec; ">
    <a-affix :offsetTop="this.top" :style="{ position: 'absolute', left:'13%',top: '1%'}">
      <a-button type="primary" @click=""><a-icon type="cloud-upload"/> 上传</a-button>
    </a-affix>
    <a-card title="所有分类">
      <a-card-grid style="width:25%;textAlign:'center'">二手手机</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">数码</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">游戏交易</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">二手图书</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">家具家电</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">服饰鞋包</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">车位</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">超值租</a-card-grid>
    </a-card>
    <a-row>
      <h4>卖闲置也能换钱</h4>
      <a-col span="24">
        <a-button @click="() => { this.addDailyModel = !this.addDailyModel }">发布闲置</a-button>
      </a-col>
    </a-row>
    <a-modal
      title="发布闲置"
      v-model="addDailyModel"
      @ok=""
    >
      <a-form
        id="add-daily"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item
          label="标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
          'note',
          {rules: [{ required: true, message: '请输入标题' }]}
        ]"
          />
        </a-form-item>
        <a-form-item
          label="文章内容"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-textarea placeholder="请输入文章内容" :rows="4"
          v-decorator="[
          'note',
          {rules: [{ required: true, message: '请输入描述内容' }]}
        ]"></a-textarea>
        </a-form-item>
<!--        封面-->
        <a-form-item
          v-bind="fff"
          label="请上传封面图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
          extra="只能上传一张"
        >
          <a-upload
            v-decorator="['upload', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        }]"
            name="cover"
            action=""
            list-type="picture"
          >
            <a-button>
              <a-icon type="upload" /> 上传封面图片
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          v-bind="dd"
          label="请上详情图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
          extra="上传一张或多张"
        >
          <a-upload
            v-decorator="['upload', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        }]"
            name="cover"
            action=""
            list-type="picture"
          >
            <a-button>
              <a-icon type="upload" /> 上传详情图片
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-tabs defaultActiveKey="1">
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
      <a-tab-pane tab="关注" key="1">Content of Tab Pane 1</a-tab-pane>
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
        totalNum:200,
        addDailyModel:false
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
