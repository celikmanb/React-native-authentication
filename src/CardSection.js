import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.subContainerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  subContainerStyle: {
    borderBottomWidth: 0.5,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
};

export default CardSection;
