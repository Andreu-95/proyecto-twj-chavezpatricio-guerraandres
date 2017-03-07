/**
 * Reservaciones.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    idHabitacion: {
      model: 'Habitaciones',
      required: true
    },
    clientes: {
      collection: 'Clientes',
      via: 'idReservacion'
    }
  },

  afterDestroy: function (destroyedRecords, cb) {
    Clientes.destroy({
      idReservacion: _.pluck(destroyedRecords, 'id')
    }).exec(cb)
  }
};

