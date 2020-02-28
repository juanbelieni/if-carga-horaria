'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

class RelatorioController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async professores({ request }) {
    const { id, ano, semestre } = request.only(['id', 'ano', 'semestre'])

    if (id && ano && semestre) {
      return Database.table('cargas_horarias').select('*')
        .where({
          professor_id: id,
          ano,
        })
        .whereIn('semestre', [semestre, null])
    }

    return []
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async cursos({ request }) {
    const { id } = request.only(['id'])

    if (id) {
      return Database.table('cargas_horarias').select('*').orderBy('periodo').where('curso_id', id)
    }

    return []
  }
}

module.exports = RelatorioController
