const express = require ('express');
const router = express.Router();

const models = require('../models');
const User = models.User;

const redirect = (res)=>{
  return ()=>{
    res.redirect('/users');
  };
};

//aa

router.get('/', (req, res, next)=>{
  // var awards = [];
  User.findUsersViewModel()

    .then((viewModel)=>{
      res.render('users', {viewModel: viewModel});

    })

    .catch(next);

});

router.post('/', (req, res, next)=>{
  User.create(req.body)
    .then(redirect(res))
    .catch(next)
});

router.delete('/:id', (req, res, next)=>{
  User.destroyById(req.params.id)
    .then(redirect(res))
    .catch(next);
});

router.put('/:id', (req, res, next)=>{
  User.updateUserFromRequestBody(req.params.id, req.body)
    .then(redirect(res))
    .catch(next)
});

router.post('/:id/awards', (req, res, next)=>{
  User.generateAward(req.params.id)
    .then(redirect(res))
    .catch(next)
});

router.delete('/:userId/awards/:id', (req, res, next)=>{
  User.removeAward(req.params.userId, req.params.id)
    .then(redirect(res))
    .catch(next)
});

module.exports = router;
