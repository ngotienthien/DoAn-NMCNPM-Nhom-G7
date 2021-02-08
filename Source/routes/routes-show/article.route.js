const express = require("express");
const articleModel = require("../../models/article.model");
const tagModel = require("../../models/tag.model");
const commentModel = require("../../models/comment.model");
const router = express.Router();

router.post("/comment", async function(req, res) {
  var info = "";
  try{
    info = JSON.parse(req.body.info);
  }
  catch (error)
  {
    console.error(error.message);
  }
  const idUser = req.user.IDUser;
  const entity = {
    IDArticle: info.dataToSend.idPost,
    IDUser: idUser,
    Date: new Date(),
    Comment: info.dataToSend.comment
  }
  await commentModel.addComment(entity);
  const Comment = await commentModel.SingleCommentWithIdUserAndArticle(idUser, info.dataToSend.idPost);
  res.status(200).send(Comment);
});

router.post("/uptoRank", async function(req, res) {
  const idPost = req.body.idPost;
  await articleModel.UpRanks(idPost);
  const Row = await articleModel.GetLikeByID(idPost);
  res.status(200).send(Row[0]);
});



module.exports = router;
