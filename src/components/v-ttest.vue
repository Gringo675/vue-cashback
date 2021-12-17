<template>
    <div class="ttest">
        <div class="test-block"  @mouseover="tooltipOver" @mouseout="tooltipOut">
            TEST BLOCK
        </div>
        <div class="another-block" @click=""></div>
        <div class="mess"> {{mess}}</div>
    </div>
</template>

<script>
    export default {
        name: "vue-ttest",
        components: {},
        props: {},
        data() {
            return {
                mess: 'begin'
            }
        },
        methods: {
            tooltipEnter() {
                this.mess += ' Enter'
            },
            tooltipLeave() {
                this.mess += ' Leave'
            },
            tooltipOver() {
                this.mess += ' Over';
                //document.body.addEventListener("click", this.tooltipOut, {once:true});
            },
            tooltipOut() {
                this.mess += ' Out'
            },
        },
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">
    .ttest {
        .test-block {
            padding: 15px;
            margin: 15px auto;
            width: 120px;
            background: #53d7ec;

        }

        .another-block {
            padding: 50px;
            margin: 15px auto;
            width: 100px;
            cursor: pointer;
            background: #309c38;
        }
    }
</style>