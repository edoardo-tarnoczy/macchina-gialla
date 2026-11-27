import { Text } from "react-native";
import { colors, typography } from "@/theme/tokens";

export default function RoomScreen() {
  return (
    <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>
      Stanza
    </Text>
  );
}