const { Schema, model } = require("mongoose");

const EventsSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },

  notes: {
    type: String,
  },
  //Notes for each user
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
//! Cambiamos el serializador de json según las props que necesitamos
EventsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Events", EventsSchema);
