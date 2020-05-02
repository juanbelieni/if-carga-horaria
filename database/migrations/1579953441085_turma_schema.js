'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TurmaSchema extends Schema {
  up() {
    this.create('turmas', (table) => {
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
    this.drop('turmas')
  }
}

module.exports = TurmaSchema
