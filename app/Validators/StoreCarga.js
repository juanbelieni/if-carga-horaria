'use strict'

class StoreCarga {
  get rules() {
    return {
      curso_id: 'required|exists:cursos,id',
      professor_id: 'required|exists:professores,id',
      disciplina_id: 'required|exists:disciplina,id',
    }
  }

  async fails(errorMessages) {
    this.ctx.session
      .withErrors(errorMessages)

    return this.ctx.response.redirect('back')
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
