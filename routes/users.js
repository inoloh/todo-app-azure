const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../utils/graphClient');

router.get('/', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/signin');
  }

  const profile = await getUserProfile(req.session.accessToken);

  res.render('user', { profile: profile });

});

module.exports = router;

