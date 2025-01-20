'use client';

import { forwardRef, useCallback, useState } from 'react';

import { Button, Container, Flex, Group, Stack } from '@mantine/core';
import { TransformedValues, UseFormReturnType } from '@mantine/form';
import { useTranslations } from 'next-intl';

export interface ToggleableFormProps<Form extends UseFormReturnType<any>>
  extends React.ComponentPropsWithRef<'form'> {
  form: Form;
  onSubmit?: (values: TransformedValues<Form>) => void;
  readonlyFields: JSX.Element | JSX.Element[];
  isSubmitting: boolean;
}

export type ToggleableForm = <Form extends UseFormReturnType<any>>(
  props: ToggleableFormProps<Form>
) => JSX.Element | React.ReactNode;

export const ToggleableForm = forwardRef(
  <Form extends UseFormReturnType<any>, T extends TransformedValues<Form>>(
    {
      form,
      onSubmit,
      onReset,
      children,
      readonlyFields,
      isSubmitting,
      ...others
    }: ToggleableFormProps<Form>,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const t = useTranslations('shared:ui.ToggleableForm');

    const onToggleEditingHandler = useCallback((toggle: boolean) => {
      setIsEditing(toggle);
    }, []);

    const onSubmitHandler = useCallback(
      (v: T) => {
        onSubmit?.(v);
        setIsEditing(false);
      },
      [onSubmit]
    );

    return (
      <form
        {...others}
        onSubmit={form.onSubmit(onSubmitHandler)}
        onReset={(event) => {
          onReset?.(event);
          form.onReset(event);
        }}
        ref={ref}
      >
        <Flex gap="sm" direction={isEditing ? 'column' : 'row'}>
          <Stack flex="1">{isEditing ? children : readonlyFields}</Stack>
          <Group align="flex-end">
            {isEditing ? (
              <>
                <Button
                  size="xs"
                  variant="light"
                  type="button"
                  onClick={() => onToggleEditingHandler(false)}
                >
                  {t('button.cancel')}
                </Button>
                {
                  <Button size="xs" type="submit" loading={isSubmitting}>
                    {t('button.apply')}
                  </Button>
                }
              </>
            ) : (
              <Button
                size="xs"
                variant="light"
                type="button"
                onClick={() => onToggleEditingHandler(true)}
              >
                {t('button.edit')}
              </Button>
            )}
          </Group>
        </Flex>
      </form>
    );
  }
);

ToggleableForm.displayName = 'ToggleableForm';
