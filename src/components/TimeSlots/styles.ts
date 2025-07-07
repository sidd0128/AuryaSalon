import { StyleSheet } from "react-native";
import Typography from "../../theme/typography";
import theme from "../../theme";

const { spacing, colors} = theme;


export const styles = StyleSheet.create({
    slotButton: {
        flex: 1,
        margin: spacing.sm,           
        paddingVertical: spacing.md, 
        backgroundColor: colors.surface, 
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
      },
      slotButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.eventHorizon,
      },
      slotText: {
        ...Typography.caption1,    
        color: colors.text,  
        textAlign: "center",
      },
      slotTextSelected: {
        ...Typography.caption1,  
        color: colors.textOnPrimary,
        textAlign: "center",
      },
  });