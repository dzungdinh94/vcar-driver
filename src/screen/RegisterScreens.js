import {
  Navigation
} from "react-native-navigation";
import React from "react";
import {
  SplashScreen,
  LoginScreen, ChangePasswordScreen, ForgotPasswordScreen, RegisterScreen,
  EnterPhoneScreen,
  HomeMainScreen,
  HomeScreen, EnterAddressScreen,
  MarkerMeView,
  AlerWarningRigister,
  // BeingDeliveredScreen, FinddingCarScreen,
  MenuScreen, ProfileScreen, EditProfileScreen, GuideScreen, HistoryTransactionScreen,
  // FindCarScreen,
  ButtonRightSwitch, ConfirmOrder,
  HistoryTransactionDetailScreen, NotificationScreen, NotificaionDetailScreen, ConfirmLoginScreen, TypeCareModal,
  OrderDetail
} from './index'
import FinishOrder from "./home/FinishOrder";
import ItemFlatListTypeCar from "./account/register/ItemFlatListTypeCar";
import { Provider } from 'mobx-react/native';
export function registerScreens(store) {
  Navigation.registerComponent("SplashScreen",  () => (props) => (
    <Provider {...store}>
      <SplashScreen {...props} />
    </Provider>
  ),() => SplashScreen)
  Navigation.registerComponent("LoginScreen",() => (props) => (
    <Provider {...store}>
      <LoginScreen {...props} />
    </Provider>
  ), () => LoginScreen)
  Navigation.registerComponent("ChangePasswordScreen",() => (props) => (
    <Provider {...store}>
      <ChangePasswordScreen {...props} />
    </Provider>
  ), () => ChangePasswordScreen)
  Navigation.registerComponent("ForgotPasswordScreen",() => (props) => (
    <Provider {...store}>
      <ForgotPasswordScreen {...props} />
    </Provider>
  ), () => ForgotPasswordScreen)
  Navigation.registerComponent("RegisterScreen",() => (props) => (
    <Provider {...store}>
      <RegisterScreen {...props} />
    </Provider>
  ), () => RegisterScreen)
  Navigation.registerComponent("AlerWarningRigister",() => (props) => (
    <Provider {...store}>
      <AlerWarningRigister {...props} />
    </Provider>
  ), () => AlerWarningRigister)


  Navigation.registerComponent("EnterPhoneScreen",() => (props) => (
    <Provider {...store}>
      <EnterPhoneScreen {...props} />
    </Provider>
  ), () => EnterPhoneScreen)
  Navigation.registerComponent("HomeMainScreen",() => (props) => (
    <Provider {...store}>
      <HomeMainScreen {...props} />
    </Provider>
  ), () => HomeMainScreen)

  Navigation.registerComponent("EnterAddressScreen",() => (props) => (
    <Provider {...store}>
      <EnterAddressScreen {...props} />
    </Provider>
  ), () => EnterAddressScreen)

  Navigation.registerComponent("MarkerMeView",() => (props) => (
    <Provider {...store}>
      <MarkerMeView {...props} />
    </Provider>
  ), () => MarkerMeView)

  Navigation.registerComponent("MenuScreen",() => (props) => (
    <Provider {...store}>
      <MenuScreen {...props} />
    </Provider>
  ), () => MenuScreen)
  Navigation.registerComponent("ProfileScreen",() => (props) => (
    <Provider {...store}>
      <ProfileScreen {...props} />
    </Provider>
  ), () => ProfileScreen)
  Navigation.registerComponent("EditProfileScreen",() => (props) => (
    <Provider {...store}>
      <EditProfileScreen {...props} />
    </Provider>
  ), () => EditProfileScreen)
  Navigation.registerComponent("GuideScreen",() => (props) => (
    <Provider {...store}>
      <GuideScreen {...props} />
    </Provider>
  ), () => GuideScreen)
  Navigation.registerComponent("HistoryTransactionScreen",() => (props) => (
    <Provider {...store}>
      <HistoryTransactionScreen {...props} />
    </Provider>
  ), () => HistoryTransactionScreen)
  Navigation.registerComponent("HistoryTransactionDetailScreen",() => (props) => (
    <Provider {...store}>
      <HistoryTransactionDetailScreen {...props} />
    </Provider>
  ), () => HistoryTransactionDetailScreen)
  Navigation.registerComponent("NotificationScreen",() => (props) => (
    <Provider {...store}>
      <NotificationScreen {...props} />
    </Provider>
  ), () => NotificationScreen)
  Navigation.registerComponent("NotificaionDetailScreen",() => (props) => (
    <Provider {...store}>
      <NotificaionDetailScreen {...props} />
    </Provider>
  ), () => NotificaionDetailScreen)
  Navigation.registerComponent("ConfirmLoginScreen",() => (props) => (
    <Provider {...store}>
      <ConfirmLoginScreen {...props} />
    </Provider>
  ), () => ConfirmLoginScreen)
  Navigation.registerComponent("ButtonRightSwitch",() => (props) => (
    <Provider {...store}>
      <ButtonRightSwitch {...props} />
    </Provider>
  ), () => ButtonRightSwitch)
  Navigation.registerComponent("ConfirmOrder",() => (props) => (
    <Provider {...store}>
      <ConfirmOrder {...props} />
    </Provider>
  ), () => ConfirmOrder)
  Navigation.registerComponent("FinishOrder",() => (props) => (
    <Provider {...store}>
      <FinishOrder {...props} />
    </Provider>
  ), () => FinishOrder)
  Navigation.registerComponent("TypeCareModal",() => (props) => (
    <Provider {...store}>
      <TypeCareModal {...props} />
    </Provider>
  ), () => TypeCareModal)
  Navigation.registerComponent("ItemFlatListTypeCar",() => (props) => (
    <Provider {...store}>
      <ItemFlatListTypeCar {...props} />
    </Provider>
  ), () => ItemFlatListTypeCar)
  Navigation.registerComponent("OrderDetail",() => (props) => (
    <Provider {...store}>
      <OrderDetail {...props} />
    </Provider>
  ), () => OrderDetail)



}
