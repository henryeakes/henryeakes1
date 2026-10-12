export default function BigBoardList({ rows, compact = false }) {
  if (!rows.length) return null;

  return (
    <ol className={compact ? "mini-board" : "board-list"}>
      {rows.map((row) => (
        <li className="board-row" key={`${row.rank}-${row.player}`}>
          <span className="rank">{row.rank}</span>
          <div className="who">
            <span className="player">{row.player}</span>
            {row.position || row.school ? (
              <span className="board-meta">
                {row.position}
                {row.position && row.school ? " · " : ""}
                {row.school}
              </span>
            ) : null}
          </div>
          {!compact && row.note ? <p className="note">{row.note}</p> : null}
        </li>
      ))}
    </ol>
  );
}
