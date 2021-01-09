import { App } from 'vue';
import { ElRow, ElCol, ElCheckbox, ElRadio, ElRadioGroup, ElRadioButton, ElColorPicker, ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton, ElButtonGroup, ElContainer, ElHeader, ElFooter, ElAside, ElMain, ElCard, ElSpace, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus';
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
  ElCheckbox,
  ElRow,
  ElCol
]

export default (app: App) => {
  components.forEach(item => app.component(item.name,item));
}
