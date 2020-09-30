import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
// user BrowserHistory
import {createBrowserHistory} from 'history';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
// 1. Initialize
const app = dva({
    history: createBrowserHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


export default app._store; // eslint-disable-line