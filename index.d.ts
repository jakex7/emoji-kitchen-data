namespace EmojiKitchen {
  type Data = {
    emojis: { emoji: string; id: number }[];
    combinations: {
      id: number;
      emojiIds: number[];
    }[];
    categories: {
      name: string;
      startEmojiId: number;
    }[];
  };

  type DataByEmoji = {
    [emoji: string]: {
      category: string;
      combinations: string[];
    };
  };
}
