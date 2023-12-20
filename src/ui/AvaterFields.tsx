import colors from '@utils/colors';
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import EnrypoIcon from 'react-native-vector-icons/Entypo';

interface Props {
  source?: string;
}

const avaterSize = 70

const AvaterFields: FC<Props> = ({source}) => {
  return (
    <View >
      {source ? (
        <Image source={{uri: source}} style={styles.avaterImage} />
      ) : (
        <View style={styles.avaterImage}>
          <EnrypoIcon name="mic" size={30} color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avaterImage: {
    width: avaterSize,
    height: avaterSize,
    borderRadius: avaterSize / 2,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONSTRACT
  },
});

export default AvaterFields;
