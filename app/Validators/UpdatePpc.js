'use strict'

class StorePpc {
  get rules() {
    return {
      ano: 'year',
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
      'ano.year': 'Insira um ano válido',
    }
  }
}

module.exports = StorePpc
