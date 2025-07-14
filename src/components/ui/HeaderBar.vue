<template>
  <v-app-bar
    :dark="theme.isDark"
    :light="!theme.isDark"
    class="header-bar elevation-4"
    :height="mobile ? 120 : 100"
    fixed
    style="backdrop-filter: blur(20px); z-index: 1000;"
  >
    <v-container
      fluid
      class="fill-height"
      :class="mobile ? 'pt-4 pb-10 px-4' : 'pt-3 pb-4 px-8'"
      :style="{
        background: theme.isDark 
          ? 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
        borderBottom: `2px solid ${theme.accentColor || '#424242'}`
      }"
    >
      <!-- Desktop Layout -->
      <v-row v-if="!mobile" class="align-center justify-space-between fill-height" no-gutters>
        <!-- Logo Section -->
        <v-col cols="auto" class="d-flex align-center">
          <img 
            src="/src/assets/logo-white-horizontal.png" 
            alt="Logo" 
            height="50"
            class="logo-image"
          />
        </v-col>

        <!-- Alert Section -->
        <v-col class="d-flex align-center justify-end">
          <div class="d-flex align-center text-right">
            <v-avatar
              v-if="showIcon"
              size="50"
              color="transparent"
              class="me-1 pulse-icon"
            >
              <v-icon :color="theme.isDark ? 'white' : 'grey-darken-3'" size="32">{{ alertIcon }}</v-icon>
            </v-avatar>
            
            <div class="alert-content text-right">
              <TextHeadline
                :color="theme.headlineColor"
                size="h6"
                spacing="mb-0"
                class="font-weight-black text-uppercase"
                style="letter-spacing: 1px; white-space: nowrap; line-height: 1.0;"
              >
                {{ alertTitle }}
              </TextHeadline>
              <TextParagraph
                v-if="alertSubtitle"
                :color="theme.paragraphColor"
                size="body-2"
                spacing="mb-0"
                class="font-weight-medium"
                style="margin-top: 2px;"
              >
                {{ alertSubtitle }}
              </TextParagraph>
            </div>
          </div>
        </v-col>

        <!-- Countdown Section -->
        <v-col v-if="showCountdown" cols="auto" class="d-flex justify-center">
          <div class="countdown-wrapper">
            <CountdownTimer
              :endDate="countdownEndDate"
              :themeKey="themeKey"
              cardColor="#424242"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Mobile Layout -->
      <v-col v-else class="d-flex flex-column justify-center align-center text-center pa-0">
        <!-- Alert Section -->
        <div class="mb-3">
          <TextHeadline
            :color="theme.headlineColor"
            size="subtitle-1"
            spacing="mb-0"
            class="font-weight-black text-uppercase"
            style="letter-spacing: 1px; line-height: 1.0;"
          >
            {{ alertTitle }}
          </TextHeadline>
          <TextParagraph
            v-if="alertSubtitle"
            :color="theme.paragraphColor"
            size="caption"
            spacing="mb-0"
            class="font-weight-medium"
            style="margin-top: 2px; line-height: 1.1;"
          >
            {{ alertSubtitle }}
          </TextParagraph>
        </div>

        <!-- Countdown Section -->
        <div v-if="showCountdown" class="countdown-wrapper-mobile">
          <CountdownTimer
            :endDate="countdownEndDate"
            :themeKey="themeKey"
            cardColor="#424242"
          />
        </div>
      </v-col>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { getThemeConfig } from '@/helpers/blockThemes'
import TextHeadline from '@/components/ui/typography/TextHeadline.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'
import CountdownTimer from '@/components/ui/CountdownTimer.vue'
import moment from 'moment'

const props = defineProps({
  themeKey: { type: String, default: 'sectionDark' },
  alertTitle: { type: [String, Object], default: '🎯 VAGAS LIMITADAS' },
  alertSubtitle: { type: [String, Object], default: 'Turma presencial de 2025' },
  alertIcon: { type: String, default: 'mdi-clock-fast' },
  showIcon: { type: Boolean, default: true },
  showCountdown: { type: Boolean, default: false },
  countdownConfig: {
    type: Object,
    default: () => ({
      type: 'relative',
      days: 7,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  }
})

const theme = getThemeConfig(props.themeKey)
const { mobile } = useDisplay()

const alertTitle = computed(() => {
  if (typeof props.alertTitle === 'object') {
    return mobile.value ? props.alertTitle.mobile : props.alertTitle.desktop
  }
  return props.alertTitle
})

const alertSubtitle = computed(() => {
  if (!props.alertSubtitle) return ''
  if (typeof props.alertSubtitle === 'object') {
    return mobile.value ? props.alertSubtitle.mobile : props.alertSubtitle.desktop
  }
  return props.alertSubtitle
})

const countdownEndDate = computed(() => {
  const config = props.countdownConfig
  
  if (config.type === 'absolute' && config.endDate) {
    return moment(config.endDate).toISOString()
  } else {
    return moment()
      .add(config.days || 0, 'days')
      .add(config.hours || 0, 'hours')
      .add(config.minutes || 0, 'minutes')
      .add(config.seconds || 0, 'seconds')
      .toISOString()
  }
})
</script>

<style scoped>
.header-bar {
  backdrop-filter: blur(20px) !important;
  transition: all 0.3s ease;
}

.alert-content {
  max-width: 280px;
}

.countdown-wrapper {
  padding: 8px 16px;
}

.countdown-wrapper-mobile {
  padding: 0;
}

.pulse-icon {
  animation: pulse-icon 2s infinite;
}

@keyframes pulse-icon {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.logo-image {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.logo-image:hover {
  transform: scale(1.05);
}

@media (max-width: 960px) {
  .alert-content {
    max-width: 100%;
  }
  
  .countdown-wrapper {
    margin-top: 8px;
    width: 100%;
    text-align: center;
  }
}
</style>
