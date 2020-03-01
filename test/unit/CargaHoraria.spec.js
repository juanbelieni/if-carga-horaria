'use strict'

const { test } = use('Test/Suite')('Carga Horária')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Ppc = use('App/Models/Ppc')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Curso = use('App/Models/Curso')
// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Disciplina = use('App/Models/Disciplina')
// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Professor = use('App/Models/Professor')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Carga = use('App/Models/Carga')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Database = use('Database')

test('calculate the year and semester of an annual subject', async ({
  assert,
}) => {
  const ppc = await Ppc.create({
    nome: 'Técnico em Informática',
    formacao: 'Integrado',
    duracao: 3,
    ano: 2018,
    semestral: false,
  })

  const curso = await Curso.create({
    ano_ingresso: 2019,
    ppc_id: ppc.id,
  })

  const disciplina = await Factory.model('App/Models/Disciplina')
    .create({
      periodo: 2,
      ppc_id: ppc.id,
    })

  const professor = await Factory.model('App/Models/Professor').create()

  const carga = await Carga.create({
    curso_id: curso.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  const cargaHoraria = await Database.table('cargas_horarias').where({ id: carga.id }).first()

  assert.equal(cargaHoraria.ano, 2020)
  assert.isNull(cargaHoraria.semestre)
})

test('calculate the year and semester of a semi-annual subject', async ({
  assert,
}) => {
  const ppc = await Ppc.create({
    nome: 'Técnico em Alimentos',
    formacao: 'Subsequente',
    duracao: 4,
    ano: 2019,
    semestral: true,
  })

  const curso = await Curso.create({
    ano_ingresso: 2020,
    semestre_ingresso: 1,
    ppc_id: ppc.id,
  })

  const disciplina = await Factory.model('App/Models/Disciplina')
    .create({
      periodo: 3,
      ppc_id: ppc.id,
    })

  const professor = await Factory.model('App/Models/Professor').create()

  const carga = await Carga.create({
    curso_id: curso.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  let cargaHoraria = await Database.table('cargas_horarias').where({ id: carga.id }).first()

  assert.equal(cargaHoraria.ano, 2021)
  assert.equal(cargaHoraria.semestre, 1)

  curso.merge({ semestre_ingresso: 2 })
  await curso.save()
  cargaHoraria = await Database.table('cargas_horarias').where({ id: carga.id }).first()

  assert.equal(cargaHoraria.ano, 2021)
  assert.equal(cargaHoraria.semestre, 2)
})

test('show correct name of a annual course', async ({ assert }) => {
  const ppc = await Ppc.create({
    nome: 'Técnico em Administração',
    formacao: 'Subsequente',
    duracao: 4,
    ano: 2019,
    semestral: false,
  })

  const curso = await Curso.create({
    ano_ingresso: 2020,
    semestre_ingresso: 1,
    ppc_id: ppc.id,
  })

  const disciplina = await Factory.model('App/Models/Disciplina')
    .create({
      periodo: 3,
      ppc_id: ppc.id,
    })

  const professor = await Factory.model('App/Models/Professor').create()

  const carga = await Carga.create({
    curso_id: curso.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  const cargaHoraria = await Database.table('cargas_horarias').where({ id: carga.id }).first()

  assert.equal(cargaHoraria.curso, 'Técnico em Administração Subsequente - 2020')
})

test('show correct name of a semi-annual course', async ({ assert }) => {
  const ppc = await Ppc.create({
    nome: 'Técnico em Administração',
    formacao: 'Subsequente',
    duracao: 4,
    ano: 2019,
    semestral: true,
  })

  const curso = await Curso.create({
    ano_ingresso: 2020,
    semestre_ingresso: 1,
    ppc_id: ppc.id,
  })

  const disciplina = await Factory.model('App/Models/Disciplina')
    .create({
      periodo: 3,
      ppc_id: ppc.id,
    })

  const professor = await Factory.model('App/Models/Professor').create()

  const carga = await Carga.create({
    curso_id: curso.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  const cargaHoraria = await Database.table('cargas_horarias').where({ id: carga.id }).first()

  assert.equal(cargaHoraria.curso, 'Técnico em Administração Subsequente - 2020/1')
})
