<template>
  <div>
    <div id="opponent" :style="imageStyle"></div>
    <div class="options">
      <button class="바위" @click="clickOption">바위</button>
      <button class="가위" @click="clickOption">가위</button>
      <button class="보" @click="clickOption">보</button>
    </div>
    <div class="result">
      <h3>{{ message }}</h3>
      <h3>점수: {{ point }}</h3>
    </div>
  </div>
</template>

<script>
const choices = {
  바위: '0vw',
  가위: '-13vw',
  보: '-27vw'
}

const points = {
  바위: 1,
  가위: 0,
  보: -1
}

let interval = null

export default {
  name: 'RockScissorPaper',
  data() {
    return {
      choice: '0vw',
      point: 0,
      message: '',
    }
  },
  methods: {
    changeImage() {
      interval = setInterval(() => {
        if (this.choice === choices.바위) {
          this.choice = choices.가위
        } else if (this.choice === choices.가위) {
          this.choice = choices.보
        } else {
          this.choice = choices.바위
        }
      }, 200)
    },
    clickOption(event) {
      clearInterval(interval)
      const target = event.target.className
      const computerTargets = Object.entries(choices).find((item) => {
        return item[1] === this.choice
      })
      const computerTarget = computerTargets[0]
      console.log(target)
      console.log(computerTarget)

      const myPoint = points[target]
      const computerPoint = points[computerTarget]
      const score = myPoint - computerPoint

      if (score === 0) {
        this.message = '비겼습니다'
      } else if (score === 1 || score === -2) {
        this.message = '이겼습니다'
        this.point += 1
      } else {
        this.message = '졌습니다'
        this.point -= 1
      }
   }
  },
  computed: {
    imageStyle() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.choice} 0`
      }
    }
  },
  mounted() {
    this.changeImage()
  }
}
</script>

<style>
  #opponent {
    width: 14vw;
    height: 30vh;
    background-position: 0 0;
  }
</style>