'use strict'

class StoreCarga {
  get rules() {
    return {
      curso_id: 'required|exists:cursos,id',
      professor_id: 'required|exists:professores,id',
      disciplina_id: 'required|exists:disciplina,id',
    }
  }

  get sanitizationRules() {
    return {
      curso_id: 'to_int',
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
      'curso_id.required': 'Esse campo é obrigatório',
      'curso_id.exists': 'Esse curso não existe no banco de dados',
      'professor_id.required': 'Esse campo é obrigatório',
      'professor_id.exists': 'Esse(a) professor(a) não existe no banco de dados',
      'disciplina_id.required': 'Esse campo é obrigatório',
      'disciplina_id.exists': 'Essa disciplina não existe no banco de dados',
    }
  }
}

module.exports = StoreCarga
