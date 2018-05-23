<style scoped>
    .sTitle {
        color: #999;
    }
</style>
<template>
    <!-- 单据清单 -->
    <Row :gutter="16" style="margin-bottom:10px;" type="flex" align="middle">
        <Col :span="24">
          
            <Collapse v-model="searchPaneShow">
                <Panel name="1">
                    <!-- {{xsearchConditions}}  -->
                    <p slot="content"> 

                        <span v-for="(con,idx) in theSearchConditions" :key="con.key+'_condi'" style="display:inline-block;">
                            <span v-if="con.filled!=true">
                                <Tag closable name="'condi_'+con.key" @on-close="handleTagClose">
                                    <span style="color:red;">
                                        <span v-if="!!con.relation && con.relation==1 && idx!=0" class="sTitle">
                                            {{'而且'}} 
                                        </span>
                                        <span v-else-if="!!con.relation && con.relation==2 && idx!=0" class="sTitle">
                                            {{'或者'}} 
                                        </span>
                                        <span v-else-if="!!con.relation && con.relation==3 && idx!=0" class="sTitle">
                                            {{'除了'}} 
                                        </span> 
                                        {{con.title}}
                                        <span v-if="!!con.condition && con.condition==1">
                                            {{'>'}} 
                                        </span>
                                        <span v-else-if="!!con.condition && con.condition==2">
                                            {{'：'}} 
                                        </span>
                                        <span v-else-if="!!con.condition && con.condition==3">
                                            {{'<'}} 
                                        </span> 
                                        <span v-else-if="!!con.condition && con.condition==4">
                                            {{'≠'}} 
                                        </span> 
                                        <span v-else-if="!!con.condition && con.condition==5" class="sTitle">
                                            {{'介于'}} 
                                        </span> 
                                        {{con.value}}
                                    </span>
                                </Tag> &nbsp;
                            </span>
                            <span v-else>
                                <Tag closable>
                                    <span v-if="!!con.relation && con.relation==1 && idx!=0" class="sTitle">
                                        {{'而且'}} 
                                    </span>
                                    <span v-else-if="!!con.relation && con.relation==2 && idx!=0" class="sTitle">
                                        {{'或者'}} 
                                    </span>
                                    <span v-else-if="!!con.relation && con.relation==3 && idx!=0" class="sTitle">
                                        {{'除了'}} 
                                    </span> 
                                    {{con.title}} : 
                                    <span v-if="!!con.condition && con.condition==1">
                                        {{'>'}} 
                                    </span>
                                    <span v-else-if="!!con.condition && con.condition==2">
                                        {{'：'}} 
                                    </span>
                                    <span v-else-if="!!con.condition && con.condition==3">
                                        {{'<'}} 
                                    </span> 
                                    <span v-else-if="!!con.condition && con.condition==4">
                                        {{'≠'}} 
                                    </span> 
                                    <span v-else-if="!!con.condition && con.condition==5" class="sTitle">
                                        {{'介于'}} 
                                    </span> 
                                    {{con.value}}
                                </Tag> &nbsp;
                            </span>
                        </span>

                        <Form :label-width="100" :ref="view.list.id+'_searchForm'" :model="view.list.currentRow" style="margin-top:15px;">
                            <Row :gutter="16">
                                <Col :span="8" v-for="col in fixedSearchColumns" :key="col.key">
                                    <FormItem :label="col.title" :prop="col.key">
                                        <Input v-model="fixedSearchColumns[col.key].value"
                                            v-if="col.type===undefined || col.type==='text' || col.type==='email'" 
                                            :element-id="col.key" 
                                            @on-blur="onChange"
                                            type="text" >
                                        </Input>
                                        <Select  v-model="fixedSearchColumns[col.key].value"
                                            v-else-if="col.type==='select' && typeof(col.extra)=='string'" 
                                            :element-id="col.key" >
                                                <Option v-for="opt in view.dict[col.extra].data" :value="opt.code" :key="opt.code">
                                                    {{ opt.name }}
                                                </Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <!-- <Row :gutter="16">
                                <Col :span="24" >
                                    <div>
                                        <Button type="primary" size="small">Small</Button>
                                    </div>
                                </Col>
                            </Row> -->
                            
                        </Form>
                    </p>
                </Panel>
            </Collapse>
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
import SearchListlet from '../common/SearchListlet';

export default {
  name: 'SearchList',
  props: [
      'view', 'refs',
      'pageChange', 'pageSizeChange', 'rowDoubleClick', 'currentRowChange'
    ],
  components: { SearchListlet },
  data() {
    let _that = this;
    return {
        searchPaneShow: null,
        tab: _that.view.tab,
        list: _that.view.list,
        dict: _that.view.dict,
        head: _that.view.list.detail.head,
        // fixedSearchColumns: [],
        fixedSearchColumns: null,
        theSearchConditions: null,
        currentPageDatas: [] ,
        xsearchConditions: null
    }
  },
  methods: { 
    onCollapseChange: function(e) {
        // debugger;
        console.log('onCollapseChange: ', e);
        if(e[0]=='0'){
            this.$data.searchPaneShow = '1';
        }else{
            this.$data.searchPaneShow = '0';
        }
    },
    onChange: function(e) {
        console.log('-------------  ', e);
        if(!!e.srcElement._value && e.srcElement._value.length>0 && e.srcElement._value.indexOf(' ')!=0) {
            // let exists = false;
            // for(let i=0; i<this.view.list.searchConditions.length; i++) {
            //     if(this.view.list.searchConditions[i].key==e.srcElement.id) {
            //         this.view.list.searchConditions[i].value = e.srcElement._value;
            //         this.view.list.searchConditions[i].relation = '1';
            //         this.view.list.searchConditions[i].condition = '2';
            //         this.view.list.searchConditions[i][e.srcElement.id] = e.srcElement._value;
            //         exists = true;
            //         break;
            //     }
            // }
            // if(!exists){
            //     for(let i=0; i<this.view.list.columns.length; i++) {
            //         if(this.view.list.columns[i].key==e.srcElement.id) {
            //             let _condi = {};
            //             _condi.filled = true;
            //             _condi.key = this.view.list.columns[i].key;
            //             _condi.title = this.view.list.columns[i].title;
            //             _condi.relation = '1';
            //             _condi.condition = '2';
            //             _condi.value = e.srcElement._value;
            //             _condi[this.view.list.columns[i].key] = e.srcElement._value;
            //             this.view.list.searchConditions.push(_condi);
            //             break;
            //         }
            //     }
            // }
            let _sc = this.view.list.searchConditions[e.srcElement.id];
            if(!!_sc){
                _sc.value = e.srcElement._value;
                _sc.relation = '1';
                _sc.condition = '2';
            }else{
                for(let i=0; i<this.view.list.columns.length; i++) {
                    if(this.view.list.columns[i].key==e.srcElement.id) {
                        let _condi = {};
                        _condi.filled = true;
                        _condi.key = this.view.list.columns[i].key;
                        _condi.title = this.view.list.columns[i].title;
                        _condi.relation = '1';
                        _condi.condition = '2';
                        _condi.value = e.srcElement._value;
                        this.view.list.searchConditions[e.srcElement.id] = _condi;
                        break;
                    }
                }
            }
            // this.$data.theSearchConditions =  {...this.view.list.searchConditions};
            // this.$data.xsearchConditions = new Date();
            console.log('search param onChange: ', e);
            
            console.log('this.view.list.searchConditions: ', this.view.list.searchConditions);
        }
    },
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
        this.view.list.theRow = currentRow;
    },
    handleTagClose: function(e, name) {

    },
    refreshDetailDatas: function(rowData){
        if(!!this.view.list.detail.body && this.view.list.detail.body.length>0){
            if(rowData._flag==='I' && !rowData[this.view.list.key]){            
                // if(!!this.view.list.detail.body){
                    for(let i=0; i<this.view.list.detail.body.length; i++){
                        this.view.list.detail.body[i].config.list.rowDatas = [];
                        this.view.list.detail.body[i].config.list.pager.total = 0;
                    }
                // }
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
            }
        }
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
    },
    'view.list.loading': function(theOne, theOld){
        if(!!this.view.list.rowDatas){
            this.$data.currentPageDatas = [];
            for(let i=0; i<this.view.list.rowDatas.length; i++){
                // let _r = {...this.view.list.rowDatas[i]};
                let _r = merge([{}, this.view.list.rowDatas[i]], {depth: 12, types: { object: true, array: true }});
                if(!this.view.list.readonly){
                    this.$data.currentPageDatas.push(_r);
                }
                this.view.list.rowDatas[i]._flag = '#';
            }
        }
    }
  },
//   computed: {
//       xsearchConditions: function(){
//           return this.view.list.searchConditions;
//       }
//   },
  updated: function () {
      console.log("searchlist updated~!!~!");
    //   debugger;
    let _that = this;
    let _i = null;
    if (!!_that && _that.list) {
        for (let i = 0; i < _that.list.columns.length; i++) {
            _i = i;
            if(!!_that.list.columns[i].key){
                _that.list.columns[i].renderHeader = function (createElement, obj) {
                    console.log("createElement~~ ", _i);
                    return createElement('SearchListlet', {ref: _that.list.id+'_'+(!!obj.column?obj.column.key:'$xx'), style: {'width': '100%'}, props: {view: _that.view, refs: _that.refs, body: _that.body, row: obj.row, column: obj.column, columnIdx: _i}}, null);
                }   
            }            
        }
        if (!!_that.list.fixedSearchKey && _that.list.fixedSearchKey.length>0) {
            // this.$data.searchPaneShow = '1';
            if(this.$data.fixedSearchColumns==null){
                this.$data.fixedSearchColumns = {};
            }
            for(let m=0; m<_that.list.columns.length; m++) {
                for(let n=0; n<_that.list.fixedSearchKey.length; n++) {
                    if(!!_that.list.columns[m].key && _that.list.columns[m].key==_that.list.fixedSearchKey[n]){
                        this.$data.fixedSearchColumns[_that.list.columns[m].key] = _that.list.columns[m];
                        this.$data.fixedSearchColumns[_that.list.columns[m].key].value = null;
                    }
                }
            }
            console.log('this.$data.fixedSearchColumns: ', this.$data.fixedSearchColumns);
        } else {
            // this.$data.searchPaneShow = '0';
        }
            // this.$data.theSearchConditions = {...this.view.list.searchConditions};
            // this.$data.xsearchConditions = new Date();
    }
  },
  created: function () {
    let _that = this;
    // if (!!_that && _that.body) {
    //     for (let i = 0; i < _that.body.config.list.columns.length; i++) {
    //         _that.body.config.list.columns[i].render = function (createElement, obj) {
    //             return createElement('SearchListlet', {ref: _that.body.config.name+'_'+(!!obj.column?obj.column.key:'$xx'), style: {'width': '100%'}, props: {view: _that.view, refs: _that.refs, body: _that.body, row: obj.row, column: obj.column}}, null);
    //         }                     
    //     }
    // }
    let _i = null;
    if (!!_that && _that.list) {
        for (let i = 0; i < _that.list.columns.length; i++) {
            _i = i;
            if(!!_that.list.columns[i].key){
                _that.list.columns[i].renderHeader = function (createElement, obj) {
                    // console.log("createElement~~ ", _i);
                    return createElement('SearchListlet', {ref: _that.list.id+'_'+(!!obj.column?obj.column.key:'$xx'), style: {'width': '100%'}, props: {view: _that.view, refs: _that.refs, body: _that.body, row: obj.row, column: obj.column, columnIdx: _i}}, null);
                }   
            }            
        }
        if (!!_that.list.fixedSearchKey && _that.list.fixedSearchKey.length>0) {
            this.$data.searchPaneShow = '1';
            if(this.$data.fixedSearchColumns==null){
                this.$data.fixedSearchColumns = {};
            }
            for(let m=0; m<_that.list.columns.length; m++) {
                for(let n=0; n<_that.list.fixedSearchKey.length; n++) {
                    if(!!_that.list.columns[m].key && _that.list.columns[m].key==_that.list.fixedSearchKey[n]){
                        this.$data.fixedSearchColumns[_that.list.columns[m].key] = _that.list.columns[m];
                        this.$data.fixedSearchColumns[_that.list.columns[m].key].value = null;
                    }
                }
            }
            console.log('this.$data.fixedSearchColumns: ', this.$data.fixedSearchColumns);
        } else {
            this.$data.searchPaneShow = '0';
        }
    }
    console.log("searchList~~ ", this, _that.list.fixedSearchKey);
  }
}
</script>

        