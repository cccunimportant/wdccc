# 無線通訊1 -- 感應無線電波

參考： Arduino EMF detector -- <https://www.youtube.com/watch?v=y1Bke3750WE>

要用 arduino 透過一根導線感應無線電波，其實異常的簡單，您只要在 Analog 插一根一端開放懸空的導線，然後用3.3M歐姆的電阻（橘橘綠）接到 ground，接著用下列程式就可以觀察無線電波了。

當您將該懸空導線靠近插座或高電能電器時，對應 pin腳 13 的 LED 燈就會亮起來，而移開之後該LED燈就會熄滅！

```CPP
int analogPin = 5;     // potentiometer wiper (middle terminal) connected to analog pin 3
int ledPin = 13;
int val = 0;           // variable to store the value read

void setup() {
  Serial.begin(9600);          //  setup serial
  pinMode(ledPin, OUTPUT);
}

void loop() {
  val = analogRead(analogPin);    // read the input pin
  if (val > 0) 
    digitalWrite(ledPin, HIGH);
  else
    digitalWrite(ledPin, LOW);    
  Serial.println(val);            // debug value
}

``` 
