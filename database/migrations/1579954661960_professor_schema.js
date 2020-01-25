'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorSchema extends Schema {
  up() {
    this.create('professores', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.bigInteger('siape').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('professores')
  }
}

module.exports = ProfessorSchema
