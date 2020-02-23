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
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return Database.table('cargas_horarias').select('*')
  }

  /**
   * Render a form to be used for creating a new carga.
   * GET cargas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new carga.
   * POST cargas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['curso_id', 'professor_id', 'disciplina_id'])

    return Carga.create(data)
  }

  /**
   * Display a single carga.
   * GET cargas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params, request, response, view,
  }) {
    const { id } = params
    return Database.table('cargas_horarias').where({ id }).first()
  }

  /**
   * Render a form to update an existing carga.
   * GET cargas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params, request, response, view,
  }) {
  }

  /**
   * Update carga details.
   * PUT or PATCH cargas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['curso_id', 'professor_id', 'disciplina_id'])
    const carga = await Carga.find(id)

    if (carga === null) {
      return response.status(404).send()
    }

    carga.merge(data)
    await carga.save()

    return carga
  }

  /**
   * Delete a carga with id.
   * DELETE cargas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params

    const carga = await Carga.find(id)

    if (carga === null) {
      return response.status(404).send()
    }

    await carga.delete()
    return response.status(200).send()
  }
}

module.exports = CargaController
