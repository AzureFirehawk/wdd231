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
  

function formatTimestamp() {
    const now = new Date();
    return formattedTimestamp = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

document.getElementById("joinForm").addEventListener("submit", function() {

const formattedTimestamp = formatTimestamp();
document.getElementById("timestamp").value = formattedTimestamp;
});