$(document).ready(function () {
    // $('#SQLSearch').on('click', function () {
    //         console.log($('#SQLSearchTextarea').val())
    //         $('#datatable').DataTable().clear().draw();
    //         $('#datatable').DataTable().columns.adjust().draw();
    //         // $('#datatable').DataTable().draw()
    //     }
    // )

    $('#submit').click(function () {
        // frm.submit(function () {
        var csrfmiddlewaretoken = $("#add_member_Form").find("input[name='csrfmiddlewaretoken']" ).val();
        var formData = $('#search_form').serializeArray();
        formData = JSON.stringify(formData);
        $.ajax({
            url: '{% url "searchForm" %}',
            data: {
                "csrfmiddlewaretoken" : csrfmiddlewaretoken,
                "formData" : formData
            },
            type: "POST",
            dataType: "json",
            success: function(result) {
                alert(result.Result);
            },
            error: function(xhr, ajaxOptions, thrownError){
                alert(thrownError + '\n' + xhr.status + '\n' + ajaxOptions);
            }
        });
    });

    // $('#submit').click(function () {
    //
    //     $('#datatable').DataTable({
    //         "processing": true,
    //         "serverSide": true,
    //         "deferRender": true,
    //         "iDisplayLength": 25,
    //         "paging": true,
    //         "ajax": {
    //             url: '{% url "input" %}',
    //             // url: '../views/table',
    //             type: 'GET',
    //             data: {
    //                 "Dimension units": $('#Dimension_units').val(),
    //                 "Height": $('#Height').val(),
    //                 "Length": $('#Length').val(),
    //                 "Width": $('#Width').val(),
    //                 "Weight unit": $('#Weight_unit').val(),
    //                 "Weight": $('#Weight').val(),
    //                 "ShipFrom": {
    //                     "Address": {
    //                         "AddressLine": $('#From_AddressLine').val(),
    //                         "City": $('#From_City').val(),
    //                         "CountryCode": $('#From_CountryCode').val(),
    //                         "PostalCode": $('#From_PostalCode').val(),
    //                         "StateProvinceCode": $('#From_StateProvinceCode').val()
    //                     }
    //                 },
    //                 "ShipTo": {
    //                     "Address": {
    //                         "AddressLine": $('#To_AddressLine').val(),
    //                         "City": $('#To_City').val(),
    //                         "CountryCode": $('#To_CountryCode').val(),
    //                         "PostalCode": $('#To_PostalCode').val(),
    //                         "StateProvinceCode": $('#To_StateProvinceCode').val()
    //                     }
    //                 }
    //             }
    //             // "data": function (d) {
    //             //     d.query = $('#SQLSearchTextarea').val()
    //             // }
    //         },
    //         "columns": [
    //             {"data": "UPS_Service"},
    //             {"data": "Money"}
    //         ]
    //     });
    // });

});