'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ppc extends Model {
  turmas() {
    return this.hasMany('App/Models/Turma')
  }

  disciplinas() {
    return this.hasMany('App/Models/Disciplina')
  }
}

module.exports = Ppc
