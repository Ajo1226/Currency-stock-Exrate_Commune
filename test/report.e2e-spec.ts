import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { carsInfo } from './cars-info';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Getting no estimation when there is no approved report', async () => {
    // Create user
    const givenEmail = 'test.user@app.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: givenEmail, password: 'password' })
      .expect(201);
    const cookie = res.get('Set-Cookie');

    // Create reports for each car inside the cars-info file and approve them as admin
    for (const car of carsInfo) {
      const createdReport = await request(app.getHttpServer())
        .post('/reports')
        .set('Cookie', cookie)
        .send(car)
        .expect(201);
      expect(createdReport.body.id).toBeDefined();
      const updatedReport = await request(app.getHttpServer())
        .patch(`/reports/${createdReport.body.id}`)
        .set('Cookie', cookie)
        .send({
          approved: true,
        })
        .expect(200);
      expect(updatedReport.body.approved).toBe(true);
    }

    const { body } = await request(app.getHttpServer())
      .get('/reports?make=BMW&model=X5&lng=25&lat=35&mileage=70000&year=2008')
      .set('Cookie', cookie)
      .expect(200);
    expect(body.price).toEqual(15000);
  });
});
