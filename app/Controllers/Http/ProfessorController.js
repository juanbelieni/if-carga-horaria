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
   */
  async index({ request }) {
    const {
      page, perPage, nome, siape,
    } = request.only(['page', 'perPage', 'nome', 'siape'])

    const data = Professor
      .query()
      .where((query) => {
        if (nome) {
          query.where('nome', 'like', `%${nome}%`)
        } if (siape) {
          query.where('siape', 'like', `%${siape}%`)
        }
      })
      .orderBy('nome')

    return (page && perPage) ? data.paginate(page, perPage) : data.fetch()
  }

  /**
   * Create/save a new professor.
   * POST professors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['nome', 'siape'])

    return Professor.create(data)
  }

  /**
   * Display a single professor.
   * GET professors/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    const { id } = params
    return Professor.find(id)
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
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
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
