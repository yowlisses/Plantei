import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import {TextInput} from 'form/TextInput';
import {TagsSelector} from 'form/TagsSelector';
import {SingleOptionSelector} from 'form/SingleOptionSelector';

import {tags} from 'publish/data/tags';
import {BackButton} from 'publish/BackButton';
import {NextButton} from 'publish/NextButton';
import {ProgressBar} from 'publish/ProgressBar';
import {CustomHeader} from 'publish/CustomHeader';
import {plantTypes} from 'publish/data/plantTypes';
import {usePublish} from 'publish/PublishContext';
import {useShallowData} from 'publish/ShallowDataContext';

function ValidatedHeader({name, type}) {
  const canContinue = !!name && !!name?.trim() && !!type;
  return useMemo(
    () => (
      <CustomHeader
        title="Publicar"
        left={<BackButton />}
        right={canContinue && <NextButton route="Price" />}
      />
    ),
    [name, type],
  );
}

export function PublishDetailScreen() {
  const {state, dispatch} = usePublish();
  const {data} = useShallowData();

  return (
    <>
      <ValidatedHeader name={state.name} type={state.type} />
      <ProgressBar ratio={2 / 3} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <TextInput id="name" data={data} label="Nome" autoFocus />
        <SingleOptionSelector
          id="type"
          label="Marcar como"
          value={state.type}
          dispatch={dispatch}
          options={plantTypes}
        />
        <TagsSelector
          id="tags"
          label="Marcar como"
          options={tags}
          value={state.tags}
          dispatch={dispatch}
        />
        <TextInput
          id="description"
          label="Descrição"
          optional
          multiline
          dispatch={dispatch}
          value={state.description}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 0,
  },
});
