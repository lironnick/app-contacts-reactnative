import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageProps,
  TouchableOpacityProps,
} from 'react-native';

import { theme } from '@/theme';
import { Avatar } from '@/components/avatar';

export type ContactProps = {
  id: string;
  name: string;
  image?: ImageProps;
};

type Props = TouchableOpacityProps & {
  contact: ContactProps;
};

export function Contact({ contact, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Avatar name={contact.name} image={contact.image} />
      <Text>{contact.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    gap: 12,
  },
  name: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.medium,
    fontSize: 18,
  },
});
