

window.addEventListener('DOMContentLoaded', function loaded(){
    let UIController = (function UIController() {
        let domString = {
            btns : "#btn",
            inputBtn : '#btn-value',
            inputBill : '#bill',
            inputValue : '#value',
            TipAmount : '#tip-amount',
            TotalAmount : '#total-amount',
            warning : '#warning',
            reset: '#restValue'
        };

        function getValues(arg){
            return document.querySelector(arg).value;
        }

        function updateUI(tip, val){
            document.querySelector(domString.TipAmount).textContent = `$${tip}`;
            document.querySelector(domString.TotalAmount).textContent = `$${val}`;
        }

        function defaultValue(){
            document.querySelector(domString.TipAmount).textContent = '$0.00';
            document.querySelector(domString.TotalAmount).textContent = '$0.00';
            document.querySelector(domString.inputBill).value='';
            document.querySelector(domString.inputBtn).value='';
            document.querySelector(domString.inputValue).value='';
        }

        function warning(){
            document.querySelector(domString.inputValue).classList.add('border-active');
            document.querySelector(domString.warning).classList.add('active', 'visible');
        }

        function Removewarning(){
            document.querySelector(domString.inputValue).classList.remove('border-active');
            document.querySelector(domString.warning).classList.remove('visible');
        }


        function clearFields(){
            defaultValue();
        }

        return {
            Dom: domString,
            getValues,
            updateUI,
            defaultValue,
            warning,
            Removewarning
        }
    })();

    let DataController = (function DataController() {
        function checkValue(inputBill, inputValue){
            return (inputBill && inputValue) ? true : false;
        }

        function calc(bill, amt, val){
            let tipValue = parseInt((((parseInt(bill) / 100) * amt) / val).toFixed(2));
            let totalBill = ((tipValue + amt) / val).toFixed(2);

           return {
               tipValue,
               totalBill
           }
        }

        return {
            checkValue,
            calc
        }
    })();

    let Controller = (function Controller(UI, Data) {
        let DomString = UI.Dom;


        // Event Listener Setup
        let setupEventListener = function(){
            let btns = document.querySelectorAll(DomString.btns);

            btns.forEach( btn => {
                btn.addEventListener('click', function btn(e){
                    e.preventDefault();
                    let value = e.target.value;
                    let num = value.substring(0, value.length - 1);

                    tipper(num);

                });
            });

            document.querySelector(DomString.inputBtn).addEventListener('input', function(e){
                let num = e.target.value.trim();

                if(num) {
                    tipper(num);
                }else  {
                    UI.defaultValue();
                }
            });

            document.querySelector(DomString.reset).addEventListener('click', function(e){
                e.preventDefault();

                UI.defaultValue();
            });
        };

        function data(){
            let inputValue = parseInt(UI.getValues(DomString.inputValue));
            let inputBill = parseInt(UI.getValues(DomString.inputBill));

            return{
                inputValue,
                inputBill,
            }
        }

        function tipper(num){
            // Data
            if(num){
                // Data
                let datas = data();

                let result = Data.checkValue(datas.inputBill, datas.inputValue);

                if(result){
                    let value = Data.calc(num, datas.inputBill, datas.inputValue);
                    UI.updateUI(value.tipValue, value.totalBill);
                    UI.Removewarning();
                }else{
                    UI.warning();
                    UI.defaultValue();
                }
            }else{
                UI.defaultValue();
            }
        }

        return {
            init: function (){
                console.log('App is runinng');
                
                UI.defaultValue();
                setupEventListener();
            }

        }

    })(UIController, DataController);

    Controller.init();
});
