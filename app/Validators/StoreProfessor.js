'use strict'

class StoreProfessor {
  get rules() {
    return {
      nome: 'required',
      siape: 'required',
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
      'siape.required': 'Esse campo é obrigatório',
    }
  }
}

module.exports = StoreProfessor
