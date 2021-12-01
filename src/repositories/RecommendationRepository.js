import connection from '../database/connection.js';

class RecommendationRepository {
  async findByYouTubeLink({ youtubeLink }) {
    const result = await connection.query(`
      SELECT * FROM recommendations WHERE "youtubeLink" = $1
    `, [youtubeLink]);
    return result.rows[0];
  }

  async findById({ recommendationId }) {
    const result = await connection.query(`
      SELECT * FROM recommendations WHERE id = $1
    `, [recommendationId]);
    return result.rows[0];
  }

  async findByScore({ score }) {
    if (score === 'good') {
      const result = await connection.query(`
      SELECT * FROM recommendations WHERE score > 10
    `);
      return result.rows;
    }
    const result = await connection.query(`
      SELECT * FROM recommendations WHERE score <= 10
    `);
    return result.rows;
  }

  async insert({ name, youtubeLink }) {
    const result = await connection.query(`
      INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *
    `, [name, youtubeLink]);
    return result.rows[0];
  }

  async vote({ type, recommendationId }) {
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

  async remove({ recommendationId }) {
    return connection.query(`
      DELETE FROM recommendations WHERE id = $1 
    `, [recommendationId]);
  }
}

export default RecommendationRepository;
