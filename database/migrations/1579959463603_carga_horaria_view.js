'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargaHorariaSchema extends Schema {
  up() {
    this.raw(
      'create view cargas_horarias as select '
        + 'c.id, '
        // Turma
        + 'concat(ppcs.nome, " ", ppcs.formacao, " - ", if(semestral, concat(ano_ingresso, "/", semestre_ingresso), ano_ingresso)) as turma, '
        // Professor
        + 'professores.nome as professor, '
        // Disciplina
        + 'd.nome as disciplina, '
        + 'if(semestral, ano_ingresso + (periodo + semestre_ingresso - 2) DIV 2, ano_ingresso + periodo - 1) as ano, '
        + 'if(semestral, (semestre_ingresso + periodo % 2) % 2 + 1, 0) as semestre, '
        + 'periodo, '
        + 'aulas_semana, '
        + 'duracao_aula, '
        + 'duracao_aula * aulas_semana as carga_horaria, '
        // Simulado
        + 'simulado, '
        // Ids
        + 'turmas.id as turma_id, '
        + 'professores.id as professor_id, '
        + 'd.id as disciplina_id '
        + 'from turmas inner join ppcs on turmas.ppc_id = ppcs.id '
        + 'inner join disciplinas as d on d.ppc_id = ppcs.id '
        + 'left outer join cargas as c on c.disciplina_id = d.id and c.turma_id = turmas.id '
        + 'left outer join professores on professores.id = c.professor_id '
        + 'order by `ano`, `semestre`, `turma`, `professor`, `disciplina` asc',
    )
  }

  down() {
    this.raw('drop view cargas_horarias')
  }
}

module.exports = CargaHorariaSchema
