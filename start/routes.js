'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.resource('ppcs', 'PpcController').validator(
  new Map([[['ppcs.store'], ['StorePpc']]]),
)

Route.resource('disciplinas', 'DisciplinaController').validator(
  new Map([[['disciplinas.store'], ['StoreDiscplina']]]),
)

Route.resource('cursos', 'CursoController').validator(
  new Map([[['cursos.store'], ['StoreCurso']]]),
)

Route.resource('professores', 'ProfessorController').validator(
  new Map([[['professores.store'], ['StoreProfessor']]]),
)

Route.resource('cargas', 'CargaController').validator(
  new Map([[['cargas.store'], ['StoreCarga']]]),
)
