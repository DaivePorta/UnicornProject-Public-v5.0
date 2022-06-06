var NCMEQPC = function () {

    var fillCboEmpresa = function () {
        var selectEmpresa = $('#slcEmpresa');
     
        $.ajax({async:false,
            type: "post",
            url: "vistas/nc/ajax/NCMEQPC.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async:false,
            success: function (datos) {
                selectEmpresa.empty();
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectEmpresa.append('<option></option>');
                    }
                    selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slcplandectsba').select2();
        $('#slcplandectseq').select2();
        $('#slcEmpresa').select2();
        $('#cboCentroCostoBase').select2();
        $('#cboCentroCostoEquivalente').select2();


        inifechas("txtfechai", "txtfechat");


    }

    var eventoControles = function () {

        $('#chkactivo').on('change', function () {
            if ($("#chkactivo").is(':checked')) {
                $('#txtfechat').val('');
                $('#txtfechat').attr('disabled', true);
                $('#txtfechat').attr('placeholder', '');
                $('#chkactivo').parent().parent().siblings('span').html('Activo');
            } else {
                $('#txtfechat').val('');
                $('#txtfechat').attr('disabled', false);
                $('#txtfechat').attr('placeholder', 'dd/mm/yyyy');
                $('#chkactivo').parent().parent().siblings('span').html('Inactivo');
            }
        });

        $('#slcEmpresa').on('change', function () {
            var ddlValue = this.value;
        
          


                          
            $('#cboCentroCostoBase').select2("val", "").attr("disabled","disabled");
            $('#cboCentroCostoEquivalente').select2("val", "").attr("disabled", "disabled");
            $('#slcplandectseq').select2("val", "").attr("disabled", "disabled");
            $('#slcplandectsba').select2("val", "").attr("disabled", "disabled");

            fillCboPlanCosto(ddlValue, "", "", "", "");

           

            
        });

      


        $('#slcplandectsba').on('change', function (event, base,us) {
            
            if (base != undefined && base != "")
                $(this).select2("val", base);

           


           

            if ($('#slcplandectseq').html().indexOf($(this).val()) > 0) {
                var valor = $('#slcplandectseq').val();
                if (base == undefined || base == "")
                    $('#slcplandectseq').html($('#hddauxiliar').val());
                   
             
                $('#slcplandectseq OPTION[VALUE=' + $(this).val() + ']').remove();
                $('#slcplandectseq').select2("val", valor);
            }
            
            if (us == undefined)
                us = "";
            setDescripcionCentroCosto($(this).val(), $('#cboCentroCostoBase'), us);

        });

        $('#slcplandectseq').on('change', function (event,equiv,us) {
            if(equiv!=undefined && equiv!="")
                $(this).select2("val", equiv);

        

            if ($('#slcplandectsba').html().indexOf($(this).val()) > 0) {
      
                var valor = $('#slcplandectsba').val();
                if (equiv == undefined || equiv == "")
                    $('#slcplandectsba').html($('#hddauxiliar').val());
                  
               
                $('#slcplandectsba OPTION[VALUE=' + $(this).val() + ']').remove();
                $('#slcplandectsba').select2("val", valor);
              
            }

            if (us == undefined)
                us = "";
            setDescripcionCentroCosto($(this).val(), $('#cboCentroCostoEquivalente'), us);
        });

   
    }

    var cargaInicial = function () {

        $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());

        var CODE = ObtenerQueryString("codigo");
        

        if (typeof (CODE) !== "undefined") {
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmeqpc.ashx?OPCION=4&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                async:false,
                success: function (datos) {

                    $('#txtcodigo').val(datos[0].CODE);

                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                        $('#chkactivo').parent().parent().siblings('span').html('Activo');
                        $('#txtfechat').val('');
                        $('#txtfechat').attr('disabled', true);
                        $('#txtfechat').attr('placeholder', '');
                    }
                    else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                        $('#txtfechat').val('');
                        $('#txtfechat').attr('disabled', false);
                        $('#txtfechat').attr('placeholder', 'dd/mm/yyyy');
                        $('#chkactivo').parent().parent().siblings('span').html('Inactivo');
                    }

   
                    $("#slcEmpresa").select2("val", datos[0].CTLG_CODE);


                  

                    fillCboPlanCosto(datos[0].CTLG_CODE, datos[0].CECC_CODE_BASE, datos[0].CECC_CODE_EQUIVALENTE, datos[0].CECD_CODE_BASE, datos[0].CECD_CODE_EQUIVALENTE);

                                   

                    $('#txtfechai').datepicker("setDate", datos[0].FECHA_INICIO);

                    $('#txtfechat').datepicker("setDate", datos[0].FECHA_FIN);

                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    return {
        init: function () {
           
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
        }
    };

}();

function fillCboPlanCosto(value,base,equiv,usb,use) {
    var selectPlanCostoBase = $('#slcplandectsba');
    var selectPlanCostoEquivalente = $('#slcplandectseq');
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmeqpc.ashx?OPCION=2&CTLG_CODE=" + value,
        contenttype: "application/json;",
        datatype: "json",
        async:false,
        success: function (datos) {
            if (datos != null) {
                selectPlanCostoBase.empty();
                selectPlanCostoEquivalente.empty();
                selectPlanCostoBase.removeAttr("disabled");
                selectPlanCostoEquivalente.removeAttr("disabled");
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectPlanCostoBase.append('<option></option>');
                        selectPlanCostoEquivalente.append('<option></option>');
                    }
                    selectPlanCostoBase.append('<option value="' + datos[i].CODE + '">' + datos[i].NOMBRE_PLAN + '</option>');
                    selectPlanCostoEquivalente.append('<option value="' + datos[i].CODE + '">' + datos[i].NOMBRE_PLAN + '</option>');
                }
                $("#hddauxiliar").val($('#slcplandectseq').html());
   
                $("#slcplandectsba").trigger("change",[base,usb]);
                $("#slcplandectseq").trigger("change",[equiv,use]);
              
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function setDescripcionCentroCosto(cod, select,val) {
   
   
    if (cod != "") {
        
        $.ajax({
            type: "post",
            async: false,
            url: "vistas/nc/ajax/ncmeqpc.ashx?OPCION=3&CECC_CODE=" + cod,
            contenttype: "application/json;",
            datatype: "json",
            success: function (datos) {
                if (datos != null) {
                    var valor = select.val();
                    select.removeAttr("disabled");
                    select.html("");
                    
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            select.append('<option></option>');

                        }
                        select.append('<option value="' + datos[i].CODE + '">' + datos[i].CODE + " | " + datos[i].DESCC + '</option>');
                    }
                    if (val != "")
                    { select.select2("val", val); }
                    else
                    {select.select2("val",valor);}
                } else { select.select2("val", ""); select.attr("disabled", "disabled"); }


            },
            error: function (msg) {
                alert(msg);
            }
        });
    } else { select.attr("disabled","disabled"); }
}

function Crear() {

    var CODE = '';
    var CTLG_CODE = '';
    var CECC_CODE_BASE = '';
    var CECD_CODE_BASE = '';
    var CECC_CODE_EQUIVALENTE = '';
    var CECD_CODE_EQUIVALENTE = '';
    var ESTADO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_FIN = '';
    var USUA_ID = '';

    var Errors = false;
    if ($("#chkactivo").is(':checked')) {
        $('#txtfechat').parent().parent().removeClass();
        $('#txtfechat').parent().parent().addClass('control-group')
        Errors = vErrors(["slcEmpresa", "slcplandectsba", "cboCentroCostoBase","slcplandectseq", "cboCentroCostoEquivalente",  "txtfechai"]);
    }
    else {
        Error = vErrors(["slcEmpresa", "slcplandectsba", "cboCentroCostoBase","slcplandectseq", "cboCentroCostoEquivalente", "txtfechai", "txtfechat"]);
    }

    if (Errors) {

        CTLG_CODE = $.trim($('#slcEmpresa').val());
        CECC_CODE_BASE = $.trim($('#slcplandectsba').val());
        CECD_CODE_BASE = $.trim($('#cboCentroCostoBase').val());
        CECC_CODE_EQUIVALENTE = $.trim($('#slcplandectseq').val());
        CECD_CODE_EQUIVALENTE = $.trim($('#cboCentroCostoEquivalente').val());
        ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
        FECHA_INICIO = $('#txtfechai').val();
        FECHA_FIN = $('#txtfechat').val();
        USUA_ID = $('#ctl00_lblusuario').html();

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMEQPC.ASHX?OPCION=N&CTLG_CODE=" + CTLG_CODE + "&CECC_CODE_BASE=" + CECC_CODE_BASE + "&CECD_CODE_BASE=" + CECD_CODE_BASE + "&CECC_CODE_EQUIVALENTE=" + CECC_CODE_EQUIVALENTE
                                                        + "&CECD_CODE_EQUIVALENTE=" + CECD_CODE_EQUIVALENTE + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("La equivalencia que intenta registrar ya esta existe.");
                    }
                    else {
                        $('#txtcodigo').val(datos[0].CODIGO);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    }
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                alert(msg);
            }
        });
    }
}

function Modificar() {
    var CODE = '';
    var CTLG_CODE = '';
    var CECC_CODE_BASE = '';
    var CECD_CODE_BASE = '';
    var CECC_CODE_EQUIVALENTE = '';
    var CECD_CODE_EQUIVALENTE = '';
    var ESTADO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_FIN = '';
    var USUA_ID = '';

    var Errors = false;
    if ($("#chkactivo").is(':checked')) {
        $('#txtfechat').parent().parent().removeClass();
        $('#txtfechat').parent().parent().addClass('control-group')
        Errors = vErrors(["slcEmpresa", "slcplandectsba", "cboCentroCostoBase", "slcplandectseq", "cboCentroCostoEquivalente", "txtfechai"]);
    }
    else {
        Error = vErrors(["slcEmpresa", "slcplandectsba", "cboCentroCostoBase","slcplandectseq", "cboCentroCostoEquivalente", "txtfechai", "txtfechat"]);
    }

    if (Errors) {
        CODE = $.trim($('#txtcodigo').val());
        CTLG_CODE = $.trim($('#slcEmpresa').val());
        CECC_CODE_BASE = $.trim($('#slcplandectsba').val());
        CECD_CODE_BASE = $.trim($('#cboCentroCostoBase').val());
        CECC_CODE_EQUIVALENTE = $.trim($('#slcplandectseq').val());
        CECD_CODE_EQUIVALENTE = $.trim($('#cboCentroCostoEquivalente').val());
        ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
        FECHA_INICIO = $('#txtfechai').val();
        FECHA_FIN = $('#txtfechat').val();
        USUA_ID = $('#ctl00_lblusuario').html();

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMEQPC.ASHX?OPCION=M&CODE=" + CODE + "&CTLG_CODE=" + CTLG_CODE + "&CECC_CODE_BASE=" + CECC_CODE_BASE + "&CECD_CODE_BASE=" + CECD_CODE_BASE + "&CECC_CODE_EQUIVALENTE=" + CECC_CODE_EQUIVALENTE
                                                        + "&CECD_CODE_EQUIVALENTE=" + CECD_CODE_EQUIVALENTE + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("La equivalencia que intenta registrar ya esta existe.");
                    }
                    else {
                        $('#txtcodigo').val(datos[0].CODIGO);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    }
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                alert(msg);
            }
        });
    }
}

var NCLEQPC = function () {


    var fillBandejaEPCuentas = function () {

        var json=jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjEPCuentas').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODE" },
                { data: "NCTLG_CODE" },
                { data: "NOMBRE_PLAN_BASE" },
                { data: "DESCRIPCION_BASE" },
                { data: "NOMBRE_EQUIVALENTE" },
                { data: "DESCRIPCION_EQUIVALENTE" },
                ]
                }
        oTableEPCuentas = iniciaTabla('tblEPCuentas', parms);
        $('#tblEPCuentas').removeAttr('style');

        

        $('#tblEPCuentas tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableEPCuentas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableEPCuentas.fnGetPosition(this);
                var row = oTableEPCuentas.fnGetData(pos);
                var codigo = row.CODE;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmeqpc&codigo=' + codigo;
            }

        });

       


        }

        return {
            init: function () {
                fillBandejaEPCuentas();
                
            }
        };

    }();

