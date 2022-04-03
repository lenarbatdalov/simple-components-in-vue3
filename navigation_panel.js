const NavigationPanel = {
  name: 'navigation-panel',
  props: ['tab'],
  emits: ['updateTab'],
  template: /*html*/`
    <div class="wazzup__navbar">
      <template v-for="item in ['api', 'channels', 'access']">
        <span
          :class="{'wazzup__navbar-active': (tab == item)}"
          @click="$emit('updateTab', item)"
        >{{ $t(item + '_tab') }}</span>
        <span v-if="item != 'access'">/</span>
      </template>
    </div>
  `
}

const app = Vue.createApp({
  components: {
    'navigation-panel': NavigationPanel,
    'api-component': ApiComponent,
    'channels-component': ChannelsComponent,
    'access-component': AccessComponent,
  },

  setup() {
    let tab = Vue.ref('api');
    return {
      tab,
      updateTab: value => tab.value = value
    }
  },

  template: /*html*/`
    <div>
      <navigation-panel
        :tab="tab"
        @update-tab="updateTab"
      ></navigation-panel>
    </div>
    <component :is="tab + '-component'"></component>
  `
});

app.use(Vuex.createStore(store));

app.use(VueI18n.createI18n({
  locale: (CB.globals.config.lang == "russian" ? "ru" : "en"),
  fallbackLocale: 'en',
  messages: {
    en: localeEn,
    ru: localeRu,
  },
}));

app.mount("#app");
