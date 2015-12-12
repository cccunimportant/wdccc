function delay(time, callback) {
  setTimeout(function () {
    callback("Slept for "+time);
  }, time);
}

function run(generatorFunction) {
    var generatorItr = generatorFunction(resume);
    function resume(callbackValue) {
        generatorItr.next(callbackValue);
    }
    generatorItr.next()
}

function* myDelayedMessages(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(1200, resume));
}

run(function* myDelayedMessages(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(1200, resume));
})
