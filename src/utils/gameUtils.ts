
import { toast } from "sonner";

export function calculateScore(cluesRevealed: number, guesses: number, startTime: Date): number {
  const timeBonus = Math.max(0, 100 - Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
  const clueBonus = Math.max(0, 500 - (cluesRevealed * 100));
  const guessBonus = Math.max(0, 500 - (guesses * 50));
  
  return clueBonus + guessBonus + timeBonus;
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Result copied to clipboard!");
  }).catch(err => {
    console.error("Could not copy text: ", err);
    toast.error("Could not copy to clipboard");
  });
}
