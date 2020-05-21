const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: "Todos!" })
})
router.get('/:id', (req, res) => {
  res.json({ msg: `Requested todo number ${req.params.id}` })
})
router.post('/', (req, res) => {
  res.json({ msg: "Requested to make a new todo" })
})
router.put('/:id', (req, res) => {
  res.json({ msg: `Requested to update todo number ${req.params.id}` })
})
router.delete('/:id', (req, res) => {
  res.json({ msg: `Requested to delete todo number ${req.params.id}` })
})

module.exports = router
