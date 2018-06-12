// full code here --> https://github.com/bizz84/redux-navigation-color-picker
import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../components/AppNavigator';

const router = AppNavigator.router;
const mainNavAction = router.getActionForPathAndParams('StartUI');
const initialNavState = router.getStateForAction(mainNavAction);

const navReducer = (state = initialNavState, action) => {
  return router.getStateForAction(action, state);
};

export default navReducer;
