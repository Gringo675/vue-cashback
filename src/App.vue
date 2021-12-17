<template>
    <vMainWrapper/>
</template>

<script>
    import vMainWrapper from './components/v-main-wrapper'

    export default {
        name: 'App',
        components: {
            vMainWrapper
        }
    }
</script>

<style lang="scss">
    @import '@/assets/css/reset.scss';
    @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');

    div {
        box-sizing: border-box;
    }

    body {
        font-family: 'Play', sans-serif;;
        font-size: 16px;
        color: #2c3e50;
        background: #ffeed5;
        overflow-x: hidden;
        min-height: 100vh;
        text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    h2 {
        font-size: 1.5em;
        line-height: 1;
    }

    h3 {
        font-size: 1.2em;
        line-height: 1;
    }

    a {
        color: #0075ff;
    }

    button {
        display: inline-block;
        margin: 5px 20px;
        padding: 8px 14px;
        min-width: 100px;
        font-size: 14px;
        color: #2c3e50;
        cursor: pointer;
        background: linear-gradient(to bottom, #c0fffc, #37c5dc);
        border: 1px solid #9c9c9c;
        border-radius: 4px;

        &.large {
            font-size: 16px;
            padding: 10px 25px;
        }

        &.cancel {
            background: linear-gradient(to bottom, #eafffe, #a6e7f3);

            &:hover {
                background: linear-gradient(to bottom, #a6e7f3, #eafffe);
            }

            &:active {
                background: #f4fdff;
            }
        }

        &:hover {
            background: linear-gradient(to top, #c0fffc, #53d7ec);
        }

        &:active {
            background: #f4fdff;
        }
    }

    input, textarea {
        box-sizing: border-box;
        font-size: 16px;
        padding: 5px;
        margin: 10px;
        border: 1px solid #cccccc;
        border-radius: 5px;

        &:focus-visible {
            outline: none;
            box-shadow: 0 0 2px 1px #cccccc;
        }
    }

    input[type="radio"], label {
        cursor: pointer;
    }

    input[type="tel"] {
        width: 150px;
    }

    .input-complete {
        border-color: #0075ff;
        box-shadow: 0 0 2px 1px #72c2fb !important;
    }

    .block-input-password {
        position: relative;

        input {
            padding-right: 35px;
            width: 210px;
        }

        .icon {
            position: absolute;
            top: -5px;
            right: 10px;
            width: auto;
            height: 100%;
            padding: 5px;
            cursor: pointer;
        }
    }

    .modal-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        background-color: #ffffffab;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .modal-form {
            position: relative;
            top: 10vh;
            max-height: 75vh;
            width: 600px;
            max-width: 95vw;
            border-radius: 10px;
            box-shadow: 0 0 1px 1px #e4e4e4;
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;


            & .modal-header {
                background: #ffc9af;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px;

                & .title {
                    max-width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 1.2em;
                }

                & .btn-close {
                    background: url('~@/assets/img/x-circle.svg') center no-repeat;
                    background-size: contain;
                    width: 25px;
                    height: 25px;
                    margin-left: 10px;
                    flex-shrink: 0;
                    cursor: pointer;
                }
            }

            & .modal-body {
                padding: 20px;
                background: #ffe5c1;
                overflow: auto;
            }

            & .modal-footer {
                padding: 10px;
                background: #ffd192;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }

        }
    }

    .field {
        display: inline-block;
        margin: 5px 10px;
        padding: 10px 20px;
        border-radius: 10px;
        background: #ffd8a0;
        text-align: center;
    }


    .valid-block {
        width: fit-content;
    }

    .error-block {
        background: #f971a3;
        border-radius: 10px;
        padding: 3px 30px;
        width: fit-content;
        color: white;
        text-align: center;
        margin: auto;
    }


    @keyframes tremble {
        0% {
            transform: translateX(0);
        }
        17% {
            transform: translateX(20px);
        }
        50% {
            transform: translateX(-20px);
        }
        83% {
            transform: translateX(20px);
        }
        100% {
            transform: translateX(0);
        }
    }



</style>
