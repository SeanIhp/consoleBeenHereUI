<style scoped>
    .top,.bottom{
        text-align: center;
    }
    .center{
        width: 300px;
        margin: 10px auto;
        overflow: hidden;
    }
    .center-left{
        float: left;
    }
    .center-right{
        float: right;
    }
    .headerPopup{
        width: 100%;
        padding: 8px;
    }
</style>
<template>
    <Poptip class="SearchListlet" trigger="hover" title="" placement="bottom" width="200">
        <span type="ghost">{{column.title}}</span>
        <div class="headerPopup" slot="content">
            <table border="0">
                <tbody>
                    <tr>
                        <td>
                            <RadioGroup v-model="theSort" @on-change="onTheSortChange">
                                <Radio label="0">不排序</Radio>
                                <Radio label="1">升序</Radio>
                                <Radio label="2">降序</Radio>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>关系：

                            <Select v-model="theRelation" @on-change="onTheRelationChange" style="width:75%;">
                                <Option value="1">且</Option>
                                <Option value="2">或</Option>
                                <Option value="3">非</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>条件：
                            <Select v-model="theCondition" @on-change="onTheConditionChange" style="width:75%;">
                                <Option value="1">大于</Option>
                                <Option value="2">等于</Option>
                                <Option value="3">小于</Option>
                                <Option value="4">不等于</Option>
                                <Option value="5">介于之间</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>取值：
                            <Input 
                                v-if="column.type===undefined || column.type==='text' || column.type==='email'" 
                                :element-id="column.key"
                                type="text" 
                                style="width:75%;"
                                @on-blur="onBlur">
                            </Input>
                            <Select 
                                v-else-if="column.type==='select' && typeof(column.extra)=='string'" 
                                :element-id="column.key"
                                style="width:75%;"
                                @on-change="onChange">
                                    <Option v-for="opt in view.dict[column.extra].data" :value="opt.code" :key="opt.code">
                                        {{ opt.name }}
                                    </Option>
                            </Select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Poptip>
</template>

<script>
import AsyncValidator from 'async-validate';
import AsyncValidatorPlugins from 'async-validate/plugin/all';

AsyncValidator.plugin(
  AsyncValidatorPlugins
);

export default {
  name: 'SearchListlet',
  props: ['view', 'refs', 'body', 'row', 'column'],

  data() {
    let _that = this;
    return {
      id: null,
    //   theTitle: null,
      theSort: null,
      theRelation: null,
      theCondition: null,
      theValue: null,
      __row: null,
      __column: null,
      __validator: null,
      __tempValue: null,
    };
  },

  computed: {
  },

  methods: {
    onTheSortChange: function(e) {
        // let _that = this;
        // if(this.column.type=='number') {
        //     let el = document.getElementById('field_'+this.column.key);
        //     el.focus();
        //     this.$data.__tempValue = e;
        // }else{
        //     this.doWriteBack(e);
        // }
        console.log("onTheSortChange: ", this.theSort);
        this.doWriteBack(e);
    },

    onTheRelationChange: function(e) {
        // let _that = this;
        // if(this.column.type=='number') {
        //     let el = document.getElementById('field_'+this.column.key);
        //     el.focus();
        //     this.$data.__tempValue = e;
        // }else{
        //     this.doWriteBack(e);
        // }
        console.log("onTheRelationChange: ", this.theRelation);
        this.doWriteBack(e);
    },

    onTheConditionChange: function(e) {
        // let _that = this;
        // if(this.column.type=='number') {
        //     let el = document.getElementById('field_'+this.column.key);
        //     el.focus();
        //     this.$data.__tempValue = e;
        // }else{
        //     this.doWriteBack(e);
        // }
        console.log("onTheConditionChange: ", this.theCondition);
        this.doWriteBack(e);
    },

    onChange: function(e) {
        console.log("onChange~~~~~~: ", e);
        let _that = this;
        if(this.column.type=='number') {
            let el = document.getElementById('field_'+this.column.key);
            el.focus();
            this.$data.theValue = e;
        }else{
            // let vres = this.doValidate(e);
            // if(vres==null){
                this.$data.theValue = e;
                this.doWriteBack(e);
            // }
        }
    },

    onBlur: function(e) {
        console.log("onBlur~~~~~~: ", e);
        if(this.column.editor=='number') {
            // let vres = this.doValidate(this.$data.__tempValue);
            // if(vres==null){
            this.$data.theValue = e.srcElement.value;
            this.doWriteBack(this.$data.__tempValue);
            // }
        }else{
            this.$data.theValue = e.srcElement.value;
            this.doWriteBack(e.srcElement.value);
        }
    },

    doWriteBack: function (newValue) {
        let _that = this;
        let _condi = {};
        _condi.filled = false;
        _condi.key = this.column.key;
        _condi.title = this.column.title;
        _condi.sort = this.$data.theSort;
        _condi.relation = this.$data.theRelation;
        _condi.condition = this.$data.theCondition;
        _condi.value = this.$data.theValue;
        _condi[this.column.key] = this.$data.theValue;
        if(!!this.column.key && !!this.column.title && !!this.$data.theRelation && !!this.$data.theCondition && !!this.$data.theValue){
            _condi.filled = true;
        }else{
            _condi.filled = false;
        }
        let _exists = false;
        // for(let n=0; n<this.view.list.searchConditions.length; n++) {
        //     if(this.view.list.searchConditions[n].key===_that.column.key){
        //         this.view.list.searchConditions[n].filled = false;
        //         this.view.list.searchConditions[n].title = _that.column.title;
        //         this.view.list.searchConditions[n].sort = this.$data.theSort;
        //         this.view.list.searchConditions[n].relation = this.$data.theRelation;
        //         this.view.list.searchConditions[n].condition= this.$data.theCondition;
        //         this.view.list.searchConditions[n].value = this.$data.theValue;
        //         this.view.list.searchConditions[n][_that.column.key] = this.$data.theValue;                
        //         if(!!this.view.list.searchConditions[n].key 
        //         && !!this.view.list.searchConditions[n].title 
        //         && !!this.view.list.searchConditions[n].theRelation 
        //         && !!this.view.list.searchConditions[n].theCondition 
        //         && !!this.view.list.searchConditions[n].theValue){
        //             this.view.list.searchConditions[n].filled = true;
        //         }else{
        //             this.view.list.searchConditions[n].filled = false;
        //         }
        //         _exists = true;
        //     }
        // }
        // if(!_exists){
        //     this.view.list.searchConditions.push(_condi);
        // }
        let _sc = this.view.list.searchConditions[_that.column.key];
        if(!!_sc){
            _sc.filled = false;
            _sc.title = _that.column.title;
            _sc.sort = this.$data.theSort;
            _sc.relation = this.$data.theRelation;
            _sc.condition= this.$data.theCondition;
            _sc.value = this.$data.theValue;
            // this.view.list.searchConditions[n][_that.column.key] = this.$data.theValue;                
            if(!!_sc.key 
            && !!_sc.title 
            && !!_sc.theRelation 
            && !!_sc.theCondition 
            && !!_sc.theValue){
                _sc.filled = true;
            }else{
                _sc.filled = false;
            }
        }else{
            this.view.list.searchConditions[_that.column.key] = _condi;
        }


        console.log("this.view.list.searchConditions: ", this.view.list.searchConditions);
    }

  },

  watch: {
  },

  beforeDestory: function(e) {},

  mounted: function() {},

  updated: function() {},

  created: function() {
      let _that = this;
      console.log("++++ SearchListlet: ", this);
  }
};
</script>