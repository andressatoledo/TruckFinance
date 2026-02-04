
// import { API_URL as ENV_API_URL } from '@env';

const ENV_API_URL = 'http://192.168.100.21:3000'
console.log('envapi',ENV_API_URL)
export const API_URL = ENV_API_URL + '/api';
console.log(API_URL);
