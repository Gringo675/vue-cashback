<template>
    <div class="v-bill-block">
        BILL BLOCK
        <div>Номер счета: {{ billNumber }}</div>
        <div>Сумма кешбека: {{ billCashback }}</div>
        <div>Статус: {{ billStatus }}</div>
    </div>
</template>

<script>
    export default {
        name: "v-bill-block",
        components: {},
        props: [
            'billNumber',
            'billCashback',
            'billStatus'
        ],
        data() {
            return {
                innerVar: 12211
            }
        },
        methods: {},
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">

</style>