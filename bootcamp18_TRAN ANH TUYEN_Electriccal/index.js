function numCount() {
    var number = document.getElementsByClassName('input_num')[0].value * 1;
    var output = document.getElementById('number');
    var textLine, num = 0;
    var length = number.length;
    if(number == 0){
        output.innerText = `Hãy nhập lượng điện tiêu thụ`;
    } else {
        for(i = 1; i <= number; i++){
            if(i <= 50){
                num += 500;
            }
            if(i > 50 && i <= 100){
                num += 650;
            }
            if(i > 100 && i <= 200){
                num += 850;
            }
            if(i > 200 && i <= 350){
                num += 1100;
            }
            if(i > 350){
                num += 1300;
            }
        }
        output.innerText = `Số tiền cần trả là: ${num}`
    }

    
}



function reset() {
    var number = document.getElementsByClassName('input_num');
    var output = document.getElementById('number');
    for(i = 0; i < number.length; i++){
        if(number[i].value === ''){
            output.innerHTML = '';
        }
    }
}