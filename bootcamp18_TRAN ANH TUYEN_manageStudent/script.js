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
                        max: 2,
                    },
                        notEmpty: {
                        message: 'Điểm nhập vào phải là dạng số'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 0,
                        max: 2,
                    },
                    notEmpty: {
                        message: 'Hãy nhập đúng số điểm'
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
const diemchuan = document.getElementById('diemchuan');
const points = document.getElementsByClassName('point');
const areas = document.getElementById('area');
const objects = document.getElementById('object');
const notice = document.getElementById('alert');

function getpoint(){
    var defaultpoint = diemchuan.value * 1;
    var point = new Array;
    for(i = 0; i < 3; i++){
        point[i] = points[i].value * 1;
    }
    var area = areas.value;
    var object = objects.value;
    var bonusArea = bonusPointWithArea(area);
    var bonusObject = bonusPointWithObject(object);
    var totalPoint = totalpoint(point);
    var allPoint = bonusArea + bonusObject + totalPoint;
    var result;
    
    if(bonusArea){
        if(allPoint >= defaultpoint){
            result = `Xin chúc mừng: Bạn đã đậu !!!<br/>
            Tổng số điểm của bạn là: <b class = 'text-info'>${allPoint}</b>`;
        } else{
            result = `Thật đáng tiếc: bạn đã rớt !!!<br/>
            Tổng số điểm của bạn là: <b class = 'text-info'>${allPoint}</b>`;
        }
    } else{
        result = `<b class = 'text-danger'>Bắt buộc phải chọn khu vực</b>`;
    }
    notice.innerHTML = result;

}

function bonusPointWithObject(object){
    var bonusObject;
    switch(object){
        case '1':
            bonusObject = 2.5;
            break;
        case '2':
            bonusObject = 1.5;
            break;
        case '3':
            bonusObject = 1;
            break;
        default:
            bonusObject = 0;
    }
    return bonusObject;
}

function bonusPointWithArea(area){
    var bonusArea;
    switch(area){
        case 'A':
            bonusArea = 2;
            break;
        case 'B':
            bonusArea = 1;
            break;
        case 'C':
            bonusArea = 0.5;
            break;
        default:
            bonusArea = false;
    };
    return bonusArea;
}

function totalpoint(point){
    var total = 0;
    for(num of point){
        total += num;
    }
    return total;
}

areas.onchange = function(){reset()};
function reset(){
        notice.innerHTML = '';
}