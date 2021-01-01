import { App } from 'vue';
import { ElButton, ElButtonGroup, ElContainer, ElHeader, ElFooter, ElAside, ElMain, ElCard, ElSpace } from 'element-plus';
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
]

export default (app: App) => {
  components.forEach(item => app.use(item));
}
