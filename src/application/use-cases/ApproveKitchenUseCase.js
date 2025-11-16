class ApproveKitchenUseCase {
  constructor(kitchenRepository, responsibleRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.responsibleRepository = responsibleRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);

    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    const responsible = await this.responsibleRepository.findByKitchenId(kitchenId);

    if (!responsible) {
      throw { http_status: 400, message: "Kitchen has no responsible user data" };
    }

    const updated = await this.kitchenRepository.update(kitchenId, {
      approval_status: "approved",
      is_active: true,
      approved_by: responsible.id,
      approval_date: new Date(),
      rejection_reason: null
    });

    return updated;
  }
}

module.exports = ApproveKitchenUseCase;
