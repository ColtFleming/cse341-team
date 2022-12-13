const PlayerController = require('../player.controller');
const mongoose = require('mongoose');

let req, res, send;

beforeEach(() => {
  send = jest.fn();

  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

describe('index()', () => {
  describe('when there is no user present', () => {
    beforeEach(() => (req.user = undefined));

    it('responds with 401', () => {
      PlayerController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      PlayerController.index(req, res);

      expect(send).toHaveBeenCalledWith('Not Authenticated');
    });
  });

  describe('when there is a user present', () => {
    beforeEach(() => {
      req.user = {
        identifier: 'testUser'
      };
    });

    describe('when the user has no favorite player', () => {
      beforeEach(() => {
        req.user.favoritePlayer = [];
      });

      it('responds with 200', () => {
        PlayerController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('responds with an empty array', () => {
        PlayerController.index(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
      });
    });

    describe('when the user has a favorite player', () => {
      beforeEach(() => {
        req.user.favoritePlayer = [
          {
            name: 'Nathon Mackinnon',
            number: [29],
            position: 'Center'
          },
          {
            name: 'Cale Makar',
            number: [8],
            position: 'Defense'
          }
        ];
      });

      it('responds with 200', () => {
        PlayerController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('responds with the favorite player', () => {
        PlayerController.index(req, res);

        expect(res.json).toHaveBeenCalledWith([
          {
            name: 'Nathon Mackinnon',
            number: [29],
            position: 'Center'
          },
          {
            name: 'Cale Makar',
            number: [8],
            position: 'Defense'
          }
        ]);
      });
    });
  });
});

describe('create()', () => {
  describe('when there is no user present', () => {
    beforeEach(() => (req.user = undefined));

    it('responds with 401', () => {
      PlayerController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      PlayerController.create(req, res);

      expect(send).toHaveBeenCalledWith('Not Authenticated');
    });
  });

  describe('when there is a user present', () => {
    beforeEach(() => {
      req.user = {
        favoritePlayer: [],
        save: jest.fn(async () => true)
      };
    });

    describe('when the scripture is valid', () => {
      beforeEach(() => {
        req.body = {
          name: 'Nathon Mackinnon',
          number: [29],
          position: 'Center'
        };
      });

      it('responds with 200', async () => {
        await PlayerController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('responds with the user', async () => {
        await PlayerController.create(req, res);

        expect(res.json).toHaveBeenCalledWith(req.user);
      });
    });

    describe('when the player is invalid', () => {
      beforeEach(() => {
        req.body = {
          name: 'Nathon Mackinnon',
          number: [29]
        };

        req.user.save = jest.fn(async () => {
          throw new mongoose.Error.ValidationError();
        });
      });

      it('responds with 422', async () => {
        await PlayerController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
      });

      it('responds with the error', async () => {
        await PlayerController.create(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.any(mongoose.Error.ValidationError));
      });
    });

    describe('when there is an error writing to the data store', () => {
      beforeEach(() => {
        req.user.save = jest.fn(async () => {
          throw new Error('Cannot connect to database');
        });
      });

      it('responds with a 500', async () => {
        await PlayerController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
      });

      it('responds with the error', async () => {
        await PlayerController.create(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
});
