'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplinaSchema extends Schema {
  up() {
    this.create('disciplinas', (table) => {
      table.increments()
      table.string('nome').notNullable().collate('utf8_unicode_ci')
      table.integer('periodo').unsigned().notNullable()
      table.integer('duracao_aula').unsigned().notNullable()
      table.integer('aulas_semana').unsigned().notNullable()
      table.integer('ppc_id').unsigned().references('id').inTable('ppcs')
        .notNullable()
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('disciplinas')
  }
}

module.exports = DisciplinaSchema
