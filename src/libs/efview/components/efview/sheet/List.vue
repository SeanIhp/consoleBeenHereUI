<template>
    <!-- 单据清单 -->
    <Row :gutter="16" style="margin-bottom:10px;" type="flex" align="middle">
        <Col :span="24">
            <Table 
              ref="cmpListTable" 
              :columns="list.columns" 
              :stripe="list.stripe" 
              :data="list.rowDatas"
              :loading="list.loading" 
              :highlight-row="true" 
              @on-current-change="onTheRowChange" 
              @on-row-dblclick="onRowDoubleClick"
              @on-row-click="onRowClick"
              border>
            </Table>
            <Page 
              style="margin-top:10px;"
              ref="cmpListPager" 
              :current="list.pager.pageIndex" 
              :total="list.pager.total" 
              :page-size="list.pager.pageSize" 
              :page-size-opts="list.pager.sizeOption" 
              @on-change="onPageChange" 
              @on-page-size-change="onPageSizeChange" 
              placement="top" 
              show-total 
              show-elevator 
              show-sizer>
            </Page>
        </Col>
    </Row>
</template>

<script>
import merge from 'lutils-merge';
import Efview from '../../../efview';

export default {
  name: 'List',
  props: [
      'view', 'refs',
      'pageChange', 'pageSizeChange', 'rowDoubleClick', 'currentRowChange'
    ],
  data() {
    let _that = this;
    return {
        tab: _that.view.tab,
        list: _that.view.list,
        dict: _that.view.dict,
        head: _that.view.list.detail.head,
        // currentRow: _that.view.list.currentRow,
        currentPageDatas: [] // origPageDatas
    }
  },
  methods: { 
    onPageChange: function (pageIndex) {
        this.$data.list.pager.pageIndex = pageIndex;
        this.$data.list.load();
    },
    onPageSizeChange: function (pageSize) {
        this.$data.list.pager.pageSize = pageSize;
        this.$data.list.load();
    },
    onRowClick: function (rowData, index) {
    },
    onRowDoubleClick: function (rowData, index) {
        this.view.list.theRowIndex = index;
        this.view.list.currentRow = rowData;
        this.refreshDetailDatas(rowData);
        this.$data.tab.active = "detail";
    },
    onTheRowChange: function (currentRow, oldCurrentRow) {
        this.view.list._prevRow = oldCurrentRow;
        // this.view.list.currentRow = currentRow;
        this.view.list.theRow = currentRow;
    },
    refreshDetailDatas: function(rowData){
        console.log("refreshDetailDatas: ", rowData, this.view);
        if(!!this.view.list.detail.body && this.view.list.detail.body.length>0){
            if(rowData._flag==='I' && !rowData[this.view.list.key]){            
                // if(!!this.view.list.detail.body){
                    for(let i=0; i<this.view.list.detail.body.length; i++){
                        this.view.list.detail.body[i].config.list.rowDatas = [];
                        this.view.list.detail.body[i].config.list.pager.total = 0;
                    }
                // }
        console.log("aaa: ");
            }else{
                if(this.view.list.detail.isLazyload){
                    //远程加载 
                    if(!!this.view.list.detail.body){
                        for(let i=0; i<this.view.list.detail.body.length; i++){
                            console.log("this.view.list.detail.body[i].config.list.load(rowData)");
                        }
                    }
                }else{
                    if(!!this.view.list.detail.body){
                        for(let i=0; i<this.view.list.detail.body.length; i++){
                            this.view.list.detail.body[i].config.list.mount(rowData);
                        }
                    }
                }
        console.log("sss: ");
            }
        }
        console.log("ddd: ");
    }
  },  
  watch: {
    'view.list.currentRow': function(theOne, theOld){ 
        let listTbody = this.refs.cmpLayout.$refs.cmpList.$refs.cmpListTable.$refs.tbody; 
        for(let i=0; i<this.view.list.rowDatas.length; i++){            
            if(!!theOld){
                if(this.view.list.rowDatas[i][this.view.list.key]===theOld[this.view.list.key]){
                    listTbody.$children[i].$el.style.color = "#495060";
                }else if(this.view.list.rowDatas[i][this.view.list.key]===theOne[this.view.list.key]){
                    listTbody.$children[i].$el.style.color = "#2d8cf0";
                }
            }
        }
        this.refreshDetailDatas(theOne);
    },
    'view.list.currentRow._flag': function(theOne, theOld){        
        // let theRow = this.view.list.currentRow;
        // let rowIdx = -1;
        // let listTbody = this.refs.cmpLayout.$refs.cmpList.$refs.cmpListTable.$refs.tbody;
        // for(let i=0; i<this.view.list.rowDatas.length; i++){
        //     if(this.view.list.rowDatas[i][this.view.list.key]===theRow[this.view.list.key]){
        //         this.view.list.rowDatas[i] = theRow;
        //         rowIdx = i;
        //         console.log("list !!!  view.list.currentRow FOUND!!!  ",  theRow);
        //     }
        //     if(this.view.list.rowDatas[i]._flag==="#") {
        //         listTbody.$children[i].$el.style.color = "#495060";
        //     }else{
        //         listTbody.$children[i].$el.style.color = "#2d8cf0";
        //     }
        // }
    },
    'view.list.loading': function(theOne, theOld){
        if(!!this.view.list.rowDatas){
            this.$data.currentPageDatas = [];
            // this.view.list._datas = [];
            for(let i=0; i<this.view.list.rowDatas.length; i++){
                // this.view.list._datas.push(this.view.list.rowDatas[i]);
                // let _r = {...this.view.list.rowDatas[i]};
                let _r = merge([{}, this.view.list.rowDatas[i]], {depth: 12, types: { object: true, array: true }});
                if(!this.view.list.readonly){
                    this.$data.currentPageDatas.push(_r);
                }
                this.view.list.rowDatas[i]._flag = '#';
            }
            // console.log("this.view.list.rowDatas: ", this.view.list.rowDatas);
            // console.log("currentPageRows: ", this.$data.currentPageDatas);
        }
        
    }
  },
  created: function () {
    //   let keyIdx = 0;
    //   for(let i=0; i<this.view.list.columns.length; i++){
    //       if(!!this.view.list.columns[i].key && this.view.list.columns[i].key===this.view.list.key){
    //           keyIdx = i;
    //           break;
    //       }
    //   }
    //   this.view.list.columns[keyIdx].render = function(createElement, obj) {
    //       if(obj.row._flag!='#'){
    //           return createElement('span', {'style':{'color':'red'}}, obj.row[obj.column.key]);
    //       }else{
    //           return createElement('span', {}, obj.row[obj.column.key]);
    //       }
    //   }
  }
}
</script>

        