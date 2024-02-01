import AudioForm from '@components/form/AudioForm';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileNavigationStackParamList } from '@src/@types/navigation';
import { getClient } from '@src/api/Client';
import catchAsyncError from '@src/api/catchError';
import { updateNotification } from '@src/store/notification';
import { mapRange } from '@utils/math';
import {FC, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<ProfileNavigationStackParamList, 'UpdateAudio'>

const UpdateAudio: FC<Props> = (props) =>{
    const {audio} = props.route.params;

    const [uploadProgress, setUploadProgress] = useState(0);
    const [busy, setBusy] = useState(false);

    const queryClient = useQueryClient()
  
    const dispatch = useDispatch();
    const {navigate} = useNavigation<NavigationProp<ProfileNavigationStackParamList>>()
  
    const handleUpdate = async (formData: FormData) => {
      setBusy(true);
      try {
        const client = await getClient({'Content-Type': 'multipart/form-data;'});
  
        const {data} = await client.patch('/audio/'+ audio.id, formData, {
          onUploadProgress(progressEvent) {
            const uploaded = mapRange({
              inputMin: 0,
              inputMax: progressEvent.total || 0,
              outputMin: 0,
              outputMax: 100,
              inputValue: progressEvent.loaded,
            });
  
            if (uploaded >= 100) {
              setBusy(false);
            }
  
            setUploadProgress(Math.floor(uploaded));
          },
        });
        queryClient.invalidateQueries({queryKey: ['uploads-by-profile']});
        navigate('Profile')
  
      } catch (error) {
        const errorMessage = catchAsyncError(error);
        dispatch(updateNotification({message: errorMessage, type: 'error'}));
      }
      setBusy(false);
    };
  

    return <AudioForm initialValues={{
        title: audio.title,
        category: audio.category,
        about: audio.about
    }}
    onSubmit={handleUpdate}
    busy={busy}
    progres={uploadProgress}
    />

};

const styles = StyleSheet.create({
container: {},
});

export default UpdateAudio;