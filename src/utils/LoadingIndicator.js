import React, { Component } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

class LoadingIndicator extends Component {
  render() {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          style={[styles.centering, { transform: [{ scale: 1 }] }]}
          size="large"
          color={this.props.color || "white"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: 'transparent',
  }
});

export default LoadingIndicator;
