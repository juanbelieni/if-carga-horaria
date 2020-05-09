'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database')

class ReportController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async carga_horaria({ request }) {
    const { fields, turmas, professores } = request.only(['fields', 'turmas', 'professores'])
    const fieldsQueries = {
      disciplina: 'disciplina as Disciplina',
      professor: 'professor as Professor',
      carga_horaria: "carga_horaria as 'Carga horária em minutos'",
      turma: 'turma as Turma',
      periodo: 'concat(periodo, "º ", if(semestre, "semestre", "ano")) as Periodo',
      ano_semestre: 'concat(ano, if(semestre, concat("/", semestre), "")) as "Ano/semestre"',
    }

    return Database
      .table('cargas_horarias')
      .select(fields.map((field) => Database.raw(fieldsQueries[field])))
      .whereNotNull('professor')
      .orderBy(['ano', 'semestre', 'turma', 'professor', 'disciplina'])
      .where((query) => {
        if (typeof turmas === 'object') {
          query.whereIn('turma_id', turmas)
        } if (typeof professores === 'object') {
          query.whereIn('professor_id', professores)
        }
      })
  }
}

module.exports = ReportController
