const {
  getAllCommentsByAdId,
  getCommentById,
  insertComment,
  updateComment,
  deleteCommentById,
} = require("../services/comments.service");
const { commentsDto, commentDto } = require("../DTO/response/comment.dto");
const {
  insertCommentDto,
  updateCommentDto,
} = require("../DTO/requests/comment.dto");
const { updateAdRating } = require("../services/ads.service");

const get_all_comments_by_ad_id = async (req, res) => {
  try {
    const adId = req.params.adId;
    const comments = await getAllCommentsByAdId(adId);
    const data = commentsDto(comments);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const get_comment_by_id = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await getCommentById(commentId);
    const data = commentDto(comment);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const insert_comment = async (req, res) => {
  try {
    const commentData = insertCommentDto(req.body);

    const insertedId = await insertComment(commentData);
    const comment = await getCommentById(insertedId);

    await updateAdRating(commentData.adId, comment.rating);

    const data = commentDto(comment);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const update_comment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const commentData = updateCommentDto(req.body);

    await updateComment(commentId, commentData);
    const comment = await getCommentById(commentId);

    // TODO: update ad rating

    const data = commentDto(comment);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const delete_comment_by_id = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await deleteCommentById(commentId);

    // TODO: update ad rating

    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  get_all_comments_by_ad_id,
  get_comment_by_id,
  insert_comment,
  update_comment,
  delete_comment_by_id,
};
