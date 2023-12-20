import colors from '@utils/colors';
import {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  ref: any;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONSTRACT}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    textAlign: 'center',
    color: colors.CONSTRACT,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});

export default OTPField;
