// contacts.js

const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
console.log(contactsPath);

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
console.log(listContacts);

const getContactById = async id => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id) || null;
};
console.log(getContactById);

const addContact = async data => {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
console.log(addContact);

const removeContact = async id => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
console.log(removeContact);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
