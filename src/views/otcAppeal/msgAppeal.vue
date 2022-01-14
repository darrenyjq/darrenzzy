<template>
    <JwChat-index :config="config" :taleList="taleList" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool"  width="525px" height="570px"/>
</template>

<script>
    import { listMsgs, getMsgs, delMsgs, addMsgs, updateMsgs, listMsgsFromId, omChat,getMsgsOrderNo } from '@/api/member/msgs'
export default {
  data () {
    return {
      inputMsg: '',
      timer: '',
      getStatus: 0, //第一次获取标识
      count: 0,
      fromId: 0,
      
      // 日期范围
      dateRange: [],
      taleList: [
       
      ],
      tool: {
        show: ['img'],
        callback: this.toolEvent,
        showEmoji: true,
      },
      config: {
        name: '客户服务',
        dept: '顾客是上帝',
        callback: this.headerEvent
      },
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        id: undefined,
        count:undefined,
        type: undefined,dealId: undefined,toId: undefined,remark: undefined,orderNo: undefined,amount: undefined,coinId: undefined,username: undefined,createdAt: undefined,fromId: undefined,msg: undefined,orderId: undefined,msgType: undefined,
     },
    }
  },
  beforeCreate() {
    const { orderNo } = this.$route.query
    console.log(orderNo)
    if (orderNo) {
       
       // 获取表详细信息
      getMsgsOrderNo(orderNo).then(res => {
        console.log(res)
        this.taleList = res.data.list
        // console.log(this.taleList)
        // this.getStatus = 1
        // this.count = res.data.count
        // this.fromId = fromId
      })
    } else {
        console.log('rrrrrrrrrrrrrrrrrrrrrr')
    }
  },
  methods: {
    
    toolEvent (type) {
      console.log('tools', type)
    },
    headerEvent (type) {
      console.log('header', type)
    },
    get() {
        console.log('1');
    }
  },

            

  
}
</script>