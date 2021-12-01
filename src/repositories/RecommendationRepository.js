import connection from '../database/connection.js';

class RecommendationRepository {
  async find({ youtubeLink }) {
    const result = await connection.query(`
      SELECT * FROM recommendations WHERE "youtubeLink" = $1
    `, [youtubeLink]);
    return result.rows[0];
  }

  async insert({ name, youtubeLink }) {
    const result = await connection.query(`
      INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *
    `, [name, youtubeLink]);

    return result.rows[0];
  }
}

export default RecommendationRepository;
