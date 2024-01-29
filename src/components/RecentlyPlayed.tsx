import {useFetchRecentlyPlayed} from '@src/hooks/query';
import GridView from '@ui/GridView';
import PulseAnimationCointainer from '@ui/PulseAnimationCointainer';
import RecentlyPlayedCard from '@ui/RecentlyPlayedCard';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const dummyData = new Array(4).fill('');

const RecentlyPlayed: FC<Props> = props => {
  const {data, isLoading} = useFetchRecentlyPlayed();
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
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>
      <GridView
        data={data || []}
        renderItem={item => {
          return (
            <View key={item.id} style={styles.listStyle}>
              <RecentlyPlayedCard
                title={item.title}
                poster={item.poster}
                onPress={() => {}}
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
