import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummery(postInfo.summery);
        });
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summery", summery);
    data.set("content", content);

    console.log("Updating post with ID:", id); // Log the post ID
    console.log("Request Body:", Object.fromEntries(data)); // Log the request body

    // Instead of using FormData
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, summery, content }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log("Post updated successfully!");
      setRedirect(true);
    } else {
      console.error("Error updating post:", response.statusText);
    }
  }

  // Redirect if needed
  useEffect(() => {
    if (redirect) {
      navigate(`/post/${id}`);
    }
  }, [redirect, id, navigate]);

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summery"
          placeholder="Summery"
          value={summery}
          onChange={(ev) => setSummery(ev.target.value)}
        />

        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "5px" }} type="submit">
          Update-Post
        </button>
      </form>
    </div>
  );
}
