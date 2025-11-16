const bcrypt = require('bcrypt');

class RequestKitchenUseCase {
  constructor(kitchenRepository, locationRepository, responsibleRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
    this.responsibleRepository = responsibleRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute({ responsible, kitchen, location }) {

    const newLocation = await this.locationRepository.create({
      name: kitchen.name,
      streetAddress: location.streetAddress,
      neighborhood: location.neighborhood,
      stateId: location.stateId,
      municipalityId: location.municipalityId,
      postalCode: location.postalCode,
      contactPhone: kitchen.contactPhone,
      contactEmail: kitchen.contactEmail,
      is_active: true
    });

    const newKitchen = await this.kitchenRepository.create({
      name: kitchen.name,
      description: kitchen.description,
      owner_id: 0,
      location_id: newLocation.id,
      contact_phone: kitchen.contactPhone,
      contact_email: kitchen.contactEmail,
      image_url: kitchen.image_url || null,
      approval_status: 'pending',
      is_active: false
    });

    const passwordHash = await bcrypt.hash(responsible.password, 10);

    await this.responsibleRepository.create({
      kitchen_id: newKitchen.id,
      names: responsible.names,
      first_last_name: responsible.firstLastName,
      second_last_name: responsible.secondLastName,
      email: responsible.email,
      phone_number: responsible.phoneNumber,
      password_hash: passwordHash
    });

    return newKitchen;
  }
}

module.exports = RequestKitchenUseCase;