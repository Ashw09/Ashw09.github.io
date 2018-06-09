/*
                                                        Solution 1

let budget,budgetSign,totalIncome,totalExpense,totalExpensePer,selectSign,descInput,valInput,okButton,incomeSection,expenseSection,inputSign,inputDesc,inputValue;

budget = document.getElementById("budget");
budgetSign = document.getElementById("budgetSign");
totalIncome = document.getElementById("totalIncome");
totalExpense = document.getElementById("totalExpense");
totalExpensePer = document.getElementById("totalExpensePer");
selectSign = document.getElementById("selectSign");
descInput = document.getElementById("descInput");
valInput = document.getElementById("valInput");
okButton = document.getElementById("okButton");
incomeSection = document.getElementById("incomeSection");
expenseSection = document.getElementById("expenseSection");

//console.log(totalIncome.value);

okButton.addEventListener('click',function(){
    
    inputSign = selectSign.value;
    inputDesc = descInput.value;
    inputValue = Number(valInput.value);
    
    if(inputSign === '+')
        {
            
            if(inputDesc === '' || inputValue === 0)
                {
                    alert('Input description or value')
                }
            
            else
                {
                   let node;
            
                    let icon = document.createElement("i");
                    icon.classList.add('float-right','cancelII','mx-auto','ion-ios-checkmark-outline');

                    let cancelButton = document.createElement("button");
                    cancelButton.classList.add('cancelI');
                    cancelButton.appendChild(icon);


                    let incomeValDiv = document.createElement("div");
                    incomeValDiv.classList.add('text-right','float-left','incomeValue');
                    node = document.createTextNode('+' + inputValue);
                    incomeValDiv.appendChild(node);

                    let rightDiv = document.createElement("div");
                    rightDiv.classList.add('float-right','clearfix');
                    rightDiv.appendChild(incomeValDiv);
                    rightDiv.appendChild(cancelButton);

                    let leftDiv = document.createElement("div");
                    leftDiv.classList.add('incomeDesc','float-left','text-right');
                    node = document.createTextNode(inputDesc);
                    leftDiv.appendChild(node);

                    let childSection = document.createElement("section");
                    childSection.appendChild(leftDiv);
                    childSection.appendChild(rightDiv);
                    childSection.classList.add("child");

                    incomeSection.appendChild(childSection);

                    totalIncome.textContent = Number(totalIncome.textContent) + inputValue;

                    budget.textContent = Number(totalIncome.textContent) - Number(totalExpense.textContent);
                    
                    if(Number(totalIncome.textContent)>0)
                    {
                        totalExpensePer.textContent =Math.round(( Number(totalExpense.textContent)/ Number(totalIncome.textContent))*100)+'%';
                    }


                    if(Number(budget.textContent) < 0)

                            budgetSign.textContent = ''; 

                    descInput.value ="";
                    valInput.value = "";

                    cancelButton.addEventListener('click',cancelFn);

                }
            
        }
    
    
    else
        {
            
            if(inputDesc === '' || inputValue === 0)
                {
                    alert('Input description or value')
                }
            
            else
                {
                   let node;

                    let icon = document.createElement("i");
                    icon.classList.add('float-right','cancelIE','mx-auto','ion-ios-checkmark-outline');

                    let cancelButton = document.createElement("button");
                    cancelButton.classList.add('cancelE');
                    cancelButton.appendChild(icon);
                    
                    let prcntDiv = document.createElement("div");
                    prcntDiv.classList.add('float-left','percnt','text-left');
                    node = document.createTextNode(Math.round((inputValue/Number(totalIncome.textContent))*100) + '%');
                    
                    if(Number(totalIncome.textContent)>0)
                        prcntDiv.appendChild(node);
                    else
                        prcntDiv.textContent = '0%';
                    
                    let rightDiv = document.createElement("div");
                    rightDiv.classList.add('float-right','clearfix');
                    rightDiv.appendChild(prcntDiv);
                    rightDiv.appendChild(cancelButton);


                    let expenseValDiv = document.createElement("div");
                    expenseValDiv.classList.add('text-right','float-left','expenseValue');
                    node = document.createTextNode('-' + inputValue);
                    expenseValDiv.appendChild(node);

                    let expenseDescDiv = document.createElement("div");
                    expenseDescDiv.classList.add('expenseDesc','float-left','text-right');
                    node = document.createTextNode(inputDesc);
                    expenseDescDiv.appendChild(node);

                    let leftDiv = document.createElement("div"); 
                    leftDiv.classList.add('float-left','clearfix');
                    leftDiv.appendChild(expenseDescDiv);
                    leftDiv.appendChild(expenseValDiv);

                    let childSection = document.createElement("section");
                    childSection.appendChild(leftDiv);
                    childSection.appendChild(rightDiv);
                    childSection.classList.add("child");

                    expenseSection.appendChild(childSection);

                    totalExpense.textContent = Number(totalExpense.textContent) + inputValue;

                    budget.textContent = Number(totalIncome.textContent) - Number(totalExpense.textContent);
                    
                    if(Number(totalIncome.textContent)>0)
                    {
                        totalExpensePer.textContent =Math.round(( Number(totalExpense.textContent)/ Number(totalIncome.textContent))*100)+'%';
                    }


                    if(Number(budget.textContent) < 0)

                            budgetSign.textContent = ''; 

                    descInput.value ="";
                    valInput.value = "";
                    
                    cancelButton.addEventListener('click',cancelFn);
                    
                }
            
            
        }
     
    
})

function cancelFn()
    {   
        let parent = this.parentElement.parentElement.parentElement;

        let child = this.parentElement.parentElement;
        
        let classes = parent.classList;
        
        if(classes[0] === 'incomeSection')
            {
                let rightDivNodes = this.parentElement.childNodes;

                totalIncome.textContent =Number(totalIncome.textContent) - rightDivNodes[0].textContent;

                budget.textContent = Number(budget.textContent) - Number(rightDivNodes[0].textContent);
                
                if(Number(totalIncome.textContent)>0)
                    {
                        totalExpensePer.textContent =Math.round(( Number(totalExpense.textContent)/ Number(totalIncome.textContent))*100)+'%';
                    }

                if(Number(budget.textContent) < 0)
                     budgetSign.textContent = '';

                parent.removeChild(child);
            }
        
        
        if(classes[0] === 'expenseSection')
            {
               let DivNodes = this.parentElement.parentElement.childNodes;
                
                let leftDivNodes = DivNodes[0].childNodes;
                
                totalExpense.textContent = Number(totalExpense.textContent) + Number(leftDivNodes[1].textContent);
                
                if(Number(totalIncome.textContent)>0 )
                    {
                        totalExpensePer.textContent =Math.round(( Number(totalExpense.textContent)/ Number(totalIncome.textContent))*100)+'%';
                    }
                
                budget.textContent = Number(budget.textContent) - Number(leftDivNodes[1].textContent);
                    
                
                if(Number(budget.textContent) < 0)
                     budgetSign.textContent = '';

               parent.removeChild(child);
                
            }

     /*
    
    totalIncome.textContent =Number(totalIncome.textContent) - rightDivNodes[0].textContent;

                budget.textContent = Number(budget.textContent) - rightDivNodes[0].textContent;

                if(Number(budget.textContent) < 0)
                     budgetSign.textContent = '';

                parent.removeChild(child);


    } */

/*                        
                        
      <!--  <div class=" incomeDesc float-left text-right">Inmemmmmmmmmmmm</div>
                        
                        <div class="float-right clearfix">
                            <div class="text-right float-left incomeValue">4000000000.00</div>
                            <button class="cancelI"><i class="float-right cancel mx-auto ion-ios-checkmark-outline"></i></button>
                        </div>
                    -->
            
*/

/*                        
                        
     <!--        <section>
                        <div class="float-left clearfix">
                            
                            <div id="expenseDesc" class=" expenseDesc float-left text-right">Inmemmmmmmmmmmm</div>
                            
                            <div id="expenseValue" class="text-right float-left expenseValue">4000000000.00</div>
                            
                        </div>
                        
                        
                         <div class="float-right clearfix">
                             
                            <div class="float-left percnt text-left">1234</div>
                             
                            <button class="cancelE"><i class="float-right cancel mx-auto ion-ios-checkmark-outline"></i></button>
                             
                        </div>
                    </section>   -->
            
*/
