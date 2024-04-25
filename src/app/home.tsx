import { useEffect, useId, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SectionList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import BottomSheet from '@gorhom/bottom-sheet';

import { theme } from '@/theme';
import { Input } from '@/components/input';
import { Contact, ContactProps } from '@/components/contact';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';

type SectionListDataProps = {
  title: string;
  data: ContactProps[];
};

export function Home() {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState<SectionListDataProps[]>([]);
  const [contact, setContact] = useState<Contacts.Contact>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

  async function handleOpenDetails(id: string) {
    const response = await Contacts.getContactByIdAsync(id);
    setContact(response);

    handleBottomSheetOpen();
  }

  async function fetchContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: 'firstName',
        });

        const list = data
          .map((contact) => ({
            id: contact.id ?? useId(),
            name: contact.name,
            image: contact.image,
          }))
          .reduce<SectionListDataProps[]>((acc: any, item) => {
            const firstLetter = item.name[0].toLocaleUpperCase();
            const existingEntry = acc.find(
              (entry: SectionListDataProps) => entry.title === firstLetter
            );

            if (existingEntry) {
              existingEntry.data.push(item);
            } else {
              acc.push({ title: firstLetter, data: [item] });
            }
            return acc;
          }, []);

        setContacts(list);
        setContact(data[0]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Contatos', 'Não foi possivel carregar os contatos');
    }
  }

  useEffect(() => {
    fetchContacts();
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input style={styles.input}>
          <Feather name="search" size={16} color={theme.colors.gray_300} />
          <Input.Field
            placeholder="Pesquisar pelo nome"
            onChangeText={setName}
            value={name}
          />
          <TouchableOpacity onPress={() => setName('')} activeOpacity={0.7}>
            <Feather name="x" size={16} color={theme.colors.gray_300} />
          </TouchableOpacity>
        </Input>
      </View>

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Contact contact={item} onPress={() => handleOpenDetails(item.id)} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // SectionSeparatorComponent={() => <View style={styles.separator} />}
      />
      {contact && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[0.01, 284]}
          handleComponent={() => null}
          backgroundStyle={styles.bottomSheet}
        >
          <Avatar
            name={contact.name}
            image={contact.image}
            variant="large"
            containerStyles={styles.image}
          />
          <View style={styles.bottonSheetContent}>
            <Text style={styles.contactName}>{contact.name}</Text>
            {contact.phoneNumbers && (
              <View style={styles.phoneNumber}>
                <Feather name="phone" size={18} color={theme.colors.gray_400} />
                <Text style={styles.phone}>
                  {contact.phoneNumbers[0].number}
                </Text>
              </View>
            )}

            <Button title="Fechar" onPress={handleBottomSheetClose} />
          </View>
        </BottomSheet>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_200,
  },
  header: {
    width: '100%',
    height: 132,
    backgroundColor: theme.colors.blue,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  input: {
    marginBottom: -27,
  },
  section: {
    fontSize: 18,
    fontFamily: theme.fontFamily.bold,
    backgroundColor: theme.colors.blue,
    width: 34,
    height: 34,
    color: theme.colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 12,
    marginTop: 32,
  },
  contentList: {
    padding: 24,
    gap: 12,
    paddingTop: 64,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray_300,
    marginTop: 12,
  },
  bottomSheet: { backgroundColor: 'transparent' },
  bottonSheetContent: {
    flex: 1,
    backgroundColor: theme.colors.gray_100,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    paddingTop: 64,
    alignItems: 'center',
    padding: 32,
  },
  image: {
    marginBottom: -50,
    zIndex: 1,
    alignSelf: 'center',
  },
  contactName: { fontSize: 32, fontFamily: theme.fontFamily.bold },
  phoneNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 32,
  },
  phone: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.gray_400,
  },
});
