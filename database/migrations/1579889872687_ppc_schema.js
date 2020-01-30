'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PpcSchema extends Schema {
  up() {
    this.create('ppcs', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('formacao').notNullable()
      table.integer('duracao').unsigned().notNullable()
      table.integer('ano').unsigned().notNullable()
      table.boolean('semestral').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('ppcs')
  }
}

module.exports = PpcSchema
