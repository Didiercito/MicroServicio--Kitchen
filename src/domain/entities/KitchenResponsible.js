class KitchenResponsible {
  constructor(data) {
    this.id = data.id;
    this.kitchen_id = data.kitchen_id;
    this.names = data.names;
    this.first_last_name = data.first_last_name;
    this.second_last_name = data.second_last_name;
    this.email = data.email;
    this.phone_number = data.phone_number;
    this.password_hash = data.password_hash;
  }
}

module.exports = KitchenResponsible;
