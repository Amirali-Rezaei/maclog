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
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    articleId: {
      type: String,
      required: true,
      ref: "Article",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
