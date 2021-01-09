import { App } from 'vue';
import { ElRadio, ElRadioGroup, ElRadioButton, ElColorPicker, ElSlider, ElButton, ElButtonGroup, ElContainer, ElHeader, ElFooter, ElAside, ElMain, ElCard, ElSpace, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/lib/locale';
import 'dayjs/locale/zh-cn';

locale.use(lang);

const components = [
  ElButton,
  ElButtonGroup,
  ElContainer,
  ElHeader,
  ElFooter,
  ElAside,
  ElMain,
  ElCard,
  ElSpace,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElColorPicker,
  ElSlider
]

export default (app: App) => {
  components.forEach(item => app.use(item));
}
