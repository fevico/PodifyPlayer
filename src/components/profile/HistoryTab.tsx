import { useFetchHistories } from '@src/hooks/query';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import colors from '@utils/colors';
import { FC } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {}

const HistoryTab: FC<Props> = (props) =>{
    const {data, isLoading} = useFetchHistories();

    if(isLoading) return <AudioListLoadingUi/>

    if (!data || !data[0]?.audios.length) return <EmptyRecords title="There is no history!" />;
    
    return <ScrollView style={styles.container}>
        {data.map((item, mainIndex)=>{
            return <View key={item.data + mainIndex}>
        <Text style={styles.date}>{item.data}</Text>
        <View style={styles.listContainer}>
        {item.audios.map((audio, index)=>{
            return <View key={audio.id + index} style={styles.history}>
                <Text style={styles.historyTitle}>{audio.title}</Text>
                <Pressable>
                    <AntDesign name="close" color={colors.CONSTRACT}/>
                </Pressable>
            </View>
        })}
        </View>
        
        </View>
        })}
    </ScrollView>
};

const styles = StyleSheet.create({
    container: { },
    date:{
        color: colors.SECONDARY
    },
    listContainer:{
        marginTop:10,
        paddingLeft: 10,
    },
    historyTitle:{
        color: colors.CONSTRACT,
        paddingHorizontal: 5,
        fontWeight: '700',
        flex: 1
    },

    history:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.OVERLAY,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    }
  });

export default HistoryTab;