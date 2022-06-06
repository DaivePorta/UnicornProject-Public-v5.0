var NBLCCUE = function () {

    var fillCuentasBancarias = function () {
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfOETC').val());
        var parms = {
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
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
                        "sButtonText": "Exportar a Excel"
                    }
                ]
            },
            data: json,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '8%');
                    }
                },
                {
                    data: "NRO_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '14%');
                    }
                }, {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '20%');
                    }
                },
                {
                    data: "NRO_CTA_INTER",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '16%');
                    }
                },
                {
                    data: "CTAS_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '14%');
                    }
                },
                {
                    data: "DESC_FIRMA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '14%');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '7%');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '7%');
                    }
                },
                {
                    data: "CODE_EMPRESA",
                    visible: false
                }
            ]
        }

        tabla = iniciaTabla('tOETC', parms);

        $("#tOETC").removeAttr("style");

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">CUENTA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">CTA INTERBANCARIA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">CTA CONTABLE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="togGle-vis" data-column="5" href="#">FIRMA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggLe-vis" data-column="6" href="#">ESTADO</a>\
                    </div>');

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('#tOETC tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                tabla.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = tabla.fnGetPosition(this);
                var row = tabla.fnGetData(pos);
                var cod = row.CODE;
                var emp = row.CODE_EMPRESA;

                window.location.href = '?f=NBMCCUE&code=' + cod + '&ctlg=' + emp;
            }
        });

        $('#tOETC tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = tabla.api(true).row($(this).parent().parent()).index();
            var row = tabla.fnGetData(pos);
            var code = row.CODE;
            var ctlg = row.CODE_EMPRESA;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NB/ajax/NBMCCUE.ASHX", { opcion: 'CA', code: code, empresa: ctlg },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        tabla.fnGetData(pos).ESTADO = res;
                        refrescaTabla(tabla);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tOETC').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });
    };

    return {
        init: function () {
            fillCboEmpresa();
            fillCuentasBancarias();
            $('#cboEmpresas').select2();
            $('#cboEmpresas').on('change', function () {
                $('#tOETC').DataTable().column(8)
                    .search($(this).val())
                    .draw();
            });
            $('#cboEmpresas').select2("val", $('#ctl00_hddctlg').val()).change();
        }
    };
}();

var personasHtml = "";
var nroFirmantes = 1;
var firmantes = [];
var nroSectoristas = 1;
var sectoristas = [];
var nroResponsables = 1;
var responsables = [];
var firmantesMixtos = [];
var NBMCCUE = function () {

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboctaContable').select2();
        $('#cboTpoCuenta').select2();
        $('#cboMoneda').select2();
        $('#divMixta').slideUp();

        $("#txtNroCuenta").inputmask({ "mask": "C", "repeat": 23, "greedy": false });
        $("#txtICS").inputmask({ "mask": "C", "repeat": 23, "greedy": false });
    }

    var Inicializa = function () {
        $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val());
        $('#chkEstado').attr('checked', true);

        $('#txtFechaInicial').datepicker();
        $('#txtFechaFinal').datepicker();

        $('#txtFechaInicial').datepicker().change(function () {
            $('#txtFechaFinal').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaFinal').val().split("/").reverse().join(""))) ? "" : $('#txtFechaFinal').val());
            $('#txtFechaFinal').datepicker('setStartDate', $(this).val());
        });

        $('#txtFechaFinal').datepicker().on("change", function () {
            if ($('#txtFechaInicial').val() != "") {
                $('#txtFechaFinal').datepicker('setStartDate', $('#txtFechaInicial').val());
            }
        });
    }

    var cargarCuentasContables = function () {
        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboctaContable').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboctaContable').append('<option value="' + datos[i].CUENTA + '">' + datos[i].DESC_MOSTRAR + '</option>');
                    }
                }
                $('#cboctaContable').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventocontroles = function () {

        $("#cboEmpresas").on("change", function () {
            if ($(this).val() != "") {
                LimpiarFirmantes();
                for (var i = 1; i < nroFirmantes; i++) {
                    var m = i + 1;
                    $("#txtAutorizado" + m + "").parent().parent().parent().parent().remove();
                }
                nroFirmantes = 1;
                CargarDatosFirmantesEmpresa();
            }
        });

        $("#btnAgregarDivFirmante").on("click", function () {
            nroFirmantes++;
            var n = nroFirmantes;
            var campos = '<div class="row-fluid" style="padding: 4px">' +
                       '<div class="span2">' +
                            '<div class="control-group ">' +
                                '<label class="control-label">Autorizado ' + n + ' :</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span8">' +
                            '<div class="control-group">' +
                                '<div class="controls">' +
                                    '<input id="txtAutorizado' + n + '" style="text-align: center" type="text" class="span3" data-placeholder="Autorizado ' + n + '" disabled="disabled" />' +
                                    '<input id="txtAutorizado' + n + 'Desc" type="text" class="span9" data-placeholder="Autorizado ' + n + '" disabled="disabled" style="margin-left: 4px;" />' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '</div>';

            $("#divFirmantes").append(campos)
            if (n != 2) {
                var m = n - 1;
                $("#btnRemover" + m + "").css("display", "none");
            }
        });

        $("#btnAgregarDivSectorista").on("click", function () {
            nroSectoristas++;
            var n = nroSectoristas;
            var campos = '<div class="row-fluid" style="padding: 4px">' +
                       '<div class="span2">' +
                            '<div class="control-group ">' +
                                '<label class="control-label">Sectorista ' + n + ' :</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span8">' +
                            '<div class="control-group">' +
                                '<div class="controls">' +
                                    '<input id="txtSectorista' + n + '" style="text-align: center" type="text" class="span3" data-placeholder="Sectorista ' + n + '" disabled="disabled" />' +
                                    '<input id="txtSectorista' + n + 'Desc" type="text" class="span9" data-placeholder="Sectorista ' + n + '" disabled="disabled" style="margin-left: 4px;" />' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span2" style="margin-left: 5px">' +
                            '<div class="control-group">' +
                                '<div class="controls" style="padding-top: 4px">' +
                                    '<a id="btnBuscar' + n + '" onclick="CargarPersonasSec(\'' + n + '\')" class="btn blue" style="margin-right: 4px;"><i class="icon-user"></i></a>' +
                                    '<a id="btnRemoverSectorista' + n + '"   class="btn red remove" onclick="RemoverSectorista(this,\'' + n + '\');"><i class="icon-minus"></i></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '</div>';

            $("#divSectoristas").append(campos)
            if (n != 2) {
                var m = n - 1;
                $("#btnRemoverSectorista" + m + "").css("display", "none");
            }
        });

        $("#btnAgregarDivResponsable").on("click", function () {
            nroResponsables++;
            var n = nroResponsables;
            var campos = '<div class="row-fluid" style="padding: 4px">' +
                       '<div class="span2">' +
                            '<div class="control-group ">' +
                                '<label class="control-label">Responsable ' + n + ' :</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span8">' +
                            '<div class="control-group">' +
                                '<div class="controls">' +
                                    '<input id="txtResponsable' + n + '" style="text-align: center" type="text" class="span3" data-placeholder="Responsable ' + n + '" disabled="disabled" />' +
                                    '<input id="txtResponsable' + n + 'Desc" type="text" class="span9" data-placeholder="Responsable ' + n + '" disabled="disabled" style="margin-left: 4px;" />' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span2" style="margin-left: 5px">' +
                            '<div class="control-group">' +
                                '<div class="controls" style="padding-top: 4px">' +
                                    '<a id="btnBuscar' + n + '" onclick="CargarPersonasRes(\'' + n + '\')" class="btn blue" style="margin-right: 4px;"><i class="icon-user"></i></a>' +
                                    '<a id="btnRemoverResponsable' + n + '"   class="btn red remove" onclick="RemoverResponsable(this,\'' + n + '\');"><i class="icon-minus"></i></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '</div>';

            $("#divResponsables").append(campos)
            if (n != 2) {
                var m = n - 1;
                $("#btnRemoverResponsable" + m + "").css("display", "none");
            }
        });

        $('#rndSolidaria, #rndMacomunada').click(function () {
            $('#divMixta').slideUp();
            $("#divTblDetalles").slideUp();
        });

        $('#rndMixta').click(function () {
            ListarFirmantesMixtos();
            $("#divTblDetalles").slideDown();
        });

        $('#cboTpoCuenta').change(function () {
            var moneda = $('#cboTpoCuenta :selected').attr('data-moneda');
            var chequera = $('#cboTpoCuenta :selected').attr('data-chequera');
            $('#cboMoneda').select2('val', moneda).change();
            if (chequera === 'S') {
                $('#chkChequera').prop('checked', true).parent().addClass('checked');
            } else {
                $('#chkChequera').prop('checked', false).parent().removeClass('checked');
            }
        });

        $("#chkEstado").on("change", function () {
            if ($(this).is(":checked")) {
                $("#txtFechaFinal").attr("disabled", "disabled").val("");

            } else {
                $("#txtFechaFinal").removeAttr("disabled");
            }
        });

        $("#cboMoneda").on("change", function () {
            if ($("#cboMoneda :selected").attr("simbolo") != undefined && $("#cboMoneda :selected").attr("simbolo") != "") {
                $(".simboloMoneda").html("(" + $("#cboMoneda :selected").attr("simbolo") + ")")
            } else {
                $(".simboloMoneda").html("")
            }
        });

        $("#btnResponsable").on("click", function () {
            $.ajax({
                type: "post",
                url: "vistas/NB/ajax/NBMCCUE.ASHX?OPCION=LPE",
                async: false,
                success: function (datos) {
                    
                    oTable.fnClearTable();
                    if (datos.length > 0) {
                        $('#muestralistap').modal("show");
                        oTable.fnAddData(datos);
                        setTimeout(function () {
                            oTable.fnAdjustColumnSizing();
                        }, 900);
                        
                    } else {
                        infoCustom2("No se encontraron datos!");
                    }
                    
                },
                error: function (msg) {
                    alert(msg);
                }
            });


            
        });

    }

    var crearTablaVacia = function () {
        $("#tabla_det").css({ "font-size": "11px" });
        var parms = {
            data: null,
            columns: [                               
                {
                    data: "TIPODOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')  
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')  
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: 'NOMBRE_COMPLETO',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')    
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')  
                        $(td).css('font-size', '11px')
                    }
                }               
            ],
            stateSave: false,           
            order: [[1, "desc"]]

        }


        oTable = iniciaTabla('tblPersonas', parms);

       
        //$('#tblPersonas').on('dblclick', 'tr', function () {
        //    var nroAut = 1;
        //    if ($(this).hasClass('selected')) {
        //        $(this).removeClass('selected');
        //    }
        //    else {
        //        oTable.$('tr.selected').removeClass('selected');
        //        $(this).addClass('selected');
        //    }

        //    var row = $("#tblPersonas").DataTable().row(this).data();

            

        //    var IDPER2 = row.CODE;



        //    var existe = false;
        //    for (var i = 0; i < responsables.length; i++) {
        //        if (responsables[i].PIDM == IDPER2) {
        //            existe = true;
        //        }
        //    }
        //    if (existe) {
        //        infoCustom2("La persona seleccionada ya ha sido agregada.")
        //    } else {

        //        if (ValidaCorreo(IDPER2)) {

        //            $("#muestralistap").modal("hide");

        //            if ($("#txtResponsable" + nroAut + "").val() != "") {
        //                var i = parseFloat(nroAut) - 1;
        //                responsables.splice(i, 1);
        //            }
        //            $("#txtResponsable" + nroAut + "").val(IDPER2);
        //            $("#txtResponsable" + nroAut + "Desc").val(row.NOMBRE_COMPLETO);
        //            var obj = '{'
        //            obj += '"PIDM":"' + IDPER2 + '",';
        //            obj += '"NOMBRE":"' + $('#PER' + row.NOMBRE_COMPLETO).html() + '"';
        //            obj += '}';
        //            json = JSON.parse(obj);
        //            responsables.push(json);
        //        }
        //        else {
        //            infoCustom2("La persona seleccionada no posee una dirección de correo, actualice su información antes de agregar.")
        //        }
        //    }
        //});

      
       
    };

    //cargaInicial
    function cargarCuentaBancaria() {
        var code = ObtenerQueryString('code');
        var ctlg = ObtenerQueryString('ctlg');
        if (code != undefined && ctlg != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCB&empresa=" + ctlg + "&code=" + code,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    console.log(datos);
                    if (datos !== null) {
                        if (datos[0].MOVIMIENTOS == 'S') {
                            $("#txtNroCuenta,#cboTpoCuenta,#cboTpoCuenta").attr("disabled", true);
                        }

                        $("#cboEmpresas").select2("val", ctlg).change();

                        $("#cboEmpresas").attr("disabled", "disabled");
                        $('#txtBanco').prop('disabled', true);
                        $('#txtBanco').val(datos[0].BANCO);
                        $('#txtNroCuenta').val(datos[0].NRO_CUENTA);
                        $('#cboTpoCuenta').select2('val', datos[0].TPOCUENTA_CODE);
                        $('#cboMoneda').select2('val', datos[0].MONE_CODE);
                        if (datos[0].NRO_CTA_INTER!="")
                            $('#txtICS').val(datos[0].NRO_CTA_INTER).attr("disabled", true);

                        $('#txtFechaInicial').val(datos[0].FECAPERTURA);
                        $('#txtFechaFinal').val(datos[0].FECIERRE);
                        $('#cboctaContable').select2('val', datos[0].CTAS_CODE);
                        if (datos[0].CHEQUERA == 'S') $('#chkChequera').attr('checked', 'checked').parent().addClass("checked");
                        if (datos[0].TAR_TRABAJO == 'S') $('#chkTTrabajo').attr('checked', 'checked').parent().addClass("checked");
                        if (datos[0].BILLETERA_DIG == 'S') $('#chkBilleteraDigital').attr('checked', 'checked').parent().addClass("checked");
                        if (datos[0].CUENTA_COBRANZA == 'S') $('#chkCuentaCobranza').attr('checked', 'checked').parent().addClass("checked");
                        if (datos[0].ESTADO == 'ACTIVO') $('#chkEstado').attr('checked', 'checked').parent().addClass("checked");
                        else $('#chkEstado').prop('checked', false);
                                                                                                                 
                        //Carga de sectoristas
                        var pidm = (datos[0].SEC_PIDMS).split(",");
                        var nombre = (datos[0].SEC_NOMBRES).split(",");
                        var nro = 0;
                        for (var i = 0; i < pidm.length; i++) {
                            nro++;
                            if (i > 0) {
                                $("#btnAgregarDivSectorista").click();
                            }
                            $("#txtSectorista" + nro + "").val(pidm[i]);
                            $("#txtSectorista" + nro + "Desc").val(nombre[i]);

                            if (pidm[i] != "" && nombre[i] != "") {
                                var obj = '{'
                                obj += '"PIDM":"' + pidm[i] + '",';
                                obj += '"NOMBRE":"' + nombre[i] + '"';
                                obj += '}';
                                json = JSON.parse(obj);
                                sectoristas.push(json);
                            }
                        }
                        //Carga de responsables   
                        var pidm = (datos[0].RES_PIDMS).split(",");
                        var nombre = (datos[0].RES_NOMBRES).split(",");
                        var nro = 0;
                        for (var i = 0; i < pidm.length; i++) {
                            nro++;
                            if (i > 0) {
                                $("#btnAgregarDivResponsable").click();
                            }
                            $("#txtResponsable" + nro + "").val(pidm[i]);
                            $("#txtResponsable" + nro + "Desc").val(nombre[i]);

                            if (pidm[i] != "" && nombre[i] != "") {
                                var obj = '{'
                                obj += '"PIDM":"' + pidm[i] + '",';
                                obj += '"NOMBRE":"' + nombre[i] + '"';
                                obj += '}';
                                json = JSON.parse(obj);
                                responsables.push(json);
                            }
                        }
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
            $('#cboEmpresas').select2('val', ctlg);
            $('#btnGrabar').addClass('hidden');
            $('#btnActualizar').removeClass('hidden');
        }
    }

    var autocompletarBancos = function (v_value) {
        var code = ObtenerQueryString('code');
        var ctlg = ObtenerQueryString('ctlg');
        if (code == undefined && ctlg == undefined) {
            var txt = $('#txtBanco');
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMBANC.ashx?OPCION=0",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        txt.typeahead({
                            source: function (query, process) {
                                arrayNC = [];
                                map = {};

                                var obj = '[';
                                for (var i = 0; i < datos.length; i++) {
                                    arrayNC.push(datos[i].PERSONA);
                                    obj += '{ "BANCO" : "' + datos[i].BANCO + '", "PERSONA" : "' + datos[i].PERSONA + '" },';
                                }
                                obj += '{}';
                                obj = obj.replace(',{}', '');
                                obj += ']';
                                var json = $.parseJSON(obj);

                                $.each(json, function (i, objeto) {
                                    map[objeto.PERSONA] = objeto;
                                });

                                process(arrayNC);
                            },
                            updater: function (item) {
                                $('#hfBANC_CODE').val(map[item].BANCO);
                                return item;
                            }
                        });

                        txt.keyup(function () {
                            $(this).siblings("ul").css("width", $(this).css("width"))
                            if ($(this).val().length == 0) {
                                $('#hfBANC_CODE').val(null);
                            }
                        });
                    }
                    if (datos != null && $.trim(v_value).length > 0) {
                        txt.val(v_value);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    };

    var cargarTiposCuenta = function () {
        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMCCUE.ashx?opcion=LTCB",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTpoCuenta').empty();
                $('#cboTpoCuenta').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTpoCuenta').append('<option value="' + datos[i].CODIGO + '" data-moneda="' + datos[i].MONEDA + '" data-chequera="' + datos[i].CHEQUERA_IND + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboTpoCuenta').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var cargarMonedas = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');

                    }
                }
                $('#cboMoneda').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            Inicializa();
            crearTablaVacia();
            eventocontroles();
            $("#cboEmpresas").change();
            autocompletarBancos('');
            cargarTiposCuenta();
            cargarMonedas();
            cargarCuentasContables();
            cargarCuentaBancaria();
            //CargaInicialPersonas();
        }
    };
}();

var fillCboEmpresa = function () {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEmpresas').empty();
            $('#cboEmpresas').append('<option></option>');

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var RemoverSectorista = function (campo, nro) {
    for (var i = 0; i < sectoristas.length; i++) {
        if (sectoristas[i].PIDM == $("#txtSectorista" + nro + "").val()) {
            sectoristas.splice(i, 1);
        }
    }
    if (nro != 2) {
        var m = nro - 1;
        $("#btnRemoverSectorista" + m + "").css("display", "inline-block");
    }
    nroSectoristas--;
    $(campo).parent().parent().parent().parent().remove();
}

var RemoverResponsable = function (campo, nro) {
    for (var i = 0; i < responsables.length; i++) {
        if (responsables[i].PIDM == $("#txtResponsable" + nro + "").val()) {
            responsables.splice(i, 1);
        }
    }
    if (nro != 2) {
        var m = nro - 1;
        $("#btnRemoverResponsable" + m + "").css("display", "inline-block");
    }
    nroResponsables--;
    $(campo).parent().parent().parent().parent().remove();
}

var RemoverFirmantesMixtos = function (indice, nroItems) {
    firmantesMixtos.splice(parseFloat(indice), parseFloat(nroItems));
    ListarFirmantesMixtos();
}

var ListarFirmantesMixtos = function () {
    $("#tblDetalles tbody tr").remove();
    var reset = 0;
    var ini = 0;
    if (firmantesMixtos.length != 0) {
        for (var i = 0; i < firmantesMixtos.length; i++) {
            if (reset < parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                reset++;
            }
            tr = "<tr>"
            if (reset == 1) {

                tr += "<td rowspan='" + firmantesMixtos[i].NUMERO_FIRMANTES + "' style='text-align:right;'>" + formatoMiles(firmantesMixtos[i].DESDE) + "</td>"

                tr += "<td rowspan='" + firmantesMixtos[i].NUMERO_FIRMANTES + "'  style='text-align:right;'>" + formatoMiles(firmantesMixtos[i].HASTA) + "</td>"

                tr += "<td>" + firmantesMixtos[i].PIDM + "</td>"
                tr += "<td>" + firmantesMixtos[i].NOMBRE + "</td>"
                tr += "<td>"
                tr += (firmantesMixtos[i].OBLIG == "S") ? "SI" : "NO"
                tr += "</td>"

                $("#txtSolidariaDesde").val(firmantesMixtos[i].HASTA);
                $("#txtSolidariaHasta").val("");

            } else {
                tr += "<td>" + firmantesMixtos[i].PIDM + "</td>"
                tr += "<td>" + firmantesMixtos[i].NOMBRE + "</td>"
                tr += "<td>"
                tr += (firmantesMixtos[i].OBLIG == "S") ? "SI" : "NO"
                tr += "</td>"
            }
            tr += "</tr>"
            $("#tblDetalles tbody").append(tr);

            if (reset == parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                reset = 0;
            }
        }
        //Ocultar removes
        var btns = $("#tblDetalles .remove");
        for (var i = 0; i < btns.length - 1; i++) {
            $(btns[i]).attr("style", "display:none");
        }

    } else {
        $("#tblDetalles tbody").append("<tr><td colspan='6' style='text-align:center;'></td></tr>")
        $("#txtSolidariaDesde").val("0");
    }
}

var CargaInicialPersonas = function () {

    $.ajax({
        type: "post",
        url: "vistas/NB/ajax/NBMCCUE.ASHX?OPCION=LPE",
        async: false,
        success: function (datos) {
            //personasHtml = datos;
            oTable.fnClearTable();
            if (datos.length > 0) {
                $('#muestralistap').modal("show");
                oTable.fnAddData(datos);
                setTimeout(function () {
                    oTable.fnAdjustColumnSizing();
                }, 900);

            } else {
                infoCustom2("No se encontraron datos!");
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });


    //$.post("vistas/NB/ajax/NBMCCUE.ASHX", { opcion: "LPE", async: false},
    //function (res) {
    //    personasHtml = res;
    //});
}

//Carga personas para  Autorizados
var CargarPersonas = function (nroAut) {
    $("#divmodal").html("");
    if (personasHtml == "") {
        CargaInicialPersonas();
    }
    $("#divmodal").html(personasHtml);

    var tablemod = $('#tblbmodal').dataTable({
        "scrollCollapse": true,
        "paging": false,
        "info": false
    });

    $("#tblbmodal tbody").on("dblclick", "tr", function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            tablemod.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        var IDPER2 = $(this).attr("id");

        var existe = false;
        for (var i = 0; i < firmantes.length; i++) {
            if (firmantes[i].PIDM == IDPER2) {
                existe = true;
            }
        }
        if (existe) {
            infoCustom2("La persona seleccionada ya ha sido agregada.")
        } else {

            $("#muestralistap").modal("hide");

            if ($("#txtAutorizado" + nroAut + "").val() != "") {
                var i = parseFloat(nroAut) - 1;
                firmantes.splice(i, 1);
            }
            $("#txtAutorizado" + nroAut + "").val(IDPER2);
            $("#txtAutorizado" + nroAut + "Desc").val($("#PER" + IDPER2).html());
            var obj = '{'
            obj += '"PIDM":"' + IDPER2 + '",';
            obj += '"NOMBRE":"' + $('#PER' + IDPER2).html() + '"';
            obj += '}';

            json = JSON.parse(obj);
            firmantes.push(json);
        }
    });
}

var cont2 = 0;
//Carga personas para Sectoristas
var CargarPersonasSec = function (nroAut) {
    cont2 = nroAut;
    CargaInicialPersonas();

    $("#tblPersonas tbody").on("dblclick", "tr", function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $(this).removeClass('selected');
            $(this).addClass('selected');
        }

        var row = $("#tblPersonas").DataTable().row(this).data();

        var IDPER2 = row.CODE;

        var existe = false;
        for (var i = 0; i < sectoristas.length; i++) {
            if (sectoristas[i].PIDM == IDPER2) {
                existe = true;
            }
        }
        if (existe) {
            infoCustom2("La persona seleccionada ya ha sido agregada.")
        } else {

            $("#muestralistap").modal("hide");

            if ($("#txtSectorista" + cont2 + "").val() != "") {
                var i = parseFloat(cont2) - 1;
                sectoristas.splice(i, 1);
            }
            $("#txtSectorista" + cont2 + "").val(IDPER2);
            $("#txtSectorista" + cont2 + "Desc").val(row.NOMBRE_COMPLETO);
            var obj = '{'
            obj += '"PIDM":"' + IDPER2 + '",';
            obj += '"NOMBRE":"' + row.NOMBRE_COMPLETO + '"';
            obj += '}';
            json = JSON.parse(obj);
            sectoristas.push(json);
        }
    });
}

var cont = 0;
//Carga personas para Responsables
var CargarPersonasRes = function (nroAut) {    
    //console.log(nroAut);
    cont = nroAut;
    CargaInicialPersonas();
    //$("#divmodal").html("");
    //if (personasHtml == "") {
    //    CargaInicialPersonas();
    //}
    //$("#divmodal").html(personasHtml);

    //var tablemod = $('#tblbmodal').dataTable({
    //    "scrollCollapse": true,
    //    "paging": false,
    //    "info": false
    //});

    $("#tblPersonas tbody").on("dblclick", "tr", function () {        
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $(this).removeClass('selected');
            $(this).addClass('selected');
        }

        var row = $("#tblPersonas").DataTable().row(this).data();
        
        var IDPER2 = row.CODE;

        var existe = false;
        for (var i = 0; i < responsables.length; i++) {
            if (responsables[i].PIDM == IDPER2) {
                existe = true;
            }
        }
        if (existe) {
            infoCustom2("La persona seleccionada ya ha sido agregada.")
        } else {

            if (ValidaCorreo(IDPER2)) {

                $("#muestralistap").modal("hide");

                if ($("#txtResponsable" + cont + "").val() != "") {
                    var i = parseFloat(cont) - 1;
                    responsables.splice(i, 1);
                }
                $("#txtResponsable" + cont + "").val(IDPER2);
                $("#txtResponsable" + cont + "Desc").val(row.NOMBRE_COMPLETO);
                var obj = '{'
                obj += '"PIDM":"' + IDPER2 + '",';
                obj += '"NOMBRE":"' + row.NOMBRE_COMPLETO + '"';
                obj += '}';
                json = JSON.parse(obj);
                responsables.push(json);
            }
            else {
                infoCustom2("La persona seleccionada no posee una dirección de correo, actualice su información antes de agregar.")
            }
        }
    });
}

var LimpiarFirmantes = function () {
    var btns = $("#divFirmantes .remove");
    var count = nroFirmantes;
    for (var i = count; i > 0; i--) {
        if (i == 1) {
            firmantes.splice(0, 1);
            $("#txtAutorizado1").val("");
            $("#txtAutorizado1Desc").val("");
        } else {
            $("#btnRemover" + i + "").click()
        }
    }
}

var CargarAutorizadosMixtos = function () {

    var ctlg = $("#cboEmpresas").val();
    if (ctlg != undefined && ctlg!="") {
        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=AUTX&P_CUEN_CODE=&P_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    //Carga de firmantes mixtos
                    for (var i = 0; i < datos.length; i++) {
                        var pidm = (datos[i].AUT_PIDMS).split(",");
                        var nombre = (datos[i].AUT_NOMBRES).split(",");
                        var oblig = (datos[i].AUT_OBLIG_IND).split(",");

                        for (var j = 0; j < pidm.length; j++) {
                            var obj = '{'
                            obj += '"PIDM":"' + pidm[j] + '",';
                            obj += '"NOMBRE":"' + nombre[j] + '",';
                            obj += '"NUMERO_FIRMANTES":"' + datos[i].AUT_CANTIDAD + '",';
                            obj += '"DESDE":"' + datos[i].DESDE + '",';
                            obj += '"HASTA":"' + datos[i].HASTA + '",';
                            obj += '"OBLIG":"' + oblig[j] + '",';
                            obj += '"ITEM":"' + datos[i].ITEM + '"';
                            obj += '}';

                            json = JSON.parse(obj);
                            firmantesMixtos.push(json);
                        }
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}

var Grabar = function () {
    var continuar = true;
    array = ['cboEmpresas', 'txtNroCuenta', 'txtBanco', 'cboTpoCuenta', 'cboMoneda', 'txtFechaInicial'];
    var P_FIRMA = $('#rndMacomunada').is(':checked') ? 'M' : ($('#rndSolidaria').is(':checked') ? 'S' : $('#rndMixta').is(':checked') ? 'X' : '');

    if (vErrors(array)) {
        var empresa = $('#cboEmpresas').val();
        //Validaciones iniciales
        if ($('#rndMixta').is(':checked')) {
            if (firmantesMixtos.length <= 0) {
                continuar = false;
                alertCustom("Necesita agregar almenos 1 persona Autorizada (Firma Mixta)");
            }
        } else {
            if (firmantes.length <= 0) {
                continuar = false;
                alertCustom("Necesita agregar almenos 1 persona Autorizada");
            }
        }

        if (continuar) {
            //Indicar que no se agregó el ultimo valor 
            if ($('#rndMixta').is(':checked')) {
                if (firmantes.length > 0) {
                    infoCustom2("No terminó de agregar algunos campos a la Lista de Autorizados (Firma Mixta). Aquellos que no aparezcan en la tabla no se guardarán.");
                }
            }

            var data = new FormData();
            data.append('OPCION', 'G');
            data.append('empresa', empresa);

            data.append('P_NRO_CUENTA', $('#txtNroCuenta').val());
            data.append('P_BANC_CODE', $('#hfBANC_CODE').val());
            data.append('P_TIPO_CUENTA', $('#cboTpoCuenta').val());
            data.append('P_MONEDA', $('#cboMoneda').val());
            data.append('P_CTA_INTER', $('#txtICS').val());
            var pidms = "";
            for (var i = 0; i < sectoristas.length; i++) {
                if (i == sectoristas.length - 1) {
                    pidms += sectoristas[i].PIDM + "";
                }
                else {
                    pidms += sectoristas[i].PIDM + ",";
                }
            }
            data.append('P_PIDM_SECTORISTA', pidms);
            data.append('P_FECHA_APERTURA', $('#txtFechaInicial').val());
            data.append('P_FECHA_CIERRE', $('#txtFechaFinal').val());
            data.append('P_CTAS_CODE', $('#cboctaContable').val());
            data.append('P_PAGO_CHEQUERA', ($('#chkChequera').is(':checked')) ? 'S' : 'N');
            data.append('P_PAGO_TAR_TRABAJO', ($('#chkTTrabajo').is(':checked')) ? 'S' : 'N');
            data.append('P_BILLETERA_DIG', ($('#chkBilleteraDigital').is(':checked')) ? 'S' : 'N');
            data.append('P_CUENTA_COBRANZA', ($('#chkCuentaCobranza').is(':checked')) ? 'S' : 'N');
            pidms = "";
            for (var i = 0; i < firmantes.length; i++) {
                if (i == firmantes.length - 1) {
                    pidms += firmantes[i].PIDM + "";
                }
                else {
                    pidms += firmantes[i].PIDM + ",";
                }
            }
            data.append('P_PIDM_AUT1', pidms);           
            pidms = "";
            for (var i = 0; i < responsables.length; i++) {
                if (i == responsables.length - 1) {
                    pidms += responsables[i].PIDM + "";
                }
                else {
                    pidms += responsables[i].PIDM + ",";
                }
            }
            data.append('P_ESTADO_IND', ($('#chkEstado').is(':checked')) ? 'A' : 'I');
            data.append('P_USUA_ID', $('#ctl00_txtus').val());
            data.append('P_FIRMA', P_FIRMA);
            data.append('p_RESPONSABLES', pidms);

            Bloquear('ventana');


            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCCUE.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (res) {
                Desbloquear("ventana");
                if (res != null) {
                    if (res != '000000') {
                        exito();
                        setTimeout(function () {
                            window.location = '?f=NBMCCUE&code=' + res + '&ctlg=' + empresa;
                        }, 600);
                    } else {
                        noexito();
                    }
                }
            })
            .error(function () {
                Desbloquear("ventana");
                alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
            });
        }
    }
};

var Actualizar = function () {
    var continuar = true;
    array = ['cboEmpresas', 'txtNroCuenta', 'txtBanco', 'cboTpoCuenta', 'cboMoneda', 'txtFechaInicial', 'txtICS'];
    var P_FIRMA = $('#rndMacomunada').is(':checked') ? 'M' : ($('#rndSolidaria').is(':checked') ? 'S' : $('#rndMixta').is(':checked') ? 'X' : '');

    if (vErrors(array)) {
        var empresa = ObtenerQueryString('ctlg');
        var code = ObtenerQueryString('code');

        //Validaciones iniciales
        if ($('#rndMixta').is(':checked')) {
            if (firmantesMixtos.length <= 0) {
                continuar = false;
                alertCustom("Necesita agregar almenos 1 persona Autorizada (Firma Mixta)");
            }
        } else {
            if (firmantes.length <= 0) {
                continuar = false;
                alertCustom("Necesita agregar almenos 1 persona Autorizada");
            }
        }

        if (continuar) {
            //Indicar que no se agregó el ultimo valor 
            if ($('#rndMixta').is(':checked')) {
                if (firmantes.length > 0) {
                    infoCustom2("No terminó de agregar algunos campos a la Lista de Autorizados (Firma Mixta). Aquellos que no aparezcan en la tabla no se guardarán.");
                }
            }

            var data = new FormData();
            data.append('OPCION', 'A');
            data.append('empresa', empresa);
            data.append('code', code);

            data.append('P_NRO_CUENTA', $('#txtNroCuenta').val());
            var pidms = "";
            for (var i = 0; i < sectoristas.length; i++) {
                if (i == sectoristas.length - 1) {
                    pidms += sectoristas[i].PIDM + "";
                }
                else {
                    pidms += sectoristas[i].PIDM + ",";
                }
            }
            data.append('P_PIDM_SECTORISTA', pidms);
            data.append('P_FECHA_CIERRE', $('#txtFechaFinal').val());
            data.append('P_CTAS_CODE', $('#cboctaContable').val());
            data.append('P_PAGO_CHEQUERA', ($('#chkChequera').is(':checked')) ? 'S' : 'N');
            data.append('P_PAGO_TAR_TRABAJO', ($('#chkTTrabajo').is(':checked')) ? 'S' : 'N');
            data.append('P_BILLETERA_DIG', ($('#chkBilleteraDigital').is(':checked')) ? 'S' : 'N');
            data.append('P_CUENTA_COBRANZA', ($('#chkCuentaCobranza').is(':checked')) ? 'S' : 'N');
            pidms = "";
            for (var i = 0; i < firmantes.length; i++) {
                if (i == firmantes.length - 1) {
                    pidms += firmantes[i].PIDM + "";
                }
                else {
                    pidms += firmantes[i].PIDM + ",";
                }
            }
            data.append('P_PIDM_AUT1', pidms);           
            pidms = "";
            for (var i = 0; i < responsables.length; i++) {
                if (i == responsables.length - 1) {
                    pidms += responsables[i].PIDM + "";
                }
                else {
                    pidms += responsables[i].PIDM + ",";
                }
            }
            data.append('P_ESTADO_IND', ($('#chkEstado').is(':checked')) ? 'A' : 'I');
            data.append('P_USUA_ID', $('#ctl00_txtus').val());
            data.append('P_FIRMA', P_FIRMA);
            data.append('P_MONEDA', $('#cboMoneda').val());
            data.append('P_CTA_INTER', $('#txtICS').val());
            data.append('p_RESPONSABLES', pidms);

            Bloquear('ventana');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCCUE.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (res) {
                Desbloquear("ventana");
                if (res != null) {
                    if (res == 'OK') {
                        exito();
                    } else {
                        noexito();
                    }
                }
            })
            .error(function () {
                Desbloquear("ventana");
                alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
            });
        }
    }
};

function CargarDatosFirmantesEmpresa() {
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCEMPR.ASHX?codigo=" + $("#cboEmpresas").val(),
        contentType: "application/json;",
        async: true,
        dataType: "json",
        success: function (datos) {

            if (datos[0].TIPO_FIRMA == 'M') {
                $('#rndMacomunada').attr('checked', 'checked');
                $('#rndMacomunada').parent().addClass('checked');
                $('#rndMacomunada').click();

                $('#rndSolidaria').removeAttr("checked").parent().removeClass('checked');
                $('#rndMixta').removeAttr("checked").parent().removeClass('checked');
                $("#divFirmantes").attr("style", "display:block;")

            }
            else if (datos[0].TIPO_FIRMA == 'S') {
                $('#rndSolidaria').attr('checked', 'checked');
                $('#rndSolidaria').parent().addClass('checked');
                $('#rndSolidaria').click();

                $('#rndMacomunada').removeAttr("checked").parent().removeClass('checked');
                $('#rndMixta').removeAttr("checked").parent().removeClass('checked');
                $("#divFirmantes").attr("style", "display:block;")
            }
            else if (datos[0].TIPO_FIRMA == 'X') {
                $('#rndMixta').attr('checked', 'checked');
                $('#rndMixta').parent().addClass('checked');
                $('#rndMixta').click();

                $('#rndMacomunada').removeAttr("checked").parent().removeClass('checked');
                $('#rndSolidaria').removeAttr("checked").parent().removeClass('checked');
                $("#divFirmantes").attr("style", "display:none;")
            }


            //Carga de firmantes
            pidm = (datos[0].AUT_PIDMS).split(",");
            nombre = (datos[0].AUT_NOMBRES).split(",");
            oblig = (datos[0].AUT_OBLIG_IND).split(",");
            nro = 0;
            for (var i = 0; i < pidm.length; i++) {
                nro++;
                if (i > 0) {
                    $("#btnAgregarDivFirmante").click();
                }

                $("#txtAutorizado" + nro + "").val(pidm[i]);
                $("#txtAutorizado" + nro + "Desc").val(nombre[i]);
                if (oblig[i] == "S") {
                    $("#chkObligatorio" + nro + "").attr("checked", "checked").parent().addClass("checked");
                }

                if (pidm[i] != "" && nombre[i] != "") {
                    var obj = '{'
                    obj += '"PIDM":"' + pidm[i] + '",';
                    obj += '"OBLIG":"' + oblig[i] + '",';
                    obj += '"NOMBRE":"' + nombre[i] + '"';
                    obj += '}';
                    json = JSON.parse(obj);
                    firmantes.push(json);
                }
            }
            //Carga mixtos
            firmantesMixtos = [];
            CargarAutorizadosMixtos();
            ListarFirmantesMixtos();
            var sim = $("#cboMoneda option[data-tipo='MOBA']").attr("simbolo");
            if (sim != undefined) {
                $(".simboloMoneda").html("(" + sim + ")")
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ValidaCorreo(pidm) {
    var continuar = false;
    var data = new FormData();
    data.append('p_PIDM', pidm);
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NB/ajax/NBMCCUE.ASHX?OPCION=VCOR",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async:false
    })
    .success(function (res) {      
        if (res != null && res != "") {
            continuar = true;
        }
    });
    return continuar;
}