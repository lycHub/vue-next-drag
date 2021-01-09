import { App } from 'vue';
import ButtonProperty from "./ButtonProperty";

const components = [
  ButtonProperty,
]

export default (app: App) => {
  components.forEach(item => app.component(item.name, item));
}
