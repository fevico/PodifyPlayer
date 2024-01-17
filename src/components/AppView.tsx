import {FC, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import MiniAudioPlayer from './MiniAudioPlayer';
import useAudioController from '@src/hooks/useAudioController';

interface Props {
  children: ReactNode;
}

const AppView: FC<Props> = ({children}) => {
  const {isPalyerReady} = useAudioController();
  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      {isPalyerReady ? <MiniAudioPlayer /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  children: {
    flex: 1,
  },
});

export default AppView;
