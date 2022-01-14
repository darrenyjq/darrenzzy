<template>
    <div>
        <JwChat :taleList="list" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool" >
        <!-- <div slot="tools">插槽</div> -->
        </JwChat>

        <!-- <JwChat-index
     :taleList="list"
     @enter="bindEnter"
     v-model="inputMsg"
     :toolConfig="tool"
 /> -->
    </div>
</template>



<script>
export default {
  data () {
    return {
      inputMsg: '',
      list: [
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "起床不" },
          "mine": false,
          "name": "用户",
          "img": ""
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": ""
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='../image/three.jpeg'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": ""
        },
        {
          "date": "2020/04/16 21:19:07",
          "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
          "mine": true,
          "name": "客服",
          "img": ""
        },
      ],
      tool: {
        show: ['img','history'],
        callback: this.toolEvent,
        showEmoji: true,
      },
    }
  },
  methods: {
    bindEnter () {
      const msg = this.inputMsg
      
      if (!msg) return;
      const msgObj = {
        "date": "2020/05/20 23:19:07",
        "text": { "text": msg },
        "mine": true,
        "name": "客服1",
        "img": "../image/three.jpeg"
      }
      this.list.push(msgObj)
    },
    toolEvent (type) {
      console.log('tools', type)
    },
  }
}
</script>
