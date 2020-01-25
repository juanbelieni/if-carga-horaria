'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargaHorariaSchema extends Schema {
  up() {
    this.raw('create view cargas_horarias as select c.id, professor_id, curso_id, disciplina_id, if(semestral, ano_ingresso + (periodo - 1) DIV 2, ano_ingresso + periodo - 1) as ano, if(semestral, (semestre_ingresso + periodo % 2) % 2 + 1, null) as semestre from cargas as c inner join disciplinas as d on c.disciplina_id = d.id inner join cursos on cursos.id = c.curso_id inner join ppcs on ppcs.id = cursos.ppc_id')
  }

  down() {
    this.raw('drop view cargas_horarias')
  }
}

module.exports = CargaHorariaSchema
