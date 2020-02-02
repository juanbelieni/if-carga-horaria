'use strict'

class StoreDisciplina {
  get rules() {
    return {
      nome: 'required',
      periodo: 'required',
      duracao_aula: 'required',
      aula_semana: 'required',
      ppc_id: 'required|exists:ppcs,id',
    }
  }

  async fails(errorMessages) {
    this.ctx.session
      .withErrors(errorMessages)

    return this.ctx.response.redirect('back')
  }

  get messages() {
    return {
      'nome.required': 'Esse campo é obrigatório',
      'periodo.required': 'Esse campo é obrigatório',
      'duracao_aula.required': 'Esse campo é obrigatório',
      'aula_semana.required': 'Esse campo é obrigatório',
      'ppc_id.required': 'Esse campo é obrigatório',
      'ppc_id.exists': 'Esse PPC não existe no banco de dados',
    }
  }
}

module.exports = StoreDisciplina
