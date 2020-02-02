'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Curso extends Model {
  ppc() {
    return this.belongsTo('App/Models/Ppc')
  }

  cargas() {
    return this.hasMany('App/Models/Carga')
  }
}

module.exports = Curso
