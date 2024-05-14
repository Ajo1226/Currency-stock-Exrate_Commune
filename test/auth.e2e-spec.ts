import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Sign Up', () => {
    const givenEmail = 'test132321@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: givenEmail, password: 'password' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(givenEmail);
      });
  });

  it('Sign up and get the logged in User', async () => {
    const givenEmail = 'test.user@app.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: givenEmail, password: 'password' })
      .expect(201);
    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);
    expect(body.email).toEqual(givenEmail);
  });
});
