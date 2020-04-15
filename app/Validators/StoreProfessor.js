'use strict'

class StoreProfessor {
  get rules() {
    return {
      nome: 'required',
      siape: 'required',
    }
  }

  get sanitizationRules() {
    return {
      siape: 'to_int',
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
      'siape.required': 'Esse campo é obrigatório',
    }
  }
}

module.exports = StoreProfessor
