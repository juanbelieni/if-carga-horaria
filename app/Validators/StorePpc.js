'use strict'

class StorePpc {
  get rules() {
    return {
      nome: 'required',
      formacao: 'required',
      duracao: 'required',
      ano: 'required|year',
    }
  }

  get sanitizationRules() {
    return {
      duracao: 'to_int',
      ano: 'to_int',
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
      'formacao.required': 'Esse campo é obrigatório',
      'duracao.required': 'Esse campo é obrigatório',
      'ano.required': 'Esse campo é obrigatório',
      'ano.year': 'Insira um ano válido',
    }
  }
}

module.exports = StorePpc
