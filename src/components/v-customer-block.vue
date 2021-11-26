<template>
    <div class="v-customer-block">
        <h2 class="tooltip-block">
            <span>Укажите Ваши данные</span>
            <vTooltip
                    :text="`Введите контактные данные, по которым мы сможем связаться с Вами, если это потребуется.<br>
                            Почта обязательна к заполнению, остальное - по желанию.`"
            />
        </h2>
        <div class="cb-content">
            <table>
                <tr>
                    <td>
                        Имя
                    </td>
                    <td>
                        <input type="text" placeholder="Как к Вам обращаться"
                               :value="customerName"
                               @change="$emit('update:customerName', $event.target.value)"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Почта
                    </td>
                    <td>
                        <div class="valid-block">
                            <div>
                                <input type="text" placeholder="E-mail для связи"
                                       :value="customerMail"
                                       @input="emailValidation"
                                       @change="$emit('update:customerMail', $event.target.value)"/>
                            </div>
                            <div id="email-valid-error"></div>
                        </div>

                    </td>
                </tr>
                <tr>
                    <td>
                        Телефон
                    </td>
                    <td>
                        <input type="tel"
                               :value="customerPhone"
                               :disabled="this.isTheSamePhone"
                               @focus="mask.create($event)"
                               @click="mask.create($event)"
                               @keydown="mask.create($event)"
                               @input="onTelInput($event)"
                        />
                        <input type="checkbox" id="same-tel" v-model="isTheSamePhone">
                        <label for="same-tel">тот же</label>
                    </td>
                </tr>
            </table>
            <div class="autonext  tooltip-block">
                <input type="checkbox" id="autonext" :checked="customerAutonext" @change="$emit('update:customerAutonext', $event.target.checked)">
                <label for="autonext">Автоматически применять указанные данные к будущим счетам</label>
                <vTooltip
                        :text="`При активации данной опции к Вашим следующим заказам будет применяться этот же способ перечисления кешбэка,
                                что избавит от необходимости повторно вводить одинаковые данные.
                                Однако Вы всегда сможете изменить способ перечисления для каждого конкретного заказа на его странице.`"
                />
            </div>
            <div class="pass tooltip-block">
                <input type="checkbox" id="enablePass" :checked="enablePass" @click.prevent="customerPass.checkboxHandler">
                <label for="enablePass">Защитить страницу паролем</label>
                <button v-show="enablePass" @click="customerPass.enableSetPass">Сменить пароль</button>
                <vTooltip
                        :text="`После установки пароля только Вы будете иметь доступ к данной странице.
                                Его ввод будет требоваться при каждом входе.<br>
                                В случае необходимости восстановления пароля будет использоваться указанная почта.`"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {Mask} from '@/assets/phoneMask.js'
    import vTooltip from './v-tooltip'

    export default {
        name: "v-customer-block",
        components: {vTooltip},
        props: [
            'customerName',
            'customerMail',
            'customerPhone',
            'transferPhone',
            'customerAutonext',
            'customerPass',
        ],
        data() {
            return {
                isTheSamePhone: this.customerPhone === this.transferPhone,
                mask: new Mask(),
            }
        },
        methods: {
            emailValidation(event) {
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
                    event.target.classList.add('input-complete');
                }
                else {
                    event.target.classList.remove('input-complete');
                }
            },
            onTelInput(event) {
                this.mask.create(event);
                this.$emit('update:customerPhone', event.target.value)
            }
        },
        computed: {
            enablePass() {
                return this.customerPass.newValue.length > 0
            }
        },
        watch: {
            transferPhone(value) {
                 if (this.isTheSamePhone) {
                    this.$emit('update:customerPhone', value)
                }
            },
            isTheSamePhone(value) {
                if (value) {
                    this.$emit('update:customerPhone', this.transferPhone)
                }
                else {
                    this.$emit('update:customerPhone', '+7 (___) ___-__-__')
                }
            }

        },
        mounted() {
        },
    }
</script>

<style lang="scss">
    .v-customer-block {
        margin: 0 20px 20px 20px;

        & .cb-content {
            margin: 20px;

            input[type="text"] {
                width: 250px;
            }

          .autonext {
            margin: 10px 0;
          }
        }
    }
    @media (max-width: 479px) {

      .v-customer-block {

        .cb-content table tr {
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