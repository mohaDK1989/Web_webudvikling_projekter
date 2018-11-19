Date.prototype.getWeekYear = function() {
    var dato = new Date()

    var date = new Date(dato.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
}
Date.prototype.getWeek = function() {
    var dato = new Date()
    var date = new Date(dato.getTime());
    date.setHours(0, 0, 0, 0);
// Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
// January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
// Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
var weekOfCurrentMonth = Date.prototype.getWeek()

$(document).ready(function () {

    var mandagtd = $('[name=mandag]')
    var tirsdagtd = $('[name=tirsdag]')
    var onsdagtd = $('[name=onsdag]')
    var torsdagtd = $('[name=torsdag]')
    var fredagtd = $('[name=fredag]')
    var lordagtd = $('[name=lordag]')

    var arrUge = [mandagtd,tirsdagtd,onsdagtd,torsdagtd,fredagtd,lordagtd]
    $("#uge").text("Uge " + weekOfCurrentMonth)

    $("#infoBestilling").slideUp()


// giv atrribut id til alle td*************************
    for(var i = 0;i<arrUge.length;i++){

        for(var j = 0;j<arrUge[i].length;j++){
            var temparr = arrUge[i]

            $(temparr[j]).attr("uge",weekOfCurrentMonth)
            var id = weekOfCurrentMonth+""+$(temparr[j]).attr("name")+""+$(temparr[j]).text()
            $(temparr[j]).attr("id",id )
           // console.log(temparr[j])

        }


    }


    $(".dage").on("click",function (data) {
        var strcolor = "rgb(255, 0, 0)"
        //console.log( $(data.target).css("background-color").localeCompare(strcolor)==0)

        if( $(data.target).css("background-color").localeCompare(strcolor)!=0  ){
            target = data.target
                //console.log(target)
                $("#infoBestilling").slideDown()
                $("#valgtTid").text("uge"+$(data.target).attr("uge")+""+$(data.target).attr("name")+""+$(data.target).text())
                $(data.target).attr("uge",weekOfCurrentMonth)

        }
        else{

            vistidTD(data.target)
        }


    })
    function vistidTD(target) {
        //$("#textArea").append( data[j].navn + " "+ data[j].tid+ "\n")

        $.getJSON("/tider",function (data) {

            var is = false

            if(data.length>0){
                for(var j=0;j<data.length;j++){
                    //console.log(data[j])
                    if(data[j]!=null){
                        if(data[j].tidID==$(target).attr("id")){
                            is=true
                           // console.log(data[j])
                            $("#textArea").text("")
                            $("#textArea").append("***********TID********:" + "\n" )
                            $("#textArea").append( data[j].navn + " "+ data[j].tid+ "\n")
                            break;

                        }
                    }

                    if(is==true){


                    }


                }



            }





        })


    }



function checkTid(tid,target) {

    $.getJSON("/tider",function (data) {

        var is = false

        if(data.length>0){
            for(var j=0;j<data.length;j++){
                // console.log(tid.tidID)
                //console.log(data[j].tidID + ": " + tid.tidID)
                //console.log(data[j].tidID )
                if(data[j].tid!=null && tid.tidID!=null){
                    if(data[j].tidID.localeCompare(tid.tidID)==0){
                        $('[name=huskTid]').text("DEN TID FINDES ALLAREDE!!")
                        is =true

                    }
                }

            }
            // hvis den ikke findes
            if(!is){
                 $.post("/tider",tid)
                $('[name=huskTid]').text(
                    "HUSK DIN TID! " +"uge"+$(target).attr("uge") + " " +$(target).attr("name") + " " +$(target).text())
                $(target).css("background-color","red")
            }

            //console.log(is)

        }
        else{
            $(target).attr("navn",$(".kundensNavn").val() )
            $.post("/tider",tid)
            $('[name=huskTid]').text(
                "HUSK DIN TID! " +"uge"+$(target).attr("uge") + " " +$(target).attr("name") + " " +$(target).text())
            $(target).css("background-color","red")
           // console.log(target)

        }




    })



}

    $("#sub").on("click",function () {
      var navn = $(".kundensNavn").val()
        var tel = $(".kundensTelefon").val()
        var dag = $(target).attr("name")
        var tid = $("#valgtTid").text()
        var tidid =weekOfCurrentMonth+""+dag+""+tid

        var tid={
            navn: navn,
            tlfNr: tel,
            uge:weekOfCurrentMonth,
            dag: dag,
            tid:tid,
            tidID:$(target).attr("id")
        }

checkTid(tid,target)


    })

    $.getJSON("/tider",function (data) {

        for(var j=0;j<data.length;j++){

            visTider(data[j])
        }




    })
visTider()
function visTider(data) {
    for(var i = 0;i<arrUge.length;i++){

        for(var j = 0;j<arrUge[i].length;j++){
            var temparr = arrUge[i]
            var tidID = $(temparr[j]).attr("id")



// fra databasen
            var dataTemp = $(data)[0]


            if(dataTemp != null){
                //console.log($(temparr[j]).attr("id"))
                 //console.log(dataTemp.tidID)
                //console.log($(dataTemp).attr("id"))

                if($(temparr[j]).attr("id")==dataTemp.tidID){

                    //console.log(tidID)
                    $(temparr[j]).css("background-color","red")

                }




            }



        }


    }

}

$.getJSON("/tider",function (data) {
    $("#textArea").append("***********TIDER I DENNE UGE********:" + "\n" )
    for(var j=0;j<data.length;j++){

if(data[j].uge==weekOfCurrentMonth){
    if(data[j]!=null){
$("#textArea").append( data[j].navn + " "+ data[j].tid+ "\n")
       // console.log(data[j])

    }



}

    }


})




   })















