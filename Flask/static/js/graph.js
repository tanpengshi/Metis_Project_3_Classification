function modifyDivs(name_and_prob){
  name_and_prob.forEach((name_and_prob) => {
    const {name, prob} = name_and_prob;
    // Set the size as a percentage, from the probability
    $(`#${name}`).width(`${100*prob}%`);
  });
}
