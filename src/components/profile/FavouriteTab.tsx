import { useFetchFavourite } from '@src/hooks/query';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import { FC } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AudioListItems from '@ui/AudioListItems';

interface Props {}

const FavouriteTab: FC<Props> = (props) =>{
        const {data, isLoading} = useFetchFavourite();
      
        if (isLoading) return <AudioListLoadingUi />;
      
        if (!data?.length) return <EmptyRecords title="There is no favourite!" />;
      
        return (
          <ScrollView style={styles.container}>
            {data?.map(item => {
              return <AudioListItems audio={item} key={item.id} />;
            })}
          </ScrollView>
        );
      };

const styles = StyleSheet.create({
    container: { }
  });

export default FavouriteTab;