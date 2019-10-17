import Axios from "axios";

export class PostgresWrapper {
  constructor() {
    this.initialized = false;
    this._postgresInstance = null;
  }

  static async getInstance() {
    if (!this.initialized) {
      try {
        this._postgresInstance = await Axios.create({
          baseURL: "http://localhost:8080"
        });
        this.initialized = true;
      } catch {
        console.log("Unable to create axios instance");
      }
    } else {
      // Already initialized, nothing more to do here
    }

    return this._postgresInstance;
  }
}
