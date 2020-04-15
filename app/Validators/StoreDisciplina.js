'use strict'

class StoreDisciplina {
  get rules() {
    return {
      nome: 'required',
      periodo: 'required',
      duracao_aula: 'required',
      aulas_semana: 'required',
      ppc_id: 'required|exists:ppcs,id',
    }
  }

  get sanitizationRules() {
    return {
      periodo: 'to_int',
      duracao_aula: 'to_int',
      aulas_semana: 'to_int',
      ppc_id: 'to_int',
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
