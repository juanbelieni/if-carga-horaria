'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Curso = use('App/Models/Curso')

const Database = use('Database')

/**
 * Resourceful controller for interacting with cursos
 */
class CursoController {
  /**
   * Show a list of all cursos.
   * GET cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const {
      page, perPage, semestre_ingresso, ano_ingresso,
    } = request.only(['page', 'perPage', 'semestre_ingresso', 'ano_ingresso'])

    return Database
      .table('cursos')
      .select('cursos.*', 'ppcs.duracao', 'ppcs.semestral', Database.raw('CONCAT(ppcs.nome, " ", ppcs.formacao, " ", ppcs.ano) as ppc'))
      .where((query) => {
        if (semestre_ingresso) {
          query
            .whereIn('semestre_ingresso', semestre_ingresso)
        } if (ano_ingresso) {
          query.where('ano_ingresso', 'like', `%${ano_ingresso}%`)
        }
      })
      .join('ppcs', 'ppcs.id', 'ppc_id')
      .paginate(page, perPage)
  }

  /**
   * Render a form to be used for creating a new curso.
   * GET cursos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/sarve a new curso.
   * POST cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['ano_ingresso', 'semestre_ingresso', 'ppc_id'])

    return Curso.create(data)
  }

  /**
   * Display a single curso.
   * GET cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const { id } = params

    return Database
      .table('cursos')
      .select('cursos.*', 'ppcs.duracao', 'ppcs.semestral', Database.raw('CONCAT(ppcs.nome, " ", ppcs.formacao, " ", ppcs.ano) as ppc'))
      .join('ppcs', 'ppcs.id', 'ppc_id')
      .where('cursos.id', id)
      .first()
  }

  /**
   * Render a form to update an existing curso.
   * GET cursos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params, request, response, view,
  }) {}

  /**
   * Update curso details.
   * PUT or PATCH cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['ano_ingresso', 'semestre_ingresso', 'ppc_id'])
    const curso = await Curso.find(id)

    if (curso === null) {
      return response.status(404).send()
    }

    curso.merge(data)
    await curso.save()

    return curso
  }

  /**
   * Delete a curso with id.
   * DELETE cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params

    const curso = await Curso.find(id)

    if (curso === null) {
      return response.status(404).send()
    }

    await curso.delete()
    return response.status(200).send()
  }
}

module.exports = CursoController
