function Actualizar() {
    var p_codi = $('#txtcodigo').val();
    var p_empresa = "";
    var p_pantalla = "";
    var p_valor = $('#txtvalor').val();
    var p_descripcion = $('#txtdescripcion').val();
    var p_descripcion_detallada = $('#txtdescripciondetallada').val();
    var p_code_sistema = ($('#cboSistema').val() !== "" || $('#cboSistema').val().length !== 0 ? $('#cboSistema').val() : "");
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcodigo", "txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCPRMT.ASHX", { flag: 2, pant: p_pantalla, empr: p_empresa, user: p_user, valo: p_valor, codi: p_codi, desc: p_descripcion, desc_det: p_descripcion_detallada, code_sist: p_code_sistema },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                  
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_empresa = $('#ctl00_hddctlg').val();
    var p_pantalla = "";
    var p_codi = $('#txtcodigo').val();
    var p_valor = $('#txtvalor').val();
    var p_descripcion = $('#txtdescripcion').val();
    var p_descripcion_detallada = $('#txtdescripciondetallada').val();
    var p_code_sistema = $('#cboSistema').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcodigo", "txtdescripcion", "cboSistema"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCPRMT.ASHX", { flag: 1, codi: p_codi, pant: p_pantalla, desc_det: p_descripcion_detallada, code_sist: p_code_sistema, empr: p_empresa, user: p_user, valo: p_valor, desc: p_descripcion },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").attr("disabled", "disabled");

                } else {
                    noexito();
                }
            });
    }
}

function verificacodigos() {
    $.post("vistas/NC/ajax/NCPRMT.ASHX", { flag: 4 },
        function (res) {
            $("#txtcodigo").blur(function (e) {
                //  alert(String.fromCharCode(e.keyCode).toUpperCase());

                for (var i = 0; i < res.split(",").length; i++) {
                    if (res.split(",")[i] == $("#txtcodigo").val()) {
                        alertCustom("El código " + $("#txtcodigo").val() + " ya se encuentra registrado, porfavor intente otro");
                        $("#txtcodigo").val("");
                        vErrors("txtcodigo");
                    }
                }
               
            });
        });
}


var NCLPRMT = function () {

    var plugins = function () {
        $("#cboSistema").select2();
    }

    var fillCboSistema = function () {
        var selectSistema = $('#cboSistema');
        $('#cboSistema').select2();

        $.ajax({
            type: "post",
            url: "vistas/ns/ajax/nsmform.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectSistema.empty();
                selectSistema.append('<option>TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectSistema.append('<option value="' + datos[i].CODIGO + '" data-tipo="' + datos[i].TIPO_IND + '"  >' + datos[i].NOMBRE + '</option>');
                    }                    
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    } 

    var fillBandejaParametros = function () {        
        
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjParametros').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                { data: "CODIGO_SISTEMA" },
                { data: "DESCRIPCION_SISTEMA" },
                { data: "VALOR" },
                {
                    data: "FECHA_ACTV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
            ],
            "columnDefs": [
                {
                    "targets": [2],
                    "visible": false,
                }
            ]
        };

        

        oTableParametros = iniciaTabla('tblParametros', parms);
        $('#tblParametros').removeAttr('style');

        $('#tblParametros tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableParametros.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableParametros.fnGetPosition(this);
                var row = oTableParametros.fnGetData(pos);
                var codigo = row.CODIGO;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmprmt&codigo=' + codigo;
            }

        });

        $('#cboSistema').select2('val', '').change();
        
    }   

    $("#cboSistema").on('change', function () {
        var sistema = ($(this).val().length > 1 || $(this).val() == "TODOS" ? "" : $(this).val()) ;
        fnResetAllFilters(oTableParametros);
        oTableParametros.fnFilter(sistema, 2);
    });

   

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
            plugins();
            fillCboSistema();
            fillBandejaParametros();           
        }
    };

}();

var NCPRMT = function () {

    var cargainicial = function () {


        verificacodigos();

        var cod = ObtenerQueryString("codigo");

        
        if (cod != undefined) {
            $("#txtcodigo").attr("disabled", "disabled");

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCPRMT.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#slcEmpresa").select2("val", datos[0].EMPRESA);
                    $("#txtvalor").val(datos[0].VALOR);
                    $("#txtpantalla").val(datos[0].PANTALLA);
                    $('#txtdescripciondetallada').val(datos[0].DESCRIPCION_DETALLADA);
                    $('#cboSistema').select2('val', datos[0].CODIGO_SISTEMA);
                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
    }

    var plugins = function () {


        //aMayuscula(":input");
        $("#txtcodigo").inputmask({ "mask": "#", "repeat": 4, "greedy": false });
        $("#txtdescripcion").focus(function () {
            $(this).inputmask({ "mask": "Z", "repeat": 60, "greedy": false });
        });
        $("#txtvalor").focus(function () {
            $(this).inputmask({ "mask": "!", "repeat": 40, "greedy": false });
        });

        $("#cboSistema").select2();

    }

    var fillCboSistema = function () {
        var selectSistema = $('#cboSistema');
        $('#cboSistema').select2();

        $.ajax({
            type: "post",
            url: "vistas/ns/ajax/nsmform.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectSistema.empty();
                selectSistema.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectSistema.append('<option value="' + datos[i].CODIGO + '" data-tipo="' + datos[i].TIPO_IND + '"  >' + datos[i].NOMBRE + '</option>');
                    }
                    selectSistema.select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    } 


    return {
        init: function () {

            cargainicial();
            //datatable();
            plugins();
            fillCboSistema();

        }
    };


}();