# To knows

# Inspiration

I love remaking bite-sized games like this. As a developer, I get told not to reinvent the wheel, but what if I am curious about how the wheel was made? There are probably hundreds of variations of this game, but to me, the fun part is getting into the thought process of how something was built algorithmically and the nuances of that problem.

# Features

# Bugs

Bug Fix: **9/4/2024**

- When trying to enable left and right clicking to either display a flag or open a cell on the grid, I was running into issues where I was unable to because I was overcomplicating my code logic dealing with eventListeners. When dealing with event listeners, if you want to trigger some event based on a user action, the skeleton looks like this:

```js
someElement.addEventListener(
  "user event -- can be click or whaever",
  function (evt) {
    yourMethod(parameter1, paratemeter2); // Can also be return yourMethod(parameter1, paratemeter2); for elegancy
  }
);
```
