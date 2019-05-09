<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="3" style="margin: 20px 0">
        <a-card title="家政服务" :bordered=false>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="3" style="margin: 20px 0">
        <a-card title="家教指导" :bordered=false>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="3" style="margin: 20px 0">
        <a-card title="二手交易" :bordered=false>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="3" style="margin: 20px 0">
        <a-card title="二手交易" :bordered=false>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="3" style="margin: 20px 0">
        <a-card title="二手交易" :bordered=false>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="3" style="margin: 20px 0">
        <a-card title="二手交易" :bordered=false>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-carousel autoplay class="guanggai">
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </a-carousel>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="16"  style="background: white;margin-bottom: 20px">
        <a-list
          bordered
          :dataSource="adviceList"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
          <div slot="header">消息通知</div>
          <div slot="footer">
            <a-button type="primary">加载更多</a-button>
          </div>
        </a-list>
      </a-col>
    </a-row>
    <a-row :gutter="16">
       <a-col :span="6">
         <a-card title="房子">
           <a class="cg-a">租房</a>
           <a class="cg-a">整租</a>
           <a class="cg-a">合租</a>
           <a class="cg-a">短租</a>
           <a class="cg-a">仓库</a>
           <a class="cg-a">地下室</a>
           <a class="cg-a">二手房出售</a>
           <a class="cg-a">新房出售</a>
         </a-card>
       </a-col>
       <a-col :span="6">
         <a-card title="车位">
           <a class="cg-a">业主车位屋出租</a>
           <a class="cg-a">物业车位出租</a>
           <a class="cg-a">车位售卖</a>
         </a-card>
       </a-col>
       <a-col :span="6">
         <a-card title="车位">
           <a class="cg-a">业主车位屋出租</a>
           <a class="cg-a">物业车位出租</a>
           <a class="cg-a">车位售卖</a>
         </a-card>
       </a-col>
    </a-row>
    <a-row>
      <a-col style="margin: 40px 20px 40px 0;" :span="10">
        <a-card title="家政服务">
          <a class="cg-a">保姆</a>
          <a class="cg-a">清洁</a>
          <a class="cg-a">搬家</a>
        </a-card>
      </a-col>
      <a-col style="margin: 40px 0 40px 20px;" :span="10">
        <a-card title="家教指导服务">
          <a class="cg-a">作业辅导</a>
          <a class="cg-a">晚托机构</a>
          <a class="cg-a"></a>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :span="12" style="background: white;">
        <a-list
          bordered
          :dataSource="newsList"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
          <div slot="header">精选新闻</div>
          <div slot="footer">
            <a-button type="primary">加载更多</a-button>
          </div>
        </a-list>
      </a-col>
      <a-col :span="12">
        <a-carousel autoplay class="xiangqingtu">
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
      </a-col>
    </a-row>
    <a-row :gutter="16" style="margin-top: 10px">
      <a-col :span="16"  style="background: white;margin-bottom: 20px">
        <a-list
          bordered
          :dataSource="adviceList"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
          <div slot="header">精选文章</div>
          <div slot="footer">
            <a-button type="primary">加载更多</a-button>
          </div>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  export default {
    components: {ACol, ARow},
    data() {
      return {
        newsList: [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.',
        ],
        adviceList: ['超人被蝙蝠侠杀掉了','星期五小区放电影','超人被蝙蝠侠杀掉了','恭喜田总喜提迈巴赫','超人被蝙蝠侠杀掉了'],
        customStyle: 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
      }
    },
  }
</script>

<style>
  .cg-a {
    margin: 0 10px;
    font-size: 16px;
  }
  .guanggai {
    position: absolute;
    right: -127px;
    top: 18px;
    width: 430px;
    height: 430px;
    background: wheat;
  }
  .xiangqingtu {
    width: 600px;
    height: 330px;
    background: wheat;
  }
</style>