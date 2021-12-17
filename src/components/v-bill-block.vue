<template>
    <div class="v-bill-block">
        <h2 class="tooltip-block">
            <span>Информация по счету</span>
            <vTooltip
                    :text="`Здесь отражена общая информация о счете, с которого выплачивается кешбэк.<br>
                            Если Вы желаете обсудить сумму вознаграждения, нажмите кнопку &#34;Хочу больше!&#34;.`"
            />
        </h2>

        <table  class="bill-info">
            <tr>
                <td>
                    Номер и дата:
                </td>
                <td>
                    <span class="field">№{{ billNumber }} от {{ billDate }}</span>
                </td>
            </tr>
            <tr>
                <td>
                    Сумма кешбэка:
                </td>
                <td>
                    <div class="sum-wrapper"><span class="field">{{ billCashback }} руб.</span> <button @click="this.$emit('showWantMore')">Хочу больше!</button></div>
                </td>
            </tr>
            <tr>
                <td>
                    Статус:
                </td>
                <td>
                    <span class="field">{{ billStatus }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import vTooltip from './v-tooltip'

    export default {
        name: "v-bill-block",
        components: {vTooltip},
        props: [
            'billNumber',
            'billDate',
            'billCashback',
            'billStatus'
        ],
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {},
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">
    .v-bill-block {
        margin: 20px;

        .bill-info {
            margin: 20px;

            .sum-wrapper {
                display: flex;
                align-items: center;
            }

        }
    }

    @media (max-width: 479px) {

        .v-bill-block {

            .bill-info tr {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;

                td {
                    width: 100%;
                }


            }

        }

    }
</style>