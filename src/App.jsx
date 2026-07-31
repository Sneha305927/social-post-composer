import { useState } from "react";
import "./App.css";

const platforms = [
  {
    name: "Twitter (X)",
    icon: "🐦",
    limit: 280,
    color: "#1DA1F2",
  },
  {
    name: "Instagram",
    icon: "📸",
    limit: 2200,
    color: "#E1306C",
  },
  {
    name: "Facebook",
    icon: "📘",
    limit: 63206,
    color: "#1877F2",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    limit: 3000,
    color: "#0A66C2",
  },
];

export default function App() {
  const [post, setPost] = useState("");
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState(null);

  const togglePlatform = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((p) => p !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const validPlatforms = selected.filter((name) => {
    const p = platforms.find((x) => x.name === name);
    return post.length <= p.limit;
  });

  const publishPost = () => {
    if (selected.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    if (validPlatforms.length !== selected.length) {
      alert("Fix validation errors before publishing.");
      return;
    }

    alert(
      "🎉 Post validated successfully!\n\nDemo only - no actual publishing performed."
    );
  };

  return (
    <div className="container">
      <div className="card">

        <h1>🚀 SocialSync</h1>

        <p className="subtitle">
          Create your content once • Validate instantly • Publish confidently
        </p>

        <textarea
          placeholder="What's happening today?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <label className="upload">
          📷 Attach Media
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(URL.createObjectURL(e.target.files[0]))
            }
          />
        </label>

        {image && (
          <img
            className="preview"
            src={image}
            alt="preview"
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

              {platform.icon} {platform.name}
            </label>
          ))}
        </div>

        <div className="results">
          {selected.map((platformName) => {
            const platform = platforms.find(
              (p) => p.name === platformName
            );

            const percentage = Math.min(
              (post.length / platform.limit) * 100,
              100
            );

            const valid = post.length <= platform.limit;

            return (
              <div
                key={platform.name}
                className="platformCard"
                style={{
                  borderTop: `5px solid ${platform.color}`,
                }}
              >
                <h3>
                  {platform.icon} {platform.name}
                </h3>

                <p>
                  {post.length} / {platform.limit} characters
                </p>

                <div className="progress">
                  <div
                    className="progressFill"
                    style={{
                      width: `${percentage}%`,
                      background: platform.color,
                    }}
                  />
                </div>

                {valid ? (
                  <p className="success">
                    ✔ Ready to Publish
                  </p>
                ) : (
                  <p className="error">
                    ✖ Exceeded by{" "}
                    {post.length - platform.limit} characters
                  </p>
                )}

                {platform.name === "Instagram" &&
                  !post.includes("#") && (
                    <p className="warning">
                      ⚠ Add hashtags to improve reach.
                    </p>
                  )}
              </div>
            );
          })}
        </div>

        <div className="summary">
          <h2>Validation Summary</h2>

          <p>
            Platforms Selected :
            <strong> {selected.length}</strong>
          </p>

          <p>
            Ready :
            <strong> {validPlatforms.length}</strong>
          </p>

          <p>
            Needs Attention :
            <strong>
              {" "}
              {selected.length - validPlatforms.length}
            </strong>
          </p>
        </div>

        <button onClick={publishPost}>
          🚀 Publish
        </button>

      </div>
    </div>
  );
}