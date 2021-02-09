// The alarmClock function produces a system sound at given argument number of seconds apart (unlimited number of beeps)

const timers = process.argv.slice(2); // an array of arguments

const alarmClock = function(input) {
  
  const ms = input
    .filter((t) => t >= 0 && !isNaN(t)) // filtered array of only positive numbers
    .map((time) => Number(time) * 1000); // array of miliseconds
  
  for (const time of ms) {
    setTimeout(() => process.stdout.write('\x07'), time);
  }

};

alarmClock(timers);