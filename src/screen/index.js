import SplashScreen from './splashScreen/SplashScreen'

//luồng login
import LoginScreen from './account/login/LoginScreen'
import ChangePasswordScreen from './account/changePassword/ChangePasswordScreen';
import ForgotPasswordScreen from './account/forgotPassword/ForgotPasswordScreen';
import RegisterScreen from './account/register/RegisterScreen';
import TypeCareModal from './account/register/TypeCareModal';
import ItemFlatListTypeCar from './account/register/ItemFlatListTypeCar';
import AlerWarningRigister from './account/register/AlerWarningRigister'
//luồng home
import HomeMainScreen from './home/homeMain/HomeMainScreen'
import MarkerMeView from './home/map/MarkerMeView'
import EnterAddressScreen from './home/enterAddress/EnterAddressScreen';
// import FinddingCarScreen from './home/FinddingCarScreen';
// import BeingDeliveredScreen from './home/BeingDeliveredScreen';

//menu
import MenuScreen from './menu/MenuScreen';
import ProfileScreen from './profile/ProfileScreen';
import EditProfileScreen from './profile/EditProfileScreen';

import GuideScreen from './guide/GuideScreen';

import HistoryTransactionScreen from './historyTransaction/HistoryTransactionScreen';
import HistoryTransactionDetailScreen from './historyTransaction/HistoryTransactionDetailScreen';

import NotificationScreen from './notification/NotificationScreen';
import NotificaionDetailScreen from './notification/NotificaionDetailScreen';
// import FindCarScreen from './home/homeMain/FindCarScreen';
import ButtonRightSwitch from '../component/ButtonRightSwitch'

import AnimationMap from '../component/toatoaAbc'
import ConfirmOrder from '../screen/home/ConfirmOrder'
import FinishOrder from '../screen/home/FinishOrder'
import OrderDetail from '../screen/home/OrderDetail'



export {
    SplashScreen,
    // Right botton

    ButtonRightSwitch, AlerWarningRigister,
    //luồng login

    LoginScreen, ChangePasswordScreen, ForgotPasswordScreen, RegisterScreen,
    TypeCareModal, ItemFlatListTypeCar,

    //luồng Home
    HomeMainScreen, EnterAddressScreen, ConfirmOrder, FinishOrder,
    // BeingDeliveredScreen, FinddingCarScreen,
    MarkerMeView,
    //menu
    MenuScreen, ProfileScreen, EditProfileScreen, GuideScreen, HistoryTransactionScreen, HistoryTransactionDetailScreen, NotificationScreen, NotificaionDetailScreen,OrderDetail,
    // FindCarScreen,
    //animation
    AnimationMap
}