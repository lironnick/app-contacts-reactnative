import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { theme } from '@/theme';

const variants = {
  size: {
    medium: { width: 54, height: 54, borderRadius: 18 },
    large: { width: 100, height: 100, borderRadius: 32 },
  },
  text: {
    medium: { fontSize: 24 },
    large: { fontSize: 52 },
  },
};

type Props = {
  name: string;
  image?: ImageProps | null;
  variant?: 'medium' | 'large';
  containerStyles?: StyleProp<ViewStyle>;
};

export function Avatar({
  image,
  name,
  variant = 'medium',
  containerStyles,
}: Props) {
  return (
    <View style={containerStyles}>
      {image ? (
        <Image source={image} style={variants.size[variant]} />
      ) : (
        <View style={[styles.letter, variants.size[variant]]}>
          <Text style={[styles.text, variants.text[variant]]}>
            {name[0].toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  name: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.medium,
    fontSize: 18,
  },
  letter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  text: {
    fontFamily: theme.fontFamily.medium,
  },
});
