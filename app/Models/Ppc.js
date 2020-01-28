'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ppc extends Model {
  cursos() {
    return this.hasMany('App/Models/Curso')
  }

  disciplinas() {
    return this.hasMany('App/Models/Disciplina')
  }
}

module.exports = Ppc
