// simple validator - does a match against the regex and sets a class on the input


function validate_input(object) {
    // regex - modified from http://regex101.com/r/fH3lV1/2 to fit sterling ( optional , as thousand separator . as decimal separator)
    // - explination at http://regex101.com/r/hT3aD0/2
    // ^\s*-?(\u00A3{1}|\s*)((\d{1,3}(,(\d){3})*)|\d+)(\.\d{1,2})?(\s?|p)\s*$
    // regex doesnt make £p invalid - need to sort the order
    var regex = /^\s*-?(\u00A3{1}|\s*)((\d{1,3}(,(\d){3})*)|\d+)(\.\d{1,2})?(\s?|p)\s*$/;
    if (regex.test(object.val())) {
        // match
        return true;
    } else {
        // no match
        return false;
    }
}

function convert_to_pence(object) {

    // this whole function should be simplified to
    // return object.val().replace(/[^0-9.]/g, "") * 100;
    // but for the sake of readability I've left it split

    // this regex is 'not 0-9 or a dot, globally'
    var regex = /[^0-9.]/g;
    // this replaces not numbers with nothingness, leaving us with the number of pounds
    // eg 4.23 is £4.23p
    var number_of_pounds = object.val().replace(regex, "");
    var number_of_pence = number_of_pounds * 100;

    //console.log('pounds:' + number_of_pounds);
    //console.log('pence:' + number_of_pence);
    return number_of_pence;
}

function input_has_error(object) {
    // set the input box to error state
    object.parent().removeClass('has-success');
    object.parent().addClass('has-error');
    $('#number_of_pence').html('error');
    $('#results').html('');
}

function input_has_success(object) {
    // set the input box to success state
    object.parent().removeClass('has-error');
    object.parent().addClass('has-success');
}

function show_number_of_pence(object) {
    // this could be simplified to
    // $('#number_of_pence').html(convert_to_pence(object) + " pennies");
    // but for readability I've left as-is

    // get the number of pennies
    var number_of_pence = convert_to_pence(object);
    // set the p tag to show how many we have
    $('#number_of_pence').html(number_of_pence + " pennies");
}

function greedy_algo(object) {
    // we need to setup a few things
    // firstly, whats the denominations of coins:
    // an object
    var denominations = { "£2": 200, "£1": 100, "50p": 50, "20p": 20, "10p": 10, "5p": 5, "2p": 2, "1p": 1 };

    // now, we need some stacks
    // counter - keep track of the number of each coin we have
    var counter = {};
    // keep whats left
    var remainder;
    // our number of pennies
    var number_of_pennies_left = convert_to_pence(object);

    // we can use forEach, but for backward compat its best to use for
    for (key in denominations) {

        // check if the number_of_pennies_left is less than the current value of the coin
        if (number_of_pennies_left >= denominations[key]) {
            // dont really need to do this, but makwes it easier to see the calculation
            var x = number_of_pennies_left;
            var y = denominations[key];

            // number of times its divisible
            // number of pennies left minus the remainder divided by the value of the coin
            // remainder is x mod y
            var z = ( x - ( x % y ) ) / y;

            // set the number_of_coins_left to the remainder
            number_of_pennies_left = x % y;

            // push it into the counter object
            counter[key] = z;

        }

    }
    //console.log(counter);
    return counter;
}

function show_table_of_results(object){
    var data = '<table class="table table-striped">';
    data += '<thead><th>Coin</th><th>Count</th></thead>';
    // make a simple table of the results [tabular data is good in a table]
    for (key in object) {
        data += '<tr><td>' + key + '</td><td>' + object[key] + '</td></tr>';
    }
    data += '</table>';
    $('#results').html(data);
}

function run_input_values(object) {
    if (validate_input(object)) {
        input_has_success(object);
        show_number_of_pence(object);
        var counter = greedy_algo(object);
        show_table_of_results(counter);
    } else {
        input_has_error(object);
    }
}

$(function () {
// bind keypresses on the form input to trigger the validator
    $('#amount').on("input", function () {
        run_input_values($('#amount'));
    });
});
