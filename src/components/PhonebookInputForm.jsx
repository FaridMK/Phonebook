import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import {
  BtnAddContact,
  InputAddContact,
  NameAddContact,
  ContactsAddContact,
  InputAddNumber,
} from './Phonebook.styled';

class PhonebookInputForm extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleInputChanges = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleOnSubmit = event => {
    const { name, number, contacts } = this.state;
    contacts.find(contact => contact.name === name) && alert('Error');
    event.preventDefault();
    this.setState({ contacts: [...contacts, { name, number, id: nanoid() }] });

    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <div>
        <h1>PhoneBook</h1>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="">
            <NameAddContact>Name</NameAddContact>
          </label>

          <InputAddContact
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="add new contact"
            value={this.state.name}
            onChange={this.handleInputChanges}
          />

          <InputAddNumber
            type="text"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="add new number"
            value={this.state.number}
            onChange={this.handleInputChanges}
          />

          <BtnAddContact type="submit">Add contact</BtnAddContact>

          <NameAddContact>Find contacts by name</NameAddContact>
          <InputAddContact
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.handleInputChanges}
          />
          <ContactsAddContact>Contacts:</ContactsAddContact>

          <ul>
            {this.getFilteredContacts().map(contact => {
              return (
                <li key={contact.id}>
                  <p>
                    {contact.name} ...... {contact.number}
                  </p>
                  <button
                    type="button"
                    onClick={() => this.deleteContact(contact.id)}
                  >
                    delete
                  </button>
                </li>
              );
            })}
          </ul>
        </form>
      </div>
    );
  }
}

export default PhonebookInputForm;
