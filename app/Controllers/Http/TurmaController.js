'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Turma = use('App/Models/Turma')

const Database = use('Database')

/**
 * Resourceful controller for interacting with turmas
 */
class TurmaController {
  /**
   * Show a list of all turmas.
   * GET turmas
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
      .table('turmas')
      .select('turmas.*', 'ppcs.duracao', 'ppcs.semestral', Database.raw('CONCAT(ppcs.nome, " ", ppcs.formacao, " ", ppcs.ano) as ppc'))
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
   * Render a form to be used for creating a new turma.
   * GET turmas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/sarve a new turma.
   * POST turmas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['ano_ingresso', 'semestre_ingresso', 'ppc_id'])

    return Turma.create(data)
  }

  /**
   * Display a single turma.
   * GET turmas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const { id } = params

    return Database
      .table('turmas')
      .select('turmas.*', 'ppcs.duracao', 'ppcs.semestral', Database.raw('CONCAT(ppcs.nome, " ", ppcs.formacao, " ", ppcs.ano) as ppc'))
      .join('ppcs', 'ppcs.id', 'ppc_id')
      .where('turmas.id', id)
      .first()
  }

  /**
   * Render a form to update an existing turma.
   * GET turmas/:id/edit
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
   * Update turma details.
   * PUT or PATCH turmas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['ano_ingresso', 'semestre_ingresso', 'ppc_id'])
    const turma = await Turma.find(id)

    if (turma === null) {
      return response.status(404).send()
    }

    turma.merge(data)
    await turma.save()

    return turma
  }

  /**
   * Delete a turma with id.
   * DELETE turmas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params

    const turma = await Turma.find(id)

    if (turma === null) {
      return response.status(404).send()
    }

    await turma.delete()
    return response.status(200).send()
  }
}

module.exports = TurmaController
