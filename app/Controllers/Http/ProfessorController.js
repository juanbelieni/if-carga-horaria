'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Professor = use('App/Models/Professor')

class ProfessorController {
  /**
   * Show a list of all professors.
   * GET professors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return Professor.all()
  }

  /**
   * Render a form to be used for creating a new professor.
   * GET professors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new professor.
   * POST professors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['nome', 'siape'])

    return Professor.create(data)
  }

  /**
   * Display a single professor.
   * GET professors/:id
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
    return Professor.find(id)
  }

  /**
   * Render a form to update an existing professor.
   * GET professors/:id/edit
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
   * Update professor details.
   * PUT or PATCH professors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['nome', 'siape'])
    const professor = await Professor.find(id)

    if (professor === null) {
      return response.status(404).send()
    }

    professor.merge(data)
    await professor.save()

    return professor
  }

  /**
   * Delete a professor with id.
   * DELETE professors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params

    const professor = await Professor.find(id)

    if (professor === null) {
      return response.status(404).send()
    }

    await professor.delete()
    return response.status(200).send()
  }
}

module.exports = ProfessorController
