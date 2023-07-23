const contacts = require('./contacts');

const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      // ...
      allContacts = await contacts.listContacts();
      return console.log(allContacts);
      break;

    case 'get':
      // ... id
      oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
      break;

    case 'add':
      // ... name email phone
      newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
      break;

    case 'remove':
      // ... id
      deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
