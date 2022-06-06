
var GLLFIRM= function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboGirador').select2();
        $('#minfecha').datepicker();
        $('#maxfecha').datepicker();
        fnSetRangoDatePickerMesHoy('minfecha','maxfecha',true);
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
            url: "vistas/GL/ajax/GLMPROT.ashx?flag=4&empresa=" + $("#cboEmpresa").val() + "&tipo=P&estLetra=E",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].GIRADOR + '">' + datos[i].NGIRADOR + '</option>');
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
                { data: "NGIRADOR" },
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
                window.open('?f=GLMLETR&codigo=' + codigo + '&tipo=P', '_blank');
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
            url: "vistas/gl/ajax/GLMFIRM.ashx?flag=4&tipo=P&estLetra=E&empresa=" + empresa + "&girador=" + giradoA + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin,
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
            //fillTablaFirmaLetra();
        }
    }
}();



var GLMFIRM = function () {

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

    var fillTablaMFirmaLetra = function () {
        
        var parms = {
            data: null,
            columns: [
                {data: null,               
                       defaultContent: '  <input type="checkbox" class="aprobarChk" />',
                       createdCell: function (td, cellData, rowData, row, col) {      
                           $(td).children().addClass(rowData.CANJE);
                           $(td).attr('align', 'center')                       
                       }
                },
                { data: "NGIRADOR" },
                { data: "NUMERO" },
                { data: "MONTO" },
                { data: "NEMPRESA" },
                {
                    data: "FECHA_GIRO",
                    type: "fecha",
                    align: "center"
                },
                {
                    data: "FECHA_VENC",
                    type: "fecha",
                    align:"center"
                },
                { data: "NDESTINO" },
                { data: "CANJE" }

            ],
            stateSave: false,
            paginate: false

        }
        
        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style').css("border-collapse","collapse");
        
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

    var funcionalidad = function(){
       
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

        $("#grabarA").click(function () { CrearAprobacion('A'); });
        $("#grabarR").click(function () { CrearAprobacion('R'); });
    
    }

    var Cargar_tabla = function() {
        var empresa = $('#cbo_Empresa').val();
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMFIRM.ASHX?flag=3&tipo=P&estLetra=F&girador= &empresa=" + empresa,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                var json = datos;

                oTable.fnClearTable()

                if (json != null && json.length>0) {
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
            url: "vistas/GL/ajax/GLMFIRM.ASHX",
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
            fillTablaMFirmaLetra();
            Cargar_tabla();
            funcionalidad();
           
           
        }
    }
}();


