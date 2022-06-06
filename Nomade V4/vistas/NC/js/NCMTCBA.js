function Crear() {

    var mensaje = "";

    var descripcion = $('#txtdescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();
    var moneda = $('#cboMoneda').val();
    var chequera = $('#chkChequera').is(':checked') ? 'S' : 'N';

    if (vErrors(["txtdescripcion", 'cboMoneda'])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTCBA.ASHX", {
            opcion: '2',
            descripcion: descripcion,
            estado: estado,
            usuario: usuario,
            MONEDA: moneda,
            CHEQUERA: chequera
        }, function (res) {
            Desbloquear("ventana");
            if (res !== "") {
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
                $("#txtCodigo").val(res);
                window.history.pushState("Object", "TIPOS DE CUENTAS BANCARIAS", "/Default.aspx?f=ncmtcba&codigo=" + res);
            } else {
                noexito();
            }
        });
    }
}

function Modificar() {

    var mensaje = '';

    var codigo = $('#txtCodigo').val();
    var descripcion = $('#txtdescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();
    var moneda = $('#cboMoneda').val();
    var chequera = $('#chkChequera').is(':checked') ? 'S' : 'N';

    if (vErrors(["txtdescripcion", 'cboMoneda'])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTCBA.ASHX",
            {
                opcion: '3',
                codigo: codigo,
                descripcion: descripcion,
                estado: estado,
                usuario: usuario,
                MONEDA: moneda,
                CHEQUERA: chequera
            },
            function (res) {
                if (res === "ok") {
                    exito();
                } else {
                    noexito();
                }
                Desbloquear("ventana");
            });
    }
}

var NCLTCBA = function () {

    var fillBandejaTCBancarias = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjTCBancarias').val());
        var parms = {
            responsive: true,
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
                    data: "Codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '10%');
                    }
                },
                { data: "Descripcion" },
                {
                    data: "DESC_MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '15%');
                    }
                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '15%');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '10%');
                    }
                }
            ]

        }

        oTableTCBancarias = iniciaTabla('tblTCBancarias', parms);
        $('#tblTCBancarias').removeAttr('style');

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">MONEDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">ESTADO</a>\
                    </div>');

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblTCBancarias').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

        $('#tblTCBancarias tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTCBancarias.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableTCBancarias.fnGetPosition(this);
                var row = oTableTCBancarias.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmtcba&codigo=' + codigo;
            }

        });

        $('#tblTCBancarias tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableTCBancarias.api(true).row($(this).parent().parent()).index();
            var row = oTableTCBancarias.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMTCBA.ASHX", { opcion: '4', code: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableTCBancarias.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableTCBancarias);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });

    }

    return {
        init: function () {
            fillBandejaTCBancarias();
        }
    };

}();

var NCMTCBA = function () {

    var cargarMonedas = function () {
        $.post("vistas/NC/ajax/NCMTCBA.ASHX?opcion=MONEDAS&CTGL_CODE=" + $('#ctl00_hddctlg').val(),
             function (data) {
                 $('#cboMoneda').html('');
                 if (data !== null && data !== '') {
                     for (var i = 0; i < data.length; i++) {
                         $('#cboMoneda').append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                     }
                 }
             });
    };

    var cargaInicial = function () {
        var code = ObtenerQueryString("codigo");
        if (code !== undefined) {
            Bloquear('ventana');
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMTCBA.ashx?opcion=1&code=" + code,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    $("#txtCodigo").val(datos[0].code);
                    $("#txtdescripcion").val(datos[0].Descripcion);
                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }
                    $('#cboMoneda').select2('val', datos[0].MONEDA).change();
                    if (datos[0].CHEQUERA_IND === 'S') {
                        $('#uniform-chkChequera span').removeClass().addClass("checked");
                        $('#chkChequera').prop('checked', true);
                    }
                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom('Error al buscar Tipo de Cuenta.');
                    Desbloquear('ventana');
                }
            });
        }
    }

    var plugins = function () {
        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "R", "repeat": 40, "greedy": false }); })
        $('#cboMoneda').select2();
    }

    return {
        init: function () {
            cargarMonedas();
            plugins();
            cargaInicial();
        }
    };
}();