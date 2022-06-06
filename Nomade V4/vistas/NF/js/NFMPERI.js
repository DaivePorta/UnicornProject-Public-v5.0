var NFLPERI = function () {

    var plugins = function () {

        $("#slcEmpresa").select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setStartDate', '-10y').keydown(function () { return false; });
    }
       
    var fillBandejaPer = function () {

        var parms = {
            data: null,
            //ordering: false,
            //responsive: true,
            //iDisplayLength: -1,
            ////"sDom": "t",
            //sDom: 'T<"clear">lfrtip',
            "paging": false,
            //"scrollY": "280px",
            //"searching": false,
            "info": false,
            ordering: false,
            iDisplayLength: -1,
            //"order": [[1, 'desc'], [4, 'asc']],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "CTLG_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "ANO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    visible: false
                }, {
                    data: "MES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    visible: false
                },
                 {
                     data: "NUMERO_MES",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     visible: false
                 }, {
                     data: "FECHA_CIERRE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "USUA_CIERRE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "FECHA_REAPERTURA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "USUA_REAPERTURA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "ESTADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')

                         if (rowData.ESTADO == "ABIERTO") {
                             $(td).attr("style", "background-color:#75D475")
                         }
                     }
                 }, {
                     data: "COEFICIENTE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: null,
                     defaultContent: '<a class="btn blue"><i class="icon-pencil"></i></a>',
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ],
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(1, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="12" style="BACKGROUND-COLOR: rgb(223, 223, 223);">' + group + '</td></tr>'
                        );
                        last = group;
                    }
                });
            },
        }
        oTable = iniciaTabla('tblperiodos', parms);

        $('#tblperiodos tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod = row.CODIGO;
            MostrarModificarCoeficiente(row.CTLG_CODE, row.COEFICIENTE, row.CODIGO);
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
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

      var eventoControles = function () {

        $('#btn_filtrar').on('click', function () {

            Bloquear("ventana")
            var oAnho = $("#optanho").val();
            setTimeout(function () {
                Lista_Periodos($("#slcEmpresa").val(), oAnho);
            }, 1000);
        });

        $("#txtCoeficiente").on('blur', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            } else {
                $(this).val("0.00");
            }
        }).on("click", function () {
            $(this).select();
        }).on('keyup', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            }
        });

        $("#btnModificar").on("click", function () {
            if (vErrors(['txtCoeficiente', 'txtPëriodo'])) {
                Modificar();
            }
        });
    }

    return {
        init: function () {
            plugins();           
            fillCboEmpresa();
            fillBandejaPer();
            Lista_Periodos($("#slcEmpresa").val(), $("#optanho").val());
            eventoControles();
        }
    };

}();

var Lista_Periodos = function (ctlg_code, anio) {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/NF/ajax/NFMPERI.ashx?OPCION=L&p_CTLG_CODE=" + ctlg_code + "&p_ANIO=" + anio,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {
                oTable.fnClearTable();
                oTable.fnAddData(datos);
            }
            else {
                //    alertCustom("Error listar periodos")
                oTable.fnClearTable();
            }
            Desbloquear("ventana");
        },
        error: function (msg) {
            alertCustom("Error listar periodos")
            Desbloquear("ventana");
        }
    });
}

var NFMPERI = function () {
    
    var eventoControles = function () {

        $('#btn_crear').on('click', function () {
            Grabar();
        });

        $('#btn_modal').on('click', function () {

            $("#PerNoExiste").modal("show")
        });
    }

    return {
        init: function () {
            eventoControles();

        }
    };
}();

var Grabar = function () {

    var data = new FormData();
    data.append("OPCION", "CR");
    Bloquear("ventana");
    $.ajax({
        url: "vistas/nf/ajax/NFMPERI.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                if (datos == "OK") { exito(); window.location.href = '?f=nflperi'; }
                if (datos == "E") { noexitoCustom("El periodo ya ha sido creado!") }
                
            } else { noexito(); }
            $("#PerNoExiste").modal("hide")
        },
        error: function (msg) {
            $("#PerNoExiste").modal("show")
            alertCustom("Error registrar")
            //alert(msg);
        }
    });
}

function MostrarModificarCoeficiente(CTLG_CODE, COEFICIENTE, CODIGO) {
    $("#hfCtlg").val(CTLG_CODE);
    $("#hfCod").val(CODIGO);
    $("#txtPëriodo").val(CODIGO);
    $("#txtCoeficiente").val(COEFICIENTE);
    $("#modalModificar").modal("show");
}

function Modificar() {
    var data = new FormData();
    data.append("OPCION", "4");
    data.append("p_ctlg", $("#hfCtlg").val());
    data.append("p_CODE", $('#hfCod').val());
    data.append("p_COEFICIENTE", $("#txtCoeficiente").val());

    Bloquear('modalModificar');
    $.ajax({
        url: "vistas/NC/ajax/NCMCEPE.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    }).success(function (datos) {
        if (datos == "OK") {
            exito();
            $("#modalModificar").modal("hide");
            Lista_Periodos($("#slcEmpresa").val(), $("#optanho").val());
        } else {
            noexitoCustom(datos)
        }
    }).error(function () {
        noexitoCustom("Error al Modificar!")
    }).complete(function () {
        Desbloquear('modalModificar');
    });
}
