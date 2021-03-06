'use strict';

import logger from '../utils/logger';

const BAD_REQUEST = 400;
const SERVER_ERROR = 500;
const AUTHENTICATION_FAILURE = 401;
const REQUEST_SUCCESS = 200;
const DUPLICATE_ERROR = 303;

function renderBadRequest(res, error) {
  logger.logFailure(error);
  res.sendStatus(BAD_REQUEST);
}

function renderServerError(res, error) {
  logger.logFailure(error);
  return res.sendStatus(SERVER_ERROR);
}

function renderDuplicateError(res, error) {
  logger.logFailure(error);
  return res.sendStatus(DUPLICATE_ERROR);
}

function renderAuthernticationFailure(res, req, err) {
  logger.logAuthenticationDenial(req);
  logger.logFailure(err);
  return res.sendStatus(AUTHENTICATION_FAILURE);
}

function renderAuthernticationSuccess(req, done) {
  logger.logAuthenticationSuccess(req);
  done();
}

function renderOK(res, content) {
  return res.status(REQUEST_SUCCESS).send({
    content
  });
}

module.exports = (req, res, next) => {
  res.ok = renderOK;
  res.badRequest = renderBadRequest;
  res.serverError = renderServerError;
  res.duplicateError = renderDuplicateError;
  res.authenticationFailure = renderAuthernticationFailure;
  res.authenticationSuccess = renderAuthernticationSuccess;
  next();
};
