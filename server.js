const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(function(req, res, next) {
  if (req.headers[`x-forwarded-proto`] === `https`) {
    res.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port} ...`);
});