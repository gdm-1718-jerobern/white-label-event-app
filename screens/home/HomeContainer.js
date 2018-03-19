// @flow
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './HomeScreen';
import { PersonalScheduleButton, SchedulePagination } from '../../components';
import events from '../../assets/events.json';
import tracks from '../../assets/tracks.json';
import { sortByDate } from '../../utils/sort';
import { TNavigation } from '../../types/navigation';
import type { TEvents } from '../../types/eventdata';
import type { TTracks } from '../../types/trackdata';
import type { TScreenProps } from '../../types/screenprops';
import { PERSONAL_SCHEDULE, LOGIN } from '../../screens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  navigation: TNavigation,
  screenProps: TScreenProps,
};
const eventData: TEvents = events;
const trackData: TTracks = tracks;

export default class HomeContainer extends Component<Props> {
  get trackSessions() {
    return trackData.map((track) => {
      const trackSessions = eventData.filter(session =>
        session.tags.some(sessionTrack => sessionTrack.id === track.id),
      );
      const sortedTrackSessions = sortByDate(trackSessions);
      return {
        id: track.id,
        tracks: sortedTrackSessions,
      };
    });
  }

  navigateToLogin = () => this.props.navigation.navigate(LOGIN);

  navigateToPersonalSchedule = () => this.props.navigation.navigate(PERSONAL_SCHEDULE);

  handleTouchableTap = (destination, total, index) => {
    if (index + destination >= 0 && index + destination < total) {
      this.swiperRef.scrollBy(destination, true);
    }
  };

  handleScheduleButtonPress = () => {
    this.navigateToPersonalSchedule();
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          showsButtons={false}
          loop={false}
          removeClippedSubviews={false}
          ref={(el) => {
            this.swiperRef = el;
          }}
          renderPagination={(index, total) => (
            <SchedulePagination
              index={index}
              total={total}
              tracks={trackData}
              onNextTap={this.handleTouchableTap}
              onLongPress={this.props.screenProps.handleStorybookGesture}
            />
          )}
        >
          {trackData.map((track, i) => {
            const currTrackSessions = this.trackSessions.find(
              currTrack => track.id === currTrack.id,
            );
            return (
              <HomeScreen
                key={track.id}
                trackName={track.title}
                trackId={track.id}
                events={currTrackSessions.tracks}
              />
            );
          })}
        </Swiper>
        <PersonalScheduleButton handleScheduleButtonPress={this.handleScheduleButtonPress} />
      </View>
    );
  }
}
