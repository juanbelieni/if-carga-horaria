'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Disciplina = use('App/Models/Disciplina')

/**
 * Resourceful controller for interacting with disciplinas
 */
class DisciplinaController {
  /**
   * Show a list of all disciplinas.
   * GET disciplinas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const {
      periodo, ppc_id, page, perPage,
    } = request.only(['periodo', 'ppc_id', 'page', 'perPage'])

    const data = Disciplina
      .query()
      .where((query) => {
        if (periodo) {
          query.where('periodo', periodo)
        } if (ppc_id) {
          query.where('ppc_id', ppc_id)
        }
      })
      .orderByRaw(['ppc_id', 'periodo', 'nome'])

    return (page && perPage) ? data.paginate(page, perPage) : data.fetch()
  }

  /**
   * Create/save a new disciplina.
   * POST disciplinas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const data = request.only(['nome', 'periodo', 'duracao_aula', 'aulas_semana', 'ppc_id'])

    return Disciplina.create(data)
  }

  /**
   * Display a single disciplina.
   * GET disciplinas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const { id } = params
    return Disciplina.find(id)
  }

  /**
   * Update disciplina details.
   * PUT or PATCH disciplinas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['nome', 'periodo', 'duracao_aula', 'aulas_semana', 'ppc_id'])
    const disciplina = await Disciplina.find(id)

    if (disciplina === null) {
      return response.status(404).send()
    }

    disciplina.merge(data)
    await disciplina.save()

    return disciplina
  }

  /**
   * Delete a disciplina with id.
   * DELETE disciplinas/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params

    const disciplina = await Disciplina.find(id)

    if (disciplina === null) {
      return response.status(404).send()
    }

    await disciplina.delete()
    return response.status(200).send()
  }
}

module.exports = DisciplinaController
