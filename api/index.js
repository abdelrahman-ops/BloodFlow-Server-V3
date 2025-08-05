import express  from 'express';
import admin from '../routes/admin.routes.js';
import auth from '../routes/auth.routes.js';
import requests from '../routes/request.routes.js';
import emergency from '../routes/emergency.routes.js'
import donors from '../routes/donor.routes.js';
import notification from '../routes/notification.routes.js'

const router = express.Router();

router.use('/auth', auth);
router.use('/requests', requests);
router.use('/emergency', emergency);
router.use('/donors', donors);
router.use('/admin', admin);
router.use('/notification', notification);

export default router;