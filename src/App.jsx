import { useState } from "react";
import "./App.css";

const platforms = [
  {
    name: "Twitter (X)",
    limit: 280,
    color: "#1DA1F2",
  },
  {
    name: "Instagram",
    limit: 2200,
    color: "#E1306C",
  },
  {
    name: "Facebook",
    limit: 63206,
    color: "#1877F2",
  },
  {
    name: "LinkedIn",
    limit: 3000,
    color: "#0A66C2",
  },
];

export default function App() {
  const [post, setPost] = useState("");
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState(null);

  const togglePlatform = (name) => {
    if (selected.includes(name))
      setSelected(selected.filter((p) => p !== name));
    else setSelected([...selected, name]);
  };

  return (
    <div className="container">

      <div className="card">

        <h1>📢 Multi Platform Post Composer</h1>

        <p className="subtitle">
          Create a single post and validate it for multiple platforms.
        </p>

        <textarea
          placeholder="What's on your mind?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <label className="upload">
          📷 Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              setImage(URL.createObjectURL(e.target.files[0]))
            }
          />
        </label>

        {image && (
          <img
            src={image}
            alt="preview"
            className="preview"
          />
        )}

        <h2>Select Platforms</h2>

        <div className="platforms">

          {platforms.map((platform) => (
            <label key={platform.name}>

              <input
                type="checkbox"
                checked={selected.includes(platform.name)}
                onChange={() => togglePlatform(platform.name)}
              />

              {platform.name}

            </label>
          ))}

        </div>

        <div className="results">

          {selected.map((platformName) => {
            const platform = platforms.find(
              (p) => p.name === platformName
            );

            const remaining =
              platform.limit - post.length;

            return (
              <div
                className="platformCard"
                key={platform.name}
                style={{
                  borderLeft: `6px solid ${platform.color}`,
                }}
              >

                <h3>{platform.name}</h3>

                <p>
                  Characters:
                  <strong>
                    {" "}
                    {post.length}/{platform.limit}
                  </strong>
                </p>

                {remaining >= 0 ? (
                  <p className="success">
                    ✔ Valid ({remaining} remaining)
                  </p>
                ) : (
                  <p className="error">
                    ✖ Exceeded by {-remaining} characters
                  </p>
                )}

                {platform.name === "Instagram" &&
                  !post.includes("#") && (
                    <p className="warning">
                      ⚠ Add hashtags for better engagement.
                    </p>
                  )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
