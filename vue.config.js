// Общий файл стилей. Подключается заново к каждому компоненту => подходит только для миксинов и т.п.
// module.exports = {
//     css: {
//         loaderOptions: {
//             sass: {
//                 additionalData: '@import "@/assets/style.scss";'
//             }
//         }
//     },
// };


module.exports = {
        lintOnSave: false, // disable esLint
        publicPath: process.env.NODE_ENV === 'production'
            ? '/cashback/'
            : '/'
};