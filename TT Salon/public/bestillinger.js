function weekOfCurrentMonth() {
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    var weekNumber = (new Date()).getWeek();

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var now = new Date();
    return weekNumber

}


$(function () {
    $("#bestillingsinfo").slideUp()
    $('#firstInput').text('hej')
    // click acktion*******
    $('#login').on('click', function () {
        var username = $('#first-input').val()
        var password = $('#last-input').val()
        var login = {
            username: username,
            password: password
        }

        $.getJSON("/login",function (data) {

            if(data.length>0){

                for (var i = 0; i < data.length; i++) {
                    if (data[i].username == login.username && data[i].password == login.password) {
                        //console.log(data[i])
                        $("#bestillingsinfo").slideDown()
                        $("#loginform").hide()
                        visBestillinger()
                        break;
                    }
                    else {
                        alert('username or password is incorrect')
                    }
                }

            }




        })


    })
    function visBestillinger() {

        $.getJSON("/tider",function (data) {

            // uge 1**********

            for(var i =0;i<data.length;i++){

                if(data[i].uge==weekOfCurrentMonth()){

                    $("#thisweek").append((data[i].navn + " "+ data[i].tlfNr + " " + data[i].tid + "\n" ) )



                }
                if(data[i].uge==(weekOfCurrentMonth()+1)){
                    $("#nextWeek").append((data[i].navn + " "+ data[i].tlfNr + " " + data[i].tid + "\n" ) )



                }
                if(data[i].uge==(weekOfCurrentMonth()+2)){

                    $("#nextnextWeek").append((data[i].navn + " "+ data[i].tlfNr + " " + data[i].tid + "\n" ) )


                }

            }
        })
    }
    function sletTid() {
        var tid;
        $('#deletebtn').on('click',function () {

        })
        
    }

})

