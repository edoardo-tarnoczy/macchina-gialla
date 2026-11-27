import { Text } from "react-native";
import { colors, typography } from "@/theme/tokens";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
export default function HistoryScreen() {
  return (
    <ScreenContainer>
      <Text style={[typography.bodyMd, { color: colors.textPrimary }]}>
        Storico
      </Text>
    </ScreenContainer>
  );
}
