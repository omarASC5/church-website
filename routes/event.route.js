const express = require('express');
const router = express.Router();

// Require the controllers
const event_controller = require('../controllers/event.controller');

router.get('/', event_controller.event_index);

// Show Create Form
router.get('/form', event_controller.event_form)

// Create Route
router.post('/create', event_controller.event_create);

// Show Route
router.get('/:id', event_controller.event_details);

// Update Route
router.get('/:id/edit', event_controller.event_edit);

// Update Route
router.put('/:id', event_controller.event_update);

// Destroy Route
router.delete('/:id/delete', event_controller.event_delete);

module.exports = router;
