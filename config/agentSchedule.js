export const WORKING_HOURS = {
  startHour: 8,
  endHour: 19,
  days: [1, 2, 3, 4, 5],
};

export function isWithinWorkingHours(date = new Date()) {
  const day = date.getDay();
  const hour = date.getHours();

  const isWeekday = WORKING_HOURS.days.includes(day);
  const isWithinHours = hour >= WORKING_HOURS.startHour && hour < WORKING_HOURS.endHour;

  return isWeekday && isWithinHours;
}

export function getScheduleMessage() {
  return `Horario activo: lunes a viernes de ${WORKING_HOURS.startHour}:00 a ${WORKING_HOURS.endHour - 1}:59`;
}
