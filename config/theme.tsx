// config/theme.ts
import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from './types';

export default function theme(options: ThemeOptions) {
  return createTheme(options);
}
