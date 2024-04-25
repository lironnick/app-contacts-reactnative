import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';

import { theme } from '@/theme';

function Input({ children, style }: ViewProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={theme.colors.gray_300}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray_100,
    borderRadius: 18,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 7,
  },
  input: {
    flex: 1,
    color: theme.colors.black,
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
  },
});
