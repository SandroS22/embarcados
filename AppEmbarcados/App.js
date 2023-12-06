import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  var leituras = [];

  var horario = [];

  const [hist, setHist] = useState([null]);
  const [leitura, setLeitura] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const fetchHist = async () => {
    const response = await axios.get("http://localhost:8080", {
      mode: "no-cors",
    }).catch(err => console.error('Erro: ', err))
    alert(err);
    setHist(response.data);

    const datasetss = response.data.map((item) => ({
      leitura: item.leitura,
      date: item.data,
    }));
    setHist(datasetss);

    leituras = datasetss.map((item) => item.leitura);
    setLeitura(leituras);

    horario = datasetss.map((item) => item.date);
    setHorarios(horario);

  };

  useEffect(() => {
    const timer = setInterval(async () => {
      await fetchHist();
    }, 1000); // tempo que ele vai demorar para buscar no servidor

    return () => clearInterval(timer);
  }, []);

  console.log(horarios[horarios.length - 1]);

  return (
    <View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <LineChart
        data={{
          labels: [
            horarios[horarios.length - 5],
            horarios[horarios.length - 4],
            horarios[horarios.length - 3],
            horarios[horarios.length - 2],
            horarios[horarios.length - 1],
          ],
          datasets: [
            {
              data: [
                leitura[leitura.length - 5],
                leitura[leitura.length - 4],
                leitura[leitura.length - 3],
                leitura[leitura.length - 2],
                leitura[leitura.length - 1],
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
