import {
  Navigation
} from "react-native-navigation";
import {
  registerScreens
} from "./src/screen/RegisterScreens";
import stores from "./src/store";
import Provider from "./src/utils/MobxRnnProvider";
import { values, color, config } from './src/config'
import screenId from "./src/config/screenId";
// console.disableYellowBox = true;
registerScreens(stores, Provider);

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: "SplashScreen",
//     // screen: 'LoginScreen',
//     title: "",
//     navigatorStyle: {
//       navBarHidden: true
//     }
//   }
// });
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'SplashScreen'
      }
    },
  });
});

export function showLogin() {
  Navigation.setRoot({
    root: {
      stack: {
        id: "AppRoot",
        children: [{
          
          component: {
            name: "ForgotPasswordScreen",
            options: {
              topBar: {
                visible: false,
              },
            }
          },
          component: {
            name: "RegisterScreen",
            options: {
              topBar: {
                visible: false,
              },
            }
          },
          
          component: {
            id: "App",
            name: "LoginScreen",
            options: {
              topBar: {
                visible: false,
              },
            }
          },
        }]
      }
    
     
    }
  });
  // Navigation.startSingleScreenApp({
  //   screen: {
  //     screen: "LoginScreen",
  //     title: "",
  //     navigatorStyle: {
  //       // navBarHidden: true
  //     }
  //   }
  // });
}

export function toggleNavBar(type) {
  // Navigation.toggleNavBar({
  //   to: 'hidden', // required, 'hidden' = hide navigation bar, 'shown' = show navigation bar
  //   animated: false // does the toggle have transition animation or does it happen immediately (optional). By default animated: true
  // });
}

export function hiddenPopup() {
  Navigation.dismissLightBox()
};

export function showPopup() {
  Navigation.showLightBox({
    screen: 'PopupTarget', // unique ID registered with Navigation.registerScreen
    passProps: {
      // onClose: Navigation.dismissLightBox()
    }, // simple serializable object that will pass as props to the lightbox (optional)
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 0.7,
      tapBackgroundToDismiss: true
    },
  });
}

export function showApp() {
  // start the app
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: "sideMenu",
        left: {
          component: {
            id: "Drawer",
            name: "MenuScreen"
          }
        },
        center: {
          stack: {
            id: "AppRoot",
            children: [{
              component: {
                name: "NotificationScreen",
                options: {
                  topBar: {
                    visible: false,
                  },
                }
              },

              component: {
                name: "FinishOrder",
                options: {
                  topBar: {
                    visible: false,
                  },
                }
              },
              component: {
                name: "ConfirmOrder",
                options: {
                  topBar: {
                    visible: false,
                  },
                }
              },
              
              component: {
                id: "App",
                name: "HomeMainScreen",
                options: {
                  topBar: {
                    visible: false,
                  },
                }
              },
            }]
          }
        }
      }
    }
  });
  // Navigation.startSingleScreenApp({
  //   screen: {
  //     screen: 'HomeMainScreen', // unique ID registered with Navigation.registerScreen
  //     title: 'Đơn hàng', // title of the screen as appears in the nav bar (optional)
  //   },
  //   drawer: {
  //     left: {
  //       screen: 'MenuScreen',
  //     },
  //     animationType: 'door',
  //     disableOpenGesture: true
  //   },

  //   appStyle: {
  //     forceTitlesDisplay: true,
  //     hideBackButtonTitle: true,
  //     // orientation: "portrait", // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
  //     statusBarHidden: false,
  //     navBarButtonColor: 'white',
  //     navBarTitleTextCentered: true,
  //     navBarNoBorder: true,
  //     navBarSubtitleFontSize:16,
  //     navBarHidden: true,

  //     // navigationBarColor: color.primaryColor,
  //     navBarBackgroundColor: color.primaryColor,
  //     navBarTextColor: 'white',
  //     initialTabIndex: 0,
  //   },
  //   animationType: "none"
  // });
}
