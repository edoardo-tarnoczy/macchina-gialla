import { ScrollView, Text } from "react-native";
import { colors, typography } from "@/theme/tokens";
import { ScreenContainer } from "@/components/ui/ScreenContainer";

export default function PlayScreen() {
  return (
    <ScreenContainer>
      <Text
        style={{
          ...typography.bodyMd,
          color: colors.textPrimary,
          backgroundColor: colors.level0Floor,
        }}
      >
        Gioca
      </Text>
    </ScreenContainer>
  );
}
