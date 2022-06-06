var oTableGlobal;
var rowGlobal;

var tbandeja1;
var NAMGLNP = function () {

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboProveedores').select2();
    }

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
                    $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val()).change();
                } else {
                    $('#cboEmpresas').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function filltxtproveedor() {
        //var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=3&p_scl=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboProveedores').empty();
                $('#cboProveedores').append('<option></option>');
                $('#cboProveedores').select2('val', '');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboProveedores').append('<option value="' + datos[i].PIDM + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                } else {
                    $('#cboProveedores').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    //Obtiene las lineas de credito
    function CargarGrilla(oTable) {
        $.ajax({
            url: "vistas/NA/ajax/NAMGLNP.ASHX?OPCION=1&Proveedor=" + $('#cboProveedores').val() + '&empresa=' + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    LlenarGrilla(datos, oTable);
                    oTableGlobal = oTable
                    //Borra eventos click anteriores para el boton Dar de Baja
                    offObjectEvents("btnEditar")
                    eventoControles();
                    oTable.fnSort([2, 'desc']);
                    CargarValidacionFilas();
                }
                else {
                    oTable.fnClearTable();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    function LlenarGrilla(data_json, otable) {
        otable.fnClearTable();
        otable.fnAddData(data_json);
        $('#tblBandeja a.none').attr('disabled', true);
    }

    function adicionarow(oTable) {
        //var tbandeja1 = $('#tblBandeja').dataTable();
        var SEQ;
        $.ajax({
            type: "post",
            url: "vistas/NA/ajax/NAMGLNP.ASHX?OPCION=2&Proveedor=" + $('#cboProveedores').val() + '&empresa=' + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    SEQ = parseInt(datos[0].SECUENCIA) + 1;
                }
                else {
                    SEQ = 1;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

        var aiNew = oTable.fnAddData({ SECUENCIA: SEQ, LINCRED: "", MONEDA: "", PLAZO: "", FECHA_INICIO: "", FECHA_FINAL: "", ESTADO: "ACTIVO", USUARIO: $('#ctl00_lblusuario').html() });
        var nRow = oTable.fnGetNodes(aiNew[0]);
        oTable.fnSort([2, 'desc']);
        editRow(oTable, nRow);
        nEditing = nRow;
    }

    function editRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var strSelect = '';
        var jqTds = $('>td', nRow);
        jqTds[0].innerHTML = "<a class='delete btn red' href='javascript:;'><i class='icon-remove-sign'></i></a>";
        jqTds[1].innerHTML = "<a class='edit btn blue' href='javascript:;'><i class='icon-ok-sign'></i></a>";
        jqTds[2].innerHTML = '<input type="text" readonly=”readonly” class="m-wrap small number" value="' + aData.SECUENCIA + '">';
        jqTds[3].innerHTML = '<input type="text" class="m-wrap small decimal" onkeypress=" return ValidaDecimales(event,this)" value="' + aData.LINCRED + '">';
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namglnp.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    strSelect = '<select>';
                    for (var i = 0; i < datos.length; i++) {
                        strSelect = strSelect + '<option value=' + datos[i].CODE + '>' + datos[i].DES + '</option>';
                    }
                    strSelect = strSelect + '</select>';
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
        //jqTds[4].innerHTML = '<input type="text" class="m-wrap small number" value="' + aData[4] + '">'; // moneda
        jqTds[4].innerHTML = strSelect;
        jqTds[5].innerHTML = '<input type="text" class="m-wrap small" maxlength= "3" onkeypress=" return ValidaNumeros(event,this)" onkeyup=" return validaDiasPlazo(event,this)" value="' + aData.PLAZO + '">';
        jqTds[6].innerHTML = '<input type="text" readonly=”readonly” class="m-wrap small required fecha1" data-date-format="dd/mm/yyyy"  value="' + aData.FECHA_INICIO + '">';
        jqTds[7].innerHTML = '<input type="text" readonly=”readonly” class="m-wrap small required"  value="' + aData.FECHA_FINAL + '">';
        jqTds[8].innerHTML = '<input type="text" readonly=”readonly”  class="m-wrap small number" value="' + aData.ESTADO + '">';
        jqTds[9].innerHTML = '<input type="text" readonly=”readonly”  class="m-wrap small number" value="' + aData.USUARIO + '">';

        var fecha = new Date();
        var dia, mes, anio;
        dia = fecha.getDate();
        mes = parseInt(fecha.getMonth()) +1;
        anio = fecha.getFullYear();       
        if (mes < 10)
            mes = "0" + mes
        if (dia < 10)
            dia = "0" + dia
        $('.fecha1').val(dia+"/"+mes+"/"+anio);      

        $('#agregar').attr('disabled', true);
        $('.entero').numeric();
        oTable.fnSort([2, 'desc']);
    }

    var CargaInicial = function () {
        var personaAnterior = "";
        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: '<a class="btn red"><i class="icon-remove-sign"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn blue"><i class="icon-ok-sign"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "SECUENCIA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "LINCRED",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "PLAZO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_FINAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ESTADO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "USUARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ],
            "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5
        }

        //var tbandeja1 = iniciaTabla('tblBandeja', parms);
         tbandeja1 = $('#tblBandeja').dataTable(parms);
        var $window = jQuery(window);
        $('#tblBandeja').removeAttr('style');
        $window.load(function () { cargaresponsive(tbandeja1.api(true)); });
        $window.resize(function () { redimresponsive(tbandeja1.api(true)); });
        $("#" + tbandeja1.api(true).settings()[0].sTableId).resize(function () { $(this).parent().css("overflow-x", "scroll"); });

        $('#agregar').on('click', function () {

            if ($('#cboProveedores').val().length != 0)
            { adicionarow(tbandeja1); }
            else
            { alertCustom('Debe seleccionar un proveedor'); }

        });

        var c= 1;
        $('#cboEmpresas').on('change', function () {
           // personaAnterior = "";
            tbandeja1.fnClearTable();
            //c++
            //if (c <= 100) {
            //    console.log(c);
            //}
            filltxtproveedor();
        });

        $('#cboProveedores').on('change', function () {
            //if ($('#cboProveedores').val() != personaAnterior) {
                CargarGrilla(tbandeja1);
                if ($('#cboProveedores').val() != "") {
                    $('#agregar').removeAttr('disabled');
                }
                else {
                    $('#agregar').attr('disabled', 'disabled');
                }
            //    personaAnterior = $('#cboProveedores').val();
            //} else {
            //   // personaAnterior = "";
            //}
        });

        $('#tblBandeja a.delete').live('click', function (e) {
            e.preventDefault();

            if (confirm("Esta Seguro de Quitar esta fila?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            tbandeja1.fnDeleteRow(nRow);
            $('#agregar').attr('disabled', false);

        });

        $('#tblBandeja a.edit').live('click', function (e) {
            e.preventDefault();

            var nRow = $(this).parents('tr')[0];
            saverow(tbandeja1, nRow);
            var aData = tbandeja1.fnGetData(nRow);
            var bValidacion = 0;

            if (aData.LINCRED.length === 0) {
                alertCustom('Debe ingresar un monto de linea de credito');
                bValidacion = 1;
                tbandeja1.fnDeleteRow(nRow);
                adicionarow(tbandeja1);
                return false;
            }
            if (aData.PLAZO.length === 0) {
                alertCustom('Debe ingresar el plazo de la linea de credito');
                bValidacion = 1;
                tbandeja1.fnDeleteRow(nRow);
                adicionarow(tbandeja1);
                return false;
            } else {
                if (parseInt(aData.PLAZO) < 1) {
                    infoCustom("Ingrese el plazo mayor a un día.")
                    bValidacion = 1;
                    tbandeja1.fnDeleteRow(nRow);
                    adicionarow(tbandeja1);
                    return false;
                }
                else if (parseInt(aData.PLAZO) > 365) {
                    infoCustom("Ingrese el plazo menor a 365 días.")
                    bValidacion = 1;
                    tbandeja1.fnDeleteRow(nRow);
                    adicionarow(tbandeja1);
                    return false;
                }

            }
            if (bValidacion === 0) {
                GrabarRow($('#cboProveedores').val(), aData.SECUENCIA, aData.LINCRED, aData.MONEDA, aData.PLAZO, aData.FECHA_INICIO, aData.FECHA_FINAL, aData.ESTADO, aData.USUARIO, $('#cboEmpresas').val())
                $('#agregar').removeAttr('disabled');
                $('#tblBandeja a.delete').attr('disabled', true);
                $('#tblBandeja a.edit').attr('disabled', true);
                CargarGrilla(tbandeja1);
            }
        });

        function saverow(otable, nRow) {
            var jqInput = $('input', nRow);
            var jqInput1 = $('select', nRow);

            otable.fnUpdate("<a class='delete btn red' href='javascript:;'><i class='icon-remove-sign'></i></a>", nRow, 0, false);
            otable.fnUpdate("<a class='edit btn blue' href='javascript:;'><i class='icon-ok-sign'></i></a>", nRow, 1, false);
            otable.fnUpdate(jqInput[0].value, nRow, 2, false);
            otable.fnUpdate(jqInput[1].value, nRow, 3, false);
            otable.fnUpdate(jqInput1[0].value, nRow, 4, false);
            otable.fnUpdate(jqInput[2].value, nRow, 5, false);
            otable.fnUpdate(jqInput[3].value, nRow, 6, false);
            otable.fnUpdate(jqInput[4].value, nRow, 7, false);
            otable.fnUpdate(jqInput[5].value, nRow, 8, false);
            otable.fnUpdate(jqInput[6].value, nRow, 9, false);
            otable.fnDraw();
        }

        function GrabarRow(proveedor, secuencia, lineacredito, moneda, plazo,
                           fecini, fecfin, estado, usuario, empresa) {
            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NA/ajax/NAMGLNP.ASHX", {
                opcion: 'I',
                proveedor: proveedor,
                secuencia: secuencia,
                lineacredito: lineacredito,
                moneda: moneda,
                plazo: plazo,
                fecini: fecini,
                fecfin: fecfin,
                estado: escape,
                usuario: usuario,
                empresa: empresa
            },
                    function (res) {
                        Desbloquear("ventana");
                        if (res != null) {
                            exito();
                        }
                        else {
                            noexito();
                        }
                    });
        }

        var cod = ObtenerQueryString("codigo");
        var emp = ObtenerQueryString("empresa");

        if (cod != undefined) {
            $('#cboEmpresas').select2("val",emp).change();
            $('#cboProveedores').select2("val",cod).change();
        }
    }

    var CargarValidacionFilas = function () {
        $('#tblBandeja_paginate').on("click", function () {
            offObjectEvents("btnEditar")
            eventoControles();
        });
    }

    var eventoControles = function () {                
       
        $('#tblBandeja tbody tr').on('click', function () {
            $('#tblBandeja tbody tr.selected').removeClass('selected');
            $(this).addClass('selected');

        });


        $('#tblBandeja tbody tr').bind('contextmenu', function (e) {
            $("#menuEditar").css('display', 'none');
            $('#tblBandeja tbody tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var pos = oTableGlobal.fnGetPosition(this);
            rowGlobal = oTableGlobal.fnGetData(pos);

            if (oTableGlobal.fnGetData(pos).ESTADO != 'INACTIVO') {
                //console.log(e.pageX + " " + e.pageY)

                var ancho = parseInt($(this).css("width").split("px")[0]);
                var alto = parseInt($(this).css("height").split("px")[0]);
                var ancho_inf = parseInt($('#menuEditar').css("width").split("px")[0]);
                var alto_inf = parseInt($('#menuEditar').css("height").split("px")[0]);

                $(this).attr("over", true);
                $('#menuEditar').css({ 'display': 'block', 'position': 'absolute', 'left': e.pageX, 'top': $(this).offset().top - alto_inf - 50 });
            }
            return false;
        });

        $('#cboProveedores').on("change", function () {
            $("#menuEditar").css('display', 'none');
        });

        $("#btnEditar").on("click", function () {
            $('#tblBandeja tbody tr.selected').removeClass('selected');

            $.ajaxSetup({ async: false });
            $.post("vistas/NA/ajax/NAMGLNP.ASHX", {
                opcion: 'A',
                proveedor: $('#cboProveedores').val(),
                secuencia: rowGlobal.SECUENCIA,
                empresa: $('#cboEmpresas').val()
            },
            function (res) {
                if (res != null) {
                    exito();
                    CargarGrilla(oTableGlobal);
                }
                else {
                    noexito();
                }
            });

        });
    }
        
    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            filltxtproveedor();
            CargaInicial();
            eventoControles();

        }
    };

}();

var NALGLNP = function () {

    var plugins = function () {
        $('#cboEmpresas').select2();
    }

    var eventoControles = function () {
        $('#cboEmpresas').on('change', function () {
            fcargarbandeja(tbandeja1);
        });
    }

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
                    $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val()).change();
                } else {
                    $('#cboEmpresas').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var CargaInicial = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "TIPODOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "RSOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "LINEACREDITO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "PLAZO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
            ]
        }
         tbandeja1 = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                tbandeja1.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = tbandeja1.fnGetPosition(this);
                var row = tbandeja1.fnGetData(pos);
                var code = row.PIDM;
                var empresa = row.CODEMP;

                window.location.href = '?f=NAMGLNP&codigo=' + code + '&empresa=' + empresa;
            }

        });

        //se asocia el control empresas hcia la bd

       

    }

    function fcargarbandeja(oTable) {
        var monedaBase = ""
        var monedaAlterna = ""
        //Cargar monedas
        $.ajax({
            url: "vistas/NA/ajax/NAMGLNP.ASHX?OPCION=5&empresa=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    if (datos.length == 2) {
                        for (var i = 0; i < datos.length; i++) {
                            if (datos[i].TIPO == "MOBA") {
                                $("#lblMonedaBase").html(datos[i].DESC_CORTA);
                                $("#lblSimboloMonedaBase").html(datos[i].SIMBOLO);
                                monedaBase = datos[i].DESC_CORTA;
                            }
                            else {
                                $("#lblMonedaAlterna").html(datos[i].DESC_CORTA);
                                $("#lblSimboloMonedaAlterna").html(datos[i].SIMBOLO);
                                monedaAlterna = datos[i].DESC_CORTA;
                            }
                        }
                    }

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

        $.ajax({
            url: "vistas/NA/ajax/NAMGLNP.ASHX?OPCION=4&empresa=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    LlenarGrilla(datos, oTable);
                    oTable.fnSort([2, 'desc']);
                    //Calculo de totales
                    if (monedaBase != "" && monedaAlterna != "") {
                        var totalBase = 0
                        var totalAlterna = 0
                        for (var i = 0; i < datos.length; i++) {
                            if (monedaBase == datos[i].MONEDA) {
                                totalBase += parseFloat(datos[i].LINEACREDITO);
                            } else {
                                if (monedaAlterna == datos[i].MONEDA) {
                                    totalAlterna += parseFloat(datos[i].LINEACREDITO);
                                }
                            }
                        }
                        $("#txtTotalMonedaBase").html(totalBase);
                        $("#txtTotalMonedaAlterna").html(totalAlterna);
                    } else {
                        $("#txtTotalMonedaBase").html("0.00");
                        $("#txtTotalMonedaAlterna").html("0.00");
                    }
                }
                else {
                    $("#txtTotalMonedaBase").html("0.00");
                    $("#txtTotalMonedaAlterna").html("0.00");
                    oTable.fnClearTable();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    
    function LlenarGrilla(datos_json, oTable) {
        oTable.fnClearTable();
        oTable.fnAddData(datos_json);
    }

    return {
        init: function () {
            eventoControles();
            CargaInicial();
            plugins();
            fillCboEmpresa();

        }
    };
}();

