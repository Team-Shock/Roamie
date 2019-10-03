// import Axios from 'axios';

// export class PostgresWrapper {
//   constructor() {
//     this.initialized = false;
//     this._postgresInstance = null;
//   }

//   static async Initialize() {
//     if (!this.initialized) {

//       // initialize postgres
//       this._postgresInstance = await Axios.create({baseURL: 'http://localhost:8080'})
//       this.initialized = true;
//     }
//     else {
//       console.log('already initialized!')
//     }
//   }

//   static getInstance() {
//     if (!this.initialized) {
//       Initialize();
//     }
//     else {
//       // Already initialized, nothing more to do here
      
//     }

//     return this._postgresInstance;
//   }

// }