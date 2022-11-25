    // var input = document.querySelector('.input');
    // var items=Array.from(document.querySelectorAll('.item'));
    // items.forEach(function(btn){

    //     btn.addEventListener("click",function(){
    //         if(input.innerHTML =='0')
    //         input.innerHTML='';
    //         if(btn.innerHTML =='AC')
    //         input.innerHTML='0';
    //         else if(btn.innerHTML =='DEL'){
    //             var arrtext=Array.from(input.innerHTML);
    //             arrtext.splice(arrtext.length-1,1);
    //             if(arrtext.length!=0)
    //             input.innerHTML=arrtext.join('');
    //             else input.innerHTML='0';
    //     }
    //         else if(btn.innerHTML =='='){
    //             input.innerHTML= eval(input.innerHTML);
    //     }
    //         else input.innerHTML+=btn.innerHTML;
    //     })
    // })  

const numbers = document.getElementsByClassName('item');
const result = document.getElementById("result");

for (let number of numbers) {
    number.addEventListener('click',function () {
        result.innerHTML += this.value
    });
}

function equal() {
    let res = result.innerHTML
    let output = eval(res)
    result.innerHTML = output
}

function clean() {
    result.innerHTML = ""
}

function undo() {
    let res = result.innerHTML
    result.innerHTML = res.substring(0, res.length - 1);
}