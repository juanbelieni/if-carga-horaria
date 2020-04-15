'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CursoSchema extends Schema {
  up() {
    this.create('cursos', (table) => {
      table.increments()
      table.integer('ano_ingresso').unsigned().notNullable()
      table.integer('semestre_ingresso').unsigned().notNullable().defaultTo(0)
      table.boolean('simulado').notNullable().defaultTo(false)
      table.integer('ppc_id').unsigned().references('id').inTable('ppcs')
        .notNullable()
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('cursos')
  }
}

module.exports = CursoSchema
