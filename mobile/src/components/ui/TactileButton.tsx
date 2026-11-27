import { Pressable, StyleSheet, View } from "react-native";
import type { PressableProps, ViewStyle } from "react-native";
import type { ReactNode } from "react";
import * as Haptics from "expo-haptics";
import { TelemetryText } from "./TelemetryText";
import {
  spacing,
  radii,
  colors,
  elevation,
  buttonMetrics,
} from "@/theme/tokens";

type ButtonVariant = "primary" | "secondary" | "danger" | "spotTrigger";

export interface TactileButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: ButtonVariant;
  subtitle?: string;
  leftIcon?: ReactNode;
}

export function TactileButton({
  variant = "primary",
  label,
  subtitle,
  leftIcon,
  disabled = false,
  style,
  onPressIn,
  accessibilityState,
  ...pressableProps
}: TactileButtonProps) {
  const labelColors = {
    primary: "onPrimary",
    spotTrigger: "onPrimaryStrong",
    secondary: "primary",
    danger: "onPrimaryStrong",
  } satisfies Record<ButtonVariant, keyof typeof colors>;

  const subtitleColors = {
    primary: "onPrimary",
    spotTrigger: "onPrimaryStrong",
    secondary: "textSecondary",
    danger: "onPrimaryStrong",
  } satisfies Record<ButtonVariant, keyof typeof colors>;

  const restingButtonStyles: Record<ButtonVariant, ViewStyle> = {
    primary: elevation.triggerResting,
    spotTrigger: elevation.triggerResting,
    secondary: elevation.secondaryResting,
    danger: elevation.errorResting,
  };

  const shelfStyles: Record<ButtonVariant, ViewStyle> = {
    primary: elevation.triggerShelf,
    spotTrigger: elevation.triggerShelf,
    secondary: elevation.secondaryShelf,
    danger: elevation.errorShelf,
  };

  const pressedButtonStyles: Record<ButtonVariant, ViewStyle> = {
    primary: elevation.triggerPressed,
    spotTrigger: elevation.triggerPressed,
    secondary: elevation.secondaryPressed,
    danger: elevation.errorPressed,
  };

  const handlePressIn: NonNullable<PressableProps["onPressIn"]> = (event) => {
    if (disabled) return;

    Haptics.impactAsync(
      variant === "spotTrigger"
        ? Haptics.ImpactFeedbackStyle.Heavy
        : Haptics.ImpactFeedbackStyle.Medium,
    ).catch((e: unknown) => {
      console.warn("TactileButton haptic feedback failed:", e);
    });

    onPressIn?.(event);
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled }}
      onPressIn={handlePressIn}
      style={(state) => [
        typeof style === "function" ? style(state) : style,
        styles.container,
        variant === "spotTrigger" && {
          minHeight: buttonMetrics.spotMinHeight,
        },
        disabled && { opacity: buttonMetrics.disabledOpacity },
      ]}
    >
      {({ pressed }) => (
        <>
          <View
            pointerEvents="none"
            accessible={false}
            style={[styles.shelf, shelfStyles[variant]]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.face,
              restingButtonStyles[variant],
              pressed && !disabled && pressedButtonStyles[variant],
            ]}
          >
            <View style={styles.labelRow}>
              {leftIcon}
              <TelemetryText variant="labelAction" color={labelColors[variant]}>
                {label}
              </TelemetryText>
            </View>

            {subtitle !== undefined && (
              <TelemetryText variant="bodyMd" color={subtitleColors[variant]}>
                {subtitle}
              </TelemetryText>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.lg,
    paddingBottom: buttonMetrics.shelfHeight,
    marginBottom: spacing.sm,
    overflow: "visible",
    transform: [{ translateY: 0 }],
  },
  shelf: {
    position: "absolute",
    top: buttonMetrics.shelfHeight,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: radii.lg,
  },
  face: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    gap: spacing.xs,
    borderRadius: radii.lg,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
});
