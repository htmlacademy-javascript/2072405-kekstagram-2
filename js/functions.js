function isMeetingWithinWorkHours (workStartTime, workEndTime, meetingStartTime, meetingDuration) {
  function timeToMinutes (time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(workStartTime);
  const workEndMinutes = timeToMinutes(workEndTime);
  const meetingStartMinutes = timeToMinutes(meetingStartTime);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

// eslint-disable-next-line no-console
console.log(isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90),
  isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120),
  isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90),
  isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90),
  isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900));
