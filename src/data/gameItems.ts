
import { KpopItem } from "../types/game";

export const gameItems: KpopItem[] = [
  {
    id: "blackpink-lisa",
    type: "idol",
    name: "Lisa (BLACKPINK)",
    image: "/lisa.jpg", // We'll use placeholder images for now
    category: "Female Idol",
    debutYear: 2016,
    clues: [
      { type: "basic", text: "This idol debuted in 2016", order: 1 },
      { type: "initials", text: "Their name starts with 'L'", order: 2 },
      { type: "company", text: "They're from YG Entertainment", order: 3 },
      { type: "nationality", text: "They are from Thailand", order: 4 },
      { type: "trivia", text: "Known for incredible dancing skills", order: 5 }
    ]
  },
  {
    id: "bts",
    type: "group",
    name: "BTS",
    image: "/bts.jpg", // We'll use placeholder images for now
    category: "Boy Group",
    debutYear: 2013,
    clues: [
      { type: "basic", text: "This group debuted in 2013", order: 1 },
      { type: "initials", text: "Their name has 3 letters", order: 2 },
      { type: "company", text: "They're from HYBE (formerly BigHit)", order: 3 },
      { type: "debut", text: "Their debut song was 'No More Dream'", order: 4 },
      { type: "trivia", text: "They have spoken at the United Nations", order: 5 }
    ]
  },
  {
    id: "dynamite",
    type: "song",
    name: "Dynamite",
    image: "/dynamite.jpg", // We'll use placeholder images for now
    category: "Song",
    debutYear: 2020,
    clues: [
      { type: "basic", text: "This song was released in 2020", order: 1 },
      { type: "initials", text: "The title starts with 'D'", order: 2 },
      { type: "company", text: "It's by a group from HYBE", order: 3 },
      { type: "trivia", text: "It was the first song by this group to reach #1 on Billboard Hot 100", order: 4 },
      { type: "trivia", text: "It's entirely in English", order: 5 }
    ]
  }
];

export function getRandomGameItem(): KpopItem {
  const today = new Date();
  const seed = today.getDate() + (today.getMonth() + 1) * 100 + today.getFullYear() * 10000;
  const randomIndex = seed % gameItems.length;
  return gameItems[randomIndex];
}

export function getDailyGameItem(): KpopItem {
  // For now, we'll just return a random item
  // In a real implementation, this would use the current date to select
  return getRandomGameItem();
}
