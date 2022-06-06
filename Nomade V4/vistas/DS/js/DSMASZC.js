var oTable;
var oTable2;

//TRANSACCIONES
function Asignar() {

    var continuar = false;
    if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'cboZona']))
    {
        continuar = true;
    }
    var lstInputs = $(".chkAsignar");
    var strDetalles = "";
    var c = 0;
    for (var i = 0; i < lstInputs.length; i++) {
        if ($(lstInputs[i]).is(":checked")) {
            c++;
            strDetalles += $(lstInputs[i]).attr("data-value")+"|";
        }
    }

    if (c<=0) {
        continuar = false;
        infoCustom2("Debe seleccionar al menos un registro de la tabla.");
    }

    if (continuar) {
        strDetalles = strDetalles.substr(0, strDetalles.length - 1);
        //alert(strDetalles);
        var data = new FormData();     
        //data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        //data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_DIRECCIONES', strDetalles);
        data.append('p_ZONA_CODE', $("#cboZona").val()); 
        data.append('p_TIPO_IND', "1");

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ds/ajax/DSMASZC.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos.length > 0) {
               if (datos[0].RESPUESTA == "OK") {
                   exito();                   
               } else {
                   infoCustom2(datos[0].RESPUESTA);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }
}

function DesAsignar() {

    var continuar = false;
    if (vErrors(['cboEmpresa', 'cboEstablecimiento'])) {
        continuar = true;
    }
    var lstInputs = $(".chkAsignar");
    var strDetalles = "";
    var c = 0;
    for (var i = 0; i < lstInputs.length; i++) {
        if ($(lstInputs[i]).is(":checked")) {
            c++;
            strDetalles += $(lstInputs[i]).attr("data-value") + "|";
        }
    }

    if (c <= 0) {
        continuar = false;
        infoCustom2("Debe seleccionar al menos un registro de la tabla.");
    }

    if (continuar) {
        strDetalles = strDetalles.substr(0, strDetalles.length - 1);
        //alert(strDetalles);
        var data = new FormData();
        //data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        //data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_DIRECCIONES', strDetalles);
        data.append('p_ZONA_CODE', $("#cboZona").val());
        data.append('p_TIPO_IND', "2");

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ds/ajax/DSMASZC.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos.length > 0) {
               if (datos[0].RESPUESTA == "OK") {
                   exito();                   
               } else {
                   infoCustom2(datos[0].RESPUESTA);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }
}

//--------LISTADO
var DSMASZC = function () {

    var plugins = function () {
        $("#cboEmpresa,#cboEstablecimiento,#cboZona").select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var fillCboZona = function () {
        $.ajax({
            type: "post",
            url: "vistas/ds/ajax/dsmzona.ashx?OPCION=3" +
            "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
            "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() + 
            "&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboZona').empty();
                $('#cboZona').append('<option></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboZona').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].NOMBRE + '</option>');
                    }
                }
                $('#cboZona').select2('val', '').change();
            },
            error: function (msg) {
                alertCustom("Zonas no se listaron correctamente");
            }
        });
    }
        
    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $("#cboEstablecimiento").on("change", function () {         
            fillCboZona();
        });

        $("#buscar").on("click", function () {
            Listar();
        });

        $("#grabar").on("click", function () {
            Asignar();
            Listar();
        });
    }

    var Listar = function () {
        if (vErrors(['cboEmpresa', 'cboEstablecimiento'])) {
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_TIPO_IND', "1");
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/ds/ajax/DSMASZC.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               oTable.fnClearTable();
               if (datos != null && datos.length > 0) {
                   oTable.fnAddData(datos);
                   oTable.fnAdjustColumnSizing();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "PIDM",
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
                    data: "CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DIRECCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "SECUENCIA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var valor = rowData.PIDM + "," + rowData.SECUENCIA
                        $(td).html('<input type="checkbox" class="chkAsignar" id="chkAsignar" name="chkNombre" data-value="'+valor+'" />');
                        //rowData.ESTADO_IND
                        $(td).attr('align', 'center')                       
                    }
                }               
            ]
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable.fnSetColumnVis(0, false, true);
        oTable.fnSetColumnVis(1, false, true);            
        
        $('#tblDatos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $($(this).children("td")[2]).children("input").attr("checked", false);
            }
            else {               
                $(this).addClass('selected');
                $($(this).children("td")[2]).children("input").attr("checked", true);
                //var pos = oTable.fnGetPosition(this);
                //var row = oTable.fnGetData(pos);
                //var code = row.CODIGO;
                //window.location.href = '?f=NVMMOAN&codigo=' + code;
            }
        });
     
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillCboZona();
            IniciaTabla();
            Listar();
        }
    };
}();

var DSLASZC = function () {

    var plugins = function () {
        $("#cboEmpresa,#cboEstablecimiento,#cboZona").select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var fillCboZona = function () {
        $.ajax({
            type: "post",
            url: "vistas/ds/ajax/dsmzona.ashx?OPCION=3" +
            "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
            "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboZona').empty();
                $('#cboZona').append('<option value="">TODOS</option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboZona').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].NOMBRE + '</option>');
                    }
                }
                $('#cboZona').select2('val', '').change();
            },
            error: function (msg) {
                alertCustom("Zonas no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $("#cboEstablecimiento").on("change", function () {
            fillCboZona();
        });

        $("#buscar").on("click", function () {
            Listar();
        });

        $("#grabar").on("click", function () {
            DesAsignar();
            Listar();
        });
    }

    var Listar = function () {
        if (vErrors(['cboEmpresa', 'cboEstablecimiento'])) {
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_ZONA_CODE', $("#cboZona").val());            
            data.append('p_TIPO_IND', "2");
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/ds/ajax/DSMASZC.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               oTable2.fnClearTable();
               if (datos != null && datos.length > 0) {
                   oTable2.fnAddData(datos);
                   oTable2.fnAdjustColumnSizing();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "PIDM",
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
                    data: "CTLG_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "SCSL_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "DIRECCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "ZONA_NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "NOMBRE_VENDEDOR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "SECUENCIA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var valor = rowData.PIDM + "," + rowData.SECUENCIA
                        $(td).html('<input type="checkbox" class="chkAsignar" id="chkAsignar" name="chkNombre" data-value="' + valor + '" />');
                        //rowData.ESTADO_IND
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTable2 = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable2.fnSetColumnVis(0, false, true);
        oTable2.fnSetColumnVis(1, false, true);

        //$('#tblDatos tbody').on('click', 'tr', function () {
        //    if ($(this).hasClass('selected')) {
        //        $(this).removeClass('selected');
        //        $($(this).children("td")[2]).children("input").attr("checked", false);
        //    }
        //    else {
        //        $(this).addClass('selected');
        //        $($(this).children("td")[2]).children("input").attr("checked", true);
        //        //var pos = oTable.fnGetPosition(this);
        //        //var row = oTable.fnGetData(pos);
        //        //var code = row.CODIGO;
        //        //window.location.href = '?f=NVMMOAN&codigo=' + code;
        //    }
        //});

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillCboZona();
            IniciaTabla();
            Listar();
        }
    };
}();
