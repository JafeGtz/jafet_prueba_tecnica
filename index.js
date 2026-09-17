import { AppRegistry } from 'react-native';
import { App } from './src/app/App';
import { bootstrap } from './src/app/bootstrap';
import { name as appName } from './app.json';

bootstrap();

AppRegistry.registerComponent(appName, () => App);
