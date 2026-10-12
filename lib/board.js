import { bigBoard } from "../data/big-board";

export function getBigBoard() {
  const visible = (Array.isArray(bigBoard) ? bigBoard : []).filter((row) =>
    String(row?.player || "").trim()
  );

  return visible.map((row, index) => {
    const rank = Number(row.rank);
    return {
      rank: Number.isFinite(rank) && rank > 0 ? rank : index + 1,
      player: String(row.player).trim(),
      position: String(row.position || "").trim(),
      school: String(row.school || "").trim(),
      note: String(row.note || "").trim(),
    };
  });
}
