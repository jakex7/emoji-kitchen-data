# Emoji Kitchen Data

This library provides a up-to-date version of emoji combinations from Google's Emoji Kitchen in JSON format, for easier use and analysis. [Learn more](https://emojipedia.org/emoji-kitchen).

## Details

To save space, these files mostly store unique combinations. Therefore, to check if a specific combination exists, you need to look for it in both possible orders (e.g., 😃 and 😀 are stored only as the pair 😀 and 😃).

## Files

`data.json`:

```json
{
  "emojis": [
    {
      "emoji": "😀",
      "id": 1
    },
    {
      "emoji": "😃",
      "id": 2
    }
  ],
  "combinations": [
    {
      "id": 1,
      "emojiIds": [
        1, 2, 3
        // ...
      ]
    },
    {
      "id": 2,
      "emojiIds": [
        2, 3, 4
        // ...
      ]
    }
  ],
  "categories": [
    {
      "name": "Smileys and emotions",
      "startEmojiId": 1
    },
    {
      "name": "People",
      "startEmojiId": 163
    }
    // ...
  ]
}
```

`data-by-emoji.json`:

```json
{
  "😀": {
    "category": "Smileys and emotions",
    "combinations": [
      "😀",
      "😃",
      "😄"
      // ...
    ]
  },
  "😃": {
    "category": "Smileys and emotions",
    "combinations": [
      "😃",
      "😄",
      "😁"
      // ...
    ]
  }
  // ...
}
```

## Development

1. `yarn install`

Install dependencies.

2. `.env`

Copy `.env.example` to `.env` and update the API URL.

2. `yarn run update`

Executes all commands in order:

- `yarn run download`: downloads the latest data dump from the API,
- `yarn run convert`: converts downloaded file from `.pb` to human readable `.json`,
- `yarn run process`: process the file to `data.json` and `data-by-emoji.json`.

## License

The source code for this project is open-sourced under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Disclaimer

This project is not affiliated with or officially endorsed by Google.
