<style scoped>
.margin-top-10 {
  margin-top: 10px;
}
.padding-left-10 {
  padding-left: 10px;
}
.publish-button {
  float: right;
  margin-left: 10px;
}
.action-p {
  text-align: left;
}
</style>
<template>
  <div class="app-main">

    <Row>
      <Col span="24">
      
      <!-- 主面板 -->
      <Card>
        
        <!-- 功能操作 -->
        <div slot="title">
          <Button type="ghost">新单</Button>
          <Button type="ghost">删单</Button>
          <Button type="ghost">查单</Button>
          <Button type="ghost">保存</Button>
          <Button type="ghost">提交</Button>
        </div>

        <!-- 标签切换 -->
        <Tabs type="card">
          <TabPane label="单据明细"></TabPane>
          <TabPane label="单据列表"></TabPane>
        </Tabs>

        <!-- 查询条件 -->


        <!-- 查询 -->
        <div>
          <Form :label-width="150" ref="formSearch">
            <Row :gutter="10">
              <Col span="10">
              <FormItem label="退货申请提交时间" prop="microapp_code">
                <Row>
                  <Col span="11">
                  <DatePicker style="width:100%;" type="date" placeholder=""></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                  <DatePicker style="width:100%;" type="date" placeholder=""></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="退货申请状态" prop="microapp_name">
                <Select>
                  <Option value="1">已审核</Option>
                  <Option value="1">申请中</Option>
                  <Option value="1">已取消</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="10">
              <FormItem label="退货申请单号" prop="modules_code">
                <Input type="text" placeholder=""></Input>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="退货原因" prop="microapp_name">
                <Select>
                  <Option value="1">质量问题</Option>
                  <Option value="1">货品损坏</Option>
                  <Option value="1">货品丢失</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="4" style="padding-left:20px;">
              <Button type="primary" icon="search">查询</Button>
              <Button type="ghost" icon="search">重置</Button>
              </Col>
            </Row>
            <p style="border-bottom: 1px solid #dddee1;" class="margin-top-10"></p>
            <p class="action-p margin-top-10">
              <Button type="primary" icon="android-add" @click="abc">批量审核</Button>
              <Button type="ghost" icon="android-add" @click="aaa">退货申请</Button>
              <Button type="ghost" icon="android-add">打印</Button>
              <Button type="ghost" icon="android-add">导出</Button>
            </p>
          </Form>
        </div>

        <!-- 提示 -->
        <Alert @contextmenu.prevent="bbb" class="margin-top-10" show-icon>结果总计&nbsp;
          <span style="font-weight:600;">0 条</span>
        </Alert>

        <div @contextmenu.prevent="bbb">asdfasdfasdf</div>

        <!-- 数据表格 -->
        <Table @contextmenu.prevent="bbb" ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataColumns" :data="dataList"></Table>

        <!-- 分页 -->
        <div class="margin-top-10" style="overflow: hidden">
          <div style="float: right;">
            <Page :total="1" :current="1" :page-size="1"></Page>
          </div>
        </div>

      </Card>
      </Col>
    </Row>

    <Modal title="审核操作" :value="mv" @on-cancel="cancel" @on-ok="ok">
      <Form :label-width="80">
        <FormItem label="审核结果：">
          <RadioGroup>
            <Radio label="male">通过</Radio>
            <Radio label="female">不通过</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="否决原因：">
          <Input type="textarea" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Util from "@/libs/util";
export default {
  components: {},
  data() {
    return {
      mv: false,
      dataColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          render: (h, params) => {
            let infoAction = h(
              "Button",
              {
                props: { type: "text", size: "small" },
                style: { marginRight: "5px", color: "#359AFC" },
                on: {
                  click: () => {
                    this.linkTo();
                  }
                }
              },
              "详情"
            );
            // 编辑
            let editAction = h(
              "Button",
              {
                props: { type: "text", size: "small" },
                style: { marginRight: "5px", color: "#359AFC" },
                on: {
                  click: () => {
                    this.mv = true;
                  }
                }
              },
              "审核"
            );
            // 包裹容器
            let content = h("div", [infoAction, editAction]);
            return content;
          }
        },
        {
          title: "退货申请单号",
          key: "a",
          align: "center"
        },
        {
          title: "退货申请时间",
          key: "b",
          align: "center"
        },
        {
          title: "申请来源",
          key: "c",
          align: "center"
        },
        {
          title: "状态",
          key: "d",
          align: "center"
        },
        {
          title: "退货原因",
          key: "e",
          align: "center"
        },
        {
          title: "退货金额",
          key: "f",
          align: "center"
        },
        {
          title: "会员账户ID",
          key: "g",
          align: "center"
        },
        {
          title: "申请人名称",
          key: "h",
          align: "center"
        },
        {
          title: "联系方式",
          key: "i",
          align: "center"
        }
      ],
      dataList: [
        {
          a: "T201803120000001",
          b: "2018-03-12 15:38:02",
          c: "自动生成",
          d: "待处理",
          e: "质量问题",
          f: "100.00",
          g: "1234@11.com",
          h: "SHIJI",
          i: "1388888888888"
        }
      ]
    };
  },
  computed: {},
  methods: {
    aaa() {
      this.$router.push({
        name: "order-return-apply",
        params: {}
      });
    },
    linkTo() {
      this.$router.push({
        name: "order-return-info",
        params: {}
      });
    },
    abc() {
      this.mv = true;
    },
    ok() {
      this.mv = false;
    },
    cancel() {
      this.mv = false;
    },
    bbb(e) {
      console.log("asdf", e);
    }
  },
  mounted() {},
  created() {}
};
</script>
