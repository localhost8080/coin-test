// regex - modified from http://regex101.com/r/fH3lV1/2 to fit sterling ( optional , as thousand separator . as decimal separator)

// - explination at http://regex101.com/r/hT3aD0/1
// ^\s*-?(\u00A3|\s*)((\d{1,3}(,(\d){3})*)|\d*)(\.\d{1,2})?(\s?|p)\s*$
// regex doesnt make £p invalid - need to sort the order




function convert_to_pence(double value){
    int pounds = (int)value;
    int pennies = (int)((value - pounds) * 100);
    String result = String.Format("{0:#0} Lt {1:00} ct", pounds, pence);
}












// simple validator - does a match against the regex and sets a class on the input

$(function() {
// bind keypresses on the form input to trigger the validator
    $('#amount').on("input", function() {

        var regex = /^\s*-?(\u00A3|\s*)((\d{1,3}(,(\d){3})*)|\d*)(\.\d{1,2})?(\s?|p)\s*$/;

        if(regex.test($(this).val())){
            $(this).parent().removeClass('has-error');
            $(this).parent().addClass('has-success');
            // match
            //greedy_coins($(this).val());
            
        } else {
            // no match
            $(this).parent().removeClass('has-success');
            $(this).parent().addClass('has-error');
            
        }
    });
});