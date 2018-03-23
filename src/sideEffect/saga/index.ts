import { all, AllEffect, GenericAllEffect } from 'redux-saga/effects'
import auth from './auth'
import crudFetch from './crudFetch'
import { FnAuthClient, FnRestClient } from '../../rest'
// import crudResponse from './crudResponse';
// import referenceFetch from './referenceFetch';

/**
 * @param {Object} restClient A REST object with two methods: fetch() and convertResponse()
 */
export default (restClient: FnRestClient, authClient: FnAuthClient) =>
  function* crudSaga() {
    yield all([
      auth(authClient)(),
      crudFetch(restClient)()
      // crudResponse(),
      // referenceFetch(),
    ])
  }
