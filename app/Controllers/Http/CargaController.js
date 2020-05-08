'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Carga = use('App/Models/Carga')

const Database = use('Database')

/**
 * Resourceful controller for interacting with cargas
 */
class CargaController {
  /**
   * Show a list of all cargas.
   * GET cargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const {
      page, perPage, turma_id, disciplina_id, periodo,
    } = request.only(['page', 'perPage', 'turma_id', 'disciplina_id', 'periodo'])

    const q = Database
      .table('cargas_horarias')
      .where((query) => {
        if (turma_id) {
          query.where('turma_id', turma_id)
        } if (periodo) {
          query.where('periodo', periodo)
        } if (disciplina_id) {
          query.where('disciplina_id', disciplina_id)
        }
      }).select('*')

    return (page && perPage) ? q.paginate(page, perPage) : q
  }

  /**
   * Create/save a new carga.
   * POST cargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const { turma_id, professor_id, disciplina_id } = request.only(['turma_id', 'professor_id', 'disciplina_id'])

    const carga = await Carga.findOrNew({ turma_id, disciplina_id })
    carga.professor_id = professor_id

    return carga.save()
  }
}

module.exports = CargaController
