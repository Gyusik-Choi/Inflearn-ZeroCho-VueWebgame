<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <div v-if="result.length" class="time">
      <h3>평균반응시간: {{ averageResponseTime }}</h3>
      <button @click="resetGame">리셋</button>
    </div>
  </div>
</template>

<script>
let timeout = null

export default {
  name: 'ResponseCheck',
  data() {
    return {
      state: 'waiting',
      result: [],
      startTime: 0,
      endtime: 0,
      message: '클릭해서 시작해주세요'
    }
  },
  methods: {
    onClickScreen() {
      if (this.state === 'waiting') {
        this.state = 'ready'
        this.message = '초록색이 되면 클릭해주세요'
        timeout = setTimeout(() => {
          this.startTime = new Date()
          this.state = 'now'
          clearInterval(timeout)
        }, 2000)
      } else if (this.state === 'ready') {
        // clearInterval(timeout)
        this.state = 'waiting'
        this.message = '초록색이 되면 시작하실 수 있어요. 다시 클릭해서 시작해주세요.'
      } else {
        this.state = 'waiting'
        this.message = '클릭해서 시작해주세요'
        this.endTime = new Date()
        this.result.push(this.endTime - this.startTime)
      }
    },
    resetGame() {
      this.result = []
      this.state = 'waiting'
    }
  },
  computed: {
    averageResponseTime() {
      return this.result.reduce((acc, cur) => acc + cur) / this.result.length || 0
    }
  }
}
</script>

<style>
  #screen {
    width: 20vw;
    height: 30vh;
    text-align: center;
    font-size: 1.5rem;
  }

  #screen.waiting {
    background-color: red;
  }

  #screen.ready {
    background-color: blue;
  }

  #screen.now {
    background-color: green;
  }
</style>