import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
      },
    },
  ),
);

export default Routes;
