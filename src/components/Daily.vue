<template>
  <div style="background-color: #ececec; ">
    <a-card title="所有分类">
      <a-card-grid style="width:25%;textAlign:'center'">全部</a-card-grid>
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
        <a-button @click="showAddModal">发布闲置</a-button>
      </a-col>
    </a-row>
    <a-modal
      title="发布闲置"
      v-model="addDailyModel"
      @cancel="clearImg"
      @ok="handleSubmit"
      :destroyOnClose="true"
    >
      <a-form
        id="add-daily"
        :form="form"
      >
        <a-form-item
          label="标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题' }]}
        ]"
          />
        </a-form-item>
        <a-form-item
          label="价格"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
          'price',
          {rules: [{ required: true, message: '请输入价格' }]}
        ]"
          /></a-form-item>
        <a-form-item
          label="文章内容"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-textarea placeholder="请输入文章内容" :rows="4"
          v-decorator="[
          'content',
          {rules: [{ required: true, message: '请输入描述内容' }]}
        ]"></a-textarea>
        </a-form-item>
        <a-form-item
          label="分类"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          has-feedback
        >
          <a-select
            v-decorator="[
          'type',
          {rules: [{ required: true, message: '请选择你的分类' }]}
        ]"
            placeholder="请选择你的分类"
          >
            <a-select-option value="二手手机">
              二手手机
            </a-select-option>
            <a-select-option value="数码">
              数码
            </a-select-option>
            <a-select-option value="游戏交易">
              游戏交易
            </a-select-option>
            <a-select-option value="二手图书">
              二手图书
            </a-select-option>
            <a-select-option value="家具家电">
              家具家电
            </a-select-option>
            <a-select-option value="服饰鞋包">
              服饰鞋包
            </a-select-option>
            <a-select-option value="车位">
              车位
            </a-select-option>
            <a-select-option value="超值租">
              超值租
            </a-select-option>
          </a-select>
        </a-form-item>
<!--        封面-->
        <a-form-item
          label="请上传封面图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
          extra="只能上传一张"
        >
          <a-upload
            action="http://localhost:8080/community/sys/common/upload"
            listType="picture-card"
            :fileList="coverList"
            @preview="handlePreview"
            @change="handleChange"
            :data="{ type:'cover', ...fileData}"
          >
            <div v-if="coverList.length === 0">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传封面</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
        <a-form-item
          label="请上传详情图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
           extra="上传一张或多张图片"
        >
          <a-upload
            name="files"
            action="http://localhost:8080/community/sys/common/uploadMultipart"
            listType="picture-card"
            :fileList="detailList"
            @preview="handlePreview"
            @change="handleMultipartChange"
            :data="{ type:'detail', ...fileData}"
            :multiple="true"
          >
              <a-icon type="plus" />
              <div class="ant-upload-text">上传详情图片</div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="新鲜" key="1"><a-row style="padding-top: 50px;">
        <a-col :span="8" v-for="c in cartList" :key='c.daily_id'>
          <a-card
            :hoverable='true'
            @click="linkTo(c.daily_id)"
            style="width: 80%;margin: 10px auto;"
          >
            <img
              :alt="c.type"
              style="height: 160px;width: 100%;"
              :src='baseUrl+c.p_url'
              slot="cover"

            />
            <a-card-meta
              :title="c.title">
              <template slot="description">
                {{ c.content }}
                <p class="card-price">${{ c.price }}</p>
                <p class="card-p">{{ c.buy_num   }}人感兴趣</p>
              </template>
              <a-avatar slot="avatar" :src='"http://localhost:8080/community/"+c.avatar'/>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row></a-tab-pane>
      <a-tab-pane tab="关注" key="2">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane tab="排行榜" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
    <template>
      <a-pagination showQuickJumper :defaultCurrent="1" :total="totalNum" @change="chagePage" />
    </template>
  </div>
</template>

<script>
  import { axios } from '@/utils/request'
  export default {
    name: 'Daily',
    data() {
      return {
        baseUrl:'http://localhost:8080/community/',
        cartList: [],
        totalNum:0,
        addDailyModel:false,
        previewVisible: false,
        previewImage: '',
        coverList: [],
        detailList: [],
        form: this.$form.createForm(this),
        fileData: {
          typeFolder: 'daily',
        },
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
          path:'/dailyDetail',
          query:{id:key}})
      },
      chagePage() {

      },
      handleCancel () {
        this.previewVisible = false
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange ({ fileList }) {
        this.coverList = fileList
      },
      handleMultipartChange ({ fileList }) {
        this.detailList = fileList
      },
      handleSubmit  (e) {
        e.preventDefault();
        this.form.validateFields(async(errors, values) => {
          if (!errors){
            const daily = {
              dailyId:this.fileData.belong_id,
              ...values
            }
            await axios.post('/frontend/daily/add', daily)
            this.addDailyModel = false
            this.$message.success('发布成功');
            this.$router.go(0)
          }
        });
      },
      clearImg() {
        this.coverList = []
        this.detailList = []
      },
      async showAddModal() {
        this.fileData.belong_id = await axios.get('/sys/common/uuid',{})
        this.addDailyModel = !this.addDailyModel
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
  .card-price {
    position: absolute;
    bottom: 22px;
    left: 23px;
    font-weight: 900;
  }
</style>
