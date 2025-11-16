class RejectKitchenUseCase {
  constructor(kitchenRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId, reason, adminUserId) {

    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error("Cocina no encontrada");

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, {
      approval_status: "rejected",
      rejection_reason: reason,
      is_active: false,
      approved_by: null,
      approval_date: null
    });

    await this.eventPublisher.publish("kitchen.rejected", {
      kitchenId: updatedKitchen.id,
      ownerId: updatedKitchen.owner_id,
      kitchenName: updatedKitchen.name,
      rejectionReason: reason,
      rejectedBy: adminUserId,
      timestamp: new Date().toISOString()
    });

    return updatedKitchen;
  }
}

module.exports = RejectKitchenUseCase;