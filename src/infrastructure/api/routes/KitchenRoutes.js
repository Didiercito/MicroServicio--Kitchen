const express = require('express');
const router = express.Router();

const requireAuth = require("../../../middleware/require-auth");
const requireRole = require("../../../middleware/require-role");
const controller = require('../controllers/KitchenController');

router.post('/request', controller.requestKitchen);

router.get('/pending', requireRole("Super_admin"), controller.getPendingKitchens);
router.get('/approved', requireRole("Super_admin"), controller.getApprovedKitchens);
router.get('/rejected', requireRole("Super_admin"), controller.getRejectedKitchens);

router.get('/nearby', requireAuth, controller.getNearbyKitchens);

router.post('/:id/approve', requireRole("Super_admin"), controller.approveKitchen);
router.post('/:id/reject', requireRole("Super_admin"), controller.rejectKitchen);

router.get('/:id', requireAuth, controller.getKitchenDetails);

module.exports = router;