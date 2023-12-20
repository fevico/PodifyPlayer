import {Playlist} from '@src/@types/audio';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

interface Props {
  playlist: Playlist;
  onPress?(): void
}

const PlaylistItem: FC<Props> = ({playlist, onPress}) => {
  const {id, itemsCount, title, visibility} = playlist;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.posterContainer}>
        <MaterialComIcon
          name="playlist-music"
          size={30}
          color={colors.CONSTRACT}
        />
      </View>
      <View style={styles.contentCointainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          <FontAwsomeIcon
            name={visibility === 'public' ? 'globe' : 'lock'}
            color={colors.SECONDARY}
            size={15}
          />
          <Text style={styles.count}>{itemsCount} {itemsCount > 1 ? "audios" : 'audio'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
  },
  posterContainer: {
    backgroundColor: colors.OVERLAY,
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.CONSTRACT,
    fontWeight: 'bold',
  },
  contentCointainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  count:{
    color: colors.SECONDARY,
    fontWeight: 'bold',
    marginLeft: 5
  },
  iconContainer:{
    flexDirection: 'row',
    paddingTop: 4,
  }
});

export default PlaylistItem;
