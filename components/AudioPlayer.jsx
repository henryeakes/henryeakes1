export default function AudioPlayer({ src, title }) {
  if (!src) return null;
  const local = src.startsWith("/");

  return (
    <figure className="player">
      <figcaption className="sr-only">{title}</figcaption>
      <audio controls preload="metadata" src={src}>
        <a href={src}>Listen to {title}</a>
      </audio>
      <a className="player-download" href={src} {...(local ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}>
        Download audio
      </a>
    </figure>
  );
}
