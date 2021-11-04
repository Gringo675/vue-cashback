<template>
    <div class="v-main-wrapper">
        <template v-if="customerPass.connectionStatus === 'ok'">
            <vHeader/>
            <div class="body-wrapper">
                <vBillBlock :billNumber="billNumber"
                            :billCashback="billCashback"
                            :billStatus="billStatus"
                            @showWantMore="this.showWantMore = true"
                />
                <vTransferBlock v-model:transferPhone="transferPhone"
                                v-model:transferType="transferType"
                                v-model:transferBank="transferBank"
                />
                <vCustomerBlock v-model:customerName="customerName"
                                v-model:customerMail="customerMail"
                                v-model:customerPhone="customerPhone"
                                v-model:transferPhone="transferPhone"
                                v-model:customerAutonext="customerAutonext"
                                :customerPass="customerPass"
                />
            </div>
            <vFooter @setData="setData"
                     :message="message"
            />
        </template>

        <transition name="modal-transition">
            <vAuth v-if="customerPass.connectionStatus === 'authRequired' || customerPass.connectionStatus === 'badPass'"
                   :connectionStatus="customerPass.connectionStatus"
                   @passReceived="onPassReceived"
                   @forgetPass="onForgetPass"
            />
        </transition>
        <transition name="modal-transition">
            <vWantMore v-if="showWantMore"
                       :billNumber="billNumber.toString()"
                       :loader="loader"
                       @closeWantMore="this.showWantMore = false"
            />
        </transition>
        <transition name="modal-transition">
            <vSetPass v-if="customerPass.showSetPass"
                      :customerPass="customerPass"
            />
        </transition>
        <transition name="modal-transition">
            <vMessage v-if="message.show"
                      :message="message"/>
        </transition>

        <vLoader v-if="loader.show"/>


    </div>
</template>

<script>
    import vHeader from './v-header'
    import vBillBlock from './v-bill-block'
    import vTransferBlock from './v-transfer-block'
    import vCustomerBlock from './v-customer-block'
    import vFooter from './v-footer'
    import vLoader from './v-loader'
    import {defineAsyncComponent} from 'vue'

    export default {
        name: "v-main-wrapper",
        components: {
            vHeader,
            vBillBlock,
            vTransferBlock,
            vCustomerBlock,
            vFooter,
            vLoader,
            vAuth: defineAsyncComponent({
                loader: () => import('./v-auth'),
                loadingComponent: vLoader,
            }),
            vMessage: defineAsyncComponent({
                loader: () => import('./v-message'),
                loadingComponent: vLoader,
            }),
            vWantMore: defineAsyncComponent({
                loader: () => import('./v-want-more'),
                loadingComponent: vLoader,
            }),
            vSetPass: defineAsyncComponent({
                loader: () => import('./v-set-pass'),
                loadingComponent: vLoader,
            }),

        },
        props: {},
        data() {
            return {
                billID: undefined,
                billNumber: undefined,
                billCashback: undefined,
                billStatus: undefined,
                transferType: undefined,
                transferBank: undefined,
                transferPhone: '+7 (___) ___-__-__',
                customerName: undefined,
                customerMail: undefined,
                customerPhone: '+7 (___) ___-__-__',
                customerAutonext: undefined,
                customerPass: {
                    value: '',
                    newValue: '',
                    cashe: '',
                    connectionStatus: undefined,
                    showSetPass: false,
                    checkboxHandler(e) {
                        const checked = e.target.checked;
                        if (checked) {
                            if (this.cashe === '') this.showSetPass = true;
                            else {
                                setTimeout(() => { // без таймаута не срабатывает реактивность на чекбоксе
                                    this.newValue = this.cashe
                                }, 0)
                            }
                        } else {
                            this.cashe = this.newValue;
                            setTimeout(() => {
                                this.newValue = '';
                            }, 0)
                        }
                    },
                    enableSetPass() {
                        this.showSetPass = true
                    },
                    disableSetPass() {
                        this.showSetPass = false
                    },
                    setNewValue(value) {
                        this.newValue = value
                    }
                },

                loader: {
                    show: false,
                    enable: function () {
                        this.show = true
                    },
                    disable: function () {
                        this.show = false
                    },
                },

                message: {
                    show: false,
                    text: '',
                    title: '',
                    type: '',
                    enable: function (text, title = 'Сообщение', type = 'info') {
                        this.text = text;
                        this.title = title;
                        this.type = type;
                        this.show = true;
                    },
                    disable: function () {
                        this.show = false;
                        this.text = '';
                        this.title = '';
                        this.type = '';
                    },
                },

                showWantMore: false,

            }
        },
        methods: {
            async getData() {
                this.loader.enable();
                try {
                    let url = 'https://chelinstrument.ru/api?app=cb&method=get_data';
                    let post = {
                        id: this.billID,
                        pass: this.customerPass.value
                    };
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(post)
                    });
                    if (response.ok) {
                        let result = await response.json();
                        console.log(`result: ${JSON.stringify(result)}`);

                        switch (result.statusCode) {
                            case 200: // ok
                                result = result.data;
                                this.billNumber = result.bill_number;
                                this.billCashback = result.bill_cashback;
                                this.billStatus = this.unzipBillStatus(result.status);
                                this.transferType = this.unzipTransferType(result.trans_type);
                                this.transferBank = result.trans_bank;
                                (result.trans_phone.length === 18 ? this.transferPhone = result.trans_phone : '');
                                this.customerName = result.customer_name;
                                this.customerMail = result.customer_mail;
                                (result.customer_phone.length === 18 ? this.customerPhone = result.customer_phone : '');
                                this.customerAutonext = result.autonext === 1;
                                this.customerPass.connectionStatus = 'ok';
                                break;
                            case 401: // unauthorized
                                if (this.customerPass.connectionStatus === undefined) { // значит первый запрос
                                    this.customerPass.connectionStatus = 'authRequired'
                                } else { // повторный запрос
                                    this.customerPass.connectionStatus = 'badPass'
                                }
                                break;
                            case 404: // not found
                                throw new Error();
                        }
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    this.connectionError()
                }
                this.loader.disable();
            },
            async setData() {
                this.loader.enable();
                try {
                    let url = 'https://chelinstrument.ru/api?app=cb&method=set_customer_data';
                    // let url = 'http://localhost:3000/api?app=cb&method=set_customer_data';
                    let post = this.validateCustomerData();
                    if (!post) return; // валидация не прошла
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(post)
                    });
                    if (response.ok) {
                        let result = await response.json();
                        if (result.statusCode === 200) {
                            // sucsess
                            this.message.enable('Бла-бла-бла...', 'Данные успешно сохранены!', 'sucsess');
                        } else {
                            throw new Error();
                        }

                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    // fail
                    this.message.enable('При сохранении данных произошла ошибка. Возможно, это временные проблеммы с сетью или на сервере. Попробуйте повторить операцию чуть позже. При повторении ошибки пожалуйста сообщите нам о ней, отправив письмо на почту admin@chelinstrument.ru, или по телефону 8(351)790-77-48.', 'Ошибка сохранения', 'error');
                }
                this.loader.disable();
            },
            validateCustomerData() {
                let post = {
                    id: this.billID,
                    bill_number: this.billNumber,
                    customer_name: this.customerName.trim(),
                    autonext: (this.customerAutonext ? 1 : 0),
                    pass: this.customerPass.newValue
                };

                post.trans_type = this.zipTransferType(this.transferType);
                if (post.trans_type === 0) {
                    this.validationMessage('Выберите способ перечисления!', 'type-valid-error');
                    return false
                }

                if (post.trans_type === 2) { // на карту
                    if (this.transferBank === '' || this.transferBank === 'other') {
                         this.validationMessage('Выберите банк!', 'bank-valid-error');
                        return false
                    }
                    post.trans_bank = this.transferBank
                } else { // на тел
                    post.trans_bank = ''
                }

                if (this.transferPhone.indexOf("_") !== -1) { // есть незаполненные цифры в номере
                    this.validationMessage('Укажите номер телефона!', 'phone-valid-error');
                    return false
                }
                post.trans_phone = this.transferPhone;

                post.customer_phone = (this.customerPhone.indexOf("_") === -1 ? this.customerPhone : '');

                if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.customerMail)) {
                    this.validationMessage('Укажите email-адрес!', 'email-valid-error');
                    return false
                }
                post.customer_mail = this.customerMail;

                return post
            },
            async onForgetPass() {
                this.loader.enable();
                try {
                    let url = 'https://chelinstrument.ru/api?app=cb&method=forget_pass';
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({id: this.billID})
                    });
                    if (response.ok) {
                        let result = await response.json();
                        if (result.statusCode === 200) {
                            // sucsess
                            this.message.enable('Бла-бла-бла...', 'Письмо отправлено!', 'sucsess');
                        } else {
                            throw new Error();
                        }

                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    // fail
                    this.message.enable('Не удалось отправить письмо...', 'Ошибка отправки', 'error');
                }
                this.loader.disable();
            },
            unzipBillStatus(code) {
                // метод по коду возвращает человекопонятный статус счета
                switch (code) {
                    case 0:
                        return 'не оплачен';
                    case 1:
                        return 'не оплачен, кешбэк перечислен';
                    case 2:
                        return 'не оплачен, частично отгружен';
                    case 3:
                        return 'не оплачен, частично отгружен, кешбэк перечислен';
                    case 4:
                        return 'не оплачен, отгружен';
                    case 5:
                        return 'не оплачен, отгружен, кешбэк перечислен';
                    case 6:
                        return 'частично оплачен';
                    case 7:
                        return 'частично оплачен, кешбэк перечислен';
                    case 8:
                        return 'частично оплачен, частично отгружен';
                    case 9:
                        return 'частично оплачен, частично отгружен, кешбэк перечислен';
                    case 10:
                        return 'частично оплачен, частично отгружен, имеется задолженность по оплате';
                    case 11:
                        return 'частично оплачен, частично отгружен, имеется задолженность по оплате, кешбэк перечислен';
                    case 12:
                        return 'частично оплачен, отгружен';
                    case 13:
                        return 'частично оплачен, отгружен, кешбэк перечислен';
                    case 14:
                        return 'оплачен';
                    case 15:
                        return 'оплачен, кешбэк перечислен';
                    case 16:
                        return 'оплачен, частично отгружен';
                    case 17:
                        return 'оплачен, частично отгружен, кешбэк перечислен';
                    case 18:
                        return 'оплачен, отгружен';
                    case 19:
                        return 'оплачен, отгружен, кешбэк перечислен';
                }
            },
            unzipTransferType(code) {
                // метод по коду возвращает transferType
                switch (code) {
                    case 0:
                        return ''; // не установлен
                    case 1:
                        return 'tel';
                    case 2:
                        return 'card';
                }
            },
            zipTransferType(transferType) {
                // метод по transferType возвращает код
                switch (transferType) {
                    case 'tel':
                        return 1;
                    case 'card':
                        return 2;
                    default:
                        return 0
                }
            },
            onPassReceived(value) {
                this.customerPass.connectionStatus = 'authRequired';
                this.customerPass.value = this.customerPass.newValue = value;
                this.getData();
            },
            validationMessage(text, elementID) {
                const element = document.getElementById(elementID);
                const parent = element.parentElement;
                element.innerText = text;
                element.classList.add("error-block");
                parent.scrollIntoView({block: "center", behavior: "smooth"}); // Определяем видимость элемента на экране
                parent.addEventListener('click', () => { // по клику на родителе убираем сообщение
                    element.classList.remove("error-block");
                    element.innerText = '';
                }, {once: true});
                this.loader.disable();
            },
            connectionError() {
                this.message.enable('При получении данных произошла ошибка. Попробуйте обновить страницу. При повторении ошибки пожалуйста сообщите нам о ней, отправив письмо на почту admin@chelinstrument.ru, или по телефону 8(351)790-77-48.',
                    'Ошибка соединения!', 'error');
                this.customerPass.connectionStatus = 'notFound'
            },

        },
        computed: {},
        watch: {},
        created() {
            try {
                this.billID = window.location.search.match(/^\?id=([a-z0-9-]+)/)[1];
                if (this.billID.length !== 36) throw new Error();
            } catch (e) {
                this.connectionError();
                return
            }
            this.getData();

        },
        mounted() {

        },
    }
</script>

<style lang="scss">
    .v-main-wrapper {
        background: #ffe7c2;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .body-wrapper {
            width: 100%;
            max-width: 768px;
        }
    }


    .modal-transition-enter-active, .modal-transition-leave-active {
        transition: opacity .2s linear, transform .2s linear;
    }
    .modal-transition-enter-from, .modal-transition-leave-to {
        opacity: 0;
        transform: translateY(-50px);
    }

</style>