## Why Minesweeper/Games?

I love remaking bite-sized games like this. As a developer, I get told not to reinvent the wheel, but what if I am curious about how the wheel was made? There are probably hundreds of variations of this game, but to me, the fun part is getting into the thought process of how something was built algorithmically and the nuances of that problem.

## Bug Fixes (UI)

1. If a player clicks a cell, prevent them from setting it as a flag. (9/5/2024)
2. If a player sets a cell to a flag, prevent them from clicking it to expand it, until it's unflagged. (9/5/2024)
3. It's not a bug fix per se, but if you flag a mine at some point in the game and hit a mine to lose the game, show the player positions they flagged correctly. (9/30/2024)

## Game Considerations

This game has a lot of variations and possibilities. I will discuss things that were added in my implementation of this game that don't necessarily exist in the original version.

1. A feature that I thought would be neat is to limit the players's flag count, in the original version of this game, you could set as many flags as possible because the mine count was a hard-coded variable behind the scenes, but in my game, I allow players to set their mine count, so I believe it makes sense to control how many flags a player can set, that is proportional to the number of mines.

2. To add a bit more depth to the game, incase you set a cell to a flag, and happen to click an empty cell that interacts with that flagged cell, the spread operation ignores that flag. I think this feature makes the game more challenging, because a player needs to make sure the cell they flag is a mine, or it could hurt them in the long run.

## Features

1. TBD

Play Game Here: [github.io](https://classbabacar.github.io/minesweeper/)
