<template>
  <div class="d-flex" :class="mobile ? 'justify-center' : 'justify-space-between'" :style="mobile ? 'gap: 8px;' : ''">
    <v-card
      v-for="(item, index) in countdownData"
      :key="index"
      color="white"
      class="px-0 pt-1 pb-1 text-center"
      :class="mobile ? 'mx-1' : 'mx-1'"
      :width="mobile ? '65px' : '80px'"
      rounded="lg"
      elevation="4"
    >
      <v-card-text class="px-0 mx-0 py-0 my-0">
        <div
          class="font-weight-black text-grey-darken-4 mb-1"
          :class="mobile ? 'text-h5' : 'text-h4'"
          style="line-height: 1.1;"
        >
          {{ item.value }}
        </div>
        <div
          class="text-uppercase text-grey-darken-2"
          :style="mobile
            ? 'font-size:0.65rem; margin-top: -4px;'
            : 'font-size:0.8rem; line-height:1; margin-top: -6px;'"
        >
          {{ item.label }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useDisplay } from 'vuetify';
import moment from 'moment';

const props = defineProps({
  endDate: { type: [String, Date], default: () => moment().add(3, 'days').endOf('day').toISOString() },
  themeKey: { type: String, default: 'defaultLight' },
  cardColor: { type: String, default: '' }
});

const { mobile } = useDisplay();

const days    = ref(0);
const hours   = ref(0);
const minutes = ref(0);
const seconds = ref(0);

function updateCountdown() {
  const now = moment();
  const end = moment(props.endDate);
  const duration = moment.duration(end.diff(now));

  if (duration.asMilliseconds() <= 0) {
    days.value = hours.value = minutes.value = seconds.value = 0;
    return;
  }

  days.value    = Math.floor(duration.asDays());
  hours.value   = duration.hours();
  minutes.value = duration.minutes();
  seconds.value = duration.seconds();
}

let intervalId;
onMounted(() => {
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});
onUnmounted(() => clearInterval(intervalId));

const countdownData = computed(() => [
  { value: days.value,    label: 'Dias' },
  { value: hours.value,   label: 'Horas' },
  { value: minutes.value, label: 'Minutos' },
  { value: seconds.value, label: 'Segundos' }
]);
</script>