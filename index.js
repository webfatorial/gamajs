// Core globals
global.GamaApi = require( './api' )
global.GamaModel = require( './models' )
global.Lib = require('./lib')

module.exports = class GamaCore {

  constructor( app, params ) {
    // Params globals
    global.Params = params || {}
    global.Body = ( Params.body ) ? JSON.parse( Params.body ) : {}
    global.Path = Params.pathParameters || {}

    // App Globals
    global.App = app || {}
    global.Api = App.api || {}

    // GamaPacks
    global.GamaPack = ( App.config && App.config.packs ) ? App.config.packs : {}
  }

  load() {
    const promises = []

    if ( GamaPack.router && App.routes )
      promises.push( GamaPack.router.load() )

    return Promise.all( promises )
  }

  static formatLambdaResponse( status, message, input ) {
    return {
      statusCode: status,
      body: JSON.stringify( {
        message: message,
        input: input,
      } ),
    }
  }

}
