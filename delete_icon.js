const deleteIcon = {
  name: 'delete-icon',
  emits: ['clickHandle'],
  template: /*html*/`
	<img
	  style="cursor:pointer;"
	  src="images/b_drop.png"
	  @click="$emit('clickHandle', $event, {data: 'ok'})"
	/>
  `
}

const app = Vue.createApp({
  setup() {
    return {
      clickHandle(e, payload) {
        console.log(e);
        console.log(payload);
      }
    }
  },
  
  template: /*html*/`
    <delete-icon @click-handle="clickHandle"></delete-icon>
  `
});

[ deleteIcon ].forEach(component => {
  app.component(component.name, component);
});
app.mount('#app');
