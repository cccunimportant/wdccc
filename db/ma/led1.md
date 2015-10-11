# LED 明滅 -- 最簡單的Arduino 專案

教學影片:  [YouTube: LED 明滅 -- 最簡單的Arduino 專案](https://www.youtube.com/watch?v=2r8Rng5UNfg)

## 程式

```CPP
void setup() {
  // put your setup code here, to run once:
  pinMode(13, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(13, HIGH);
  delay(100);
  digitalWrite(13, LOW);
  delay(100);
}
```

## 影片

