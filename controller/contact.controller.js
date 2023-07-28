const Contact = require("../model/contact.model");

const findLinkedContacts = async (email, phoneNumber) => {
  try {
    const linkedContacts = await Contact.find({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
      deletedAt: null,
    });
    return linkedContacts;
  } catch (error) {
    throw error;
  }
};

const consolidateContacts = async (linkedContacts) => {
  let primaryContact = null;
  const secondaryContactIds = [];
  const emails = [];
  const phoneNumbers = [];

  linkedContacts.forEach((contact) => {
    if (contact.linkPrecedence === "primary") {
      primaryContact = contact;
      emails.push(contact.email);
      phoneNumbers.push(contact.phoneNumber);
    } else {
      secondaryContactIds.push(contact.id);
      emails.push(contact.email);
      phoneNumbers.push(contact.phoneNumber);
    }
  });

  return {
    primaryContact: {
      primaryContactId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds,
    },
  };
};

//create a new contact

exports.createConatct = async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res
      .status(400)
      .json({ error: "Either email or phoneNumber must be provided." });
  }
  try {
    const linkedContacts = findLinkedContacts(email, phoneNumber);

    if (linkedContacts.length === 0) {
      //create a primary contact
      const newContact = await Contact.create({
        phoneNumber: phoneNumber || null,
        email: email || null,
        linkedId: null,
        linkPrecedence: "primary",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      });
      return res.json({
        contact: {
          primaryContactId: newContact.id,
          emails: [newContact.email],
          phoneNumbers: [newContact.phoneNumber],
          secondaryContactIds: [],
        },
      });
    }

    const consolidateContact = await consolidateContacts(linkedContacts);
    res.json(consolidateContact);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//fetch all contact
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: "Success",
      count: contacts.length,
      data: {
        contacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
