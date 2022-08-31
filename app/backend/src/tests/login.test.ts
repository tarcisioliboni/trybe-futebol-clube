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

const userMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const invalidUserMock = {
  email: 'tarcisioliboni@gmail.com',
  password: 'senhasecreta'
}

const tokenMock = '6KB707dM9YTIgHtLvtgWQ8mKwboJW3of9locizkDTHzBC2IlrT1oOQ'

describe('/login test', () => {
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

  it('Status 401: Incorrect email or password', async () => {
    const res = await chai.request(app)
     .post('/login')
     .send(invalidUserMock)
    expect(res.status).to.equal(401)
  })
  it('Return Token', async () => {
    sinon.stub(loginController, "createToken").resolves(tokenMock)
    const res = await chai.request(app)
      .post('/login')
      .send(userMock)
    expect(res.body.token).to.equal(tokenMock)
  })
});

describe('/login test', () => {
  beforeEach(() => {
  })
  afterEach(() => {
    sinon.restore();
  })

  it('Status 200', async () => {
    const res = await chai.request(app)
      .get('/login/validate')
      .set({'Authorization': tokenMock })
    expect(res.status).to.equal(200)
  })
});