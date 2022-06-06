var NFLRENT = function () {

    var cargacombos = function () {

        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/nflvanu.ashx?opcion=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcAnio').empty();
                $('#slcAnio').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#slcAnio').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });

        $("#slcMes").datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());

    }


    var cargainicial = function () {


        var parms = {
            data: null,
            columns: [
                { data: "mes" },
                { data: "imp" },
                { data: "Pag_Cue" },
                { data: "Metodo" },
                { data: "fact" }
            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "order": [],
            "paging": false
        }

        var table = $('#tblBandeja').dataTable(parms);
        $('#tblBandeja').removeAttr('style');

        function cargadatosempresa() {
            $.ajax({
                url: "vistas/nf/ajax/nflvanu.ashx?OPCION=4&pctlg=" + $('#ctl00_hddctlg').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $("#NombreEmpresa").html(datos[0].NOMEMPRESA);
                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }


        function cargaTitulo(pAnio) {

            var informacion = "<H2>INFORME ANUAL DE LOS PAGOS A CUENTA DEL IMPUESTO A LA RENTA AÑO </H2>";
            $("#txtTitulo").html(informacion);

            var anho = $("#slcAnio").val();
            var mes = $("#slcMes").val();
            var fecha = "<H3>MES " + mes.toUpperCase() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AÑO " + anho + "</H3>";
            $("#txtFecha").html(fecha);
        }

        function CargarGrilla(oTable) {
            var mes = ($("#slcMes").datepicker('getDate').getMonth() + 1).toString().length == 1 ? "0" + ($("#slcMes").datepicker('getDate').getMonth() + 1).toString() : ($("#slcMes").datepicker('getDate').getMonth() + 1).toString();
            $.ajax({
                url: "vistas/nf/ajax/nflrent.ashx?opcion=1&pMes=" + mes + '&pAnio=' + $('#slcAnio').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    LlenarGrilla(datos, oTable);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

         function LlenarGrilla(data_json, otable) {

            otable.fnClearTable();
            otable.fnAddData(data_json);
        }

         $('#buscar').on('click', function () {
             cargaTitulo($('#slcAnio').val());
             cargadatosempresa();
             CargarGrilla(table);
         });
    }

    return {
        init: function () {
            cargacombos();
            cargainicial();

        }

    };
}();