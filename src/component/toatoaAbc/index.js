import React, { Component } from 'react';
import {
  Text,
  View,
  Animated
} from 'react-native';



class Page extends Component {
  constructor(props) {
    super(props);
    let obj = {}
    for (let index = 0, n = props.numberView || 3; index < n; index++) {
      obj[`fade${index}`] = new Animated.Value(0)

    }
    this.state = obj
    this.showNotifyBottom = this.showNotifyBottom.bind(this)
  }

  componentWillMount() {
    let delay = this.props.delay || 500
    let duration = this.props.duration || 2000
    let iterations = this.props.iterations || true
    this.showNotifyBottom(duration, delay, iterations)
  }

  showNotifyBottom(duration, delay, iterations) {

    let arrTmp = []
    for (let index = 0, n = this.props.numberView || 3; index < n; index++) {
      arrTmp.push(Animated.timing(                  // Animate over time
        this.state[`fade${index}`],            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: duration,
          delay: index * delay     // Make it take a while
        }
      ))
    }
    Animated.loop(
      Animated.parallel(arrTmp), {
        iterations: iterations
      }
    ).start()
  }

  render() {
    let children = this.props.children || <Text>{this.props.text}</Text>//truyen text vao
    let colors = this.props.colors || 'black'
    let width = this.props.width || 250
    let opacity = this.props.opacity || 0.5
    let n = this.props.numberView || 3
    let arrTmp = []
    for (let index = 0; index < n; index++) {
      arrTmp.push(
        <Animated.View key={index} style={{
          height: this.state[`fade${index}`].interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
          }),
          width: this.state[`fade${index}`].interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
          }),
          opacity: this.state[`fade${index}`].interpolate({
            inputRange: [0, 1],
            outputRange: [opacity, 0]
          }),
          backgroundColor: colors,
          zIndex: index + 1,
          position: "absolute",
          borderRadius: 200
        }} />
      )
    }
    let { styleCustom } = this.props
    return (
      <View style={{
        width: width,
        height: width,
        alignItems: "center",
        justifyContent: "center"
      }} >
        {styleCustom && <Animated.View style={[{
          height: this.state[`fade0`].interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
          }),
          width: this.state[`fade0`].interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
          }),
          zIndex: -1,
          borderRadius: width

        }, styleCustom]} />}
        {arrTmp}
        <View style={{
          zIndex: n + 1,
          position: "absolute"
        }}>
          {children}
        </View>
      </View>
    );
  }
}



export default Page
