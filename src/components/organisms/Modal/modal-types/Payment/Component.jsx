import { Toast } from 'flowbite-react';
import React from 'react';
import { Button } from '../../../../atoms';
import { Checkbox } from '../../../../molecules';
import FilterCard from '../../../../molecules/Cards/search/filter/filter-card';
const DokuPayment = ({otherProps}) => {
 // console.log("tesdsd",otherProps)
var cssJokul = document.createElement('link');
cssJokul.setAttribute('rel', 'stylesheet');
cssJokul.setAttribute('href', 'https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.css');
document.head.appendChild(cssJokul);
function loadJokulCheckout (url) {
    var token = url + "?view=iframe";
    var jokulCheckoutModal = document.createElement("div");
    jokulCheckoutModal.setAttribute('class', 'jokul-modal');
    jokulCheckoutModal.setAttribute('id', 'jokul_checkout_modal');
    jokulCheckoutModal.innerHTML = '<div class="jokul-content">\n <iframe src="' + token + '"></iframe>\n </div>';
    document.body.appendChild(jokulCheckoutModal);
    document.getElementById("jokul_checkout_modal").style.display = "block";
}
// Get the modal
var modal = document.getElementById("jokul_checkout_modal");
// When the user clicks anywhere outside of the modal, the modal not closed
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "block";
    }
}
function closeJokul() {
    document.getElementById("jokul_checkout_modal").style.display = "none";
}
if (window.addEventListener) {
    window.addEventListener("message", receive, false);
}
else {
    if (window.attachEvent) {
        window.attachEvent("onmessage", receive, false);
    }
}
function receive(event) {
    var data = event.data;
    if (typeof (window[data.func]) == "function") {
        window[data.func].call(null, data);
    }
}
function alertMyMessage(msg) {
    alert(msg);
}
return(
    <iframe src={`${otherProps}?view=iframe`}  frameborder="0" className='h-[500px] min-w-max'></iframe>
)
}
export default DokuPayment;