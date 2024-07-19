import React from "react";
import { useState } from "react";

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPost, setEditedPost] = useState("");
  const [comment, setComment] = useState([]);
  const [commentingIndex, setCommentingIndex] = useState(null);

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostEditChange = (e) => {
    setEditedPost(e.target.value);
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    setPosts([...posts, { content: newPost, comments: [] }]);
    setNewPost("");
  };

  const handlePostDelete = (index) => {
    const newPost = [...posts];
    newPost.splice(index, 1);
    setPosts(newPost);
  };

  const handlePostEdit = (index) => {
    setEditingIndex(index);
    setEditedPost(posts[index].content);
  };

  const handleSavePostEdit = (e) => {
    e.preventDefault();
    const updatedPosts = [...posts];
    updatedPosts[editingIndex].content = editedPost;
    setPosts(updatedPosts);
    setEditingIndex(null);
    setEditedPost("");
  };

  const handlePostComment = (index) => {
    setCommentingIndex(index);
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    const updatePosts = [...posts];
    updatePosts[commentingIndex].comments.push(comment);

    setPosts(updatePosts);

    setComment("");
    setCommentingIndex(null);
  };

  const handlePostCommentChange = (e) => {
    setComment(e.target.value);
  };

  //Chiamate HTTP

  fetch("http://localhost:3000/forum", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  return (
    <div className="container-forum">
      <form>
        <h1 className="titolo-forum">Forum</h1>
        <textarea
          className="textarea-forum"
          placeholder="Inserici il tuo post qui"
          cols={"50"}
          rows={"5"}
          value={newPost}
          onChange={handleNewPostChange}
        />
        <button
          className="button-aggiungi"
          type="submit"
          onClick={handleAddPost}
        >
          Aggiungi
        </button>
      </form>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <textarea
                cols={"26"}
                rows={"5"}
                className="textarea-azioni"
                value={editedPost}
                onChange={handlePostEditChange}
              />
            ) : (
              <span>{post.content}</span>
            )}
            {editingIndex === index ? (
              <button className="button-forum" onClick={handleSavePostEdit}>
                Salva
              </button>
            ) : (
              <button
                className="button-forum"
                onClick={() => handlePostEdit(index)}
              >
                Modifica
              </button>
            )}
            <button
              className="button-forum"
              onClick={() => handlePostDelete(index)}
            >
              Cancella
            </button>

            <button
              className="button-forum"
              onClick={() => handlePostComment(index)}
            >
              Commenta
            </button>

            {commentingIndex === index && (
              <div>
                <textarea
                  cols={"26"}
                  className="textarea-azioni"
                  placeholder="Inserisci il tuo commento qui"
                  value={comment}
                  onChange={handlePostCommentChange}
                />
                <button className="button-forum" onClick={handleAddComment}>
                  Inserisci commento
                </button>
              </div>
            )}
            <ul>
              {post.comments.map((comment, commentIndex) => (
                <li key={commentIndex}>{comment}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
