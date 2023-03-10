

var COLDEPT = function () {
    var oTableCompras;
    var row = null;
    var dataGasto;

    var plugins = function () {
        $("#cboEmpresa,#cboEstablecimiento").select2()       
        $("#cboTipo").select2();
        inifechas("txtFechaEmisionD", "txtFechaEmisionH");
        inifechas("txtFechaRegistroD", "txtFechaRegistroH");
        $("#txtPeriodo").datepicker({            
            dateFormat: 'MM-yyyy',
            viewMode: "months",
            minViewMode: "months"
        }).datepicker("setDate",new Date());
    }

    var fillCboEmpresa = function () {
        $('#cboEmpresa').html(fnGetEmpresas(1, "A"));
        $('#cboEmpresa').val($("#ctl00_hddctlg").val()).change();
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }
    
    function listarRegistroVentas() {

        var data = new FormData();
        data.append('OPCION', "0");
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_ANIO', $("#txtPeriodo").val()===""?"":$("#txtPeriodo").datepicker('getDate').getFullYear());
        data.append('p_MES', $("#txtPeriodo").val() === "" ? "":$("#txtPeriodo").datepicker('getDate').getMonth() + 1);
        data.append('p_FECHA_EMISION_DESDE', $("#txtFechaEmisionD").val());
        data.append('p_FECHA_EMISION_HASTA', $("#txtFechaEmisionH").val());
        data.append('p_FECHA_REGISTRO_DESDE', $("#txtFechaRegistroD").val());
        data.append('p_FECHA_REGISTRO_HASTA', $("#txtFechaRegistroH").val());

      
      $.ajax({
            type: "POST",
            url: "vistas/CO/ajax/COLDEPT.ASHX",
            contentType: false,
            beforeSend: function () { Bloquear($($("#tblCompras").parents()[0]),"Obteniendo Datos ..."); },
            data: data,
            async: true,
            processData: false,
            cache: false,
            success: function (data) {
                oTableCompras.fnClearTable();
                if (data.length > 0) {
                    oTableCompras.fnAddData(data);
                    editaTabla();
                }
            },
            complete: function () {
                Desbloquear($($("#tblCompras").parents()[0]));
            }
        })
            
    }

    var eventoControles = function () {
        var today = new Date();
        var yyyy = today.getFullYear();

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento(this.value);
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa"])) {
                listarRegistroVentas();
            }
        });

        $("#btnLibroPdf").on("click", function () {
            exportTable2PDF("tblCompras", "COMPRAS A DECLARAR " + $("#cboEmpresa :selected").text() + " al " + new Date().format("dd.MM.yyyy"), "COMPRAS A DECLARAR " + $("#cboEmpresa :selected").text())
        });
        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblCompras", "COMPRAS A DECLARAR " + $("#cboEmpresa :selected").text() + " al " + new Date().format("dd.MM.yyyy"));
        });

        $("#rptasi").click(function () {
            $.ajax({
                type: "post",
                url: "vistas/co/ajax/coldept.ashx?OPCION=2",
                beforeSend: function () { Bloquear($($(this).parents("tr")[0])); },
                data: dataGasto,
                async: true,
                success: function (respuesta) {
                    if (respuesta == "OK") {
                        $("#modalconfir").modal("hide");
                        exito();
                    } else {
                        noexito();
                    }
                },
                complete: function () { Desbloquear($($(this).parents("tr")[0])); listarRegistroVentas(); },
                error: function (msg) {
                    alert(msg);
                }
            });
        });

    };

    var handleTable = function () {

        var parms = {
            data: null,
            columns: [        
                { data: "PERIODO",class:"editable" },
                { data: "DCTO" },
                { data: "NRO_DOCUMENTO" },
                { data: "RAZON_SOCIAL" },
                { data: "RUC" },
                { data: "EMISION",type:"fecha" },
                { data: "REGISTRO",type: "fecha" },
                { data: "GLOSA" },
                { data: "MONEDA",align:"center" },
                { data: "VALOR", type: "formatoMiles" },
                { data: "IGV", type: "formatoMiles"},
                { data: "IMPORTE", type: "formatoMiles" },
                { data: "DESC_OPERA", class: "editable"  },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {     
                        let clase = 'class="btn ';
                        if (rowData.TIPO === "GASTO") {
                            clase += 'red gasto"'
                        } else {
                            clase += '" disabled="disabled"'
                        }
                        $(td).html('<a ' + clase +  '><i class="icon-remove"></i></a>')
                    }, align: "center"
                }
            ]
        }

        oTableCompras = iniciaTabla('tblCompras', parms);

        $("#tblCompras tbody").on('click', 'tr', function () {

                var pos = oTableCompras.fnGetPosition(this);
                row = oTableCompras.fnGetData(pos);                               
            
        });

        $('#tblCompras tbody').on('click', 'a.btn.gasto', function () {

            var pos = oTableCompras.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableCompras.fnGetData(pos);
            var cod = row.CODIGO;

            dataGasto = { "CODIGO": cod, "columnId": "13", "value":""};
            $("#P1").html("El gasto de " + row.RAZON_SOCIAL + " con número de documento " + row.NRO_DOCUMENTO + " será retirado del libro de compras. ¿Desea Continuar?");
            $("#modalconfir").modal("show");          

        });
    };

    var editaTabla = function () {

        oTableCompras.makeEditable({
            sUpdateURL: 'vistas/co/ajax/coldept.ashx?OPCION=2',
            sEspecialParameter: "CODIGO",
            "aoColumns": [
                {
                    cssclass: 'required span12',
                    indicator: '<img src="./recursos/img/loading.svg">',
                    tooltip: 'Doble click para cambiar el periodo.',
                    loadtext: '<img src="./recursos/img/loading.svg">',
                    type: 'select',
                    data: function () {
                        var fuente = '';
                        $.ajax({
                            url: 'vistas/co/ajax/coldept.ashx?OPCION=1',
                            async: false,
                            data: { p_CTLG_CODE: $("#cboEmpresa").val() }
                        }).success(function (data) {
                            if (data === '') infoCustom2('Asegurese de tener Periodos Activos');
                            fuente = (data === '') ? null : data;
                        }).error(function (msg) {
                            alertCustom('Error al listar periodos activos.');
                        });
                        return fuente;
                    },
                    style: 'margin: 0px; text-align: center; padding: 3px;',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarRegistroVentas();
                            exito();
                        }, 10);
                    }
                },
                null, null, null, null, null, null, null, null, null, null, null,
                {
                    cssclass: 'required span12',
                    indicator: '<img src="./recursos/img/loading.svg">',
                    tooltip: 'Doble click para cambiar la operación.',
                    loadtext: '<img src="./recursos/img/loading.svg">',
                    type: 'select',
                    data: function () {
                        var fuente = '';
                        $.ajax({
                            url: 'vistas/co/ajax/coldept.ashx?OPCION=LISTAR_OPERA',
                            async: false,
                            data: { p_ACTIVO: 'S', p_COMPRA: 'S' }
                        }).success(function (data) {
                            if (data === '') infoCustom2('Asegurese de tener las operaciones activas');
                            fuente = (data === '') ? null : data;
                        }).error(function (msg) {
                            alertCustom('Error al listar las operaciones.');
                        });
                        return fuente;
                    },
                    style: 'margin: 0px; text-align: center; padding: 3px;',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarRegistroVentas();
                            exito();
                        }, 10);
                    }
                },
                null
            ]
        });
    };

    var cargaInicial = function () {
        setTimeout(function () { listarRegistroVentas(); }, 250);
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa(); 
            handleTable();
            cargaInicial();
        }
    };

}();

