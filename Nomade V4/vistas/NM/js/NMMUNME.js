var NMLUNME = function () {
    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }
    var datatable = function () {

        $('#uniform-chkActivos span').removeClass().addClass("checked");
        $('#chkActivos').attr('checked', true).parent().addClass('checked');

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {

            data: json,
            columns: [
                
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION_INTERNACIONAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "TIPO_UNIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "UNME",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CODIGO_SUNAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "UNIDAD_BASE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    "visible": false
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                
            ],
            "sDom": 'TC<"clear">lfrtip',
            "sPaginationType": "full_numbers",
            "oTableTools": {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel "
                    }
                ]
            }

        }


        var table = iniciaTabla("tblBandeja", parms);
        actualizarEstilos();
        $('#tblBandeja').removeAttr('style');

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.CODIGO;

                window.location.href = '?f=nmmunme&codigo=' + code;

            }

        });        

        $('#tblBandeja tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.post("vistas/NM/ajax/NMMUNME.ASHX", { flag: 3, codelim: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"

                        table.fnGetData(pos).ESTADO = res;
                        refrescaTabla(table);

                        exito();
                            
                    } else {
                        noexito();
                    }

                });
         
        });

        fnResetAllFilters(table);
        table.fnFilter("A", 7);

        $('#chkActivos').on('change', function () {            
            fnResetAllFilters(table);
            if ($("#chkActivos").is(":checked")) {
                table.fnFilter("A", 7);
            } else {
                table.fnFilter("ACTIVO", 8);
            }
        });

    }

    function fnResetAllFilters(oTable) {
        var oSettings = oTable.fnSettings();
        for (iCol = 0; iCol < oSettings.aoPreSearchCols.length; iCol++) {
            oSettings.aoPreSearchCols[iCol].sSearch = '';
        }
        oSettings.oPreviousSearch.sSearch = '';
        oTable.fnDraw();
    }

    return {
        init: function () {
            datatable();
        }
    };
}();


var NMMUNME = function () {


    var cargacombos = function () {
        var tipo_uni = $("#cbo_tipo_unidad").val();
        if (tipo_uni == undefined || tipo_uni == null || tipo_uni == 0 || tipo_uni == "0") {
            tipo_uni = "";
        }
        $.ajaxSetup({ async: false });
        $.post("vistas/NM/ajax/NMMUNME.ASHX", { flag: 5, tipo_uni: tipo_uni },
           function (res) {
                $("#slcunba").html(res);
                $("#slcunba").select2({
                    allowclear: true
          });

        });
        $.ajaxSetup({ async: true });

    }
   

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null && cod!="") {


            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMUNME.ASHX?flag=4&codi=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#txtdescripcioninternacional").val(datos[0].DESCRIPCION_INTERNACIONAL);
                    $("#txtnombrecorto").val(datos[0].UNME);
                    $("#txtcosu").val(datos[0].CODIGO_SUNAT);
                    $("#slcunba").select2("val", datos[0].UNIDAD_BASE);
                    $("#cbo_tipo_unidad").select2("val", datos[0].COD_TIPO_UNIDAD);
                    $("#slcunba option[value=" + datos[0].CODIGO + "]").remove();

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }
                    if (datos[0].UNIDAD_VOLUMEN == "S") {

                        $('#uniform-chkunvo span').removeClass().addClass("checked");
                        $('#chkunvo').attr('checked', true);
                    } else {

                        $('#uniform-chkunvo span').removeClass();
                        $('#chkunvo').attr('checked', false);
                    }

                },
                error: function (msg) {

                    alert(msg);
                }
            });

        }
    }
    var eventosControles= function() {
        $('#cbo_tipo_unidad').change(function () {
            cargacombos();
        });
    }
    var plugins = function () {

        $("#txtcosu").inputmask({ "mask": "!", "repeat": 4, "greedy": false });

        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "!", "repeat": 50, "greedy": false }); })

        $("#txtdescripcioninternacional").focus(function () { $(this).inputmask({ "mask": "!", "repeat": 100, "greedy": false }); })

        $('#txtnombrecorto').focus(function () { $(this).inputmask({ "mask": "!", "repeat": 4, "greedy": false }); })

        $("#cbo_tipo_unidad").select2();
    }

    return {
        init: function () {

            plugins();
            cargacombos();
            cargainicial();
            eventosControles();
        }
    };

}();

function Actualizar() {

    var p_codi = $('#txtcodigo').val();
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_unvo = $('#chkunvo').is(':checked') ? 'S' : 'N';
    var p_nombre = $("#txtdescripcion").val();
    var p_desint = $("#txtdescripcioninternacional").val();
    var p_deco = $('#txtnombrecorto').val();
    var p_cosu = $('#txtcosu').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_unba = $('#slcunba').val();
    var p_tipo_uni = $('#cbo_tipo_unidad').val();

    if (vErrors(["txtnombrecorto", "txtdescripcion", "txtcodigo"])) {

        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMUNME.ASHX",
            {
                flag: 2,
                codi: p_codi,
                desc: p_nombre,
                desi: p_desint,
                deco: p_deco,
                cosu: p_cosu,
                acti: p_acti,
                user: p_user,
                unba: p_unba,
                unvo: p_unvo,
                tipo_uni:p_tipo_uni
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res != "" && res != null) {
                 
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
}

function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_nombre = $("#txtdescripcion").val();
    var p_desint = $("#txtdescripcioninternacional").val();
    var p_deco = $('#txtnombrecorto').val();
    var p_cosu = $('#txtcosu').val();   
    var p_user = $('#ctl00_lblusuario').html();
    var p_unba = $('#slcunba').val();
    var p_unvo = $('#chkunvo').is(':checked') ? 'S' : 'N';
    var p_tipo_uni = $('#cbo_tipo_unidad').val();

    if (vErrors(["txtnombrecorto", "txtdescripcion", "txtdescripcioninternacional"])) {
        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMUNME.ASHX",
            {
                flag: 1,
                desc: p_nombre,
                desi: p_desint,
                deco: p_deco,
                cosu: p_cosu,
                acti: p_acti,
                user: p_user,
                unba: p_unba,
                unvo: p_unvo,
                tipo_uni : p_tipo_uni
               
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res != "" && res != null) {
                  
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}