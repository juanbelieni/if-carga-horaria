'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database')

class ReportController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async cargaHoraria({ request }) {
    const {
      option, turmas, professores, ano, semestre,
    } = request.only(['option', 'turmas', 'professores', 'ano', 'semestre'])

    const report = Database
      .table('cargas_horarias')
      .whereNotNull('professor')

    switch (option) {
      case 'default':
        report
          .select([
            'professor as Professor',
            Database.raw('concat(convert(sum(carga_horaria), char(50)), " minutos") as "Carga horária"'),
            Database.raw('concat(periodo, "º ", if(semestre, "semestre", "ano")) as Período'),
            'turma as Turma',
          ])
          .groupBy(['professor_id', 'turma_id', 'periodo'])
          .orderBy(['professor'])
        break
      case 'simplified':
        report
          .select([
            'professor as Professor',
            Database.raw('concat(convert(sum(carga_horaria), char(50)), " minutos") as "Carga horária"'),
          ])
          .groupBy(['professor_id'])
          .orderBy(['professor'])
        break
      case 'detailed':
        report
          .select([
            'professor as Professor',
            Database.raw('concat(carga_horaria, " minutos") as "Carga horária"'),
            'disciplina as Disciplina',
            Database.raw('concat(aulas_semana, " aulas") as "Quantidade de aulas por semana"'),
            Database.raw('concat(duracao_aula, " minutos") as "Duração da aula"'),
            Database.raw('concat(periodo, "º ", if(semestre, "semestre", "ano")) as Período'),
            'turma as Turma',
          ])
        break
      default:
        report.select('*')
    }

    return report
      .where((query) => {
        if (typeof turmas === 'object') {
          query.whereIn('turma_id', turmas)
        } if (typeof professores === 'object') {
          query.whereIn('professor_id', professores)
        }
        query.where('ano', ano)
        query.whereIn('semestre', [0, semestre])
      })
  }
}

module.exports = ReportController
