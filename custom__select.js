const style = /*css*/`
.main {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.select-base {
  width: 200px;
  height: 24px;
  border: 1px solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.select-options {
  position: absolute;
  z-index: 9999;
  background: white;
  width: 200px
}

.select-options-search {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.select-options-search input {
  width: 100%;
}
`;

const CustomSelect = {
  props: {
    data: {
      type: Array,
      default() {
        return new Array;
      }
    }
  },

  directives: {
    // при всплытии списка фокус на панели поиска
    focus: {
      mounted: (el) => el.focus()
    },

    // отследить клик вне элемента
    'click-outside': {
      mounted(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },

  setup(props) {
    const show = Vue.ref(false);
    const selected = Vue.ref("");
    const searchItem = Vue.ref("");

    return {
      show,
      selected,
      searchItem,

      getItemName() {
        return selected.value == ""
        ? "- Все -"
        : props.data.filter(i => i.id == selected.value)[0]['name'] || "";
      },

      getData() {
        return searchItem.value == ""
        ? props.data
        : _.filter(props.data, i => i.name.includes(searchItem.value));
      },

      close() {
        show.value = false;
        searchItem.value = "";
      }
    }
  },

  template: /*html*/`
    <div
      @click.capture="searchItem = show ? '' : searchItem"
      @keyup.esc="show = !show; searchItem = '';"
      v-click-outside="close"
    >
      <div
        @click="show = !show"
        class="select-base"
      >
        {{ getItemName() }}
        <img src="./images/b_start.png">
      </div>

      <div
        v-if="show"
        class="select-options"
      >
        <div
          class="select-options-search"
        >
          <input
            v-model="searchItem"
            type="text"
            v-focus
          >
          <img src="./images/fast_search.png">
        </div>

        <template
          v-for="item in getData()" :key="item.id"
        >
          <div
            @click="selected = item.id"
          >{{ item.name }}</div>
        </template>
      </div>
    </div>
  `
}

CB.styles.globed(style)

Vue.createApp({
  components: {
    'custom-select': CustomSelect
  },
  template: /*html*/`
    <div class="main">
      <select><option>1</option><option>2</option></select>
      <hr style="width:500px;">
      <custom-select
        :data="[
          {id: 1, name: 'option 1'},
          {id: 2, name: 'option 2'},
          {id: 3, name: 'option 3'},
        ]"
      ></custom-select>
    </div>
  `
})
  .mount('#app')
;
