export const metadata = { title: "Big Board | Henry Eakes" };

const BIG_BOARD = [
  { rank: 1, player: "Player Name", pos: "QB", school: "School", note: "Elite traits; franchise upside." },
  { rank: 2, player: "Player Name", pos: "WR", school: "School", note: "Separation + YAC monster." },
  { rank: 3, player: "Player Name", pos: "OT", school: "School", note: "Anchor + length; plug-and-play." },
  { rank: 4, player: "Player Name", pos: "EDGE", school: "School", note: "Explosive first step; bend." },
  { rank: 5, player: "Player Name", pos: "CB", school: "School", note: "Sticky coverage; ball skills." }
];

export default function BigBoard() {
  return (
    <main>
      <h2 style={{ margin: "0 0 12px" }}>NFL Draft Big Board</h2>
      <p style={{ color: "var(--muted)", marginTop: 0 }}>
        This is a starter board. Replace names/notes as you watch film.
      </p>

      <div className="article">
        <div className="prose" style={{ marginTop: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Rank", "Player", "Pos", "School", "Note"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BIG_BOARD.map((row) => (
                <tr key={row.rank}>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>{row.rank}</td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}><strong>{row.player}</strong></td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>{row.pos}</td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>{row.school}</td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: 14, color: "var(--muted)" }}>
            Next upgrade: add positions filters (QB/WR/OT/etc.) and tiers.
          </p>
        </div>
      </div>
    </main>
  );
}
