function actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_exo = $('#chkExo').is(':checked') ? 'S' : 'N';
    var p_empresa = $("#slcEmpresa").val().split("%")[0];
    var p_COD_EST_SUNAT = $("#txtcodsunat").val();
    var p_sucursal = $('#txtsucursal').val();
    var p_dire = $('#txtdireccion').val();
    var p_estable = $("#slcEstablecimientos").val().split("%")[0];
    var p_telef = $('#txttelefono').val();
    var p_pais = $("#slcpais").val();
    var p_ubigeo = $("#slcdist option:selected").attr("codigoub");
    var p_urban = $("#txtUrba").val();
    var p_fechai = $('#txtfechai').val();
    var p_fechat = $('#txtfechat').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_prop = $('#txtpropietario').val();
    var p_codigo = $('#txtcodigo').val();
    var p_pie_pagina_recibos = $('#chkPiePagina').is(':checked') ? 'S' : 'N';

    var bio_ind = $('#chkBiometrico').is(':checked') ? 'S' : 'N';

    if (vErrors(["txtdireccion", "txtsucursal", "txtcodsunat", "slcEmpresa", "txttelefono", "slcpais", "txtubigeo", "txtfechai", "slcEstablecimientos"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCSCSL.ASHX", { flag: 2, codi: p_codigo, acti: p_acti, empresa: p_empresa, cod_est_sunat: p_COD_EST_SUNAT, sucursal: p_sucursal, dire: p_dire, estable: p_estable, telef: p_telef, pais: p_pais, ubigeo: p_ubigeo, URBAN: p_urban, fechai: p_fechai, fechat: p_fechat, user: p_user, propietario: p_prop, exonerado: p_exo, bio_ind: bio_ind, p_pie_pagina_recibos: p_pie_pagina_recibos },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error") == -1) {
                    if (res == "EEEE") {

                        alertCustom("CASA MATRIZ ya se ha asignado a otro Establecimiento en ésta Empresa");

                    } else {
                        $("#slcEmpresa").attr("disabled", "disabled");
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizar();");
                    }
                } else {
                    noexito();
                }
            });
    }
}

function crear() {
    var p_exo = $('#chkExo').is(':checked') ? 'S' : 'N';
    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_empresa = $("#slcEmpresa").val().split("%")[0];
    var p_COD_EST_SUNAT = $("#txtcodsunat").val();
    var p_sucursal = $('#txtsucursal').val();
    var p_dire = $('#txtdireccion').val();
    var p_estable = $("#slcEstablecimientos").val().split("%")[0];
    var p_telef = $('#txttelefono').val();
    var p_pais = $("#slcpais").val();
    var p_ubigeo = $("#slcdist option:selected").attr("codigoub");
    var p_urban = $("#txtUrba").val();
    var p_fechai = $('#txtfechai').val();
    var p_fechat = $('#txtfechat').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_prop = $('#txtpropietario').val();
    var p_pie_pagina_recibos = $('#chkPiePagina').is(':checked') ? 'S' : 'N';

    var bio_ind = $('#chkBiometrico').is(':checked') ? 'S' : 'N';

    if (vErrors(["txtdireccion", "txtsucursal", "txtcodsunat", "slcEmpresa", "txttelefono", "slcpais", "txtubigeo", "txtfechai", "slcEstablecimientos"])) {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCSCSL.ASHX", { flag: 1, acti: p_acti, empresa: p_empresa, cod_est_sunat: p_COD_EST_SUNAT, sucursal: p_sucursal, dire: p_dire, estable: p_estable, telef: p_telef, pais: p_pais, ubigeo: p_ubigeo, URBAN: p_urban, fechai: p_fechai, fechat: p_fechat, user: p_user, propietario: p_prop, exonerado: p_exo, bio_ind: bio_ind, p_pie_pagina_recibos: p_pie_pagina_recibos },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error") == -1) {
                    if (res == "EEEE") {

                        alertCustom("CASA MATRIZ ya se ha asignado a otro Establecimiento en esta Empresa");

                    } else {
                        $("#slcEmpresa").attr("disabled", "disabled");
                        crearalmacen(res)
                        //if( $("#_estados").val()=="2")
                        //   exito();                       
                        $("#txtcodigo").val(res);
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizar();");
                    }

                } else {
                    noexito();
                }
            });
    }
}

/*------------------------------------------------*/

function cargaini2() {
    //cargarcombos
    //empresa-tipoestablec
    $.ajaxSetup({ async: false });
    $("#controlempresa").empty();
    $.post("vistas/NC/ajax/NCSCSL.ASHX", { flag: 8, usua: $("#ctl00_txtus").val() },
          function (res) {
              $("#controlempresa").html(res);
              $("#slcEmpresa option[value=0]").remove();
              $("#slcEmpresa").select2({
                  placeholder: "EMPRESA",
                  allowclear: true
              });
          });
    $.ajaxSetup({ async: true });

    $.ajaxSetup({ async: false });
    $("#controlestablecimiento").empty();
    $.post("vistas/NC/ajax/NCSCSL.ASHX", { flag: 9 },
          function (res) {
              $("#controlestablecimiento").html(res);

              $("#slcEstablecimientos option[value=0]").remove();
              $("#slcEstablecimientos").select2({
                  placeholder: "ESTABLECIMIENTO",
                  allowclear: true
              });
          });
    $.ajaxSetup({ async: true });

   
   
}

/**********************************/
var NCSCSL = function () {
    var plugins = function () {
        //"([A-Za-z]+:)?[0-9]+(-[0-9]+)?(-[0-9]+)?(/([A-Za-z]+:)?[0-9]+(-[0-9]+)?(-[0-9]+)?)*"
        inifechas("txtfechai", "txtfechat");
        $('#txtdireccion').focus(function () { $(this).inputmask({ "mask": "R", "repeat": 250, "greedy": false }); })
        $('#txtcodsunat').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); })
        $('#txttelefono').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 9, "greedy": false }); })
        $('#txtsucursal').focus(function () { $(this).inputmask({ "mask": "R", "repeat": 50, "greedy": false }); })
        $('#txtdire').attr("maxlength", "250");
        $(".combo").select2();
    }

    var biom_ctlg = '';

    var fnFillcboPais = function () {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=18",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#slcpais').empty();
                    $('#slcpais').append('<option value=""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcpais').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#slcpais').select2('val', '');
                $('#slcpais').attr("disabled", false);
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };

    var fnFillcboDepa = function (sCodPais) {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=19&p_Code_Pais=" + sCodPais,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {

                    $('#slcdepa').empty();
                    $('#slcdepa').append('<option value=""></option>');

                    $('#slcprov').empty();
                    $('#slcprov').append('<option value=""></option>');

                    $('#slcdist').empty();
                    $('#slcdist').append('<option value=""></option>');

                    for (var i = 0; i < datos.length; i++) {
                        $('#slcdepa').append('<option value="' + datos[i].UBIG_DEPARTAMENTO + '">' + datos[i].DEPARTAMENTO + '</option>');
                    }
                }
                $('#slcdepa').select2('val', '');
                $('#slcdepa').attr("disabled", false);
                $('#slcprov').select2();
                $('#slcdist').select2();

            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };

    var fnFillcboProv = function (sCodDep) {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=20&p_Code_Depa=" + sCodDep,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#slcprov').empty();
                    $('#slcprov').append('<option value=""></option>');

                    $('#slcdist').empty();
                    $('#slcdist').append('<option value=""></option>');

                    for (var i = 0; i < datos.length; i++) {
                        $('#slcprov').append('<option value="' + datos[i].UBIG_PROVINCIA + '">' + datos[i].PROVINCIA + '</option>');
                    }
                }
                $('#slcprov').select2('val', '');
                $('#slcprov').attr("disabled", false);
                $('#slcdist').select2();
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };

    var fnFillcboDist = function (sCodProv) {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=21&p_Code_Prov=" + sCodProv,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");

                if (datos != null) {
                    $('#slcdist').empty();
                    $('#slcdist').append('<option value=""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcdist').append('<option value="' + datos[i].UBIG_DISTRITO + '"codigoub="' + datos[i].CODE_UBIGEO + '">' + datos[i].DISTRITO + '</option>');
                    }
                }
                $('#slcdist').select2('val', '');
                $('#slcdist').attr("disabled", false);
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };

    var cargainicial = function () {
        aMayuscula(":input");
        //fin de activacion auto
        $('#chkactivo').on('change', function () {
            if ($("#chkactivo").is(':checked')) {
                $('#txtfechat').attr("disabled", true);
                $('#txtfechat').val('');
            } else {
                $('#txtfechat').attr("disabled", false);
            }
        });
        //carga combos
        cargaini2();
        //Cargar por parametro url los dx
        $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val() + "%" + $("#ctl00_hddctlg").val());
        //VALIDAD MUESTRA DE EXONERACION DE IMPUESTOS DE ACUERDO AL TIPO REGIMEN DE LA EMPRESA
        var ind_exo_igv = $("#slcEmpresa :selected").attr("exo_igv");
        if (ind_exo_igv == "S") {
            $("#EXO_control").attr("style", "display:block");
            $("#EXO_lbl").attr("style", "display:block");
        }
        else {
            $("#EXO_control").attr("style", "display:none");
            $("#EXO_lbl").attr("style", "display:none");

        }
        //VALIDAD MUESTRA DE EXONERACION DE IMPUESTOS DE ACUERDO AL TIPO REGIMEN DE LA EMPRESA - CIERRE
        var cod = ObtenerQueryString("codigo");
        var empresa = ObtenerQueryString("empr");
        if (cod != undefined) {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCSCSL.ASHX?codigo=" + cod + "&empresa=" + empresa,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);
                    $("#slcEmpresa").select2("val", datos[0].EMPRESA + "%" + datos[0].EMPRESA);
                    $("#slcEmpresa").attr("disabled", "disabled");
                    $("#txtcodsunat").val(datos[0].COD_SUNAT);
                    $("#txtsucursal").val(datos[0].DESCRIPCION);
                    $("#txtdireccion").val(datos[0].DIRECCION);
                    $("#slcEstablecimientos").select2("val", datos[0].ESTABLECIMIENTO + "%" + datos[0].ESTABLECIMIENTO);
                    $("#txttelefono").val(datos[0].TELEFONO);
                    $("#txtfechai").datepicker("setDate", datos[0].FECHA_INICIO);
                    $("#txtfechat").datepicker("setDate", datos[0].FECHA_TERMINO);
                    $("#slcpais").select2("val", datos[0].PAIS).change();
                    $("#slcdepa").select2("val", datos[0].DEPARTAMENTO).change();
                    $("#slcprov").select2("val", datos[0].PROVINCIA).change();
                    $("#slcdist").select2("val", datos[0].DISTRITO).change();
                    $("#txtUrba").val(datos[0].URBAN);

                    if (datos[0].ACTIVO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    biom_ctlg = datos[0].CTLG_BIO_IND;

                    if (datos[0].CTLG_BIO_IND === 'S') {
                        if (datos[0].BIO_IND === "S") {
                            $('#uniform-chkBiometrico span').removeClass().addClass("checked");
                            $('#chkBiometrico').attr('checked', true);
                        } else {
                            $('#uniform-chkBiometrico span').removeClass();
                            $('#chkBiometrico').attr('checked', false);
                        }
                    }
                    else {
                        $('#chkBiometrico').attr('disabled', 'disabled');
                    }
                    
                    var ind_exo_igv = $("#slcEmpresa :selected").attr("exo_igv");
                    if (ind_exo_igv == "S") {
                        $("#EXO_control").attr("style", "display:block");
                        $("#EXO_lbl").attr("style", "display:block");
                    }
                    else {
                        $("#EXO_control").attr("style", "display:none");
                        $("#EXO_lbl").attr("style", "display:none");

                    }

                    if (datos[0].EXONERADO == "SI") {

                        $('#uniform-chkExo span').removeClass().addClass("checked");
                        $('#chkExo').attr('checked', true);
                    } else {
                        $('#uniform-chkExo span').removeClass();
                        $('#chkExo').attr('checked', false);
                    }

                    if (datos[0].PIE_PAGINA_RECIBO == "SI") {
                        $('#uniform-chkPiePagina span').removeClass().addClass("checked");
                        $('#chkPiePagina').attr('checked', true);
                    } else {
                        $('#uniform-chkPiePagina span').removeClass();
                        $('#chkPiePagina').attr('checked', false);
                    }

                    AD_Permissions();
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }

            });
        }
    }

    var eventos = function () {
        var ind_exo_igv = '';
        $('#slcEmpresa').on('change', function () {
            ind_exo_igv = $("#slcEmpresa :selected").attr("exo_igv");
            ind_bio = $("#slcEmpresa :selected").attr("bio_ind");

            if (ind_exo_igv == "S") {
                $("#EXO_control").attr("style", "display:block");
                $("#EXO_lbl").attr("style", "display:block");
            }
            else {
                $("#EXO_control").attr("style", "display:none");
                $("#EXO_lbl").attr("style", "display:none");
            }

            if (biom_ctlg === 'S') {
                if (ind_bio == "S") {
                    $('#chkBiometrico').removeAttr('disabled');
                    $('#uniform-chkBiometrico span').removeClass().addClass("checked");
                    $('#chkBiometrico').attr('checked', true);
                } else {
                    $('#uniform-chkBiometrico span').removeClass();
                    $('#chkBiometrico').attr('checked', false);
                    $('#chkBiometrico').attr('disabled', true);
                }
            }
            else {
                $('#chkBiometrico').attr('disabled', 'disabled');
            }            
            $('#uniform-chkExo span').removeClass();
            $('#chkExo').attr('checked', false);
        });

        $('#slcpais').on('change', function () {
            if ($(this).val() != "") {
                fnFillcboDepa($(this).val());
            }

        });
        $('#slcdepa').on('change', function () {
            if ($(this).val() != "") {
                fnFillcboProv($(this).val());
            }

        });
        $('#slcprov').on('change', function () {
            if ($(this).val() != "") {
                fnFillcboDist($(this).val());
            }

        });
        $('#slcdist').on('change', function () {
            if ($(this).val() != "") {
                $("#txtubigeo").val($(this).val());
            }

        });
    }

    return {
        init: function () {
            plugins();
            fnFillcboPais();
            cargainicial();
            eventos();
        }
    };
}();

var NCLSCSL = function () {
    var oTableSucu = [];

    var handlePlugins = function () {
        $(".combo").select2();
    }

    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresas(1, "A", true);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val("").change();
    }


    var handleControls = function () {
        $("#cboEmpresa").on("change", function () {
            fnGetSucursales();
        });
    }


    var handleTablaSucursal= function () {

        var parms = {
            data: null,
            //"dom": '<"top"i>rt<"bottom"flp><"clear">',
            order: [[0, 'asc']],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                { data: "EMPRESA", width: "30%" },
                {
                    data: "FECHA_INICIO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_TERMINO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTableSucu = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');
        //$($("#tblBandeja_filter").children()[0]).hide();

        function filterColumn() {
            $('#tblBandeja').DataTable().column(0).search(
                $('#filcod').val()
            ).draw();
        }

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                oTableSucu.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableSucu.fnGetPosition(this);
                var row = oTableSucu.fnGetData(pos);
                var empresa = row.CODE_EMPRESA;
                var code = row.CODIGO;

                window.location.href = '?f=ncmscsl&codigo=' + code + '&empr=' + empresa;

            }

        });

        $('#tblBandeja tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = oTableSucu.api(true).row($(this).parent().parent()).index();
            var row = oTableSucu.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.post("vistas/NC/ajax/NCSCSL.ASHX", { flag: 3, codelim: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"
                        oTableSucu.fnGetData(pos).ESTADO = res;
                        //refrescaTabla(oTableSucu);
                        fnGetSucursales();
                        exito();

                    } else {
                        noexito();
                    }
                });
        });

    }





    var fnGetSucursales = function () {
        let codEmpresa = $("#cboEmpresa").val();

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCSCSL.ASHX?flag=LSUC&empresa=" + codEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTableSucu.fnClearTable();
                    oTableSucu.fnAddData(datos);
                }
                else {
                    oTableSucu.fnClearTable();
                    Desbloquear('ventana');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de sucursales.");
                oTableSucu.fnClearTable();
            }
        });

    }



    return {
        init: function () {
            handlePlugins();
            handleTablaSucursal();  
            handleControls();
            handleFillcboEmpresa();
        }
    };
}();

/****almacen****/
function crearalmacen(establecimiento) {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_empresa = $("#slcEmpresa").val().split("%")[0];;
    var p_sucursal = establecimiento;
    var p_TIPO_ALMC = "0011";   //mixto
    var p_dire = $('#txtdireccion').val();
    var p_almacen = "ALMACÉN " + $('#txtsucursal').val();
    var p_telef = "";
    var p_pais = $("#slcpais").val();
    var p_ubigeo = $("#slcdist option:selected").attr("codigoub");
    var p_urban = $("#txtUrba").val();
    var p_fechai = $('#txtfechai').val();
    var p_fechat = $('#txtfechat').val();
    var p_IMPR_CODE = "";
    var p_user = $('#ctl00_lblusuario').html();
    var p_encargado = "";
    var p_anexo = "";

    Bloquear("ventana");
    $.post("vistas/NA/ajax/NAMCFAL.ASHX", {
        opcion: 1,
        EMPRESA: p_empresa,
        SUCURSAL: p_sucursal,
        DESCRIPCION: p_almacen,
        TIPO_ALMACEN: p_TIPO_ALMC,
        ENCARGADO: p_encargado,
        DIRECCION: p_dire,
        PAIS: p_pais,
        UBIGEO: p_ubigeo,
        URBAN: p_urban,
        TELEFONO: p_telef,
        ANEXO: p_anexo,
        FECHAINI: p_fechai,
        FECHATER: p_fechat,
        IMPRESORA: p_IMPR_CODE,
        ESTADO: p_acti,
        USUARIO: p_user
    },
        function (res) {
            Desbloquear("ventana");
            if (res.indexOf("error") == -1 && res != "" && res != null) {
                if (crearseccion(res))
                    $("#_estados").val("1");

            } else {
                return false;
            }
        });
}
/********/

/***seccion***/
function crearseccion(almacen) {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';

    var p_paletizado = 'N';

    var p_empresa = $("#slcEmpresa").val().split("%")[0];;

    var p_descripcion = "SECCIÓN GENERAL ALMACÉN " + $('#txtsucursal').val();;

    var p_tipoalmacen = "0011"; // mixto
    var p_tipoalmacenaje = "0002"; //piso
    var p_user = $('#ctl00_lblusuario').html();

    var p_almacen = almacen;
    var p_sistema = "0000"; //sin sistema de almacenaje
    var p_nro_palets = '0';
    
    Bloquear("ventana");
    $.post("vistas/NA/ajax/NAMSECC.ASHX", {
        flag: 1,
        PALETIZADO_IND: p_paletizado,
        EMPRESA: p_empresa,
        DESCRIPCION: p_descripcion,
        ALMACEN: p_almacen,
        TIPO_ALMACEN: p_tipoalmacen,
        TIPO_ALMACENAJE: p_tipoalmacenaje,
        ESTADO: p_acti,
        USUARIO: p_user,
        SISTEMA_ALMACENAJE: p_sistema,
        NRO_PALETS: p_nro_palets
    },
        function (res) {
            Desbloquear("ventana");
            if (res.indexOf("error") == -1 && res != "" && res != null) {
                $("#_estados").val("2");
                exito();

            } else {
                return false;
            }
        });
}
/******/