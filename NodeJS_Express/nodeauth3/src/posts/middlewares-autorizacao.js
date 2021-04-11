module.exports = (cargosObrigatorios) => (req, res, next) => {
  if (!cargosObrigatorios.includes(req.user.cargo)) {
    res.status(403).end()
  }
  next()
}
