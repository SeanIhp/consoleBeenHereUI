<style scoped>
</style>

<template>
  <SimpleLayout
    ref="cmpLayout"
    :view="theConfig" 
    :refs="theRefs">
  </SimpleLayout>
</template>

<script>
import SimpleLayout from '../../../../libs/efview/components/efview/sheet/SimpleLayout'
import view from './view.js'

export default {
  components: { SimpleLayout },
  data() {
    return {
      theRefs: null,
      theConfig: view,
      theDict: view.dict,
      theList: view.list,
    };
  },
  computed: {
  },
  methods: {
  },
  watch: {
    'theList.currentRow': function(theOne, theOld){
    }
  },
  mounted() {},
  created() {
    view.init();
    this.theRefs = this.$refs;
    console.log("####### _this.$store.state.account: ", this.$store.state.account);
  }
};
</script>





