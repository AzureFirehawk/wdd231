const membership =[
    {
        level: "non-profit", 
        price: '$50 per year', 
        benefits: [
            'Directory listing on website',
            'Open invitation to networking events',
            'Discounts on chamber events and sponsorships'
        ]
    },
    {
        level: "bronze", 
        price: '$150 per year', 
        benefits: [
            'Directory listing on website',
            'Open invitation to networking events',
            'Free admission to select chamber events',
            'Discounts on sponsorships',
            'Discounted advertising options'
        ]
    },
    {
        level: "silver", 
        price: '$450 per year', 
        benefits: [
            'Directory and spotlight listing on website',
            'Access to exclusive networking events',
            'Complimentary tickets to signature chamber events',
            'Personalized business consultation services',
            'Leadership opportunities in chamber initiatives'
        ]
    },
    {
        level: "gold", 
        price: '$750 per year', 
        benefits: [
            "Featured business profile on chamber's social media",
            'Exclusive industry and chamber roundtable invitations',
            'Priority access to chamber events',
            'Priority access to chamber resources and media coverage',
            'Customized business devlopment and marketing support'
        ]
    }
]

const nonProfit = document.querySelector('#np-button');
const bronze = document.querySelector('#bronze-button');
const silver = document.querySelector('#silver-button');
const gold = document.querySelector('#gold-button');

function displayMembershipInfo(membership){
    let info = document.querySelector('.membership-modal');
    info.innerHTML = '';
    info.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${membership.level.toUpperCase()} MEMBERSHIP</h2>`; 
    info.innerHTML += `<p><strong>${membership.price}</strong></p><br>
        <h3>Benefits Include:</h3>`;
    membership.benefits.forEach(benefit => {
        info.innerHTML += `<p>-${benefit}</p>`;
    });
    info.showModal();

    closeModal.addEventListener('click', () => info.close());
}

nonProfit.addEventListener('click', () => displayMembershipInfo(membership[0]));
bronze.addEventListener('click', () => displayMembershipInfo(membership[1]));
silver.addEventListener('click', () => displayMembershipInfo(membership[2]));
gold.addEventListener('click', () => displayMembershipInfo(membership[3]));