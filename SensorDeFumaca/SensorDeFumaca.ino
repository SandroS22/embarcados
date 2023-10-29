#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>


WiFiClient client;

const char* ssid = "Sandro";
const char* password = "sandros123";
const char* serverName = "http://192.168.100.11:8080/";

int Pinbuzzer = D8;        //Pino do buzzer
int PinA0 = A0;            //Pino do sensor de fumaça
int leitura_sensor = 300;  //Valor limite do sensor de fumaça

void setup() {

  pinMode(PinA0, INPUT);       //Define o pino como entrada
  pinMode(Pinbuzzer, OUTPUT);  //Define o pino como saída
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  Serial.println("Conectando a rede WIFI...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.println("Conectando a rede WIFI...");
  }
  Serial.println("Conectado a rede WIFI!");
  Serial.print("Status do WIFI: ");
  Serial.println(WiFi.status());
}

void loop() {
  int valor_analogico = analogRead(PinA0);
  int count = 0;

  Serial.print("Leitura: ");
  Serial.println(valor_analogico);
  delay(800);

  if (valor_analogico > leitura_sensor) {  //Verifica se o valor lido é maior que o limite
    digitalWrite(Pinbuzzer, HIGH);         //Ativa o buzzer
    count += 1;
    if (count == 1) { // Para mandar somente um POST
      HTTPClient http;
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      int httpCode = http.POST("construir=" + String(valor_analogico));
      http.end();

      if (httpCode == 200) {
        Serial.println("Registro enviado ao servidor!");
      } else {
        Serial.println("Não foi possíveol connectar com o servidor.");
      }
    }
  } else {
    digitalWrite(Pinbuzzer, LOW);  //Caso limite não seja ultrapassado buzzer continua sem som
    count = 0;
  }
  delay(1000);  //Intervalo de 1 segundos
}
