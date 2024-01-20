import AudioListModal from '@ui/AudioListModal';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';

interface Props{
    visible: boolean;
    onRequestClose(): void
}

const CurrentAudioList: FC<Props> = ({visible, onRequestClose}) =>{
return <View style={styles.container}>
    <AudioListModal visible={visible} onRequestClose={onRequestClose} header='Audios on the way'/>
</View>;
};

const styles = StyleSheet.create({
container: {},
});

export default CurrentAudioList;