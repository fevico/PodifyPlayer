import { useNavigation } from '@react-navigation/native';
import {historyAudio} from '@src/@types/audio';
import {getClient} from '@src/api/Client';
import {useFetchHistories} from '@src/hooks/query';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQueryClient} from 'react-query';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading} = useFetchHistories();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const navigate = useNavigation()

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    await client.delete('/history?histories=' + JSON.stringify(histories));
    queryClient.invalidateQueries({queryKey: ['histories']});
  };

  const handleSingleHistoryRemove = async (history: historyAudio) => {
    await removeHistories([history.id]);
  };

  const handleMultipleHistoryRemove = async (history: historyAudio) => {
    setSelectedHistories([]);
    await removeHistories([...selectedHistories]);
  };

  const handleOnLongPress = (history: historyAudio) => {
    setSelectedHistories([history.id]);
  };

  const handleOnPress = (history: historyAudio) => {
    setSelectedHistories((old) =>{
        if(old.includes(history.id)){
           return old.filter((item)=> item !== history.id)
        }

        return [...old, history.id]
    });
  };

  useEffect(()=>{
    const unselectHistories = () =>{
        setSelectedHistories([])
    }
    navigate.addListener('blur', unselectHistories)
    return () => {
        navigate.removeListener('blur', unselectHistories)
    }
  }, [])

  if (isLoading) return <AudioListLoadingUi />;

  if (!data || !data[0]?.audios.length)
    return <EmptyRecords title="There is no history!" />;

  return (
    <>
      {selectedHistories.length ? (
        <Pressable onPress={handleMultipleHistoryRemove} style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      ) : null}
      <ScrollView style={styles.container}>
        {data.map((item, mainIndex) => {
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
                      style={[styles.history, {
                        backgroundColor: selectedHistories.includes(audio.id) ? colors.INACTIVE_CONSTRACT : colors.OVERLAY
                      }]}>
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
  removeBtnText: {},
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
