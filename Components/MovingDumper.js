import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Dumper from './Dumper';

export default function MovingDumper() {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const birdBottom = 95;
  const [birdLeft, setBirdLeft] = useState(0);

  const gravity = 3;
  let gameTimerId;

  //start bird falling

  useEffect(() => {
    if (birdLeft < screenWidth) {
      gameTimerId = setInterval(() => {
        setBirdLeft((birdLeft) => birdLeft + gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    } else {
      setBirdLeft(0);
    }
  }, [birdLeft]);

  return (
    <TouchableWithoutFeedback>
    <>
      <View style={styles.container}>
        <Dumper birdBottom={birdBottom} birdLeft={birdLeft} />
      </View>
      <View
        style={{
          position: 'absolute',
          width: screenWidth,
          height: 50,
          backgroundColor: "#4d3319",
          left: 0,
          bottom:0,
        }}
      />
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
