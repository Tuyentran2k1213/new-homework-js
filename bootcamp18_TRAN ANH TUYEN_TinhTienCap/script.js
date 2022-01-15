$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 0,
                        max: 30,
                    },
                        notEmpty: {
                        message: 'Nhập mã của khách hàng'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 0,
                        max: 30,
                    },
                    notEmpty: {
                        message: 'Dữ liệu nhập vào phải là dạng số'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Hãy nhập đúng số điểm'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Hãy nhập đúng số điểm'
                    },
                    phone: {
                        country: 'US',
                        message: 'Hãy nhập đúng số điểm'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 0,
                        max: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 0,
                        max: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Hãy chọn khu vực của bạn'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 0,
                        max: 2,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});
const userId = document.getElementById('diemchuan');
const connect = document.getElementById('year');
const dan = document.getElementById('dan');
const dn = document.getElementById('dn');
const channel = document.getElementById('dependent');
const appear = document.getElementById('connect');
const warn = document.getElementById('alert');

function cableMoney(){
    var content = '';
    if(userId.value == ''){
        content = `<b class = 'text-danger'>Vui lòng nhập đầy đủ thông tin</b>`;
    } else{
        if(dan.checked){
            content = people();
        } else if(dn.checked) {
            content = enterprise();
        } else{
            content = `<b class = 'text-danger'>Vui lòng nhập đầy đủ thông tin</b>`;
        }
    }
    warn.innerHTML = content;
}


var appearChannel = function(){
    if(dan.checked){
        appear.style.display = 'none';
    }
    if(dn.checked){
        appear.style.display = 'block';
    }
}



var people = function(){
    var numberChannel = (channel.value * 1) * 7.5;
    return `<ul type = 'radio'>
    <li>Phí xử lý hóa đơn: <b>4.5$</b></li>
    <li>Phí dịch vụ cơ bản: <b>20.5$</b></li>
    <li>Thuê kênh cao cấp: <b>${(numberChannel).toLocaleString()}$</b></li>
    <li>Tổng số tiền phải thanh toán: <b>${(2.4 + 20.5 + numberChannel).toLocaleString()}$</b></li>
</ul>`
}



var enterprise = function(){
    var numberChannel = (channel.value * 1) * 50;
    var numberConnect = connect.value * 1;
    var priceConnect = 0;

    for(i = 1; i <= numberConnect; i++){
        if(i <= 10){
            priceConnect += 7.5;
        } else {
            priceConnect += 5;
        }
    }
    return `<ul type = 'radio'>
    <li>Phí xử lý hóa đơn: <b>15$</b></li>
    <li>Phí dịch vụ cơ bản: <b>${priceConnect}$ cho ${numberConnect} kênh</b></li>
    <li>Thuê kênh cao cấp: <b>${(numberChannel).toLocaleString()}$</b></li>
    <li>Tổng số tiền phải thanh toán: <b>${(15 + priceConnect + numberChannel).toLocaleString()}$</b></li>
</ul>`
}