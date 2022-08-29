import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const invalidUserMock = {
  email: 'tarcisioliboni@gmail.com',
  password: 'senhasecreta'
}

describe('login test', () => {
  beforeEach(() => {
  })
  afterEach(() => {
    sinon.restore();
  })

  it('Status 200', async () => {
    const res = await chai.request(app)
     .post('/login')
     .send(userMock)
    expect(res.status).to.equal(200)
  })

  it('Status 401', async () => {
    const res = await chai.request(app)
     .post('/login')
     .send(invalidUserMock)
    expect(res.status).to.equal(401)
  })
});
