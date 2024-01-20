import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        summery,
        content,
      }),
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={createNewPost} style={{ maxWidth: "600px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Summary" 
          value={summery}
          onChange={(ev) => setSummery(ev.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <Editor value={content} onChange={setContent} />

        <button style={{ marginTop: "15px", padding: "10px", backgroundColor: "#007BFF", color: "#FFF", border: "none", cursor: "pointer" }}>
          Create Post
        </button>
      </form>
    </div>
  );
}
