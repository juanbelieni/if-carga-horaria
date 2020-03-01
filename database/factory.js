'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Professor', (faker) => ({
  nome: faker.name(),
  siape: faker.integer({ min: 0, max: 9007199254740991 }),
}))

Factory.blueprint('App/Models/Disciplina', (faker, i, data) => ({
  nome: faker.profession(),
  periodo: data.periodo,
  duracao_aula: faker.pickone([45, 50]),
  aulas_semana: faker.integer({ min: 1, max: 5 }),
  ppc_id: data.ppc_id,
}))
