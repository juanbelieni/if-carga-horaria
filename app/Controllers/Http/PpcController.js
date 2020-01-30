/* eslint-disable no-unused-vars */

'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Ppc = use('App/Models/Ppc')

class PpcController {
  /**
   * Show a list of all ppcs.
   * GET ppcs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return Ppc.all()
  }

  /**
   * Render a form to be used for creating a new ppc.
   * GET ppcs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {

  }

  /**
   * Create/save a new ppc.
   * POST ppcs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['nome', 'formacao', 'duracao', 'ano', 'semestral'])

    return Ppc.create(data)
  }

  /**
   * Display a single ppc.
   * GET ppcs/:id
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
    return Ppc.find(id)
  }

  /**
   * Render a form to update an existing ppc.
   * GET ppcs/:id/edit
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
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
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
