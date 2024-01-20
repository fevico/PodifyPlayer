import { getPlayerState } from '@src/store/player';
import AppLink from '@ui/AppLink';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text, ViewBase, Pressable} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';

interface Props{
    visible: boolean,
    closeHandler(state: boolean): void
}

const AudioinfoContainer: FC<Props> = ({visible, closeHandler}) =>{
    const {onGoingAudio} = useSelector(getPlayerState)
    if(!visible) return null;

    const handleClose = () =>{
        closeHandler(!visible)
    }

return <View style={styles.container}>
        <Pressable style={styles.closeBtn} onPress={handleClose}>
            <AntDesign name='close' color={colors.CONSTRACT} size={24}/>
        </Pressable>
    <ScrollView>
        <View>
        <Text style={styles.title}>{onGoingAudio?.title}</Text>
        <View style={styles.ownerInfo}>
            <Text style={styles.title}>Creator:{} </Text>
            <AppLink title={onGoingAudio?.owner.name || ''} />
        </View>
        <Text style={styles.about}>{onGoingAudio?.about}</Text>
        </View>
    </ScrollView>
</View>;
};

const styles = StyleSheet.create({
container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.PRIMARY,
    zIndex: 1,
    padding: 10,
},
closeBtn:{
    alignSelf: 'flex-end',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
},
title:{
    fontSize: 18,
    color:colors.CONSTRACT,
    fontWeight: 'bold',
    paddingVertical: 5,
},
about: {
    fontSize: 16,
    color:colors.CONSTRACT,
    paddingVertical: 5, 
},
ownerInfo:{
    flexDirection: 'row',
    alignItems: 'center',
},
});

export default AudioinfoContainer;