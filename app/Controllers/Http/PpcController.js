/* eslint-disable no-unused-vars */

'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Ppc = use('App/Models/Ppc')

const Database = use('Database')

class PpcController {
  /**
   * Show a list of all ppcs.
   * GET ppcs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const {
      page, perPage, nome, formacao, semestral, ano,
    } = request.only(['page', 'perPage', 'nome', 'formacao', 'semestral', 'ano'])

    const data = Ppc
      .query()
      .select('*', Database.raw('CONCAT(ppcs.nome, " ", ppcs.formacao, " ", ppcs.ano) as ppc'))
      .where((query) => {
        if (nome) {
          query.where('nome', 'like', `%${nome}%`)
        } if (formacao) {
          query.whereIn('formacao', formacao)
        } if (semestral) {
          query.whereIn('semestral', semestral)
        } if (ano) {
          query.where('ano', 'like', `%${ano}%`)
        }
      })

    return (page && perPage) ? data.paginate(page, perPage) : data.fetch()
  }

  /**
   * Create/save a new ppc.
   * POST ppcs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const data = request.only(['nome', 'formacao', 'duracao', 'ano', 'semestral'])

    return Ppc.create(data)
  }

  /**
   * Display a single ppc.
   * GET ppcs/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    const { id } = params
    return Ppc.find(id)
  }

  /**
   * Update ppc details.
   * PUT or PATCH ppcs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['nome', 'formacao', 'duracao', 'ano', 'semestral'])
    const ppc = await Ppc.find(id)

    if (ppc === null) {
      return response.status(404).send()
    }

    ppc.merge(data)
    await ppc.save()

    return ppc
  }

  /**
   * Delete a ppc with id.
   * DELETE ppcs/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params

    const ppc = await Ppc.find(id)

    if (ppc === null) {
      return response.status(404).send()
    }

    await ppc.delete()
    return response.status(200).send()
  }
}

module.exports = PpcController
