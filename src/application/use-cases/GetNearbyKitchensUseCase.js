class GetNearbyKitchensUseCase {

  constructor(kitchenRepository, locationRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
  }

  async execute({ stateId, municipalityId }) {
    const locations = await this.locationRepository.findByStateAndMunicipality(
      stateId,
      municipalityId
    );

    const ids = locations.map(l => l.id);

    const kitchens = await this.kitchenRepository.findByLocationIds(ids);

    return kitchens;
  }
}

module.exports = GetNearbyKitchensUseCase;