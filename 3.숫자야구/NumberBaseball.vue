<template>
    <div>
        <h1>{{ result }}</h1>
        <!-- <form @submit="onSubmitForm"> -->
        <!-- preventDefault 기능을 적용 -->
        <form @submit.prevent="onSubmitForm">
            <input type="text" ref="answer" minlength="4" maxlength="4" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도: {{ tries.length }}</div>
        <ul>
            <!-- try는 예약어라 못쓴다. t를 썼다. -->
            <li v-for="t in tries" :key="t.id">
                <div>{{ t.trial }}</div>
                <div>{{ t.result }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
const getNumbers = () => {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const arr = []
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
        arr.push(chosen)
    }
    return arr
}

export default {
    name: 'NumberBaseball',
    data() {
        return {
            answer: getNumbers(),
            tries: [],
            value: '',
            result: '',
        }
    },
    methods: {
        onSubmitForm(event) {
            if (this.value === this.answer.join('')) {
                this.tries.push({
                    trial: this.value,
                    result: '홈런',
                })
                this.result = '홈런'
                alert('게임을 다시 실행합니다.')
                this.value = ''
                this.answer = getNumbers()
                this.$refs.answer.focus()
                this.tries = []
            } else {
                if (this.tries.length >= 9) {
                    this.result = `10회 이상 틀렸습니다! 정답은 ${this.answer.join("")} 입니다.`
                    alert('게임을 다시 실행합니다.')
                    this.value = ''
                    this.answer = getNumbers()
                    this.tries = []
                    this.$refs.answer.focus()
                }
                let strike = 0
                let ball = 0
                const answerArr = this.value.split('').map(v => parseInt(v))
                for (let i = 0; i < answerArr.length; i++) {
                    // 해당하는 자릿수의 숫자일때
                    if (answerArr[i] === this.answer[i]) {
                        strike++
                    // 다른 자릿수의 숫자지만 숫자 자체는 정답에 있을때
                    } else if (this.answer.includes(answerArr[i])){
                        ball++
                    }
                }
                this.tries.push({
                    trial: this.value,
                    result: `${strike} strike ${ball} ball 입니다`
                })
            }
            // 위의 @submit.prevent로 대체했음
            // event.preventDefault()

            this.$refs.answer.focus()
            this.value = ''
        }
    },
}
</script>

<style>

</style>