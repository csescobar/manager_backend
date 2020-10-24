const { Schema, model } = require("mongoose");

const CellMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    function: {
      type: String,
      default: 'Membro'
    },
    birth_date: {
      type: Date,
      required: true,
    },
    cell: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cell",
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = model("CellMember", CellMemberSchema);
