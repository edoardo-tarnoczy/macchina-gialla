import { Text } from "react-native";
import { colors, typography } from "@/theme/tokens";

export default function CreateRoomScreen() {
  return (
    <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>
      Crea Stanza
    </Text>
  );
}