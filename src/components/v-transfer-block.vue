<template>
    <div class="v-transfer-block">
        <h3>Выберите способ перечисления</h3>
        <input type="radio" id="tel" value="tel" v-model="transferTypeComputed"/>
        <label for="tel">На балланс телефона</label>
        <br/>
        <input type="radio" id="card" value="card" v-model="transferTypeComputed"/>
        <label for="card">На банковскую карту</label>
        <br/>
        <div v-if="this.transferType === 'card'">
            <h3>Укажите банк</h3>
            <input type="radio" id="sber" value="true" v-model="isSberbank"/>
            <label for="sber">Сбербанк</label>
            <br/>
            <input type="radio" id="other" value="false" v-model="isSberbank"/>
            <label for="other">Другой банк {{otherBankName}}</label>
        </div>
        <div v-if="isSberbank === 'false' && transferType === 'card'">Показать банки
            <input v-model="banks.filterWord" @keyup="banks.createFilteredDebounced" placeholder="Начните вводить название банка..."/>
            <div class="banksWrapper">
                <div v-for="(bank, i) in banks.filtered" :key="i">
                    <input type="radio" :id="'bank' + i" :value="bank" v-model="transferBankComputed"/>
                    <label :for="'bank' + i">{{ bank }}</label>
                </div>
            </div>
        </div>
        <div class="transferPhone">
            <span>Укажите номер телефона</span>
            <input type="tel"
                   :value="transferPhone"
                   @change="$emit('update:transferPhone', $event.target.value)"
                   ref="phone"/>
        </div>
        <br/><br/><br/>
        <span>transferType: {{ transferType }}</span><br/>
        <span>bankName: {{ transferBank }}</span><br/>
    </div>
</template>

<script>
    import {Mask} from '@/assets/phoneMask.js';

    export default {
        name: "v-transfer-block",
        components: {},
        props: [
            'transferType',
            'transferBank',
            'transferPhone',
        ],
        data() {
            return {
                banks: {
                    all: ["АБ РОССИЯ", "Абсолют Банк", "Авангард", "Автоградбанк", "Автоторгбанк", "АГРОПРОМКРЕДИТ", "Азиатско-Тихоокеанский Банк", "Ак Барс Банк", "АКБ Держава", "АКБ ЕВРОФИНАНС МОСНАРБАНК", "АКБ Приморье", "АКБ СЛАВИЯ", "АКБ Тендер Банк", "АКБ ЦентроКредит", "АКИБАНК", "Алеф-Банк", "Алмазэргиэнбанк", "Альфа-Банк", "Аресбанк", "БАЛТИНВЕСТБАНК", "Банк Аверс", "Банк Агророс", "Банк Акцепт", "Банк Александровский", "Банк БКФ", "Банк ВБРР", "Банк Венец", "Банк ДОМ.РФ", "Банк Екатеринбург", "Банк Заречье", "Банк Зенит", "Банк Интеза", "Банк ИПБ", "Банк ИТУРУП", "Банк Йошкар-Ола", "Банк Казани", "Банк Кремлевский", "Банк МБА-МОСКВА", "БАНК МОСКВА-СИТИ", "Банк Объединенный капитал", "БАНК ОРЕНБУРГ", "Банк ПСКБ", "Банк Развитие-Столица", "Банк Раунд", "Банк Русский Стандарт", "Банк Саратов", "БАНК СГБ", "Банк СКС", "Банк Снежинский", "Банк СОЮЗ", "БАНК УРАЛСИБ", "Банк Финсервис", "ББР Банк", "Белгородсоцбанк", "БКС Банк", "Бланк банк", "Братский АНКБ", "БыстроБанк", "ВЛАДБИЗНЕСБАНК", "ВНЕШФИНБАНК", "ВТБ", "ВУЗ банк", "Газпромбанк", "Газэнергобанк", "Гарант-Инвест банк", "ГЕНБАНК", "ГОРБАНК", "ГТ банк", "ГУТА-БАНК", "Дальневосточный банк", "Датабанк", "Джей энд Ти Банк", "Единая Расчетная Палата", "Енисейский Объединенный банк", "Запсибкомбанк", "Земский банк", "Золотая Корона (РНКО Платежный центр)", "ИК Банк", "Инбанк", "ИНГ БАНК (ЕВРАЗИЯ)", "ИШБАНК", "КБ АКРОПОЛЬ", "КБ Байкалкредобанк", "КБ Восточный", "КБ ИС Банк", "КБ КОЛЬЦО УРАЛА", "КБ Новый Век", "КБ Пойдем!", "КБ РостФинанс", "КБ СОЛИДАРНОСТЬ", "КБ Стройлесбанк", "КБ Хлынов", "КБ ЮНИСТРИМ", "КВАНТ МОБАЙЛ БАНК (Плюс Банк)", "КИВИ Банк", "КОШЕЛЕВ-БАНК", "Кредит Европа Банк (Россия)", "Кредит Урал Банк", "Крокус-Банк", "КС БАНК", "Кубань Кредит", "Кубаньторгбанк", "Кузнецкбизнесбанк", "Ланта-Банк", "Левобережный", "ЛОКО-Банк", "МБ Банк", "МЕЖДУНАРОДНЫЙ ФИНАНСОВЫЙ КЛУБ", "Металлинвестбанк", "МЕТКОМБАНК", "МИнБанк", "МКБ", "Модульбанк", "МОНЕТА", "МОРСКОЙ БАНК", "МОСКОМБАНК", "Москоммерцбанк", "МОСОБЛБАНК", "МС Банк Рус", "МСП Банк", "МТС-Банк", "Нацинвестпромбанк", "Национальный стандарт", "НБД-Банк", "НИКО-БАНК", "НК Банк", "НКО МОБИ.Деньги", "НКО ЮМани", "НОВИКОМБАНК", "Новобанк", "НОКССБАНК", "Норвик Банк", "НРБанк", "НС Банк", "Открытие", "ОТП Банк", "Первый Инвестиционный Банк", "Платина", "Почта Банк", "Примсоцбанк", "Прио-Внешторгбанк", "ПроБанк", "Промсвязьбанк", "ПромТрансБанк", "Райффайзенбанк", "Реалист Банк", "Ренессанс Кредит", "РЕСО Кредит", "РНКБ Банк", "РНКО Деньги.Мэйл.Ру", "Росбанк", "Росгосстрах Банк", "РосДорБанк", "Россельхозбанк", "РУСНАРБАНК", "Русьуниверсалбанк", "Санкт-Петербург", "САРОВБИЗНЕСБАНК", "Сбербанк", "СДМ-Банк", "Северный Народный Банк", "Сетелем Банк", "Сибсоцбанк", "СИНКО-БАНК", "Ситибанк", "СКБ-банк", "СМП Банк", "СНГБ", "Совкомбанк", "Солид Банк", "СОЦИУМ-БАНК", "Таврический Банк", "ТАТСОЦБАНК", "Тимер Банк", "Тинькофф", "Тойота Банк", "Тольяттихимбанк", "Томскпромстройбанк", "Точка \"ФК Открытие\"", "Транскапиталбанк", "Трансстройбанк", "УБРиР", "Углеметбанк", "Урал ФД", "УРАЛПРОМБАНК", "Филиал Возрождение БМ Банк", "ФИНАМ", "ФОРА-БАНК", "Форштадт", "Хакасский муниципальный банк", "ХКФ Банк", "Центр-инвест", "Чайна Констракшн Банк", "ЧЕЛИНДБАНК", "ЧЕЛЯБИНВЕСТБАНК", "Экономбанк", "Экспобанк", "Элплат", "Энергобанк", "Энерготрансбанк", "Эс-Би-Ай Банк", "ЮГ-Инвестбанк", "Юникредит Банк", "WebMoney (Банк ККБ)"],
                    filtered: [],
                    filterWord: '',
                    timeout: 500,
                    timer: undefined,
                    createFilteredDebounced: function() {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(this.func, this.timeout);
                    },
                    func: ()=> {
                        if (this.banks.filterWord.length > 1) { // начинаем поиск от двух символов
                            this.banks.filtered = this.banks.all.filter(bank => bank.toLowerCase().includes(this.banks.filterWord.toLowerCase()))
                        } else {
                            this.banks.filtered = this.banks.all
                        }
                    }
                },
            }
        },
        methods: {

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
                    return (this.transferBank === 'Сбербанк' ? 'true' : 'false')
                },
                set(value) {
                    console.log(`isSberbank value: ${value === 'true'}`);
                    this.$emit('update:transferBank', (value === 'true' ? 'Сбербанк' : ''))
                }
            },
            otherBankName() {
                if (this.transferBank !== 'Сбербанк' && this.transferBank !== '') {
                    return ` - ${this.transferBank}`
                }
                else {
                    return ''
                }
            }
        },
        watch: {},
        mounted() {
            this.banks.filtered = this.banks.all;
            // Маска на номер телефона
            let elem = this.$refs.phone;
            let mask = new Mask();
            elem.addEventListener("input", mask.create, false);
            elem.addEventListener("focus", mask.create, false);
            elem.addEventListener("click", mask.create, false);
            elem.addEventListener("keydown", mask.create, false);

        },
    }
</script>

<style lang="scss">
    .banksWrapper {
        width: 200px;
        height: 200px;
        background-color: #cccccc;
        overflow-y: scroll;
    }
</style>