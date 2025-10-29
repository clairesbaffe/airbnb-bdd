const express = require("express");
const router = express.Router();

const {
  get_all_comments,
  get_comment_by_id,
  insert_comment,
  update_comment,
  delete_comment_by_id,
} = require("../controllers/comments.controller");

router.get("/", get_all_comments);
router.get("/:commentId", get_comment_by_id);
router.post("/", insert_comment);
router.patch("/:commentId", update_comment);
router.delete("/:commentId", delete_comment_by_id);

module.exports = router;