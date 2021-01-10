import { App } from 'vue';
import ButtonProperty from "./ButtonProperty";
import CardProperty from "./CardProperty";

const components = [
  ButtonProperty,
  CardProperty
]

export default (app: App) => {
  components.forEach(item => app.component(item.name, item));
}
