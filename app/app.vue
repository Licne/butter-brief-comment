<template>
  <n-message-provider>
    <n-config-provider :theme-overrides="themeOverrides">
      <div>
        <NuxtPage />
      </div>
    </n-config-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    "baseColor": "var(--text-white)",
    "primaryColor": "var(--btn-primary)",
    "primaryColorHover": "var(--btn-primary-hover)",
    "primaryColorPressed": "#A87E86",
    "primaryColorSuppl": "#C8A2A8",
    "infoColor": "var(--color-mauve)",
    "infoColorHover": "#917A8C",
    "infoColorPressed": "#7A6576",
    "infoColorSuppl": "#A88FA2",
    "successColor": "var(--color-success)",
    "successColorHover": "#8DA88A",
    "successColorPressed": "#71946D",
    "successColorSuppl": "#A9BBA7",
    "warningColor": "var(--color-warn)",
    "warningColorHover": "#B89A87",
    "warningColorPressed": "#A38570",
    "warningColorSuppl": "#CCB2A3",
    "errorColor": "var(--color-danger)",
    "errorColorHover": "#A8848B",
    "errorColorPressed": "#936B73",
    "errorColorSuppl": "#BC9CA2",
    "textColorBase": "var(--text-title)",
    "textColor1": "var(--text-title)",
    "textColor2": "var(--text-body)",
    "textColor3": "var(--text-desc)",
    "textColorDisabled": "#B8AFB3",
    "placeholderColor": "#B8AFB3",
    "placeholderColorDisabled": "#C9C1C5",
    "iconColor": "var(--text-desc)",
    "iconColorHover": "var(--text-body)",
    "iconColorPressed": "var(--text-title)",
    "iconColorDisabled": "#C9C1C5",
    "dividerColor": "var(--bg-block)",
    "borderColor": "#E1D7DB",
    "closeIconColor": "var(--text-desc)",
    "closeIconColorHover": "var(--text-body)",
    "closeIconColorPressed": "var(--text-title)",
    "closeColorHover": "var(--bg-block)",
    "closeColorPressed": "var(--bg-card-active)",
    "clearColor": "var(--text-desc)",
    "clearColorHover": "var(--text-body)",
    "clearColorPressed": "var(--text-title)",
    "scrollbarColor": "var(--bg-card-active)",
    "scrollbarColorHover": "var(--btn-primary-hover)",
    "progressRailColor": "var(--bg-block)",
    "railColor": "var(--bg-block)",
    "popoverColor": "var(--bg-card)",
    "tableColor": "var(--bg-card)",
    "cardColor": "var(--bg-card)",
    "modalColor": "var(--bg-card)",
    "bodyColor": "var(--bg-page)",
    "tagColor": "var(--bg-block)",
    "avatarColor": "var(--btn-secondary)",
    "invertedColor": "var(--text-title)",
    "inputColor": "var(--text-white)",
    "codeColor": "var(--bg-block)",
    "tabColor": "var(--bg-page)",
    "actionColor": "var(--bg-page)",
    "tableHeaderColor": "var(--bg-page)",
    "hoverColor": "var(--bg-block)",
    "tableColorHover": "var(--bg-card-active)",
    "tableColorStriped": "var(--bg-block)",
    "pressedColor": "var(--bg-card-active)",
    "inputColorDisabled": "var(--bg-page)",
    "buttonColor2": "var(--btn-secondary)",
    "buttonColor2Hover": "var(--btn-primary)",
    "buttonColor2Pressed": "var(--btn-primary-hover)",
    "boxShadow1": "0 1px 2px -2px rgba(177, 126, 135, .08), 0 3px 6px 0 rgba(177, 126, 135, .06), 0 5px 12px 4px rgba(177, 126, 135, .04)",
    "boxShadow2": "0 3px 6px -4px rgba(177, 126, 135, .12), 0 6px 16px 0 rgba(177, 126, 135, .08), 0 9px 28px 8px rgba(177, 126, 135, .05)",
    "boxShadow3": "0 6px 16px -9px rgba(177, 126, 135, .08), 0 9px 28px 0 rgba(177, 126, 135, .05), 0 12px 48px 16px rgba(177, 126, 135, .03)"
  }

}


</script>