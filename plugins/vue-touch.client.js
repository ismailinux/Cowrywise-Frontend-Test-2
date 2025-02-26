// ~/plugins/vue-touch.client.js
// import Vue3TouchEvents from 'vue3-touch-events';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(Vue3TouchEvents);
// });

// ~/plugins/vue-touch.client.js
import Vue3TouchEvents from 'vue3-touch-events';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    console.log('Registering vue3-touch-events plugin');
    nuxtApp.vueApp.use(Vue3TouchEvents);
    console.log('Registered directives:', nuxtApp.vueApp._context.directives);
  }
});