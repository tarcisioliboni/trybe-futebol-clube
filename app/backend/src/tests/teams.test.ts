import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import loginController from '../controller/loginController'

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams test', () => {
  beforeEach(() => {
  })
  afterEach(() => {
    sinon.restore();
  })

  it('Status 200', async () => {
    const res = await chai.request(app)
     .get('/teams')
    expect(res.status).to.equal(200)
  })

  it('Status 200: ID test', async () => {
    const res = await chai.request(app)
     .get('/teams/7')
    expect(res.status).to.equal(200)
  })
});