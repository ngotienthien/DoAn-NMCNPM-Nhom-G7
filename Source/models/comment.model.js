const db = require("../utils/db");

const TBL_comment = "comment";

module.exports = {
  CommentWithIDpost: function(idPost){
      return db.load(`SELECT CM.Comment, CM.Date, US.FullName, US.UserName, US.avatar
      FROM ${TBL_comment} CM JOIN users US ON CM.IDUser = US.IDUser
      WHERE IDArticle = ${idPost}
      ORDER BY CM.Date DESC`);
  },
  NumOfAllCommentWithIdAuthor: async function(idAuthor){
    const result = await db.load(`SELECT COUNT(CM.Comment) as numOfComment
    FROM article art JOIN ${TBL_comment} CM ON art.IDArticle = CM.IDArticle JOIN users US ON US.IDUser = art.Writter
    WHERE US.IDUser = ${idAuthor}`);
    return result[0].numOfComment;
  },
  addComment: function(entity)
  {
      return db.add(TBL_comment, entity);
  },
  SingleCommentWithIdUserAndArticle: async function(idUser, idArticle){
      const result = await db.load(`SELECT US.FullName, US.UserName, US.Avatar, CM.Comment, DATE_FORMAT(CM.Date, "%M %d, %Y") as CmDate
      FROM ${TBL_comment} CM JOIN users US ON CM.IDUser = US.IDUser 
      WHERE CM.IDArticle = ${idArticle}  AND CM.IDUser = ${idUser}
      ORDER BY CM.Date DESC LIMIT 1`);
      return result[0];
  }
}