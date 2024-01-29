import {useNavigation} from '@react-navigation/native';
import {History, historyAudio} from '@src/@types/audio';
import {getClient} from '@src/api/Client';
import {useFetchHistories} from '@src/hooks/query';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useMutation, useQueryClient} from 'react-query';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading, isFetching} = useFetchHistories();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const navigate = useNavigation();
  const noData = !data?.length;


  const removeMutate = useMutation({
    mutationFn: async histories => removeHistories(histories),
    onMutate: (histories: string[]) => {
      queryClient.setQueryData<History[]>(['histories'], oldData => {
        let newData: History[] = [];
        if (!oldData) return newData;

        for (let data of oldData) {
          const filterd = data.audios.filter(
            item => !histories.includes(item.id),
          );
          if (filterd.length) {
            newData.push({date: data.date, audios: filterd});
          }
        }
        return newData;
      });
    },
  });

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    await client.delete('/history?histories=' + JSON.stringify(histories));
    queryClient.invalidateQueries({queryKey: ['histories']});
  };

  const handleSingleHistoryRemove = async (history: historyAudio) => {
    removeMutate.mutate([history.id]);
  };

  const handleMultipleHistoryRemove = async () => {
    setSelectedHistories([]);
    removeMutate.mutate([...selectedHistories]);
  };

  const handleOnLongPress = (history: historyAudio) => {
    setSelectedHistories([history.id]);
  };

  const handleOnPress = (history: historyAudio) => {
    setSelectedHistories(old => {
      if (old.includes(history.id)) {
        return old.filter(item => item !== history.id);
      }

      return [...old, history.id];
    });
  };

  const handleOnRefresh = () =>{
    queryClient.invalidateQueries({queryKey: ['histories']});
  }

  useEffect(() => {
    const unselectHistories = () => {
      setSelectedHistories([]);
    };
    navigate.addListener('blur', unselectHistories);
    return () => {
      navigate.removeListener('blur', unselectHistories);
    };
  }, []);

  if (isLoading) return <AudioListLoadingUi />;

  return (
    <>
      {selectedHistories.length ? (
        <Pressable
          onPress={handleMultipleHistoryRemove}
          style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      ) : null}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleOnRefresh}
            tintColor={colors.CONSTRACT}
          />
        }
        style={styles.container}>
            {noData ? <EmptyRecords title="There is no history!" /> : null }
        {data?.map((item, mainIndex) => {
          return (
            <View key={item.date + mainIndex}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.listContainer}>
                {item.audios.map((audio, index) => {
                  return (
                    <Pressable
                      onLongPress={() => handleOnLongPress(audio)}
                      onPress={() => handleOnPress(audio)}
                      key={audio.id + index}
                      style={[
                        styles.history,
                        {
                          backgroundColor: selectedHistories.includes(audio.id)
                            ? colors.INACTIVE_CONSTRACT
                            : colors.OVERLAY,
                        },
                      ]}>
                      <Text style={styles.historyTitle}>{audio.title}</Text>
                      <Pressable
                        onPress={() => handleSingleHistoryRemove(audio)}>
                        <AntDesign name="close" color={colors.CONSTRACT} />
                      </Pressable>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  removeBtn: {
    padding: 10,
    alignSelf: 'flex-end',
    color: colors.CONSTRACT,
  },
  removeBtnText: {
    color: colors.CONSTRACT,
  },
  date: {
    color: colors.SECONDARY,
  },
  listContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  historyTitle: {
    color: colors.CONSTRACT,
    paddingHorizontal: 5,
    fontWeight: '700',
    flex: 1,
  },

  history: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OVERLAY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default HistoryTab;
