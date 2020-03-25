'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CursosSchema extends Schema {
  up() {
    this.table('cursos', (table) => {
      table.boolean('simulado').defaultTo(false)
    })
  }

  down() {
    this.table('cursos', (table) => {
      table.dropColumn('simulado')
    })
  }
}

module.exports = CursosSchema
