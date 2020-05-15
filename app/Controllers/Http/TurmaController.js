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
   */
  async index({ request }) {
    const {
      page, perPage, semestre_ingresso, ano_ingresso, simulado,
    } = request.only(['page', 'perPage', 'semestre_ingresso', 'ano_ingresso', 'simulado'])

    const data = Database
      .table('turmas')
      .select([
        'turmas.*',
        'ppcs.duracao',
        'ppcs.semestral',
        Database.raw('CONCAT(ppcs.nome, " ", ppcs.formacao, " ", ppcs.ano) as ppc'),
        Database.raw('concat(ppcs.nome, " ", ppcs.formacao, " - ", concat(ano_ingresso, if(semestral, concat("/", semestre_ingresso), ""))) as turma'),
      ])
      .where((query) => {
        if (simulado) {
          query.whereIn('simulado', simulado)
        } if (semestre_ingresso) {
          query.whereIn('semestre_ingresso', semestre_ingresso)
        } if (ano_ingresso) {
          query.where('ano_ingresso', 'like', `%${ano_ingresso}%`)
        }
      })
      .join('ppcs', 'ppcs.id', 'ppc_id')
      .orderBy(['ano_ingresso', 'semestre_ingresso', 'formacao', 'nome'])

    return (page && perPage) ? data.paginate(page, perPage) : data
  }

  /**
   * Create/sarve a new turma.
   * POST turmas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const data = request.only(['ano_ingresso', 'semestre_ingresso', 'ppc_id', 'simulado'])

    return Turma.create(data)
  }

  /**
   * Display a single turma.
   * GET turmas/:id
   *
   * @param {object} ctx
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
   * Update turma details.
   * PUT or PATCH turmas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['ano_ingresso', 'semestre_ingresso', 'ppc_id', 'simulado'])
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
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
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
