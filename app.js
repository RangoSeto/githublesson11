//Get UI
const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form');
const gettranstatuses = document.querySelectorAll(".form-check-input");
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const openbtn = document.getElementById("open-btn");
const gethisbox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');

// const dummydatas = [
//     {
//         id: 1,
//         transtatus: "+",
//         amount: 1000,
//         date: "2023-01-20",
//         remark: 'Petty Cash'
//     },
//     {
//         id: 2,
//         transtatus: "-",
//         amount: -20,
//         date: "2023-01-21",
//         remark: 'Pen'
//     },
//     {
//         id: 3,
//         transtatus: "+",
//         amount: 300,
//         date: "2023-01-25",
//         remark: 'Other Income'
//     },
//     {
//         id: 4,
//         transtatus: "-",
//         amount: -10,
//         date: "2023-01-25",
//         remark: 'Book'
//     },
//     {
//         id: 5,
//         transtatus: "-",
//         amount: -150,
//         date: "2023-01-25",
//         remark: 'Water',
//     },
//     {
//         id: 6,
//         transtatus: "-",
//         amount: -100,
//         date: "2023-01-25",
//         remark: 'Teamix'
//     }

// ];

// console.log(dummydatas);


const getlsdatas = JSON.parse(localStorage.getItem('transactions'));
let gethistories = localStorage.getItem('transactions') !== null ? getlsdatas : [];


// Initial App
function init(){
    getlistgroup.innerHTML = '';


    // Method1
    // dummydatas.forEach(function(dummydata){
    //     console.log(dummydata);
    //     addtoui(dummydata);
    // });

    // Method2
    // dummydatas.forEach(dummydata=> addtoui(dummydata));

    // Method3 ****
    // dummydatas.forEach(addtoui);

    gethistories.forEach(addtoui);

    totalvalue();
}

init();

// Create li to ul
function addtoui(transition){
    // console.log(transition);
    // console.log(transition.amount , typeof transition.amount);

    const newli = document.createElement('li');

    newli.innerHTML = `${transition.remark} <span>${transition.transtatus}${Math.abs(transition.amount)}</span><span>${transition.date}</span><button type="button" class="delete-btn" onclick="removetransaction(${transition.id})">&times;</button>`;

    newli.classList = 'list-group-item';

    newli.classList.add(transition.transtatus === '+' ? 'inc' : 'dec');

    // console.log(newli);

    getlistgroup.appendChild(newli);
}




var sign = "-";

// Get Sign
gettranstatuses.forEach(function(gettranstatus){
    gettranstatus.addEventListener('change',function(){
        // console.log(this.value);
    
        if(this.value === "debit"){
            sign = "+";
        }else if(this.value === "credit"){
            sign = "-";
        }
    });
});

function newtransaction(e){
    // console.log("hay");
    // console.log(sign);

    if(isNaN(getamount.value) || getamount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === ''){
        alert('Ohh!!! Some data are missing');
    }else{
        
        const transaction = {
            id:generateidx(),
            transtatus:sign,
            amount:sign === "-" ? Number(-getamount.value) : Number(getamount.value),
            date:getdate.value,
            remark:getremark.value
        };

        // console.log(transaction);

        gethistories.push(transaction);

        addtoui(transaction);

        totalvalue();

        updatelocalstorage();

        getamount.value = '';
        getdate.value = '';
        getremark.value = '';

        getamount.focus();


    }

    e.preventDefault();
}


// Update Local Storage
function updatelocalstorage(){
    localStorage.setItem('transactions',JSON.stringify(gethistories));
}

function generateidx(){
    return Math.floor(Math.random() * 100000);
}
// console.log(generateidx());


function totalvalue(){
    const amounts = gethistories.map(gethistory=>gethistory.amount);  //array နဲ့ပြန်လိုချင်လို့ map သုံးမှရမယ်
    console.log(amounts);

    // Method 1
    // const result = amounts.reduce(function(total,curvalue){
    //     total += curvalue;
    //     return total;
    // },0).toFixed(2);

    // Method 2
    const totalresult = amounts.reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
    const debitresult = amounts.filter(amount=>amount > 0).reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
    const creditresult = (amounts.filter(amount=>amount < 0).reduce((total,curvalue)=>(total += curvalue),0)* -1).toFixed(2);

    balance.innerText = `${totalresult}`;
    moneydeb.textContent = `${debitresult}`;
    moneycrd.textContent = `${creditresult}`;


    // console.log(totalresult);
    console.log(debitresult);
    // console.log(creditresult);


}

totalvalue();


function removetransaction(tranid){
    gethistories = gethistories.filter(gethistory => gethistory.id !== tranid)

    init();

    updatelocalstorage();
}


openbtn.addEventListener('click',function(){
    gethisbox.classList.toggle('show');
});

getform.addEventListener("submit",newtransaction);




// reduce explaination
// var myarrs = [10,20,30,40,50,60,70,80,90,100];
// // array.reduce(function(total,currentValue,currentIndex,array){},initialValue);

// var result = myarrs.reduce(function(total,curvalue,curidx,arr){
//     // console.log('this is total = ',total); // 0 underdined*9 //if we use 1 parameter 10 underfined*9
//     // console.log('this is curvalue = ',curvalue); // 10 to 100 by number //if we use 1 parameter 20 to 100 by number
//     // console.log('this is curidx = ',curidx); // 0 to 9 index number //if we use 1 parameter 1 to 9 index number
//     // console.log(arr);

//     total += curvalue;
//     return total;
// },0);

//initial 0 ဆို idx 0 ကစလုပ်မယ်လို့ပြောတာ 1 ဆို idx no1 ကစလုပ်မှာ

// console.log(result);
