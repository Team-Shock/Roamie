import Axios from 'axios';
import { RDSTokens } from '../secrets';

const pass = RDSTokens.password;
const username = RDSTokens.username;
const host = RDSTokens.host;
const port = RDSTokens.port;

export class PostgresWrapper {
  constructor() {
    this.initialized = false;
    this._postgresInstance = null;
  }

  static async getInstance() {
    if (!this.initialized) {
      try {
        this._postgresInstance = await Axios.create({
          baseURL: `http://localhost:8080`,
        });
        this.initialized = true;
      } catch {
        console.log('Unable to create axios instance');
      }
    } else {
      // Already initialized, nothing more to do here
    }

    return this._postgresInstance;
  }
}
