import { ScrollView, Text } from "react-native";
import { colors, typography } from "@/theme/tokens";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { TelemetryText } from "@/components/ui/TelemetryText";
import { TactileButton } from "@/components/ui/TactileButton";

export default function PlayScreen() {
  return (
    <ScreenContainer>
      <TelemetryText>Testo normale</TelemetryText>

      <TelemetryText variant="labelTelemetry">Telemetria attiva</TelemetryText>

      <TelemetryText variant="labelTelemetry" uppercase={false}>
        Telemetria attiva
      </TelemetryText>
      <TelemetryText variant="bodyMd" color="primary" uppercase>
        Gioca
      </TelemetryText>
      <Text
        style={{
          ...typography.bodyMd,
          color: colors.textPrimary,
          backgroundColor: colors.level0Floor,
        }}
      >
        Gioca
      </Text>
      <TactileButton
        variant="primary"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
      <TactileButton
        variant="spotTrigger"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
      <TactileButton
        variant="secondary"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
      <TactileButton
        variant="danger"
        label="Premi qui"
        subtitle="Sottotitolo"
      />

      <TactileButton
        disabled
        variant="primary"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
      <TactileButton
        disabled
        variant="spotTrigger"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
      <TactileButton
        disabled
        variant="secondary"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
      <TactileButton
        disabled
        variant="danger"
        label="Premi qui"
        subtitle="Sottotitolo"
      />
    </ScreenContainer>
  );
}
