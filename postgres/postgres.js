import Axios from 'axios';

export class PostgresWrapper {
  constructor() {
    this.initialized = false;
    this._postgresInstance = null;
  }

  static async getInstance() {
    if (!this.initialized) {
        this._postgresInstance = await Axios.create({baseURL: 'http://localhost:8080'})
        this.initialized = true;
    }
    else {
      // Already initialized, nothing more to do here
      
    }

    return this._postgresInstance;
  }

}