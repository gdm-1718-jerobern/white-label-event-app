import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationItem from './navigationItem';
import Metrics from '../config/gridSizes';

const GLOBALS = {
  itemWidth: Metrics.gridSize * 28,
  marginHorizontal: Metrics.gridSize * 3,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: GLOBALS.itemWidth * 3,
    flexDirection: 'row',
    position: 'absolute',
    top: Metrics.gridSize * 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SchedulePagination = ({ index, total, tracks }) => (
  <View style={styles.container}>
    {
      tracks[index - 1] ?
        <NavigationItem title={tracks[index - 1].title} position={'left'} /> :
        <NavigationItem title={''} position={'left'} />
    }
    <NavigationItem title={tracks[index].title} position={'middle'} />
    {
      tracks[index + 1] ?
        <NavigationItem title={tracks[index + 1].title} position={'right'} /> :
        <NavigationItem title={''} position={'right'} />
    }
  </View>
);

export default SchedulePagination;
