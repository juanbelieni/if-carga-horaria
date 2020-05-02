'use strict'

class StoreCarga {
  get rules() {
    return {
      turma_id: 'required|exists:turmas,id',
      professor_id: 'required|exists:professores,id',
      disciplina_id: 'required|exists:disciplinas,id',
    }
  }

  get sanitizationRules() {
    return {
      turma_id: 'to_int',
      professor_id: 'to_int',
      disciplina_id: 'to_int',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get messages() {
    return {
      'turma_id.required': 'Esse campo é obrigatório',
      'turma_id.exists': 'Esse turma não existe no banco de dados',
      'professor_id.required': 'Esse campo é obrigatório',
      'professor_id.exists': 'Esse(a) professor(a) não existe no banco de dados',
      'disciplina_id.required': 'Esse campo é obrigatório',
      'disciplina_id.exists': 'Essa disciplina não existe no banco de dados',
    }
  }
}

module.exports = StoreCarga
