var sException = "";
var oTableCCContable;
var CTLCLCC = function () {

    var iniciaTablaClase = function () {

        if (typeof oTableCCContable != "undefined") {
            oTableCCContable.fnClearTable();
        }
        var parms = {
            data: null,
            order: [[0, 'asc']],
            info: true,
            paging: true,
            iDisplayLength: 5,
            columns: [
                {
                    data: "CodClaseCuenta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }

                },
                {
                    data: "cCodigoSunat",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }

                },
                {
                    data: "cDescripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }

                },
                {
                    data: "cDescripcionCorta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }

                },
                {
                    data: "iNumeracion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }

                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                        if (cellData === "A")
                            $(td).html("ACTIVO");
                        else
                            $(td).html("INACTIVO");
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
        oTableCCContable = iniciaTabla("tblCCContable", parms);

        $('#tblCCContable tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCCContable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCCContable.fnGetPosition(this);
                var row = oTableCCContable.fnGetData(pos);
                if (row != null) {
                    var sCodClaseCuenta = row.CodClaseCuenta;
                    window.location.href = '?f=CTMCLCC&sCodClaseCuenta=' + sCodClaseCuenta;
                }
            }
        });

        $('#tblCCContable tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableCCContable.api(true).row($(this).parent().parent()).index();
            var row = oTableCCContable.fnGetData(pos);
            var sCodClaseCuenta = row.CodClaseCuenta;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/CT/ajax/CTMCLCC.ASHX", { sOpcion: "4", sCodClaseCuenta: sCodClaseCuenta },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null || res != "") {
                        oTableCCContable.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableCCContable);
                        exito();
                    } else {
                        noexito();
                    }
                });
            $.ajaxSetup({ async: true });
        });
    }

    var listaClaseCtaCont = function () {
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCLCC.ashx?sOpcion=3",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                oTableCCContable.fnClearTable();
                oTableCCContable.fnAddData(datos);
            },
            error: function (result) {
                noexitoCustom("Error al obtener lista de Clases de Cuentas Contables");
            }
        });
    }


    return {
        init: function () {
            iniciaTablaClase();
            listaClaseCtaCont();
        }
    };

}();

var CTMCLCC = function () {

    var plugins = function () {

        $('#txtCodigoSunat').on('focus', function () {
            $('#txtCodigoSunat').inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        });

        $('#txtClaseCuenta').on('focus', function () {
            $('#txtClaseCuenta').inputmask({ "mask": "%", "repeat": 120, "greedy": false });
        });

        $('#txtNombreCorto').on('focus', function () {
            $('#txtNombreCorto').inputmask({ "mask": "%", "repeat": 20, "greedy": false });
        });

        $('.danger-toggle-button-custom').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "SI",
                disabled: "NO"
            }
        });

    }

    var cargaInicial = function () {

        var sCodClaseCuenta = ObtenerQueryString("sCodClaseCuenta");

        if (typeof (sCodClaseCuenta) !== "undefined") {
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMCLCC.ashx?sOpcion=3&sCodClaseCuenta=" + sCodClaseCuenta,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        var oClaseCuenta = {};
                        oClaseCuenta = JSON.parse(datos);
                        $("#txtcodigoClaseCuenta").val(oClaseCuenta[0].CodClaseCuenta);
                        $('#txtCodigoSunat').val(oClaseCuenta[0].cCodigoSunat);
                        $('#txtClaseCuenta').val(oClaseCuenta[0].cDescripcion);
                        $('#txtNombreCorto').val(oClaseCuenta[0].cDescripcionCorta);
                        $('#txtNumeracion').val(oClaseCuenta[0].iNumeracion);

                        if (oClaseCuenta[0].Estado == "A") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true).change();
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }
                        
                        if (oClaseCuenta[0].UsaCentroCosto == "S") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkCentroCosto').attr('checked', true).change();
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkCentroCosto').attr('checked', false);
                        }

                        if (oClaseCuenta[0].GeneraDestino == "S") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkGeneraDest').attr('checked', true).change();
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkGeneraDest').attr('checked', false);
                        }


                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    }

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
            cargaInicial();
        }
    };
}();

function Grabar() {
    if (!vErrors(["txtCodigoSunat", "txtClaseCuenta", "txtNombreCorto", "txtNumeracion"])) {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
        return;
    }

    var sCodClaseCuenta = $("#txtcodigoClaseCuenta").val().trim();
    var sOpcion = "1"; // sOpcion = "1": Nuevo
    if (sCodClaseCuenta !== "")
        sOpcion = "2"; // sOpcion = "2": Editar

    var data = new FormData();
    data.append("sOpcion", sOpcion);
    data.append("sCodClaseCuenta", sCodClaseCuenta);
    data.append("sCodigoSunat", $("#txtCodigoSunat").val().trim());
    data.append("sDescripcion", $("#txtClaseCuenta").val().trim());
    data.append("sDescripcionCorta", $("#txtNombreCorto").val().trim());
    data.append("nNumeracion", $("#txtNumeracion").val().trim());

    data.append("sEstado", ($("#chkEstado").is(":checked")) === true ? "A" : "I");
    data.append("sUsaCentroCosto", ($("#chkCentroCosto").is(":checked")) === true ? "S" : "N");
    data.append("sGeneraDestino", ($("#chkGeneraDest").is(":checked")) === true ? "S" : "N");

    Bloquear("ventana");
    sException = "";
    $.ajax({
        url: "vistas/CT/ajax/CTMCLCC.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        success: function (response) {
            Desbloquear("ventana");
            if (response === "") {
                noexito();
                return;
            }
            if (response.indexOf("[Advertencia]:") > -1) {
                alertCustom(response);
                return;
            }
            if (response.indexOf("[Error]:") > -1) {
                sException = response;
                alertCustom("La Cuenta no se registró.");
                return;
            }
            if (sOpcion === "1") {
                $("#txtcodigoClaseCuenta").val(response);
            }
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            exito();
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexito(msg);
        }
    });

}