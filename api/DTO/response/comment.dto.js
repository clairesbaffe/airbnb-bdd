const commentDto = (comment) => {
  return {
    id: comment._id,
    userId: comment.userId,
    adId: comment.adId,
    comment: comment.comment,
    rating: comment.rating,
    date: comment.date,
  };
};

const commentsDto = (comments) => comments.map(commentDto);

module.exports = {
  commentDto,
  commentsDto,
};
