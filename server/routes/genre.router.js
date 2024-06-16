const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  const query = `
  SELECT
  movies.id,
  movies.title,
  movies.poster,
  movies.description,
  STRING_AGG(genres.name, ',') AS genre_names
FROM
  "movies"
JOIN
  "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
JOIN
  "genres" ON "genres"."id" = "movies_genres"."genre_id"
WHERE
  "movies"."id" = $1
GROUP BY
  movies.id, movies.title, movies.poster, movies.description
ORDER BY
  movies.title;
   `

  pool.query(query, [movieId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('cant get movie details', err);
      res.sendStatus(500);
    });
});

module.exports = router;
