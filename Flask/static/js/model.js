/* This function is called when the submit button is pressed/
 *
 * See the "on" attribute of the submit button */
function process(){
  console.log('hi');

  // we have really long feature names =(
  feature = {
    'Inflight Wifi Service': $('#inflight_wifi_service').val(),
    'Ease Of Online Booking':  $('#ease_of_online_booking').val(),
    'Food And Drink': $('#food_and_drink').val(),
    'Online Boarding':  $('#online_boarding').val(),
    'Seat Comfort':  $('#seat_comfort').val(),
    'Inflight Entertainment':  $('#inflight_entertainment').val(),
    'On-board Service':  $('#onboard_service').val(),       
    'Leg Room':  $('#leg_room').val(),          
    'Baggage Handling':  $('#baggage_handling').val(),       
    'Checkin Service':  $('#checkin_service').val(),         
    'Inflight Service':  $('#inflight_service').val(),       
    'Cleanliness':  $('#cleanliness').val(),       
    'Customer Type_Returning Customer':  $('#customer_type').val(),           
    'Type Of Travel_Personal Travel':  $('#travel_type').val(),       
    'Class_Economy':  $('#class_type').val()              
  }

  // Call our API route /predict_api via the post method
  // Our method returns a dictionary.
  // If successful, pass the dictionary to the function "metis_success"
  // If there is an error, pass the dictionary to the functoin "metis_error"
  // Note: functions can have any name you want; to demonstrate this we put
  //       metis_ at the beginning of each function.
  $.post({
    url: '/predict_api',
    contentType: 'application/json',
    data: JSON.stringify(feature),
    success: result => metis_success(result),
    error: result => metis_error(result)
  })
}

function ourRound(val, decimalPlaces=1){
  //Javascript rounds to integers by default, so this is a hack
  //to round to a certain number of decimalPlaces
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(factor*val)/factor
}

/* Here "result" is the "dictionary" (javascript object)
 * that our get_api_response function returned when we called
 * the /predict_api function
 *
 * Here we select the "results" div and overwrite it
 */
function metis_success(result){
  $('#results').html(`The passenger is more likely to be ${result.most_likely_class_name}
                      with probability ${ourRound(100*result.most_likely_class_prob)}%`);

  const all_results = result.all_probs.map( (data) => `${data.name}: ${ourRound(100*data.prob)}`)
  $('#list_results').html(all_results.join('%<br>') + '%');

  // only included in predictor_javascript_slider_graph.html
  // otherwise does nothing.
  modifyDivs(result.all_probs);
}

function metis_error(result){
  console.log(result);
  alert("I don't know what you did");
}
