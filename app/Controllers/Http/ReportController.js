'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database')

const fieldsNames = {
  professor: 'Professor',
  disciplina: 'Disciplina',
  // carga_horaria: 'Carga horária',
  // aulas_semana: 'Quantidade de aulas por semana',
  // duracao_aula: 'Duração da aula',
  turma: 'Turma',
  // periodo: 'Período',
  // ano_semestre: 'Ano/semestre',
}

const fieldsQueries = {
  disciplina: 'disciplina as Disciplina',
  professor: 'professor as Professor',
  carga_horaria: 'concat(sum(carga_horaria), " minutos") as "Carga horária"',
  turma: 'turma as Turma',
  periodo: 'concat(periodo, "º ", if(semestre, "semestre", "ano")) as Período',
  ano_semestre: 'concat(ano, if(semestre, concat("/", semestre), "")) as "Ano/semestre"',
  aulas_semana: 'concat(aulas_semana, " aulas") as "Quantidade de aulas por semana"',
  duracao_aula: 'concat(duracao_aula, " minutos") as "Duração da aula"',
}

class ReportController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async cargaHoraria({ request }) {
    const { fields, turmas, professores } = request.only(['fields', 'turmas', 'professores'])

    const select = [
      ...fields.map((field) => fieldsQueries[field]),
      Database.raw('concat(convert(sum(carga_horaria), char(50)), " minutos") as "Carga horária"'),
    ]

    return Database
      .table('cargas_horarias')
      .select(select)
      .whereNotNull('professor')
      .where((query) => {
        if (typeof turmas === 'object') {
          query.whereIn('turma_id', turmas)
        } if (typeof professores === 'object') {
          query.whereIn('professor_id', professores)
        }
        query.where('ano', 2020)
        query.whereIn('semestre', [0, 1])
      })
      .groupBy(fields.map((field) => `${field}_id`))
  }
}

module.exports = ReportController
