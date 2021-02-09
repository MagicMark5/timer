/*
The user can input any number from 1 to 9 and it should
immediately output "setting timer for x seconds...", and
beep after that number of seconds has passed
The user can use ctrl + c to exit the program, at which point the program should say "Thanks for using me, ciao!" before terminating
*/
console.log("Press b for a beep sound");
console.log("Press any number key for a sound after a delay");
console.log("Hit control+c to quit");
const stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (so that the node app won't quit all by itself)
// unless an error or process.exit() happens
stdin.resume();

// i don't want binary
stdin.setEncoding( 'utf8' );

// UTF-8 encodings for numbers 1 through 9
const oneToNineUTF = ['\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039'];

// on any data(keypress) into stdin
stdin.on( 'data', function( key ){
  
  if (key === '\u0003') { // u0003 is ctrl-c 
    console.log("Thanks for using me, ciao!");
    process.exit(); // stop file
  }

  if (key === '\u0062') { // u0062 is b
    process.stdout.write('\x07');
  } 
  
  for (const utf of oneToNineUTF) {
    if (key === utf) {
      let timeStart = Date.now();
      console.log(`setting timer for ${utf} seconds...`);
      setTimeout(() => {
        process.stdout.write('\x07'); 
        let delay = Date.now() - timeStart; // shows you how much time has elapsed since number key was pressed
        console.log(`That was a ${delay} ms delay!`); 
      }, utf * 1000); // play sound (call callback) after "number key" seconds
    }
  }
  
  // write the key to stdout all normal like
  // process.stdout.write( key );
  
});




// const alarmClock = function(input) {
  
//   const ms = input
//     .filter((t) => t >= 0 && !isNaN(t)) // filtered array of only positive numbers
//     .map((time) => Number(time) * 1000); // array of miliseconds
  
//   for (const time of ms) {
//     setTimeout(() => process.stdout.write('\x07'), time);
//   }

// };

// alarmClock(timers);