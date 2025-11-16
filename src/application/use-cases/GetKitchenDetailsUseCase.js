class GetKitchenDetailsUseCase {
  constructor(kitchenRepository, locationRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error("Cocina no encontrada");

    const location = kitchen.location_id
      ? await this.locationRepository.findById(kitchen.location_id)
      : null;

    return { kitchen, location };
  }
}

module.exports = GetKitchenDetailsUseCase;  