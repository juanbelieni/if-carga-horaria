'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargaSchema extends Schema {
  up() {
    this.create('cargas', (table) => {
      table.increments()
      table.integer('curso_id').unsigned().references('id').inTable('cursos')
        .notNullable()
        .onDelete('CASCADE')
      table.integer('disciplina_id').unsigned().references('id').inTable('disciplinas')
        .notNullable()
        .onDelete('CASCADE')
      table.integer('professor_id').unsigned().references('id').inTable('professores')
        .notNullable()
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('cargas')
  }
}

module.exports = CargaSchema
