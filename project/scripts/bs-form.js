document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailCheckbox = document.getElementById('email-message');
    const callCheckbox = document.getElementById('call');
    const textCheckbox = document.getElementById('text');

    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const phoneLabel = document.getElementById('phone-label');
    const emailLabel = document.getElementById('email-label');

    function updateRequirements() {
        // Set phone required if call or text is selected
        if (callCheckbox.checked || textCheckbox.checked) {
            phoneInput.required = true;
            phoneLabel.innerText = 'Phone Number:* ';
        } else {
            phoneInput.required = false;
            phoneLabel.innerText = 'Phone Number: ';
        }

        // Set email required if email is selected
        if (emailCheckbox.checked) {
            emailInput.required = true;
            emailLabel.innerText = 'Email Address:* ';
        } else {
            emailInput.required = false;
            emailLabel.innerText = 'Email Address: ';
        }
    }

    function isContactMethodSelected() {
        return emailCheckbox.checked || callCheckbox.checked || textCheckbox.checked;
    }

    function isInterestSelected() { 
        return document.querySelector('input[name="interest"]:checked') !== null;
    }

    form.addEventListener('submit', function (event) {
        if (!isContactMethodSelected() && !isInterestSelected) {
            event.preventDefault();
            alert('Please select at least one preferred contact method.');
        } else if (!isContactMethodSelected()) {
            event.preventDefault();
            alert('Please select at least one preferred contact method.');
        } else if (!isInterestSelected()) {
            event.preventDefault();
            alert('Please select at least one point of interest.');
        }
    });

    emailCheckbox.addEventListener('change', updateRequirements);
    callCheckbox.addEventListener('change', updateRequirements);
    textCheckbox.addEventListener('change', updateRequirements);

    updateRequirements();
});


window.addEventListener('load', () => {
    const phoneInput = document.querySelector('#phone');
    phoneInput.addEventListener('keydown', disallowNonNumericInput);
    phoneInput.addEventListener('keyup', formatToPhone);
  });
  
  const disallowNonNumericInput = (evt) => {
    if (evt.ctrlKey) { return; }
    if (evt.key.length > 1) { return; }
    if (/[0-9.]/.test(evt.key)) { return; }
    evt.preventDefault();
  }
  
  const formatToPhone = (evt) => {
    const digits = evt.target.value.replace(/\D/g,'').substring(0,10);
    const areaCode = digits.substring(0,3);
    const prefix = digits.substring(3,6);
    const suffix = digits.substring(6,10);
  
    if(digits.length > 6) {evt.target.value = `${areaCode}-${prefix}-${suffix}`;}
    else if(digits.length > 3) {evt.target.value = `${areaCode}-${prefix}`;}
    else if(digits.length > 0) {evt.target.value = `${areaCode}`;}
  };