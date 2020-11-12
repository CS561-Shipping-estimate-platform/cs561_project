$(document).ready(function () {
    var table = $('#datatable').DataTable({
        "processing": true,

            "serverSide": false,
            "deferRender": true,
            "iDisplayLength": 25,
            "paging": false,
            "deferLoading": 0, //載入時不執行查詢
            "order": [[2, "asc"]],
            "info": true,
            "drawCallback": function(setting){
                var result = setting.json;
                if(result !== undefined){
                    if(result.data.length == 0){
                        alert('Address is wrong, please check'  );
                    }
                }

            },
            "columns": [
                {
                    "data": "Company",
                    "orderable": true,
                    "render": function (data) {
                        switch (data) {
                        case "UPS":
                            return '<img src="static/image/ups.png" style="widgh:50px;height:50px"><div style="display:none">UPS</div>';
                        case "Fedex":
                            return '<img src="static/image/fedex.png" style="widgh:100px;height:50px"><div style="display:none">Fedex</div>';
                        case "USPS":
                            return '<img src="static/image/usps.png" style="widgh:50px;height:50px"><div style="display:none">USPS</div>';
                        default:
                            return data;
                        }
                    }
                },
                {"data": "Service", "orderable": true},
                {"data": "Money", "orderable": true},
                {
                    "data": "Company",
                    "orderable": false,
                    "render": function (data) {
                        switch (data) {
                        case "UPS":
                            return '<a href="https://www.ups.com/us/en/global.page" type="button" class="btn btn-primary btn-sm" target="_blank">go to</a>';
                        case "Fedex":
                            return '<a href="https://www.fedex.com/en-us/home.html" type="button" class="btn btn-primary btn-sm" target="_blank">go to</a>';
                        case "USPS":
                            return '<a href="https://www.usps.com/ship/" type="button" class="btn btn-primary btn-sm" target="_blank">go to</a>';
                        default:
                            return data;
                        }
                    }
                }
            ]
        });



    $('#submit').click(function () {
        //alert('e');
        $('#From_CountryCode').removeAttr('disabled');

        table.ajax.url('input/?' + $('#search_form').serialize()).load();

        //$('#divtable').css("visibility", "visible");
        $('#From_CountryCode').attr('disabled', 'disabled');

        return false;
        // $('#From_CountryCode').removeAttr('disabled');
        // $.ajax({
        //     url: 'input/?',
        //     type: 'GET',
        //     tradition: true,
        //     async : false,
        //     data: $('#search_form').serialize(),
        //     dataType: "json",
        //     success: function (data) {
        //         var tables = $('#datatable').DataTable({
        //             "processing": true,
        //             "serverSide": true,
        //             "deferRender": true,
        //             "iDisplayLength": 25,
        //             "paging": false,
        //             "deferLoading": 0,
        //             "retrieve":true
        //             }
        //         );
        //         tb = document.getElementById('datatable');
        //         var rowNum=tb.rows.length;
        //         for (i=1;i<rowNum;i++) {
        //             tb.deleteRow(i);
        //             rowNum=rowNum-1;
        //             i=i-1;
        //         }
        //         var tbody = document.createElement("tbody");
        //                 for (var i in data.data){
        //                     var tr = document.createElement("tr");
        //                         for(var j in data.data[i]){
        //                         if(j == 0){
        //                             if(data.data[i][j] == "UPS"){
        //                                 var td = document.createElement("td");
        //                                 td.innerHTML=data.data[i][j];
        //                                tr.appendChild(td);
        //                             }
        //                         }
        //                         else{
        //                             var td = document.createElement("td");
        //                             td.innerHTML=data.data[i][j];
        //                             tr.appendChild(td);
        //                         }
        //                     }
        //                     var td2 = document.createElement("td");
        //                     var butt=document.createElement("a");
        //                     butt.href = 'https://www.ups.com/us/en/global.page';
        //                     butt.type = 'button';
        //                     butt.setAttribute('class', "btn btn-primary btn-sm");
        //                     butt.innerHTML = "go to";
        //                     td2.appendChild(butt);
        //                     tr.appendChild(td2);
        //                     tbody.appendChild(tr);
        //                 }
        //                 tb.appendChild(tbody);
        //         console.log(data.data);
        //         //document.getElementById('table1').style.visibility="hidden";
        //     },
        //     error:function (){
        //         alert('eqeqqq');
        //     }
        // });
        // $('#From_CountryCode').attr('disabled', 'disabled');
        // return false;
    });
});