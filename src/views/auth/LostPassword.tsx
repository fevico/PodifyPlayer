import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import {FC} from 'react';
import { StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import { useNavigation , NavigationProp} from '@react-navigation/native';
import { AuthStackParamList } from '@src/@types/navigation';
import { FormikHelpers } from 'formik';
import client from '@src/api/Client';
import catchAsyncError from '@src/api/catchError';
import { updateNotification } from '@src/store/notification';
import { useDispatch } from 'react-redux';


const lostPasswordSchema = yup.object({

  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
});

interface Props {}

interface InitialValue{
  email: string;
}

const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = props => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  
  const handleSubmit = async(values: InitialValue , actions: FormikHelpers<InitialValue>) => {
    // we want to send this information to our api 
    actions.setSubmitting(true)
    try {      
      const {data} = await client.post('/auth/forget-password', 
      {...values}
      )
      console.log(data)

    } catch (error) {
      const errorMessage = catchAsyncError(error)
      dispatch(updateNotification({message: errorMessage, type: 'error'}))
    }
    actions.setSubmitting(false)

  }

  return (
      
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={lostPasswordSchema}>
      <AuthFormContainer
      heading='Forget Password!'
      subheading="Oops, did you forget your Password? Don't worry we'll help you get
      back in."
      >
      <View style={styles.formContainer}>

          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          
          <SubmitBtn title="Send Link" />

          <View style={styles.linkContainer}>
            <AppLink title="Sign in"  onPress={() =>{
              navigation.navigate('SignIn');
            }}
            />

            <AppLink title="Sign up" onPress={() =>{
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

export default LostPassword;