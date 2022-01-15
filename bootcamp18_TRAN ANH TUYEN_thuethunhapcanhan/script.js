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
                        message: 'Nhập họ tên của bạn'
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
const name = document.getElementById('diemchuan');
const year = document.getElementById('year');
const depent = document.getElementById('dependent');
const warn = document.getElementById('alert');

function taxcal(){
    var user_name = name.value;
    var user_year = year.value * 1;
    var user_depent = depent.value * 1;
    var taxx = taxExport(tax(user_year, user_depent));
    if(user_name == '' || user_year == 0 || user_depent ==0){
        warn.innerHTML = `<p class = "text-danger">Bạn phải nhập đầy đủ thông tin</p>`;
    } else{
        warn.innerHTML = `Thuế thu nhập của <b>${user_name}</b> là: <b class = "text-secondary">${taxx}</b>`
    }
}

function taxExport(tax){
    if(tax <= 60){
        return tax * 0.05;
    }
    if(tax > 60 && tax <= 120){
        return tax * 0.1;
    }
    if(tax > 120 && tax <= 210){
        return tax * 0.15;
    }
    if(tax > 210 && tax <= 384){
        return tax * 0.2;
    }
    if(tax > 384 && tax <= 624){
        return tax * 0.25;
    }
    if(tax > 624 && tax <= 960){
        return tax * 0.3;
    }
    if(tax > 960){
        return tax * 0.35;
    }  
}

function tax(user_year, user_depent){
    return (user_year - 4 - user_depent * 1.6);
}