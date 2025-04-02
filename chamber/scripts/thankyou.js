const getString = window.location.search;
// console.log(getString);

const formInfo = new URLSearchParams(getString);
console.log(formInfo);

document.querySelector('#submitted-info').innerHTML = `
<p><strong>Name: </strong> ${formInfo.get('fname')} ${formInfo.get('lname')}</p>
<p><strong>Title: </strong> ${formInfo.get('title')}</p>
<p><strong>Business: </strong> ${formInfo.get('business')}</p>
<p><strong>Email: </strong>${formInfo.get('email')}</p>
<p><strong>Phone: </strong>${formInfo.get('phone')}</p>
<p><strong>Timestamp: </strong> ${formInfo.get('timestamp')}</p>`;

