import {useFetchRecentlyPlayed} from '@src/hooks/query';
import useAudioController from '@src/hooks/useAudioController';
import { getPlayerState } from '@src/store/player';
import GridView from '@ui/GridView';
import PulseAnimationCointainer from '@ui/PulseAnimationCointainer';
import RecentlyPlayedCard from '@ui/RecentlyPlayedCard';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';

interface Props {}

const dummyData = new Array(4).fill('');

const RecentlyPlayed: FC<Props> = props => {
  const {data = [], isLoading} = useFetchRecentlyPlayed();
  const {onAudioPress} = useAudioController()
  const {onGoingAudio} = useSelector(getPlayerState)
  if(isLoading)
  return (
    <PulseAnimationCointainer>
        <View style={styles.dummyTitleView} />
      <GridView
        data={dummyData}
        renderItem={() => {
          return (
            <View
              style={{
                height: 50,
                backgroundColor: colors.INACTIVE_CONSTRACT,
                borderRadius: 5,
                marginBottom: 10,
              }}
            />
          );
        }}
      />
    </PulseAnimationCointainer>
  );

  if(!data.length) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>
      <GridView
        data={data}
        renderItem={item => {
          return (
            <View key={item.id} style={styles.listStyle}>
              <RecentlyPlayedCard
                title={item.title}
                poster={item.poster}
                onPress={() => onAudioPress(item, data)}
                isPlaying={onGoingAudio?.id === item.id}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONSTRACT,
    marginBottom: 15,
    borderRadius: 5,
  },
  title: {
    color: colors.CONSTRACT,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listStyle: {
    marginBottom: 10,
  },
});

export default RecentlyPlayed;
