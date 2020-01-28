'use strict'

class StorePpc {
  get rules() {
    return {
      nome: 'required',
      formacao: 'required',
      duracao: 'required',
      ano: 'required',
    }
  }

  async fails(errorMessages) {
    this.ctx.session
      .withErrors(errorMessages)

    return this.ctx.response.redirect('back')
  }

  get messages() {
    return {
      'name.required': 'Esse campo é obrigatório',
      'formacao.required': 'Esse campo é obrigatório',
      'duracao.required': 'Esse campo é obrigatório',
      'ano.required': 'Esse campo é obrigatório',
    }
  }
}

module.exports = StorePpc
