import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/043cb5ce-bbdb-4884-a5ad-cca2e1c5748c?orderBy=${orderBy}`);
  }

  async createContacts(contact) {
    return this.httpClient.post('/contacts', contact);
  }
}

export default new ContactsService();
