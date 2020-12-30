import { App } from 'vue';
import { ElButton, ElButtonGroup } from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/lib/locale';
import 'dayjs/locale/zh-cn';

locale.use(lang);

export default (app: App) => {

  app.use(ElButtonGroup);
  app.use(ElButton);
}
