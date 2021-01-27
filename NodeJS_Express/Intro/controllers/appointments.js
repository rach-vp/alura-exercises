module.exports = app => {
  app.get('/appointments', (req, res) => res.send('You are at appointments rout using GET'));
  app.post('/appointments', (req, res) => {
    console.log(req.body);
    res.send('You are at appointments rout using POST');
  });
}