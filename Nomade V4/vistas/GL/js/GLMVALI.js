
var GLLVALI = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboGirador').select2();
        $('#minfecha').datepicker();
        $('#maxfecha').datepicker();
    }

    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

    };

    var fillCboGirador = function () {
        var selectEst = $('#cboGirador');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option value="TODOS">TODOS</option>');
        $('#cboGirador').select2('val', 'TODOS');
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMPROT.ashx?flag=4&empresa=" + $("#cboEmpresa").val() + "&tipo=C&estLetra=E",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].GIRADOA + '">' + datos[i].NGIRADOA + '</option>');
                    }
                }
                $('#cboGirador').select2('val', 'TODOS');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            fillCboGirador();
        });

        $("#btnBuscar").on("click", function () {
            console.log('cxbgcdh');
            let fechaIni = $("#minfecha").val();
            let fechaFin = $("#maxfecha").val();

            if (fechaIni.trim() == "" && fechaFin.trim() == "") {
                fillTablaLetra();
            } else if (fechaIni.trim() != "" && fechaFin.trim() != "") {
                fillTablaLetra();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });
    }

    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: json,
            columns: [
                { data: "NGIRADOA" },
                { data: "NUMERO" },
                { data: "MONTO" },
                { data: "EMPRESA.NOMBRE" },
                {
                    data: { _: "FECHA_GIRO.display", sort: "FECHA_GIRO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_VENC.display", sort: "FECHA_VENC.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "USUARIO" }
            ],
            "sDom": 'C<"clear">lfrtip',
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.open('?f=glmletr&tipo=C&codigo=' + codigo, '_blank');
            }
        });
    }

    var fillTablaLetra = function () {
        let empresa = $('#cboEmpresa').val();
        let giradoA = ($("#cboGirador").val() == "TODOS") ? '' : $("#cboGirador").val();
        let fechaIni = $('#minfecha').val();;
        let fechaFin = $('#maxfecha').val();;

        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/GLMVALI.ashx?flag=4&tipo=C&estLetra=E&empresa=" + empresa + "&girador=" + giradoA + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos != null)
                    oTable.fnAddData(datos);
                else
                    infoCustom("No se encontraron registros.");
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            fillCboGirador();
            creaTablaVacia();
            fillTablaLetra();
            //fillTablaVALIaLetra();
        }
    }
}();



var GLMVALI = function () {

    var oCodigosSeleccionados = new Array();

    var plugins = function () {
        $('#cbo_Empresa').select2();
    }

    var fillCboEmpresa = function () {
        var select = $('#cbo_Empresa').select2('destroy');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNVMDOCV");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $(select).empty();
                    $(select).append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNVMDOCV", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $(select).append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '" data-pidm="' + datos[i].PIDM + '" direccion="' + datos[i].DIRECCION + '" ruc="' + datos[i].RUC + '" ruta="' + datos[i].RUTA_IMAGEN + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $(select).val($('#ctl00_hddctlg').val());
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente.");
                }
            });
        }
        else {
            $(select).empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $(select).append('<option value="' + dPermanente[i].CODIGO + '" agente-reten-ind="' + dPermanente[i].AGENTE_RETEN_IND + '" data-pidm="' + dPermanente[i].PIDM + '" direccion="' + dPermanente[i].DIRECCION + '" ruc="' + dPermanente[i].RUC + '" ruta="' + dPermanente[i].RUTA_IMAGEN + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
            $(select).val($('#ctl00_hddctlg').val());
        }
        $(select).select2();
    }

    var eventoControles = function () {
        $('#cbo_Empresa').on('change', function () {
            Cargar_tabla();
        });
    }

    var fillTablaMVALIaLetra = function () {

        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: '  <input type="checkbox" class="aprobarChk" />',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).children().addClass(rowData.CANJE);
                        $(td).attr('align', 'center')

                    }
                },
                { data: "NGIRADOA" },
                {
                    data: "NFIRMANTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).addClass('firmante').attr("style", "color: blue;cursor: -webkit-zoom-in;");
                    }
                },
                {
                    data: "NAVALISTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).addClass('aval').attr("style", "color: blue;cursor: -webkit-zoom-in;");
                    }
                },
                { data: "NUMERO" },
                { data: "NMONEDA", align: "center" },
                { data: "MONTO", type: "formatoMiles" },
                {
                    data: "FECHA_GIRO",
                    type: "fecha",
                    align: "center"
                },
                {
                    data: "FECHA_VENC",
                    type: "fecha",
                    align: "center"
                },
                { data: "NDESTINO" },
                { data: "CANJE", align: "center" }


            ],
            stateSave: false,
            paginate: false

        }
        
        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style').css("border-collapse", "collapse");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                //  window.open('?f=glmletr&codigo=' + codigo, '_blank');
            }

        });
    }

    var funcionalidad = function () {

        $('#tblBandeja tbody').on('click', '.aprobarChk', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);
            var codigo = row.CODIGO;
            var canje = row.CANJE;
            if (canje !== "") {
                codigo = canje;

            }

            if ($(this).is(":checked")) {
                if (canje !== "") {
                    $("input.aprobarChk." + canje).attr("checked", true);
                }
                oCodigosSeleccionados.push(codigo);
            } else {
                if (canje !== "") {
                    $("input.aprobarChk." + canje).attr("checked", false);
                }
                let indice = oCodigosSeleccionados.indexOf(codigo);
                oCodigosSeleccionados.splice(indice, 1);
            }
        });

        $('#tblBandeja tbody').on('click', '.firmante', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);
            var codigo = row.FIRMANTE;
            VerDNIPersona(codigo);
        });

        $('#tblBandeja tbody').on('click', '.aval', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);
            var codigo = row.AVALISTA;
            VerDNIPersona(codigo);
        });

        $("#grabarA").click(function () { CrearAprobacion('A');});
        $("#grabarR").click(function () { CrearAprobacion('R');});
        
    }

    var cargarImagenes = function(PIDM) {

        $.ajax({
            type: "GET",
            url: "vistas/NC/ajax/NCMRDNI.ASHX",
            data: {
                flag: 2,
                codigo: PIDM
            },
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success:
            function (datos) {
                if (datos == null) { alertCustom("Sin Documento de Identidad Registrado"); }
                else {
                    $("#imganverso").attr("src", (datos[0].RUTA_ANVERSO == "" ? imagenVacia : datos[0].RUTA_ANVERSO));

                    $("#imgreverso").attr("src", (datos[0].RUTA_REVERSO == "" ? imagenVacia : datos[0].RUTA_REVERSO));

                    $("#InfoDNIPersona").modal('show');
                }
            },
            error: function () { }
        });


    }

    var VerDNIPersona = function(pidm) {

        var cuerpo = '<div class="row-fluid">' +
            '      <ul class="thumbnails">' +
            '           <li class="span6">' +
            '                <h4>Anverso</h4>' +
            '                   <img id="imganverso" style="max-height:200px;" class="thumbnail" src="data:image/gif;base64,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" alt="" />' +
            '           </li>' +
            '           <li class="span6">' +
            '                <h4>Reverso</h4>' +
            '                <img id="imgreverso" style="max-height:200px;" class="thumbnail" src="data:image/gif;base64,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" alt="" />' +
            '           </li>' +
            '         </ul>' +
            '</div>';
        var titulo = "DNI";

        crearmodal("InfoDNIPersona", titulo, cuerpo);
        cargarImagenes(pidm);

    }
    
    var Cargar_tabla = function() {
        var empresa = $('#cbo_Empresa').val();
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMVALI.ASHX?flag=3&tipo=C&estLetra=F&girador= &empresa=" + empresa,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                var json = datos;

                oTable.fnClearTable()

                if (json.length>0) {
                    oTable.fnAddData(json);
                } else {
                    infoCustom2("No se encontraron registros.");
                }
            }
        });

    }

    var CrearAprobacion = function(funcion) {

        var p_codi = oCodigosSeleccionados.join("|");
        var p_user = $('#ctl00_lblusuario').html();
        var v_flag = funcion == 'A' ? 1 : 2;

        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMVALI.ASHX",
            data: {
                flag: v_flag,
                codigo: p_codi,
                usuario: p_user,
                empresa: $('#cbo_Empresa').val()
            },
            beforeSend: function () { Bloquear("ventana"); },
            async: false,
            success: function (res) {
                if (res == "OK") {
                    exito();
                    Cargar_tabla();
                } else {
                    noexito();
                }
            },
            complete: function () { oCodigosSeleccionados = new Array(); Desbloquear("ventana"); }
        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            fillTablaMVALIaLetra();
            Cargar_tabla();
            funcionalidad();


        }
    }
}();


