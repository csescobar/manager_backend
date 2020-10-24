module.exports = function convertMinutesToHour(minutes) {
  
  const hora = Math.trunc(minutes / 60);
  const minuto = Number (minutes % 60);
  const timeInHour = hora + ':' + minuto;

  return timeInHour;
}