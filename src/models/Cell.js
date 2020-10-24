const { Schema, model } = require("mongoose");

const CellSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rede: {
      type: Number,
      required: true,
    },
    day_of_week: {
      type: Number,
      required: true,
    },
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
    company:
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
  },
  {
    timestamps: true,
  }
);


module.exports = model("Cell", CellSchema);
