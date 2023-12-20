import {FC, ReactNode, useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: ReactNode;
}

const PulseAnimationCointainer: FC<Props> = ({children}) => {
  const oppacitySharedValue = useSharedValue(1);

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: oppacitySharedValue.value,
    };
  });

  useEffect(() => {
    oppacitySharedValue.value = withRepeat(
      withTiming(0.3, {duration: 1000}),
      -1, true
    );
  }, []);

  return <Animated.View style={opacity}>{children}</Animated.View>;
};

export default PulseAnimationCointainer;
