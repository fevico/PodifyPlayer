import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import PulseAnimationCointainer from './PulseAnimationCointainer'
import colors from '@utils/colors';

interface Props {
    items?: number
}

const AudioListLoadingUi: FC<Props> = ({items =8}) =>{
    const dummyData = new Array(items).fill('');

    return <PulseAnimationCointainer>
        <View>
            {dummyData.map((_, index) => {
                return <View key={index} style={styles.dumyListItem}/>
            })}
        </View>
    </PulseAnimationCointainer>
};

const styles = StyleSheet.create({
    container: { },
    dumyListItem:{
        height: 50,
        width: '100%',
        backgroundColor: colors.INACTIVE_CONSTRACT,
        borderRadius: 5,
        marginBottom: 15
    }
  });

export default AudioListLoadingUi;