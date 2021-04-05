<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('rock')">바위</button>
            <button @click="onClickButton('scissor')">가위</button>
            <button @click="onClickButton('paper')">보</button>
        </div>
        <div>{{ result }}</div>
        <div>현재 {{ score }}</div>
    </div>
</template>

<script>
    const rspCoords = {
        바위: '0',
        가위: '-142px',
        보: '-284px',
    }
    export default {
        name: 'RockScissorPaper',
        data() {
            return {
                imgCoord: rspCoords.바위,
                result: '',
                score: 0,
            }
        },
        methods: {
            onClickButton(choice) {

            }
        },
        computed: {
            computedStyleObject() {
                return {
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
                }
            }
        },
        mounted() {
            const interval = setInterval(() => {
                if (this.imgCoord === rspCoords.바위) {
                    this.imgCoord = rspCoords.가위
                } else if (this.imgCoord === rspCoords.가위) {
                    this.imgCoord = rspCoords.보
                } else {
                    this.imgCoord = rspCoords.바위
                }
            }, 100)
        },
        destoyed() {
            clearInterval(interval)
        }
    }
</script>

<style>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>