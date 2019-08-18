import { StyleSheet } from 'react-native';
import { values, color } from '../../config'
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.primaryColor,
    justifyContent: 'center',
  },
  logo: { height: values.deviceWidth * 0.45, width: values.deviceWidth * 0.45, resizeMode: 'contain',backgroundColor:"#fff" },
  version: { width: values.deviceWidth - 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end', },
  textVersion: { textAlign: 'right', fontSize: 10, fontWeight: 'bold', backgroundColor: 'transparent', color: 'white' },
  textDisconnect: {
    color: '#000',
    backgroundColor: '#fff',
    marginTop: 7,
    paddingVertical: 7,
    paddingHorizontal: 7,
    marginHorizontal: 10,
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: 3,
    position: 'absolute',
    bottom: values.isIphoneX ? 35 : 15,
  }
});
