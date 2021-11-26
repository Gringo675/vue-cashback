<template>
    <div class="v-transfer-block">
        <h2 class="tooltip-block">
            <span>Выберите способ перечисления</span>
            <vTooltip
                    :text="`Кешбэк может быть перечислен Вам одним из двух способов:<br>
                            - на балланс номера мобильного телефона, обслуживаемого на территории РФ;<br>
                            - на банковскую карту одного из более чем 200 российских банков. Карта должна быть прикреплена к указываемому телефонному номеру.`"
            />
        </h2>
        <div class="tb-content">
            <div class="valid-block">
                <div>
                    <input type="radio" id="tel" value="tel" v-model="transferTypeComputed"/>
                    <label for="tel">На балланс телефона</label>
                </div>
                <div>
                    <input type="radio" id="card" value="card" v-model="transferTypeComputed"/>
                    <label for="card">На банковскую карту</label>
                </div>
                <div id="type-valid-error"></div>
            </div>
            <div v-if="this.transferType === 'card'" class="tb-bank-choose valid-block">
                <h3>Укажите банк</h3>
                <div>
                    <input type="radio" id="sber" value="true" v-model="isSberbank"/>
                    <label for="sber">Сбербанк</label>
                </div>
                <div>
                    <input type="radio" id="other" value="false" v-model="isSberbank"/>
                    <label for="other">Другой банк {{otherBankName}}</label>
                </div>
                <div v-if="isSberbank === 'false' && transferType === 'card'" class="tb-all-banks">
                    <input v-model="banks.filterWord" @keyup="banks.createFilteredDebounced"
                           placeholder="Начните вводить название банка..." class="filter"/>
                    <div class="banksWrapper">
                        <div v-for="(bank, i) in banks.filtered" :key="i" class="bank-item">
                            <input type="radio" :id="'bank' + i" :value="bank" v-model="transferBankComputed"/>
                            <label :for="'bank' + i">{{ bank }}</label>
                        </div>
                    </div>
                </div>
                <div id="bank-valid-error"></div>
            </div>

            <div class="tb-phone valid-block">
                <div class="tooltip-block">
                    <span>Телефон</span>
                    <input type="tel"
                           :value="transferPhone"
                           @focus="mask.create($event)"
                           @click="mask.create($event)"
                           @keydown="mask.create($event)"
                           @input="onTelInput($event)"
                     />
                    <vTooltip
                            :text="'Введите номер телефона, ' + (transferType === 'tel' ? 'на балланс которого будет перечислен кешбэк.' : 'привязанный к банковской карте.')"
                    />
                </div>
                <div id="phone-valid-error"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Mask} from '@/assets/phoneMask.js'
    import vTooltip from './v-tooltip'

    export default {
        name: "v-transfer-block",
        components: {vTooltip},
        props: [
            'transferType',
            'transferBank',
            'transferPhone',
        ],
        data() {
            return {
                banks: {
                    all: require(`@/assets/banks.json`),
                    filtered: require(`@/assets/banks.json`),
                    filterWord: '',
                    timeout: 500,
                    timer: undefined,
                    createFilteredDebounced: function () {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(this.func, this.timeout);
                    },
                    func: () => {
                        if (this.banks.filterWord.length > 1) { // начинаем поиск от двух символов
                            this.banks.filtered = this.banks.all.filter(bank => bank.toLowerCase().includes(this.banks.filterWord.toLowerCase()))
                        } else {
                            this.banks.filtered = this.banks.all
                        }
                    }
                },
                mask: new Mask(),
            }
        },
        methods: {
            onTelInput(event) {
                this.mask.create(event);
                this.$emit('update:transferPhone', event.target.value)
            }
          },
        computed: {
            transferTypeComputed: {
                get() {
                    return this.transferType
                },
                set(value) {
                    this.$emit('update:transferType', value)
                }
            },
            transferBankComputed: {
                get() {
                    return this.transferBank
                },
                set(value) {
                    this.$emit('update:transferBank', value)
                }
            },
            isSberbank: {
                get() {
                    if (!this.transferBank.length) return;
                    return (this.transferBank === 'Сбербанк' ? 'true' : 'false')
                },
                set(value) {
                    this.$emit('update:transferBank', (value === 'true' ? 'Сбербанк' : 'other'))
                }
            },
            otherBankName() {
                if (this.transferBank === 'Сбербанк' || this.transferBank === '' || this.transferBank === 'other') {
                    return ''
                }
                return ` - ${this.transferBank}`
            }
        },
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">
    .v-transfer-block {
        margin: 0 20px 20px 20px;

        & .tb-content {
            margin: 20px;

            & .tb-bank-choose {
                margin: 10px 15px;

                h3 {
                    margin-bottom: 5px;
                }

                & .tb-all-banks {
                  margin-bottom: 20px;
                  margin-left: -55px;
                  width: 100vw;
                  max-width: 360px;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;

                    & .filter {
                      width: 280px;
                      margin: 10px;
                    }

                    & .banksWrapper {
                      margin: 0 10px;
                        width: 280px;
                        height: 140px;
                        background-color: #ffd8a0;
                        border-radius: 10px;
                        overflow-y: auto;

                        & .bank-item {
                            display: flex;
                            align-items: center;

                            & label {
                                padding-right: 5px;
                            }
                        }
                    }

                }
            }
        }
    }

    @media (max-width: 479px) {
        .v-transfer-block {
            .tb-content {
                .tb-bank-choose {
                    .tb-all-banks {
                      //margin-left: -40px;
                    }
                }
            }
        }
    }

</style>