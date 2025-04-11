const getString = window.location.search;
console.log(getString);
const formInfo = new URLSearchParams(getString);
console.log(formInfo);
const display = document.getElementById('submitted-info');

const entries = {
  fname: "First Name",
  lname: "Last Name",
  phone: "Phone Number",
  email: "Email",
  preferred: "Preferred Contact Method(s)",
  interest: "Interest(s)"
};

const labelMap = {
  email: "Email 📧",
  call: "Phone Call 📞",
  text: "Text Message 📱",
  group: "Support Group Meetings 🪑",
  supporter: "Becoming a Supporter 💖",
  information: "General Information ❓"
};
  
Object.keys(entries).forEach(key => {
  let value = formInfo.getAll(key).filter(item => item.trim() !== "");
  if (value.length > 0) {
    const displayValues = value.map(item => labelMap[item] || item);
    const section = document.createElement("div");
    section.innerHTML = `<strong>${entries[key]}:</strong> ${displayValues.join(", ")}`;
    display.appendChild(section);
  }
});

document.getElementById('go-back').addEventListener('click', () => {
  window.history.back();
});