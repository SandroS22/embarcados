import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import axios from "axios";

// const historico = () => {
//   const [histObject, setHistObject] = useState("[]");

//   const carregarHistorico = () => {
//     fetch(`http://localhost:8080/`)
//       .then((response) => response.text())
//       .then((data) => {
//         setHistObject(data);
//         console.log(data);
//       })
//       .catch((err) => {
//         console.err("Erro: ", err);
//         alert(err);
//       });
//   };
// };

export default function App() {
  const [hist, setHist] = useState(null);

  const fetchHist = async () => {
    const response = await axios.get("http://localhost:8080", { mode: "no-cors" });
    setHist(response.data);

    const datasetss = response.data.map(item => ({leitura: item.leitura, date: item.data}))

    const leituras = datasetss.map(item => item.leitura)

  };

  useEffect(() => {
    //setInterval = criando um temporizado para acessar o servidor a cada x milisegundos. chamando o fetch;
    const timer = setInterval(async () => {
      await fetchHist();
    }, 1000); // tempo que ele vai demorar para buscar no servidor

    //funcao para limpar a memoria quando tivesse varias paginas
    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              data: [
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random()
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
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
