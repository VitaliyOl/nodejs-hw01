const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const writeFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const findIndex = contacts.findIndex((contact) => contact.id === contactId);
    console.log(findIndex);

    if (findIndex === -1) {
      return null;
    }
    const [result] = contacts.splice(findIndex, 1);
    writeFile(contacts);
    return result;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.push(newContact);
    writeFile(contacts);
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
