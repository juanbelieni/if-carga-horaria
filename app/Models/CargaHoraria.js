'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CargaHoraria extends Model {
  static get table() {
    return 'cargas_horarias'
  }
}

module.exports = CargaHoraria
