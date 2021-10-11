import React from 'react';
import {useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/core';

import {useObserver} from 'mobx-react-lite';

import {api} from 'api/api';
import {auth} from 'auth/auth';
import {ItemForm} from 'form/ItemForm';
import {useAlert} from 'alert/AlertContext';
import {BackButton} from 'common/BackButton';
import {formatToEdit} from 'edit/formatToEdit';
import {EditBackAlert} from 'edit/EditBackAlert';
import {formatToImagesEdit} from 'images/formatToImagesEdit';

export function EditScreen({route}) {
  const {navigate} = useNavigation();
  const {showAlert} = useAlert();

  const queryClient = useQueryClient();

  const {item} = route.params;

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm();

  async function onSubmit(value) {
    try {
      const res = await Promise.all(
        // api.patch('plant-info/' + item._id, formatToPlant(value)),
        api.patch('plant-images/' + item._i, formatToImagesEdit(value)),
      );
      // navigate('ShowItem', {item: res.data});
      queryClient.invalidateQueries('plants');
      queryClient.invalidateQueries(['user', 'plants', auth.userId]);
      // reset();
    } catch (err) {
      console.error(err.response);
    }
  }

  function onBackPress() {
    showAlert(<EditBackAlert />);
  }

  return useObserver(() => (
    <ItemForm
      reset={reset}
      title="Editar"
      errors={errors}
      control={control}
      isDirty={isDirty}
      onSubmit={onSubmit}
      item={formatToEdit(item)}
      handleSubmit={handleSubmit}
      headerLeft={<BackButton onPress={onBackPress} />}
    />
  ));
}
