<template>
    <div class="v-main-wrapper">
        <template v-if="connectionStatus === 'ok'">
            <vHeader/>
            <vBillBlock :billNumber="billNumber"
                        :billCashback="billCashback"
                        :billStatus="billStatus">
            </vBillBlock>
            <vTransferBlock v-model:transferPhone="transferPhone"
                            v-model:transferType="transferType"
                            v-model:transferBank="transferBank"/>
            <vCustomerBlock v-model:customerName="customerName"
                            v-model:customerMail="customerMail"
                            v-model:customerPhone="customerPhone"/>
            <vFooter @setData="setData"/>
        </template>
        <vAuth v-if="connectionStatus === 'authRequired' || connectionStatus === 'badPass'"
               :connectionStatus="connectionStatus"
               @passReceived="onPassReceived"/>
        <vMessage v-if="connectionStatus === 'notFound'">
            Ошибка соединения!
            Если Вы попали на эту страницу по полученной от нас ссылке,
            пожалуйста сообщите о возникшей проблемме на почту admin@chelinstrument.ru
        </vMessage>
        <vLoader v-if="showLoader"/>

        <!--        <vTtest :title="ttestTitle"/>-->
        <!--        <vModalForm v-show="showModal">-->
        <!--            <template v-slot:header v-html="modalHeader">-->

        <!--            </template>-->
        <!--            <template v-slot:body>-->
        <!--                {{modalBody}}-->
        <!--            </template>-->
        <!--            <template v-slot:footer>-->
        <!--                {{modalFooter}}-->
        <!--            </template>-->

        <!--        </vModalForm>-->

    </div>
</template>

<script>
    import vHeader from './v-header'
    import vBillBlock from './v-bill-block'
    import vTransferBlock from './v-transfer-block'
    import vCustomerBlock from './v-customer-block'
    import vFooter from './v-footer'
    import vAuth from './v-auth'
    import vMessage from './v-message'
    import vLoader from './v-loader'
    import vModalForm from './v-modal-form'
    import vTtest from './v-ttest'

    export default {
        name: "v-main-wrapper",
        components: {
            vHeader,
            vBillBlock,
            vTransferBlock,
            vCustomerBlock,
            vFooter,
            vAuth,
            vMessage,
            vLoader,
            vModalForm,
            vTtest
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
                customerPass: '',

                connectionStatus: undefined,

                showLoader: false,

                ttestTitle: '//**********TTEST*************//',
                showModal: true,
                modalHeader: 'Заголовок',
                modalBody: 'modalBody111',
                modalFooter: 'modalFooter111',
            }
        },
        methods: {
            async getData() {
                this.showLoader = true;
                try {
                    let url = 'https://chelinstrument.ru/api?app=cb&method=get_data';
                    let post = {
                        id: this.billID,
                        pass: this.customerPass
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
                                (result.trans_phone.length ? this.transferPhone = result.trans_phone : '');
                                this.customerName = result.customer_name;
                                this.customerMail = result.customer_mail;
                                (result.customer_phone.length ? this.customerPhone = result.customer_phone : '');
                                this.connectionStatus = 'ok';
                                break;
                            case 401: // unauthorized
                                if (this.connectionStatus === undefined) { // значит первый запрос
                                    this.connectionStatus = 'authRequired'
                                } else { // повторный запрос
                                    this.connectionStatus = 'badPass'
                                }
                                break;
                            case 404: // not found
                                this.connectionStatus = 'notFound';
                                break;
                        }
                    } else {
                        this.connectionStatus = 'notFound';
                    }
                }
                catch (e) {
                    this.connectionStatus = 'notFound'
                }
                this.showLoader = false;
            },
            async setData() {
                // валидация? + телефоны
                this.showLoader = true;
                try {
                    let url = 'https://chelinstrument.ru/api?app=cb&method=set_customer_data';
                    let post = {
                        id: this.billID,
                        trans_type: this.transferType,
                        trans_bank: this.transferBank,
                        trans_phone: this.transferPhone,
                        customer_name: this.customerName,
                        customer_mail: this.customerMail,
                        customer_phone: this.customerPhone,
                        pass: this.customerPass
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
                        console.log(`setData result: ${JSON.stringify(result)}`);
                        if (result.statusCode === 200) {
                            // sucsess
                        }
                        else {
                            throw new Error();
                        }

                    } else {
                        throw new Error();
                    }
                }
                catch (e) {
                    // fail
                }
                this.showLoader = false;
            },
            unzipBillStatus(code) {
                // метод по коду возвращает человекопонятный статус счета
                switch (code) {
                    case 0:
                        return 'не оплачен';
                    case 1:
                        return 'оплачен частично';
                    case 2:
                        return 'оплачен частично, кэшбэк перечислен';
                    case 3:
                        return 'оплачен';
                    case 4:
                        return 'оплачен, кэшбэк перечислен';
                    case 5:
                        return 'отгружен, имеется задолженность';
                    case 6:
                        return 'отгружен, имеется задолженность, кэшбэк перечислен';
                    case 7:
                        return 'отгружен';
                    case 8:
                        return 'отгружен, кэшбэк перечислен';
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
            onPassReceived(value) {
                this.connectionStatus = 'authRequired';
                this.customerPass = value;
                this.getData();
            }
        },
        computed: {},
        watch: {},
        created() {
            try {
                this.billID = window.location.search.match(/^\?id=([a-z0-9-]+)/)[1];
                if (this.billID.length !== 36) throw new Error();
            } catch (e) {
                this.connectionStatus = 'notFound';
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
        max-width: 1000px;
        margin: 0 auto;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;

        & > div {
            margin: 20px;
        }

    }
</style>