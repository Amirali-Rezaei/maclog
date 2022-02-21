const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    writer: {
      type: String,
      required: true,
    },
    writerId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    articleId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
