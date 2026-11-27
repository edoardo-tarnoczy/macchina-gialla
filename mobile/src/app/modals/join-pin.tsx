import { Text } from "react-native";
import { colors, typography } from "@/theme/tokens";

export default function JoinPinScreen() {
  return (
    <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>
      Entra con Codice
    </Text>
  );
}