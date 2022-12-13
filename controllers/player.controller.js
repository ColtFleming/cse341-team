const mongoose = require('mongoose');

const PlayerController = {
  index: (req, res) => {
    if (!req.user) {
      return res.status(401).send('Not Authenticated');
    }

    res.status(200);
    res.json(req.user.favoritePlayer);
  },
  create: async (req, res) => {
    try {
      const { user } = req;

      if (!req.user) {
        return res.status(401).send('Not Authenticated');
      }

      user.favoritePlayer.push({
        name: req.body.name,
        number: req.body.number,
        position: req.body.position
      });

      await user.save();

      res.status(200);
      res.json(user);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422);
      }

      res.status(500);

      res.json(error);
    }
  }
};

module.exports = PlayerController;
