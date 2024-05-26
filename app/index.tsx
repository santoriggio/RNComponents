import { StyleSheet, View } from "react-native";
import Box from "../RNComponents/components/Box";
import useStyles from "../RNComponents/hooks/useStyles";
import Text from "../RNComponents/components/Text";
export default function Page() {
  const { colors } = useStyles();
  return (
    <View style={{backgroundColor:colors.background}}>
      <Box backgroundColor="red" margin="s">
        <Text>Hello world from Box!</Text>
      </Box>

      <Box backgroundColor="red" margin="s">
        <Text>Hello world from Box!</Text>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
