<template>
  <div>
    <h1>{{ result }}</h1>
    <input type="text" ref="answer" v-model="value" @keyup.enter="inputWord" minlength="3" maxlength="3"/>
    <button @click="inputWord">입력</button>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries" :key="t.id">
        <div>{{ t.trial }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNums = function() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const arr = []
  for (let i = 0; i < 3; i++) {
    const num = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
    arr.push(num)
  }
  return arr.join('')
}

export default {
  name: 'NumberBaseball',
  data() {
    return {
      answer: getNums(),
      tries: [],
      value: '',
      result: '',
    }
  },
  methods: {
    inputWord() {
      if (this.value === this.answer) {
        this.tries.push({
          trial: this.value,
          result: '홈런'
        })
        this.answer = getNums()
        this.tries = []
        this.value = ''
        this.result = '홈런'
      } else {
        let strike = 0
        let ball = 0
        for (let i = 0; i < 3; i++) {
          if (this.answer[i] === this.value[i]) {
            strike += 1
          } else if (this.answer.indexOf(this.value[i]) !== -1) {
            ball += 1
          }
        }

        this.tries.push({
          trial: this.value,
          result: `${strike} 스트라이크 ${ball} 볼 입니다.`
        })
        
        if (this.tries.length > 10) {
          this.result = `10회 넘게 틀렸습니다! 정답은 ${this.answer} 입니다.`
          alert('10회 넘게 틀려서 게임을 다시 시작합니다.')
          this.answer = getNums()
          this.tries = []
          this.value = ''
          this.result = ''
        }

      }
      this.value = ''
      this.$refs.answer.focus()
    }
  },

}
</script>

<style>

</style>