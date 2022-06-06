var NCLESCC = function () {
    var oTableBandejaAdelanto = [];
    const sCodEstadoGenerado = 'G';

    var plugins = function () {

        $('#cboEmpresa').select2();
    }

    var eventos = function () {

        $('#cboEmpresa').on('change', function () {
            GetEstructuraCosto();
             
        }
        );
    }

    var fillBandejaECentroCostos = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "NCTLG_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                { data: "NOMBRE_PLAN" },
                { data: "NIVELES" },
                { data: "NIVEL1" },
                { data: "NIVEL2" },
                { data: "NIVEL3" },
                { data: "NIVEL4" },
                { data: "FECHA_INICIO" },
                { data: "FECHA_FIN" },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },]
        }

        oTableECentroCostos = iniciaTabla('tblECentroCostos', parms);
        $('#tblECentroCostos').removeAttr('style');

        $('#tblECentroCostos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableECentroCostos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableECentroCostos.fnGetPosition(this);
                var row = oTableECentroCostos.fnGetData(pos);
                var codigo = row.CODE;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmescc&codigo=' + codigo;
            }
        });
    }

    var fillCboEmpresaS = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //20170606 :: JHP :: INI :: Cambio a nuevo standar para mostrar combo empresas
                /*
                    $('#cboempresa').empty();
                    $('#cboempresa').append('<option></option>');
            
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {                        
                        $('#cboempresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboempresa').select2('val', $('#ctl00_hddctlg').val());
                    $('#cboempresa').change();
                }*/
                $("#cboEmpresa").append(fnGetEmpresas(1));
                //20170606 :: JHP :: FIN
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var CargaInicial = function () {
        GetEstructuraCosto();
    }


    var handleTblBandeja = function () {
        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [

                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NOMBRE_PLAN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }
                },


                {
                    data: "NIVELES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "FECHA_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');

                    }
                },
                {
                    data: "FECHA_FIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                    }
                }
            ]
        }

        oTableBandejaAdelanto = iniciaTabla("tblECentroCostos", parms);

        $('#tblECentroCostos_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modificar la caja de texto del buscador
        $('#tblECentroCostos_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modificar el combo de paginacion


        $('#tblECentroCostos tbody').on('click', 'tr', function () {
            oTableBandejaAdelanto.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var pos = oTableBandejaAdelanto.fnGetPosition(this);
            var row = oTableBandejaAdelanto.fnGetData(pos);

            var code = row.CODE + '||' + row.CTLG_CODE;
            //var codEmpresa = row.CTLG_CODE;

            window.location.href = '?f=NCMESCC&codigo=' + code;//+ '&CodEmpresa=' + codEmpresa;


        });


        //$('#tblECentroCostos tbody').on('click', '.InciaAprob', function () {
        //    var pos = oTableBandejaAdelanto.api(true).row($(this).parents("tr")[0]).index();
        //    var row = oTableBandejaAdelanto.fnGetData(pos);
        //    iniciaAprobacion(row.CODIGO);
        //});

        //$('#tblECentroCostos tbody').on('click', '.RechaAdel', function () {
        //    var pos = oTableBandejaAdelanto.api(true).row($(this).parents("tr")[0]).index();
        //    var row = oTableBandejaAdelanto.fnGetData(pos);
        //    rechazarAdelanto(row.CODIGO);
        //});



    };

    var GetEstructuraCosto = function () {
        var sCodigoEmpresa = $('#cboEmpresa').val();
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/NCMESCC.ashx?OPCION=LESCC&sEmpresa=" + sCodigoEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {

                oTableBandejaAdelanto.fnClearTable();
                if (datos != null && datos.length > 0) {
                    oTableBandejaAdelanto.fnAddData(datos);
                    Desbloquear('divEstructura');
                }
                else {
                  
                    infoCustom2("No existe ninguna Estructura de Centros de Costos a Listar.")
                    oTableBandejaAdelanto.fnClearTable();
                    Desbloquear('divEstructura');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de detalle de garantía");
                Desbloquear('divEstructura');
                oTableBandejaAdelanto.fnClearTable();
            }
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresaS();
            handleTblBandeja();         
            eventos();
            CargaInicial();
        }
    };

}();


var fillDataTable = function () {

    var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjECentroCostos').val());
    oTableECentroCostos.fnClearTable();
    oTableECentroCostos.fnAddData(json);
}

var ListarEstructuraCostos = function () {
    var data = '';
    Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmcecc.ashx?OPCION=1&CTLG_CODE=" + $('#cboempresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            if (datos != null && datos != "") {
                data = JSON.stringify(datos);
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjECentroCostos").val('');
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjECentroCostos").val(data);
                // fillBandejaECentroCostos();();
            }
            Desbloquear("ventana");

        },
        error: function (msg) {
            Desbloquear("ventana");
            alert(msg);
        }
    });
}


var NCMESCC = function () {

    var plugins = function () {
        $("#txtNroNiveles").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $('#cboEmpresa').select2();
        //$('#cboNiveles').select2();
        //$('#cboNivel1').select2();
        //$('#cboNivel2').select2();
        //$('#cboNivel3').select2();
        //$('#cboNivel4').select2();
        inifechas("txtFechaInicio", "txtFechaTermino");
        //$('#txtNivel1').focus(function () { $(this).inputmask({ "mask": "D", "repeat": 40, "greedy": false }); })
        //$('#txtNivel2').focus(function () { $(this).inputmask({ "mask": "D", "repeat": 40, "greedy": false }); })
        //$('#txtNivel3').focus(function () { $(this).inputmask({ "mask": "D", "repeat": 40, "greedy": false }); })
        //$('#txtNivel4').focus(function () { $(this).inputmask({ "mask": "D", "repeat": 40, "greedy": false }); })
        $('#txtNombrePlan').focus(function () { $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false }); })
    }

    var fillCboNiveles = function () {
        var selectNiveles = $('#cboNiveles');
        selectNiveles.empty();
        selectNiveles.append('<option></option>');
        selectNiveles.append('<option value="2">2</option>');
        selectNiveles.append('<option value="3">3</option>');
        selectNiveles.append('<option value="4">4</option>');
    }

    var fillCboNivel1 = function () {
        fillCboNivel('1');
    }

    var fillCboNivel2 = function () {
        fillCboNivel('2');
    }

    var fillCboNivel3 = function () {
        fillCboNivel('3');
    }

    var fillCboNivel4 = function () {
        fillCboNivel('4');
    }

    var fillCboEmpresa = function () {
        $.ajax({
            async: false,
            type: "post",
            url: "vistas/nc/ajax/ncmescc.ashx?OPCION=1&usua=" + $("#ctl00_txtus").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function () {
        /*
        $('#cboNiveles').on('change', function () {
            var ddlValue = this.value;
            var codigoNiveles = $('#hfNivelesSeleccionado').val();
            if (codigoNiveles == '' || codigoNiveles != ddlValue) {

                switch (ddlValue) {

                    case '2':
                        offObjectEvents('txtNivel2');
                        offObjectEvents('cboNivel2');

                        offObjectEvents('txtNivel3');
                        offObjectEvents('cboNivel3');
                        setValueDisplayNivel('2', true);
                        setValueDisplayNivel('3', true);
                        fillCboNivel('1');
                        fillCboNivel('4');
                        break;
                    case '3':
                        offObjectEvents('txtNivel3');
                        offObjectEvents('cboNivel3');
                        setValueDisplayNivel('2', false);
                        setValueDisplayNivel('3', true);
                        fillCboNivel('1');
                        fillCboNivel('4');
                        break;
                    case '4':
                        setValueDisplayNivel('2', false);
                        setValueDisplayNivel('3', false);
                        fillCboNivel('1');
                        fillCboNivel('4');
                        break;
                    default:
                        break;
                }

                $('#hfNivelesSeleccionado').val(ddlValue);
            }
        });
        */
        $('#btnGenerar').on('click', function () {
            fGeneraNiveles();
        });
        $('#chkEstado').on('change', function () {
            if ($("#chkEstado").is(':checked')) {
                offObjectEvents('txtFechaTermino');
                $('#txtFechaTermino').val('');
                $('#txtFechaTermino').attr('disabled', true);
                $('#txtFechaTermino').attr('placeholder', '');
            } else {
                $('#txtFechaTermino').val('');
                $('#txtFechaTermino').attr('disabled', false);
                $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
            }
        });
 
    }

    var cargaInicial = function () {

        $("#").select2("val", $("#ctl00_hddctlg").val());
        var Codigo = ObtenerQueryString("codigo");
        var CodEmpresa;// = ObtenerQueryString("CodEmpresa");
        var CODE;

        if (typeof (Codigo) !== "undefined") {
            var vArray = Codigo.split("||");
            CODE = vArray[0];

            CodEmpresa = vArray[1];
          
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmescc.ashx?OPCION=2&CODE=" + CODE + "&sCodEmpresa=" + CodEmpresa,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#txtCodigo').val(datos[0].codigo);
                    if (datos[0].estado_ind == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                        $('#txtFechaTermino').val('');
                        $('#txtFechaTermino').attr('disabled', true);
                        $('#txtFechaTermino').attr('placeholder', '');
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    }
                    else {
                        //$('#uniform-chkEstado span').removeClass();
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                        $('#txtFechaTermino').val('');
                        $('#txtFechaTermino').attr('disabled', false);
                        $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
                        //$('#chkEstado').parent().parent().siblings('span').html();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    }
                    $('#txtFechaInicio').datepicker("setDate", datos[0].fecha_inicio);
                    $('#txtFechaTermino').datepicker("setDate", datos[0].fecha_fin);

                    $('#cboEmpresa').select2('val', datos[0].codigo_empresa);
                    $('#txtNombrePlan').val(datos[0].nombre_centro_costos);

                    var intNiveles = datos[0].niveles;
                    var sDigitosNiveles = datos[0].digitos_nivel;
                    var ssDigitosNivelesArray = sDigitosNiveles.split(',');
                    $('#txtNroNiveles').val(intNiveles);
                    $("#txtNroNiveles").attr('disabled', true);
                    
                    fGeneraNiveles();

                    var sNombresNiveles = datos[0].nombres_nivel;
                    var ssNombresNivelesArray = sNombresNiveles.split(',');                    
                    fGeneraNombresNiveles();


                    for (i = 1; i <= intNiveles; i++) {
                        if (ssDigitosNivelesArray[i - 1] == '' || ssDigitosNivelesArray[i - 1] == '0') {
                            $("#txtNivel_" + i).val(ssDigitosNivelesArray[i - 1]);
                            $("#txtNivel_" + i).attr('disabled', false);
                        } else {
                            $("#txtNivel_" + i).val(ssDigitosNivelesArray[i - 1]);
                            $("#txtNivel_" + i).attr('disabled', true);
                        }
                        
                    }

                    for (i = 1; i <= intNiveles; i++) {
                        $("#txtNombreNivel_" + i).val(ssNombresNivelesArray[i - 1]);
                    }
                    
                    if (datos[0].estado_ind == 'A') {
                        $("#chkEstado").attr('checked', 'checked');
                    }

                    
                },
                error: function (msg) {

                    alert(msg);

                }
            });

        } else {
            verificarActivos();            
        }
    }

    var verificarActivos = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmescc.ashx?OPCION=VERACT&sCodEmpresa=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos > 0) {
                    infoCustom("Existe una estructura de centro de costos ACTIVA, para crear uno nuevo desactive la actual.");
                                                     
                }
                
            }
        });
    }

    var fGeneraNiveles = function () {
        var iNroNivel = $("#txtNroNiveles").val();
        var html = "";
        html = "<div Class='portlet box yellow '>";
        html = html + "<div Class='portlet-title'> <h4> <i Class='icon-list-ul'></i>&nbsp Digitos por Nivel </h4> </div>";
        html = html + "<div Class='portlet-body' style='overflow-x: scroll;'>";
        html = html + "<table id='tbDigNiv' Class='table '> <thead> ";
        var htmlf = "<tr><td class='span2' style='font-weight: 700'>NIVELES</td>";
        var htmlc = "<tr><td class='span2' style='font-weight: 700;vertical-align: inherit;'>DIGITOS</td>";

        for (i = 1; i <= iNroNivel; i++) {
            htmlf = htmlf + "<td class='span2'><input ID=txtNombreNivel_" + i + " class='m-wrap span12 nombreDig' style='text-align:center;' type='text'/></td>";
            htmlc = htmlc + "<td class='span2'><input ID=txtNivel_" + i + " class='m-wrap span12 digiton nroDig' style='text-align:center;' type='text' value='1' onkeypress='return ValidaNumeros(event, this)' /></td>";
        }
        htmlf = htmlf + "</tr>";
        htmlc = htmlc + "</tr>";
        html = html + htmlf + htmlc;
        html = html + "</thead> </table> </div> </div>";

        $('#dvDigNiv').html(html);
    }

    var fGeneraNombresNiveles = function () {
        var iNroNivel = $("#txtNroNiveles").val();
        var html = "";
        html = "<div Class='portlet box yellow '>";
        html = html + "<div Class='portlet-title'> <h4> <i Class='icon-list-ul'></i>&nbsp Digitos por Nivel </h4> </div>";
        html = html + "<div Class='portlet-body' style='overflow-x: scroll;'>";
        html = html + "<table id='tbDigNiv' Class='table '> <thead> ";
        var htmlf = "<tr><td class='span2' style='font-weight: 700'>NIVELES</td>";
        var htmlc = "<tr><td class='span2' style='font-weight: 700;vertical-align: inherit;'>DIGITOS</td>";

        for (i = 1; i <= iNroNivel; i++) {
            htmlf = htmlf + "<td class='span2'><input ID=txtNombreNivel_" + i + " class='m-wrap span12 nombreDig' style='text-align:center;' type='text'/></td>";
            htmlc = htmlc + "<td class='span2'><input ID=txtNivel_" + i + " class='m-wrap span12 digiton nroDig' style='text-align:center;' type='text' value='1' onkeypress='return ValidaNumeros(event, this)' /></td>";
        }
        htmlf = htmlf + "</tr>";
        htmlc = htmlc + "</tr>";
        html = html + htmlf + htmlc;
        html = html + "</thead> </table> </div> </div>";

        $('#dvDigNiv').html(html);
    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();

            //fillCboNiveles();
            //fillCboNivel1();
            //fillCboNivel2();
            //fillCboNivel3();
            //fillCboNivel4();
            eventoControles();
            cargaInicial();

        }
    };

}();

function fillCboNivel(value) {
    var selectNivel = $('#cboNivel' + value);
    selectNivel.empty();
    selectNivel.append('<option></option>');
    selectNivel.append('<option value="1">1</option>');
    selectNivel.append('<option value="2">2</option>');
    selectNivel.append('<option value="3">3</option>');
    selectNivel.append('<option value="4">4</option>');
    selectNivel.change();
    $('#txtNivel' + value).val('');
}

function setValueDisplayNivel(nivel, disabled) {

    $('#txtNivel' + nivel).val('');

    fillCboNivel(nivel);
    $('#s2id_cboNivel' + nivel + ' a').removeClass();
    $('#s2id_cboNivel' + nivel + ' a').addClass('select2-choice select2-default');

    if (disabled == true) {
        $('#s2id_cboNivel' + nivel + ' a .select2-chosen').html('');
        $('#cboNivel' + nivel).attr('disabled', true);
        $('#txtNivel' + nivel).val('');
        $('#txtNivel' + nivel).attr('placeholder', '');
        $('#txtNivel' + nivel).attr('disabled', true);
    }
    else {
        $('#s2id_cboNivel' + nivel + ' a .select2-chosen').html('Nivel ' + nivel);
        $("#s2id_cboNivel" + nivel).attr("style", "display:block");
        $('#cboNivel' + nivel).attr('disabled', false);
        $('#txtNivel' + nivel).val('');
        $('#txtNivel' + nivel).attr('placeholder', 'Nivel ' + nivel);
        $('#txtNivel' + nivel).attr('disabled', false);
    }

}

function Grabar() {

    var CODE = '';
    var CTLG_CODE = '';
    var NOMBRE_PLAN = '';
    var nNiveles = '';
    var NIVELES = 0;
    var NIVEL1 = '';
    var ndNivel1 = '';
    var NIVEL1_DIG = 0;
    var NIVEL2 = '';
    var ndNivel2 = '';
    var NIVEL2_DIG = 0;
    var NIVEL3 = '';
    var ndNivel3 = '';
    var NIVEL3_DIG = 0;
    var NIVEL4 = '';
    var ndNivel4 = '';
    var NIVEL4_DIG = 0;
    var ESTADO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_FIN = '';
    var USUA_ID = '';

    var v_Errors = true;

    v_Errors = validar();

    if (v_Errors) {

        CTLG_CODE = $('#cboEmpresa').val();
        NOMBRE_PLAN = $.trim($('#txtNombrePlan').val());

        nNiveles = $.trim($('#cboNiveles').val());
        if (nNiveles == '') NIVELES = 0;
        else NIVELES = parseInt(nNiveles);

        NIVEL1 = $.trim($('#txtNivel1').val());
        ndNivel1 = $.trim($('#cboNivel1').val());
        if (ndNivel1 == '') NIVEL1_DIG = 0;
        else NIVEL1_DIG = parseInt(ndNivel1);

        NIVEL2 = $.trim($('#txtNivel2').val());
        ndNivel2 = $.trim($('#cboNivel2').val());
        if (ndNivel2 == '') NIVEL2_DIG = 0;
        else NIVEL2_DIG = parseInt(ndNivel2);

        NIVEL3 = $.trim($('#txtNivel3').val());
        ndNivel3 = $.trim($('#cboNivel3').val());
        if (ndNivel3 == '') NIVEL3_DIG = 0;
        else NIVEL3_DIG = parseInt(ndNivel3);

        NIVEL4 = $.trim($('#txtNivel4').val());
        ndNivel4 = $.trim($('#cboNivel4').val());
        if (ndNivel4 == '') NIVEL4_DIG = 0;
        else NIVEL4_DIG = parseInt(ndNivel4);

        ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';

        FECHA_INICIO = $('#txtFechaInicio').val();

        FECHA_FIN = $('#txtFechaTermino').val();

        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMESCC.ASHX?OPCION=NC&CTLG_CODE=" + CTLG_CODE + "&NOMBRE_PLAN=" + NOMBRE_PLAN + "&NIVELES=" + NIVELES + "&NIVEL1=" + NIVEL1 + "&NIVEL1_DIG=" + NIVEL1_DIG + "&NIVEL2=" + NIVEL2 + "&NIVEL2_DIG=" + NIVEL2_DIG +
            "&NIVEL3=" + NIVEL3 + "&NIVEL3_DIG=" + NIVEL3_DIG + "&NIVEL4=" + NIVEL4 + "&NIVEL4_DIG=" + NIVEL4_DIG + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("Ya Existe Centro de Costos para esa Empresa");
                    }
                    else {
                        $('#txtCodigo').val(datos[0].CODIGO);
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



function Grabacion() {
    var inputNombre = [];
    var CODE = '';
    var CTLG_CODE = '';
    var NOMBRE_PLAN = '';
    var nNiveles = '';
    var NIVELES = 0;
    var sDigitos = '';
    var sNombres = '';
    var ESTADO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_FIN = '';
    var USUA_ID = '';

    var v_Errors = true;

    var aoInput = $('.nombreDig');
    var aoInputDig = $('.nroDig');

    for (var i = 0; i < aoInput.length; i++) {
        var ImputID = $(aoInput[i]).attr("id");
        inputNombre.push(ImputID);
    }

    for (var i = 0; i < aoInputDig.length; i++) {
        var ImputIDid = $(aoInputDig[i]).attr("id");
        inputNombre.push(ImputIDid);
    }
    
    inputNombre.push('txtNombrePlan', 'txtFechaInicio', 'cboEmpresa', 'txtNroNiveles');

    v_Errors = validar();
    
    if (vErrors(inputNombre)) {

        CTLG_CODE = $('#cboEmpresa').val();
        NOMBRE_PLAN = $.trim($('#txtNombrePlan').val());

        nNiveles = $.trim($('#txtNroNiveles').val());
        if (nNiveles == '') NIVELES = 0;
        else NIVELES = parseInt(nNiveles);

        for (i = 1; i <= NIVELES; i++) {
            if (i != 1) {
                sNombres = sNombres + ','
            }
            sNombres = sNombres + $("#txtNombreNivel_" + i).val();
        }        


        for (i = 1; i <= NIVELES; i++) {
            if (i != 1) {
                sDigitos = sDigitos + ','
            }
            sDigitos = sDigitos + $("#txtNivel_" + i).val();
        }
        

        ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
        FECHA_INICIO = $('#txtFechaInicio').val();
        FECHA_FIN = $('#txtFechaTermino').val();
        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
       
        Bloquear("ventana");
        
        $.ajax({
            type: "POST",
             url: "vistas/NC/ajax/NCMESCC.ASHX?OPCION=NC&CTLG_CODE=" + CTLG_CODE + "&NOMBRE_PLAN=" + NOMBRE_PLAN + "&NIVELES=" + NIVELES + "&sDigitos=" + sDigitos +
             "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID + "&sNombres=" + sNombres,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("Ya Existe Centro de Costos para esa Empresa");
                    }
                    else {
                        $('#txtCodigo').val(datos[0].CODIGO);
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

function Modificacion() {
    var CODE = '';
    
    var CTLG_CODE = '';
    var NOMBRE_PLAN = '';
    var nNiveles = '';
    var NIVELES = 0;
    var NIVEL1 = '';
    var ndNivel1 = '';
    var NIVEL1_DIG = 0;
    var NIVEL2 = '';
    var ndNivel2 = '';
    var NIVEL2_DIG = 0;
    var NIVEL3 = '';
    var ndNivel3 = '';
    var NIVEL3_DIG = 0;
    var NIVEL4 = '';
    var ndNivel4 = '';
    var NIVEL4_DIG = 0;
    var ESTADO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_FIN = '';
    var USUA_ID = '';

    var v_Errors = true;

    

    v_Errors = validar();

    if (v_Errors) {

        CODE = $('#txtCodigo').val();

        CTLG_CODE = $('#cboEmpresa').val();
        NOMBRE_PLAN = $.trim($('#txtNombrePlan').val());


        nNiveles = $.trim($('#cboNiveles').val());
        if (nNiveles == '') NIVELES = 0;
        else NIVELES = parseInt(nNiveles);

        NIVEL1 = $.trim($('#txtNivel1').val());
        ndNivel1 = $.trim($('#cboNivel1').val());
        if (ndNivel1 == '') NIVEL1_DIG = 0;
        else NIVEL1_DIG = parseInt(ndNivel1);

        NIVEL2 = $.trim($('#txtNivel2').val());
        ndNivel2 = $.trim($('#cboNivel2').val());
        if (ndNivel2 == '') NIVEL2_DIG = 0;
        else NIVEL2_DIG = parseInt(ndNivel2);

        NIVEL3 = $.trim($('#txtNivel3').val());
        ndNivel3 = $.trim($('#cboNivel3').val());
        if (ndNivel3 == '') NIVEL3_DIG = 0;
        else NIVEL3_DIG = parseInt(ndNivel3);

        NIVEL4 = $.trim($('#txtNivel4').val());
        ndNivel4 = $.trim($('#cboNivel4').val());
        if (ndNivel4 == '') NIVEL4_DIG = 0;
        else NIVEL4_DIG = parseInt(ndNivel4);

        ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';

        FECHA_INICIO = $('#txtFechaInicio').val();

        FECHA_FIN = $('#txtFechaTermino').val();

        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMESCC.ASHX?OPCION=MC&CODE=" + CODE + "&CTLG_CODE=" + CTLG_CODE + "&NOMBRE_PLAN=" + NOMBRE_PLAN + "&NIVELES=" + NIVELES + "&NIVEL1=" + NIVEL1 + "&NIVEL1_DIG=" + NIVEL1_DIG + "&NIVEL2=" + NIVEL2 + "&NIVEL2_DIG=" + NIVEL2_DIG +
            "&NIVEL3=" + NIVEL3 + "&NIVEL3_DIG=" + NIVEL3_DIG + "&NIVEL4=" + NIVEL4 + "&NIVEL4_DIG=" + NIVEL4_DIG + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("Ya Existe Centro de Costos para esa Empresa");
                    }
                    else {
                        $('#txtCodigo').val(datos[0].CODIGO);
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
    var inputNombre = [];
    var CODE = '';
    var CTLG_CODE = '';
    var NOMBRE_PLAN = '';
    var nNiveles = '';
    var NIVELES = 0;
    var sDigitos = '';
    var sNombres = '';
    var ESTADO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_FIN = '';
    var USUA_ID = '';

    var aoInput = $('.nombreDig');
    var aoInputDig = $('.nroDig');

    for (var i = 0; i < aoInput.length; i++) {
        var ImputID = $(aoInput[i]).attr("id");
        inputNombre.push(ImputID);
    }

    for (var i = 0; i < aoInputDig.length; i++) {
        var ImputIDid = $(aoInputDig[i]).attr("id");
        inputNombre.push(ImputIDid);
    }

    inputNombre.push('txtNombrePlan', 'txtFechaInicio', 'cboEmpresa', 'txtNroNiveles');
   
    var v_Errors = true;

    v_Errors = validar();
    

    if (v_Errors) {
        if (vErrors(inputNombre)) {
            CODE = $('#txtCodigo').val();

            CTLG_CODE = $('#cboEmpresa').val();
            NOMBRE_PLAN = $.trim($('#txtNombrePlan').val());


            nNiveles = $.trim($('#txtNroNiveles').val());
            if (nNiveles == '') NIVELES = 0;
            else NIVELES = parseInt(nNiveles);

            for (i = 1; i <= NIVELES; i++) {
                if (i != 1) {
                    sNombres = sNombres + ','
                }
                sNombres = sNombres + $("#txtNombreNivel_" + i).val();
            }           
           

            for (i = 1; i <= NIVELES; i++) {
                if (i != 1) {
                    sDigitos = sDigitos + ','
                }
                sDigitos = sDigitos + $("#txtNivel_" + i).val();
            }   
            

            ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';

            FECHA_INICIO = $('#txtFechaInicio').val();

            FECHA_FIN = $('#txtFechaTermino').val();

            USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMESCC.ASHX?OPCION=MC&CODE=" + CODE + "&CTLG_CODE=" + CTLG_CODE + "&NOMBRE_PLAN=" + NOMBRE_PLAN + "&NIVELES=" + NIVELES + "&sDigitos=" + sDigitos +
                "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID + "&sNombres=" + sNombres,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    if (datos[0].RPTA == "OK") {
                        Desbloquear("ventana");
                        $('#txtCodigo').val(datos[0].CODIGO);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    } else {
                        if (datos[0].RPTA == "ERROR") {                           
                            alertCustom("Ya existe una estructura de centro de costos activa.");
                        } else {
                            alertCustom("Error al modificar registro");
                        }
                        
                    }
                    Desbloquear("ventana");  
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    alert(msg);
                }
            });
        }
        

        

    }

}
function validar() {
    var v_Errors = true;
    
    //if ($('#cboNiveles').val() != "") {
    //    if (!vErrors(["txtFechaInicio", "cboEmpresa", "txtNombrePlan", "txtNiveles"])) {
    //        v_Errors = false;
    //    }
         
    //    if ($('#cboNiveles').val() == "2") {
    //        offObjectEvents('txtNivel2');
    //        offObjectEvents('cboNivel2');

    //        offObjectEvents('txtNivel3');
    //        offObjectEvents('cboNivel3');

    //        setValueDisplayNivel('2', true);
    //        setValueDisplayNivel('3', true);

    //        if (!vErrorsNotMessage(["txtNivel4", "cboNivel4"])) {
    //            v_Errors = false;
    //        }
    //    }
    //    else if ($('#cboNiveles').val() == "3") {
    //        offObjectEvents('txtNivel3');
    //        offObjectEvents('cboNivel3');

    //        setValueDisplayNivel('3', true);

    //        if (!vErrors(["txtNivel2", "cboNivel2", "txtNivel4", "cboNivel4"])) {
    //            v_Errors = false;
    //        }
    //    }
    //    else {
    //        if (!vErrors(["txtNivel2", "cboNivel2", "txtNivel3", "cboNivel3", "txtNivel4", "cboNivel4"])) {
    //            v_Errors = false;
    //        }
    //    }
        
    //}
    //else {
    //    if (!vErrors(["txtFechaInicio", "cboEmpresa", "txtNombrePlan", "txtNiveles"])) {
    //        v_Errors = false;
    //    }
    //}
    
    if ($('#chkEstado').is(':checked')) {
        offObjectEvents('txtFechaTermino');
        $('#txtFechaTermino').attr('placeholder', '');
    }
    else {
        if (!vErrorsNotMessage(["txtFechaTermino"])) {
            v_Errors = false;
        }
    }

    if (!v_Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
    }

    return v_Errors;
}