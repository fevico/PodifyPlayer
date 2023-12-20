import BasicModalContainer from '@ui/BasicModalContainer';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Playlist} from '@src/@types/audio';

interface Props {
  visible: boolean;
  onRequestCose(): void;
  list: Playlist[];
  onCreateNewPress(): void;
  onPlaylistPress(item: Playlist): void
}

interface ListItemProps {
  title: string;
  icon: ReactNode;
  onPress?(): void
}

const ListItem: FC<ListItemProps> = ({title, icon, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};

const PlaylistModal: FC<Props> = ({visible, list, onPlaylistPress, onCreateNewPress, onRequestCose}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestCose}>
      {/* we want to render playlist  */}
      <ScrollView>
        {list.map(item => {
          return (
            <ListItem 
            onPress={()=> onPlaylistPress(item)}
              key={item.id}
              icon={
                <FontAwsomeIcon
                  size={20}
                  name={item.visibility === 'public' ? 'globe' : 'lock'}
                  color={colors.PRIMARY}
                />
              }
              title={item.title}
            />
          );
        })}
      </ScrollView>
      {/* create new playlist button */}

      <ListItem
        icon={<AntDesign size={20} name="plus" color={colors.PRIMARY} />}
        title="Create New"
        onPress={onCreateNewPress}
      />
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center', height: 45}}>
        <Text style={{fontSize: 16, color: colors.PRIMARY, marginLeft: 5}}>
          Create new
        </Text>
      </Pressable>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  listItemTitle: {fontSize: 16, color: colors.PRIMARY, marginLeft: 5},
});

export default PlaylistModal;
