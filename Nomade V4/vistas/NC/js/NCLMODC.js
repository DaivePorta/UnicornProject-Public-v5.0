var oTable;

var NCLMODC = function () {    
    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }    

    var obtenerModulos = function () {
        var data = new FormData();                       
        data.append('OPCION', 1);
        data.append('P_CODIGO', '');
       

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCLMODC.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                try {
                    oTable.fnClearTable();
                }
                catch (ex) { }

                if (!isEmpty(datos)) {
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();                    

                } else {
                    infoCustom2("No se han encontrado datos para mostrar"); //noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }

    var CambiarEstadoModulo = function (p_CODE, p_ESTADO) {

        if (p_ESTADO == 'ACTIVO') {
            var ESTADO = 'I'
        } else {
            var ESTADO = 'A'
        }

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCLMODC.ASHX?OPCION=7&P_CODIGO=" + p_CODE + "&P_ESTADO=" + ESTADO,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                exito();
                obtenerModulos();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a  class="btn green cambiarEstadoCC" title="Eliminar"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ],
            stateSave: false,            
            "paginate": true         
        };

        oTable = iniciaTabla('tblModulo', parms);
        oTable.fnSort([[0, "asc"]]);

        $('#tblModulo tbody').on('click', '.cambiarEstadoCC', function () {

            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            CambiarEstadoModulo(row.CODIGO, row.ESTADO);
        });

       
        $('#tblModulo tbody').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table = $('#tblModulo').dataTable();
                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.CODIGO;
                window.open("?f=NCMMODC&codigo=" + code, '_blank');
            }
        });

       
    }
 
    return {
        init: function () {            
            IniciaTabla();           
            obtenerModulos();
        }
    };
}();

var NCMMODC = function () {

    var plugins = function () {
        aMayuscula(":input");
        $("#slcEmpresa").select2();        
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());                    

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var listarDetalleModulos = function (p_CODE) {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCLMODC.ASHX?OPCION=5&P_CODIGO=" + p_CODE,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                try {
                    oTable.fnClearTable();
                }
                catch (ex) { }

                if (!isEmpty(datos)) {
                    console.log(datos);
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();

                } else {
                    //infoCustom2("No se han encontrado datos para mostrar"); //noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var EliminarDetalleModulo = function (p_CODE, p_CTLG) {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCLMODC.ASHX?OPCION=6&P_CODIGO=" + p_CODE + "&P_CTLG=" + p_CTLG,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                exito();
                listarDetalleModulos(p_CODE);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "VALOR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: null,
                    defaultContent: '<a  class="btn red eliminarCC" title="Eliminar"><i class="icon-trash"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ],
            stateSave: false,
            "paginate": true
        };

        oTable = iniciaTabla('tblDetalleNemo', parms);
        oTable.fnSort([[0, "asc"]]);

        $('#tblDetalleNemo tbody').on('click', '.eliminarCC', function () {

            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            EliminarDetalleModulo(row.CODIGO, row.CODIGO_EMPRESA);           
        });


    }

    function EventoControles() {       
        $("#btnGrabar").on("click", function () {

            if (vErrors(["txtNombre"])) {
                var P_NOMBRE = $('#txtNombre').val();
                var P_DESCRIPCION = $('#txtDescripcion').val();
                var P_USUARIO = $('#ctl00_txtus').val();

                var data = new FormData();
                data.append('OPCION', '2');
                data.append('P_NOMBRE', P_NOMBRE);
                data.append('P_DESCRIPCION', P_DESCRIPCION);
                data.append('P_USUARIO', P_USUARIO);

                Bloquear('ventana');
                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCLMODC.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    success: function (response) {
                        $('#txtCodigo').val(response)
                        $('#btnGrabar').attr("style", "display:none");
                        $('#estado').attr("style", "display:inline");
                        $('#divNemo').attr("style", "display:inline");
                        $('#btnActualizar').attr("style", "display:inline");
                        exito();
                        Desbloquear('ventana');
                    }
                });
            }            
        });       

        $("#btnActualizar").on("click", function () {
            if (vErrors(["txtNombre, txtCodigo"])) {
                var P_CODIGO = $('#txtCodigo').val();
                var P_NOMBRE = $('#txtNombre').val();
                var P_DESCRIPCION = $('#txtDescripcion').val();
                var P_USUARIO = $('#ctl00_txtus').val();
                var P_ESTADO = $("#chkEstado").is(':checked') ? 'A' : 'I';

                var data = new FormData();
                data.append('OPCION', '3');
                data.append('P_CODIGO', P_CODIGO);
                data.append('P_NOMBRE', P_NOMBRE);
                data.append('P_DESCRIPCION', P_DESCRIPCION);
                data.append('P_ESTADO', P_ESTADO);
                data.append('P_USUARIO', P_USUARIO);

                Bloquear('ventana');
                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCLMODC.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    success: function (response) {
                        if (response == 'OK') {
                            exito();
                            Desbloquear('ventana');
                        } else {
                            infoCustom2('Error al actualizar modulo.');
                            Desbloquear('ventana');
                        }

                    }
                });
            }           
        });    
        
        $("#btnAddNemo").on("click", function () {
            if (vErrors(["txtValor"])) {
                
                var P_CODIGO = $('#txtCodigo').val();
                var P_CTLG = $('#slcEmpresa').val();
                var P_VALOR = $('#txtValor').val();

                if (P_VALOR.length < 3) {
                    infoCustom2('El valor ingresado debe ser de 3 digitos.');
                } else {
                    var data = new FormData();
                    data.append('OPCION', '4');
                    data.append('P_CODIGO', P_CODIGO);
                    data.append('P_CTLG', P_CTLG);
                    data.append('P_VALOR', P_VALOR);

                    Bloquear('ventana');
                    $.ajax({
                        type: "POST",
                        url: "vistas/NC/ajax/NCLMODC.ASHX",
                        contentType: false,
                        data: data,
                        processData: false,
                        async: false,
                        success: function (response) {
                            if (response == 'OK') {
                                exito();
                                $('#txtValor').val('');
                                listarDetalleModulos(P_CODIGO);
                                Desbloquear('ventana');
                            } else {
                                infoCustom2('Ocurrio un error al registrar.');
                                Desbloquear('ventana');
                            }

                        }
                    });
                }                
            }
        });    

    };

    var cargainicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null && cod != "") {
            if (cod != null && cod != "") {
                $('#btnGrabar').attr("style", "display:none");
                $('#estado').attr("style", "display:inline");
                $('#divNemo').attr("style", "display:inline");
                $('#btnActualizar').attr("style", "display:inline");

                var data = new FormData();
                data.append('OPCION', 1);
                data.append('P_CODIGO', cod);


                Bloquear("ventana");
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCLMODC.ashx",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                })
                    .success(function (datos) {                       
                        $("#txtCodigo").val(datos[0].CODIGO);
                        $("#txtNombre").val(datos[0].NOMBRE);
                        $("#txtDescripcion").val(datos[0].DESCRIPCION);
                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        } else {

                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }
                        listarDetalleModulos(cod);
                        Desbloquear("ventana");
                    })
                    .error(function () {
                        Desbloquear("ventana");
                        noexito();
                    });

            }

        }

    }

    return {
        init: function () {    
            plugins();
            fillCboEmpresa();
            IniciaTabla();
            EventoControles();  
            cargainicial();
        }
    };
}();