
var NOLPRSP = function () {

    var flagTb = false;

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();


    }
    function listar() {

        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=3&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&P_ESTADO=" + 'A' + "&p_CODIGO="+'',
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    oTablelistar.fnClearTable();
                    oTablelistar.fnAddData(json)

                }
                else {
                    oTablelistar.fnClearTable();
                    
                    
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }
    var ic = 0;


    function tablaVacia() {
        var parms = {
            data: null,
            order: [[0, 'desc']],
            columns: [
                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },


                 {
                     data: "TOTAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "FECHAINI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
               ,
                {
                    data: "FECHAFIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }




            ]

        }

        $('#detalle').dataTable().fnDestroy();

        oTablelistar = iniciaTabla('detalle', parms);



        





    }


    function llenaTabla(datos) {
        var parms = {
            data: datos,
            order: [[0, 'desc']],
            columns: [
                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },


                 {
                     data: "TOTAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "FECHAINI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
               ,
                {
                    data: "FECHAFIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }




            ]

        }

        $('#detalle').dataTable().fnDestroy();

        oTablelistar = iniciaTabla('detalle', parms);

    }

    function funcionalidaTabla() {
        $('#detalle tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablelistar.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablelistar.fnGetPosition(this);
                var row = oTablelistar.fnGetData(pos);
                var cod = row.CODIGO;


                window.location.href = '?f=NOMPRSD&codigo=' + cod;
            }
        });
    }

    var eventoControles = function () {
        $('#cboEmpresas').on('change', function () {
            listar();
        });

        $('#cboEstablecimiento').on('change', function () {
            listar();
        });
        $('#guardar').click(function () {
            if (DateDiff(new Date(ConvertirDate($('#txtFechaFin').val())), new Date(ConvertirDate($('#txtFechaInicio').val()))) <= 0) {
                alertCustom("La Fecha Fin  debe ser mayor a la Fecha de Inicio");
            }
            else {

                if (seleccionados.length > 0) {

                    if (seleccionados.length == 1) {
                        var obj = seleccionados[0];

                        $('#hdproducto').val(obj.valor);
                    }


                    var ik;
                    var ij = 0;
                    for (ik = 0; ik < seleccionados.length ; ik++) {
                        var obj = seleccionados[ik];
                        if (obj.valor == $('#hdproducto').val()) {
                            ij = ij + 1;
                            alert(obj.valor);
                        }
                        else {

                            alert("error" & obj.valor);
                        }
                    }


                    if (ij == seleccionados.length) {
                        var datos = recorrido()
                        alert(datos)
                        registrar()
                    }
                    else {
                        alertCustom("Seleccione items del mismo producto.")
                    }

                    //for (i in seleccionados)
                    //{
                    //    alert(seleccionados[i].arguments(index));
                    //    if ($('#hdproducto').val() == seleccionados[i].arguments(index)) {
                    //        //registrar()
                    //        var datos = recorrido()
                    //        alert(datos)

                    //    }
                    //    else {
                    //        alertCustom("Seleccione items del mismo producto.")
                    //        return;
                    //    }

                    //}


                }
                else {
                    alertCustom("Seleccione un item.")
                }


            }

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

                    //Iniciar valores con valores de login
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                    fillCboEstablecimiento();

                    listar();


                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
                //selectEst.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        $('#cboEstablecimiento').select2('destroy').select2();
    };


    return {
        init: function () {


            plugins();
            llenaTabla();
            fillCboEmpresa();
            eventoControles();
            funcionalidaTabla();
   

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

                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                fillCboEstablecimiento();




            }



        },
        error: function (msg) {
            alert(msg);
        }
    });
}


var fillCboEstablecimiento = function () {
    var selectEst = $('#cboEstablecimiento');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.empty();

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
            }

        },
        error: function (msg) {
            alert(msg.d);
        }
    });
    $('#cboEstablecimiento').select2('destroy').select2();
};

var limpiar = function () {
    $('#txtcodprod').val("");
    $('#txtdescprod').val("");
    $('#txtUnidad').val("");
    $('#txtcant').val("");

}

