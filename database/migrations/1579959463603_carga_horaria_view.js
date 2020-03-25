'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargaHorariaSchema extends Schema {
  up() {
    this.raw(
      'create view cargas_horarias as select '
        + 'c.id, '
        // Curso
        + 'concat(ppcs.nome, " ", ppcs.formacao, " - ", if(semestral, concat(ano_ingresso, "/", semestre_ingresso), ano_ingresso)) as curso, '
        // Professor
        + 'professores.nome as professor, '
        // Disciplina
        + 'd.nome as disciplina, '
        + 'if(semestral, ano_ingresso + (periodo + semestre_ingresso - 2) DIV 2, ano_ingresso + periodo - 1) as ano, '
        + 'if(semestral, (semestre_ingresso + periodo % 2) % 2 + 1, null) as semestre, '
        + 'periodo, '
        + 'aulas_semana, '
        + 'duracao_aula, '
        + 'duracao_aula * aulas_semana as carga_horaria, '
        // Simulado
        + 'simulado, '
        // Ids
        + 'curso_id, '
        + 'professor_id, '
        + 'disciplina_id '
        + 'from cargas as c inner join disciplinas as d on c.disciplina_id = d.id '
        + 'inner join cursos on cursos.id = c.curso_id '
        + 'inner join ppcs on ppcs.id = cursos.ppc_id '
        + 'inner join professores on professores.id = c.professor_id '
        + 'order by c.id',
    )
  }

  down() {
    this.raw('drop view cargas_horarias')
  }
}

module.exports = CargaHorariaSchema
