/**
 * Habitaciones.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    reservaciones: {
      collection: 'Reservaciones',
      via: 'idHabitacion'
    }
  },

  afterDestroy: function (destroyedRecords, cb) {
    Reservaciones.destroy({
      idHabitacion: _.pluck(destroyedRecords, 'id')
    }).exec(cb)
  }
};

