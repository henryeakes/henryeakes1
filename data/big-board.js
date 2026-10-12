/**
 * NFL Draft big board
 *
 * A row is published only when `player` has a name. Leave `player` blank to
 * hide that row. Add another object to extend the board.
 *
 * rank     Optional. Shown as entered. If you leave it off, visible rows are
 *          numbered in order.
 * player   Prospect name. Required for the row to appear.
 * position QB, WR, OT, EDGE, CB, and so on.
 * school   College.
 * note     One-line scouting note. Optional.
 *
 * Example:
 * { rank: 1, player: "Prospect Name", position: "QB", school: "School", note: "One-line note." },
 */

export const bigBoard = [
  { rank: 1, player: "", position: "", school: "", note: "" },
  { rank: 2, player: "", position: "", school: "", note: "" },
  { rank: 3, player: "", position: "", school: "", note: "" },
  { rank: 4, player: "", position: "", school: "", note: "" },
  { rank: 5, player: "", position: "", school: "", note: "" },
];
