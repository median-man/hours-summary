// faking the api for now
export const createPunch = punch =>
  new Promise(resolve => setTimeout(resolve, 1000));
