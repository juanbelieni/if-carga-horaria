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

  async fails(errorMessages) {
    this.ctx.session
      .withErrors(errorMessages)

    return this.ctx.response.redirect('back')
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
