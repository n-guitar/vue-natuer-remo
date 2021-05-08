<template>
  <div>
    <v-row class="text-center pa-4">
        <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
                Welcome to Vue Narute Remo
            </h1>
        </v-col>
    </v-row>
    <v-row class="text-center pa-4">
        <v-col class="mb-4">
              <div>
                <p>{{date}}</p>
                <p>{{time}}</p>
              </div>
        </v-col>
    </v-row>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        date:'',
        time:'',
        week: ['（日）', '（月）', '（火）', '（水）', '（木）',  '（金）', '（土）']
      }
    },
    mounted(){
      let timerID = setInterval(this.updateTime, 1000);
      console.log(timerID)
    },
    methods: {
      updateTime(){
        let currentDate = new Date()
        // this.time = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds()
        this.time = this.zeroPadding(currentDate.getHours(), 2) + ':' + this.zeroPadding(currentDate.getMinutes(), 2) + ':' + this.zeroPadding(currentDate.getSeconds(), 2);
        // this.date = currentDate.getFullYear() + '年' + currentDate.getMonth() + '月' + currentDate.getDate() + '日' + currentDate.getDay()
        this.date = this.zeroPadding(currentDate.getFullYear(), 4) + '年' + this.zeroPadding(currentDate.getMonth() + 1, 2) + '月' + this.zeroPadding(currentDate.getDate(), 2) + '日' + this.week[currentDate.getDay()];
      },
      zeroPadding(num, len) {
        var zero = '';
        for (var i = 0; i < len; i++) {
          zero += '0';
        }
        // 文字列の一部を抜き出して、新しい文字列を返す
        return (zero + num).slice(-len);
      },
    }
  }
</script>