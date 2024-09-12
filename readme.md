## Why Minesweeper/Games?

I love remaking bite-sized games like this. As a developer, I get told not to reinvent the wheel, but what if I am curious about how the wheel was made? There are probably hundreds of variations of this game, but to me, the fun part is getting into the thought process of how something was built algorithmically and the nuances of that problem.

## Bug Fixes (UI)

1. If a user clicks a cell, prevent them from setting it as a flag. (9/5/2024)
2. If a user sets a cell to a flag, prevent them from clicking it to expand it, until it's unflagged. (9/5/2024)

## Game Considerations

This game has a lot of variations and possibilities. I will discuss things that were added in my implementation of this game that don't necessarily exist in the original version.

1. A feature that I thought would be neat is to limit the user's flag count, in the original version of this game, you could set as many flags as possible because the mine count was a static variable, but in my game, I allow users to set their mine count, so I believe it makes sense to control how many flags a user can set, that is proportional to the number of mines.

## Features

1. TBD

Play Game Here: [github.io](https://classbabacar.github.io/minesweeper/)
