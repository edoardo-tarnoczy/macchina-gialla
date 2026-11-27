// src/components/ui/ScreenContainer.tsx
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { colors, spacing } from "@/theme/tokens";

type Props = {
  children: React.ReactNode;
  edges?: Edge[];
  scrollable?: boolean;
};

export function ScreenContainer({
  children,
  edges = ["top"],
  scrollable = true,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      {scrollable ? (
        <ScrollView
          style={styles.fill}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, styles.content]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.level0Floor,
  },
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
});
