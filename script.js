                                        //takes input, display new elements

let uiConteroller = (function(){
    let domClasses = {
        
        select : 'selectSign',
        des : 'descInput',
        val : 'valInput',
        button : 'okButton',
        incomeSection : '.incomeSection',
        expenseSection : '.expenseSection',
        budget : '.budget',
        totalIncome : '.totalIncome',
        totalExpense : '.totalExpense',
        totalExpensePer : '.totalExpensePer',
        parent : '.parent',
        cancelE : '.cancelIE',
        cancelI : '.cancelII',
        percnt : '.percnt',
        date : '.date',
    };
    
    
    let formatted = function(number,type){
        let splited,dec,num;
        number = Math.abs(number);
        number = number.toFixed(2);
        splited = number.split('.');
        dec = splited[1];
        num = splited[0];
        if(num.length > 3)
            {
                num = num.substr(0,num.length-3)+','+num.substr(num.length-3,num.length);
            }
        return (type === 'inc' ? '+' : '-')+' '+num+'.'+dec;
    }
    return{
        
        dom : function(){return domClasses;},
        
        getInput : function(){
            return{
                type : document.getElementById(domClasses.select).value,
                desc : document.getElementById(domClasses.des).value,
                value :parseFloat(document.getElementById(domClasses.val).value),
            };
        },
        
        addHtml : function(item,type){
            let html,mHtml,element;
            if(type === 'exp')
                {
                    element = document.querySelector(domClasses.expenseSection);
                    html = '<section id="exp-%id%" class="child col-sm-12 col-xs-12 col-md-12 clearfix"><div class="float-left clearfix col-9 "><div   class=" expenseDesc float-left col-7 text-left">%desc%</div><div class="ext-right float-left col-5 expenseValue">%val%</div></div><div class="float-right clearfix col-3 "><div class="percnt float-left col-6 text-left">45%</div><button class="cancelE col-6 float-right"><i class="cancelIE ion-ios-close-outline"></i></button></div></section>';  
                    
                }
            
            else if(type === 'inc')
                {
                    element = document.querySelector(domClasses.incomeSection);
                    
                    html = '<section id="inc-%id%" class="child col-sm-12 col-xs-12 col-md-12 clearfix"><div class="float-left clearfix col-6 "><div class="incomeDesc float-left">%desc%</div></div><div class="float-right clearfix  col-6"><div class="float-left incomeValue col-10 ">%val%</div><button class="cancelI col-2  float-right"><i class="cancelII ion-ios-close-outline"></i></button></div></section>';               
                    
                }
            
            mHtml = html.replace('%desc%',item.desc);
            mHtml = mHtml.replace('%val%',formatted(item.value,type));
            mHtml = mHtml.replace('%id%',item.id);
            
            element.insertAdjacentHTML('beforeend',mHtml);
            
             
        },
        
        displayBudget : function(budget){
          
            
            
            let fields,fieldsArray,type;
            
            fields = document.querySelectorAll(domClasses.budget+','+domClasses.totalExpense+','+domClasses.totalIncome+','+domClasses.totalExpensePer)
            
            
            fieldsArray = Array.prototype.slice.call(fields);
            if(budget.budget > 0 ? type='inc' : type = 'exp');   
            fieldsArray[0].textContent =formatted(budget.budget,type);
            fieldsArray[1].textContent =formatted(budget.totalIncome,'inc');
            fieldsArray[2].textContent =formatted(budget.totalExpense,'exp');
            if(budget.percentage >0 && budget.percentage <= 100)
            fieldsArray[3].textContent = budget.percentage+'%';
            else
                fieldsArray[3].textContent = '---';
                
        
            
            /*
            })*/ 
        },
        
        displayDate : function(){
            let today,month,year,monthName=['Jan','Fab','Mar','Apr','May','Jun','Jul','Aug','Sept','Nov','Dec'];
            today = new Date();
            month = today.getMonth();
            year = today.getFullYear();
            document.querySelector(domClasses.date).textContent = monthName[month] +' '+year+' :';
        },
        
        clearFields : function(){
            
            //document.getElementById(domClasses.select).value = 'inc';
            document.getElementById(domClasses.des).value = '';
            document.getElementById(domClasses.val).value='';
            document.getElementById(domClasses.des).focus();
            
           /* let fields,fieldsArray;
            
            fields = document.querySelectorAll(domClasses.budget+','+domClasses.totalExpense+','+domClasses.totalIncome+','+domClasses.totalExpensePer)
            
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(current){
                
                current.textContent = '00.00';
            })*/
            
        },
        
        deleteHtml : function(htmlDel,type){
            
                htmlDel.parentElement.removeChild(htmlDel);
            
           // if(type==='inc')
               // document.querySelector(domClasses.incomeSection).removeChild(htmlDel);
           // else if(type === 'exp')
                //    document.querySelector(domClasses.expenseSection).removeChild(htmlDel);
                
        },
        
        displayPercentage : function(exPer){
            
             let perList = document.querySelectorAll(domClasses.percnt);
             let perArray = Array.prototype.slice.call(perList);
            
            if(perArray.length > 0)
                {
                    perArray.forEach(function(current,index)
                       {
                        
                        if(exPer[index] > 0 && exPer[index] <= 100)
                            perArray[index].textContent = exPer[index]+'%';
                        else
                            perArray[index].textContent = '--';
                          
                       })
                }
        },
        
        typeChange : function(){
             
            let fields =[];
             fields[0] =  document.getElementById(domClasses.select);
             fields[1] =  document.getElementById(domClasses.des);
             fields[2] =  document.getElementById(domClasses.val);
             fields.forEach(function(current){
                current.classList.toggle('focus');
                 
             });
             document.getElementById(domClasses.button).classList.toggle('red');
        }
    }
})();



                                        // all calculations and data storage


let budgetController = (function(){
    
    let Expense = function(desc,value,id,exPer){
            this.id = id;
            this.desc = desc;
            this.value = value;
            this.exPer = -1;
    }
    
    Expense.prototype.calculatePercentage = function(totalIncome){
      if(data.total.inc > 0)
            this.exPer =Math.round((this.value/data.total.inc)*100);
       else
            this.exPer = -1;  
    };
    
    Expense.prototype.getPercentage = function(){
        
        return this.exPer;        
    };
    
    let Income = function(desc,value,id){
            this.id = id;
            this.desc = desc;
            this.value = value;  
    }
    
    let data = {
        allItems: {exp:[], inc:[]},
        total : {exp:0,inc:0},
        budget : 0,
        percent : -1,
    }
    
    let calculateTotal = function(type){
       let sum=0;
       data.allItems[type].forEach(function(current){sum = sum + current.value });
        
       data.total[type] = sum;
        
    }
    
    return{
        addItem : function(type,desc,value){
            let newItem,id;
           
            if(data.allItems[type].length > 0)
                        {
                            id =  data.allItems[type][(data.allItems[type].length)-1].id +1;
                        }
                    else
                        id = 0;
            
            if(type === 'inc'){newItem = new Income(desc,value,id); }
            else if(type === 'exp'){newItem = new Expense(desc,value,id) }
            
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        calculateBudget : function(){
            
            
            calculateTotal('inc');
            calculateTotal('exp');
            
            data.budget = data.total.inc - data.total.exp;
            
            if(data.total.inc > 0)
                {
                  data.percent = Math.round((data.total.exp/data.total.inc)*100);  
                }
            else
                data.percent = -1;
       },
        
        getBudget : function(){
            return {
                
                budget : data.budget,
                totalIncome : data.total.inc,
                totalExpense : data.total.exp,
                percentage : data.percent,
            }
        },
        
        deleteData : function(type,id){
            
            data.allItems[type].forEach(function(current,index){
                if(current.id === id)
                    {
                       data.allItems[type].splice(index,1)
                    }
            })
        },
        
        calculatePercentage : function(){
            data.allItems.exp.forEach(function(current){
                current.calculatePercentage(data.total.inc);
            });
        },
        
        getPercentage : function(){
           let percentages =  data.allItems.exp.map(function(current){
                return current.getPercentage();
            })
            return percentages;
        }
    }
    
    
    
})();


                                        //will control all the modules i.e center point


let controller = (function(uiConteroller,budgetController){
    
    
    
    //adding event listner 
    let addEvent = function(){
        
        let domClass = uiConteroller.dom();  // Receiving class names from uiController
        document.getElementById(domClass.des).focus();
        document.getElementById(domClass.button).addEventListener('click',onClickFn);
        document.querySelector(domClass.parent).addEventListener('click',deleteItem);
        document.getElementById(domClass.select).addEventListener('change',uiConteroller.typeChange);
        
    }
    
    //what happens on clicking
    let onClickFn = function() {
        
        let input = uiConteroller.getInput(); //getting inputs from user
        
        if(input.desc !== '' && input.value > 0)
            {
                let item = budgetController.addItem(input.type,input.desc,input.value); //storing values taken from user
        
                uiConteroller.addHtml(item,input.type); //adding data into UI
                
                uiConteroller.clearFields();
            
                updateBudget(); //updating Budget and total income/expenses
                
                updatePercentage();
            }
        
        
    }
    
   let updateBudget = function(){
       
       let budget;
       
       budgetController.calculateBudget();  //calculate Budget and total income/expenses
       
       budget = budgetController.getBudget();
       
       uiConteroller.displayBudget(budget);
    }
    
   let deleteItem = function(Event){
        let toDelete,htmlDel,type,id;    
        
        if(Event.target.tagName === 'I')
            {
                htmlDel = Event.target.parentNode.parentNode.parentNode;
                toDelete = Event.target.parentNode.parentNode.parentNode.id;
            
        toDelete = toDelete.split('-');
        type = toDelete[0];
        id = parseFloat(toDelete[1]);
        
        budgetController.deleteData(type,id);
        
        uiConteroller.deleteHtml(htmlDel,type);
        
        updateBudget();
       
        if(type === 'inc'){}
        updatePercentage();
            }
       
    }
   
   let updatePercentage = function(){
       
       budgetController.calculatePercentage();
       
       let percentages = budgetController.getPercentage();
       
       uiConteroller.displayPercentage(percentages);
      
   }
   
   return{
        
         init : function(){
             uiConteroller.displayDate();
             addEvent();
             
        },
        
    }
    
})(uiConteroller,budgetController);

controller.init();
