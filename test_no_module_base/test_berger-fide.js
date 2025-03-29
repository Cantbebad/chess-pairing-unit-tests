
/*
function require_unexported_global_script(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,           // <-- This is the key
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}
*/

const { generateBergerPairingsIdx }  = require( '../repo/berger-fide')

let x = generateBergerPairingsIdx(4)
console.log(x)


