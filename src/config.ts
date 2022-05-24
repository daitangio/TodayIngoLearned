import config from "../config.json";

import { join } from 'path';

export function getDBPath(){
  // Ref https://stackoverflow.com/questions/21077670/expanding-resolving-in-node-js
  if( config.dbpath[0]=="~" ) {
    return join(process.env.HOME, config.dbpath.slice(1));
  }else{
    return config.dbpath;
  }
}

export function getListeningPort(){
    return config.port;
}

export function  getExpresssessionsecret() {
  return config.expresssessionsecret;
}

export function getSecurecoockies(){
  return config.securecoockies;
}