'use strict'

const { test } = use('Test/Suite')('Carga Horária')


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Ppc = use('App/Models/Ppc')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Curso = use('App/Models/Curso')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Disciplina = use('App/Models/Disciplina')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Professor = use('App/Models/Professor')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Carga = use('App/Models/Carga')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CargaHoraria = use('App/Models/CargaHoraria')


test('it have to calculate the year and semester of an annual subject', async ({ assert }) => {
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

  const disciplina = await Disciplina.create({
    nome: 'Banco de Dados',
    periodo: 2,
    duracao_aula: 45,
    aula_semana: 2,
    ppc_id: ppc.id,
  })

  const professor = await Professor.create({
    nome: 'Juliete',
    siape: 123,
  })

  const carga = await Carga.create({
    curso_id: curso.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  const cargaHoraria = await CargaHoraria.find(carga.id)

  assert.equal(cargaHoraria.ano, 2020)
  assert.isNull(cargaHoraria.semestre)
})

test('it have to calculate the year and semester of a semi-annual subject', async ({ assert }) => {
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

  const disciplina = await Disciplina.create({
    nome: 'Tec. de Alimentos',
    periodo: 3,
    duracao_aula: 45,
    aula_semana: 2,
    ppc_id: ppc.id,
  })

  const professor = await Professor.create({
    nome: 'Martinez',
    siape: 80,
  })

  const carga = await Carga.create({
    curso_id: curso.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  const cargaHoraria = await CargaHoraria.find(carga.id)

  assert.equal(cargaHoraria.ano, 2021)
  assert.equal(cargaHoraria.semestre, 1)

  const curso2 = await Curso.create({
    ano_ingresso: 2020,
    semestre_ingresso: 2,
    ppc_id: ppc.id,

  })

  const carga2 = await Carga.create({
    curso_id: curso2.id,
    professor_id: professor.id,
    disciplina_id: disciplina.id,
  })

  const cargaHoraria2 = await CargaHoraria.find(carga2.id)

  assert.equal(cargaHoraria2.ano, 2021)
  assert.equal(cargaHoraria2.semestre, 2)
})
