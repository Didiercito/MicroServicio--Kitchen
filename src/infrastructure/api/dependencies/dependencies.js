const SequelizeKitchenRepository = require('../../database/repositories/SequelizeKitchenRepository');
const SequelizeLocationRepository = require('../../database/repositories/SequelizeLocationRepository');
const SequelizeKitchenResponsibleRepository = require('../../database/repositories/SequelizeKitchenResponsibleRepository');

const RequestKitchenUseCase = require('../../../application/use-cases/RequestKitchenUseCase');
const ApproveKitchenUseCase = require('../../../application/use-cases/ApproveKitchenUseCase');
const RejectKitchenUseCase = require('../../../application/use-cases/RejectKitchenUseCase');

const GetPendingKitchensUseCase = require('../../../application/use-cases/GetPendingKitchensUseCase');
const GetApprovedKitchensUseCase = require('../../../application/use-cases/GetApprovedKitchensUseCase');
const GetRejectedKitchensUseCase = require('../../../application/use-cases/GetRejectedKitchensUseCase');

const GetNearbyKitchensUseCase = require('../../../application/use-cases/GetNearbyKitchensUseCase');
const GetKitchenDetailsUseCase = require('../../../application/use-cases/GetKitchenDetailsUseCase');

const RabbitMQPublisher = require('../../adapters/RabbitMQPublisher');

const kitchenRepository = new SequelizeKitchenRepository();
const locationRepository = new SequelizeLocationRepository();
const responsibleRepository = new SequelizeKitchenResponsibleRepository();

module.exports = {
  requestKitchenUseCase: new RequestKitchenUseCase(
    kitchenRepository,
    locationRepository,
    responsibleRepository,
    RabbitMQPublisher
  ),

  approveKitchenUseCase: new ApproveKitchenUseCase(
    kitchenRepository,
    responsibleRepository,
    RabbitMQPublisher
  ),

  rejectKitchenUseCase: new RejectKitchenUseCase(
    kitchenRepository,
    RabbitMQPublisher
  ),

  getPendingKitchensUseCase: new GetPendingKitchensUseCase(kitchenRepository),
  getApprovedKitchensUseCase: new GetApprovedKitchensUseCase(kitchenRepository),
  getRejectedKitchensUseCase: new GetRejectedKitchensUseCase(kitchenRepository),

  getNearbyKitchensUseCase: new GetNearbyKitchensUseCase(
    kitchenRepository,
    locationRepository
  ),

  getKitchenDetailsUseCase: new GetKitchenDetailsUseCase(
    kitchenRepository,
    locationRepository,
    responsibleRepository
  )
};
