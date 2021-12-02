import connection from '../database/connection.js';

async function findByYouTubeLink({ youtubeLink }) {
  const result = await connection.query(`
      SELECT * FROM recommendations WHERE "youtubeLink" = $1
    `, [youtubeLink]);
  if (!result) return null;
  return result.rows[0];
}

async function findById({ recommendationId }) {
  const result = await connection.query(`
      SELECT * FROM recommendations WHERE id = $1
    `, [recommendationId]);
  if (!result) return null;
  return result.rows[0];
}

async function findByScore({ sortNumber }) {
  if (sortNumber <= 7) {
    const result = await connection.query(`
      SELECT * FROM recommendations WHERE score > 10
    `);
    if (!result) return null;
    return result.rows;
  }
  const result = await connection.query(`
      SELECT * FROM recommendations WHERE score <= 10
    `);
  if (!result) return null;
  return result.rows;
}

async function findAll() {
  const result = await connection.query(`
      SELECT * FROM recommendations
    `);
  return result.rows;
}

async function findByLimit({ limit }) {
  const result = await connection.query(`
      SELECT * FROM recommendations
      ORDER BY score DESC
      LIMIT $1
    `, [limit]);
  return result.rows;
}

async function insert({ name, youtubeLink }) {
  const result = await connection.query(`
      INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *
    `, [name, youtubeLink]);
  return result.rows[0];
}

async function vote({ type, recommendationId }) {
  if (type === 'upvote') {
    const result = await connection.query(`
      UPDATE recommendations SET score = score + 1 WHERE id = $1 RETURNING *
    `, [recommendationId]);
    return result.rows[0];
  }
  const result = await connection.query(`
      UPDATE recommendations SET score = score - 1 WHERE id = $1 RETURNING *
    `, [recommendationId]);
  return result.rows[0];
}

async function remove({ recommendationId }) {
  return connection.query(`
      DELETE FROM recommendations WHERE id = $1 
    `, [recommendationId]);
}

export {
  findByYouTubeLink,
  findById,
  findByScore,
  findAll,
  findByLimit,
  insert,
  vote,
  remove,
};
