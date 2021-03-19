import React from 'react';
import { View, Image } from 'react-native';

const Dumper = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 50;

  return (
    <View
      style={{
        position: 'absolute',
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
        zIndex:1
      }}>
      <Image
        source={require('../dumper.png')}
        resizeMethod="resize"
        resizeMode="contain"
        style={{
          alignSelf: 'center',
          width:100,
          height:100,
        }}
      />
    </View>
  );
};

export default Dumper;
