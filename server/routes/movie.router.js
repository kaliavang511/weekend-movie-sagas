const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
 
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
   
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
    
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
      
          res.sendStatus(201);
        }).catch(err => {
      
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { 
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
