# BDD 測試導向開發工具 -- Jasmine

* 官網： <http://jasmine.github.io/>
* github : <https://github.com/jasmine/jasmine>

## 安裝

參考： <https://github.com/jasmine/jasmine-npm>

```
npm install -g jasmine
```

## 系統預設範例

```
nqu-192-168-61-142:public mac020$ cd jasmine_test
nqu-192-168-61-142:jasmine_test mac020$ jasmine init
nqu-192-168-61-142:jasmine_test mac020$ ls
spec
nqu-192-168-61-142:jasmine_test mac020$ jasmine examples
nqu-192-168-61-142:jasmine_test mac020$ ls
lib	spec
nqu-192-168-61-142:jasmine_test mac020$ ls -R
lib	spec

./lib:
jasmine_examples

./lib/jasmine_examples:
Player.js	Song.js

./spec:
helpers			jasmine_examples	support

./spec/helpers:
jasmine_examples

./spec/helpers/jasmine_examples:
SpecHelper.js

./spec/jasmine_examples:
PlayerSpec.js

./spec/support:
jasmine.json
nqu-192-168-61-142:jasmine_test mac020$ 
```

## 使用範例

```
nqu-192-168-61-142:jasmine_test mac020$ jasmine
Started
.....


5 specs, 0 failures
Finished in 0.009 seconds
```

其測試檔 PlayerSpec.js 的內容如下：

```
describe("Player", function() {
  var Player = require('../../lib/jasmine_examples/Player');
  var Song = require('../../lib/jasmine_examples/Song');
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});

```

執行結果如下：

```
nqu-192-168-61-142:jasmine_test mac020$ jasmine
Started
.....


5 specs, 0 failures
Finished in 0.009 seconds
```

如果加入一行不正確的測試如下：

```
  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);
    expect(player.currentlyPlayingSong).not.toEqual(song); // 加入這行
```

那麼執行結果將變成

```
nqu-192-168-61-142:jasmine_test mac020$ jasmine
Started
F....

Failures:
1) Player should be able to play a Song
  Message:
    Expected Song({  }) not to equal Song({  }).
  Stack:
    Error: Expected Song({  }) not to equal Song({  }).
        at Object.<anonymous> (/Users/mac020/Dropbox/Public/jasmine_test/spec/jasmine_examples/PlayerSpec.js:15:45)

5 specs, 1 failure
Finished in 0.014 seconds

```
