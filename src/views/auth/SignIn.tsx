import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AuthStackParamList} from '@src/@types/navigation';
import client from '@src/api/Client';
import {FormikHelpers} from 'formik';
import {updateLoggedInState, updateProfile} from '@src/store/auth';
import {useDispatch} from 'react-redux';
import {keys, saveToAsyncStorage} from '@utils/asyncStorage';
import catchAsyncError from '@src/api/catchError';
import { updateNotification } from '@src/store/notification';

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .required('Password is required!'),
});

interface Props {}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    // we want to send this information to our api
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/sign-in', {...values});

      await saveToAsyncStorage(keys.AUTH_TOKEN, data.token);

      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      dispatch(updateNotification({message: errorMessage, type: 'error'}))
    }
    actions.setSubmitting(false);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer heading="Welcome back!">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />
          <SubmitBtn title="Sign in" />

          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign up"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignIn;
