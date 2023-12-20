import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';

interface Props {
    visible?: boolean;
    onRequestClose?(): void
    children: ReactNode
}

const BasicModalContainer: FC<Props> = ({visible, children, onRequestClose}) => {
  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={styles.modelContainer}>
        <Pressable onPress={onRequestClose} style={styles.backdrop} />

        <View style={styles.model}>
            {children}
        </View>
      </View>
    </Modal> 
  );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.INACTIVE_CONSTRACT,
        zIndex: -1
      },
      modelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparet',
        zIndex: 1
      },
      model: {
        width: '90%',
        maxHeight: '50%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.CONSTRACT,
      },
    });

export default BasicModalContainer;
