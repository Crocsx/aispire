'use client';

import {
  Button,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuProps,
  MenuTarget,
  rem,
} from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';

export const LanguagePicker = ({
  languages,
  current,
  onLanguageChange,
  ...rest
}: {
  languages: { label: string; value: string }[];
  current: string;
  onLanguageChange: (language: string) => void;
} & MenuProps) => {
  return (
    <Menu {...rest}>
      <MenuTarget>
        <Button
          variant="transparent"
          tt="uppercase"
          leftSection={
            <IconWorld style={{ width: rem(14), height: rem(14) }} />
          }
        >
          {languages.find((lang) => lang.value === current)?.label}
        </Button>
      </MenuTarget>
      <MenuDropdown>
        {languages.map(({ value, label }) => (
          <MenuItem key={value} onClick={() => onLanguageChange(value)}>
            {label}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  );
};
