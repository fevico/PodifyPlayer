import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

interface Props{
    size?: number;
    children: ReactNode;
    ignoreContainer?: boolean;
    onPress?():void;
}

const PlayerController: FC<Props> = ({size = 45, children, onPress, ignoreContainer}) =>{
return <Pressable 
onPress={onPress}
    style={{
    width: 45,
    height: 45, 
    borderRadius: size/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ignoreContainer ? 'transparent' : colors.CONSTRACT,
}}>
    {children}
</Pressable>;
};

const styles = StyleSheet.create({
container: {},
});

export default PlayerController;