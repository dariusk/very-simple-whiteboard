# very simple whiteboard

_[Demo here](http://tinysubversions.com/stuff/very-simple-whiteboard/), requires a multitouch device and is only guaranteed to really work with a Chrome Pixel._

I like to stream myself live coding from my Chrome Pixel. When I do this, I sometimes like to tab over to a whiteboard app and draw out an explanation for what I'm coding.

I originally used one of various online whiteboard apps out there, but I found myself unsatisfied with the. Many were too complex, had lots of menus cluttering the screen, and more importantly they were _slowed down_ by their cumbersome UI. All I wanted was something that would let me have a couple sizes of pen to draw with and a quick way to switch to an eraser, save, load, and clear the screen.

So I found [this multitouch HTML Canvas drawing demo](http://www.paulirish.com/demo/multi) by @tbranyen, @paulirish, @miketaylr, and @borismus. I modified it to do a few different behaviors on different numbers of multitouch:

* 1-touch: draw in black
* 2-touch: erase the space in a thick line between your two fingers
* 3-touch: swipe left to clear the canvas, swipe right to save the canvas
  * You can click on a saved canvas to load it
* 4-touch: swipe left for a small pen, swipe right for a big pen

That's it. I've only tested this on the Chrome Pixel's touch screen, and it's tuned for that specific device. I've also tried it on an iPad and it kind of works but is janky and doesn't detect 3+ touches.

## License
Copyright (c) 2015 Kazemi, Darius
Licensed under the MIT license.
