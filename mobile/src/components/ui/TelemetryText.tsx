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
  const typographyToken = typography[variant];

  const colorToken = colors[color];

  const uppercaseStyle: TextStyle =
    uppercase === undefined
      ? {}
      : { textTransform: uppercase ? "uppercase" : "none" };

  const mergedStyle: StyleProp<TextStyle> = [
    typographyToken,
    { color: colorToken },
    style,
    uppercaseStyle,
  ];

  return (
    <Text {...textProps} style={mergedStyle}>
      {children}
    </Text>
  );
}
