import { Text } from "react-native";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { colors, typography } from "@/theme/tokens";

export interface TelemetryTextProps extends TextProps {
  variant?: keyof typeof typography;
  color?: keyof typeof colors;
  uppercase?: boolean;
}

export function TelemetryText({
  variant = "bodyMd",
  color = "textPrimary",
  uppercase,
  style,
  children,
  ...textProps
}: TelemetryTextProps) {
  // TODO: Select typography[variant].
  // TODO: Resolve colors[color] into a text color style.
  // TODO: Resolve uppercase:
  // undefined -> no override; true -> "uppercase"; false -> "none".
  // Do not modify children or mutate the tokens.

  const mergedStyle: StyleProp<TextStyle> = [
    // TODO: Typography token.
    // TODO: Semantic color style.
    // TODO: Incoming style (caller overrides token defaults).
    // TODO: Explicit uppercase override (wins when supplied).
  ];

  return (
    <Text {...textProps} style={mergedStyle}>
      {children}
    </Text>
  );
}
