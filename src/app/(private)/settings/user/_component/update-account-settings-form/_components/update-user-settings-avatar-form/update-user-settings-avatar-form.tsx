import { useState } from 'react';

import { FileInput, Avatar, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { ToggleableForm } from '~aspire/shared/ui';

import { useUpdateUserAvatarSubmit } from './_hooks';
import { toForm } from './update-user-settings-avatar-form.adapter';
import {
  ALLOWED_EXTENSIONS,
  UpdateUserSettingsAvatarFormData,
  useValidate,
} from './update-user-settings-avatar-form.validator';

export const UpdateUserSettingsAvatarForm = ({
  avatar_url,
}: {
  avatar_url: string;
}) => {
  const t = useTranslations('app:settings.UserSettings');
  const form = useForm<UpdateUserSettingsAvatarFormData>({
    validate: useValidate(),
    initialValues: toForm(),
  });
  const { isSubmitting, submit } = useUpdateUserAvatarSubmit();

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the selected file
    } else {
      setPreview(null); // Clear the preview if no file is selected
    }
  };

  return (
    <ToggleableForm
      onSubmit={submit}
      form={form}
      isSubmitting={isSubmitting}
      readonlyFields={<Avatar size={120} radius={120} src={avatar_url} />}
    >
      {preview && (
        <Group mt="md">
          <Avatar src={preview} alt={preview} size={120} radius={120} />
        </Group>
      )}
      <FileInput
        {...form.getInputProps('avatar')}
        accept={ALLOWED_EXTENSIONS.join(',')}
        clearable
        label={t('form.field.avatar.label')}
        placeholder={t('form.field.avatar.placeholder')}
        onChange={(file) => {
          form.setFieldValue('avatar', file);
          handleFileChange(file);
        }}
      />
    </ToggleableForm>
  );
};
