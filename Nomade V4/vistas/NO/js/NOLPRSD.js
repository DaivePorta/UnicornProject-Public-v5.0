
var NOLPRSD = function () {

    var flagTb = false;

    var plugins = function () {
        $('#cboEstado').select2();
        $("#txtFechaIni").datepicker();
        $("#txtFechaFin").datepicker();


    }
    function listar() {
        var cod = ObtenerQueryString("codigo");
        if (cod !== undefined) {
            Bloquear("div");
            $.ajax({
                type: "POST",
                url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=4&p_CODIGO=" + cod + "&P_ESTADO=" + '',
                async: false,
                success: function (datos) {
                    Desbloquear("div");
                    if (datos != null && datos != "" && datos != "[+]") {

                        //var json = $.parseJSON(datos)
                        //oTablelistar.fnClearTable();
                        //oTablelistar.fnAddData(json)

                        var json = $.parseJSON(datos)
                        llenaTabla(json);
                    }
                    else {
                        //oTablelistar.fnClearTable();


                    }
                },
                error: function (msg) {
                    Desbloquear("div");
                    alert(msg);

                }
            });
        }
    }
    var ic = 0;

    function llenaTabla(datos) {
        var parms = {
            data: datos,
            columns: [
                {
                    data: "CODE_DETALLE_ORDFLU",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "CODE_SOLICTUD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "ITEM",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }

                ,
                {
                    data: "CANTIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "FASE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                      
            ]

        }

        oTableitem = iniciaTabla('items', parms);

    }

    var cargaInicial = function ()
    {
        var cod = ObtenerQueryString("codigo");
        if (cod != undefined) {
            Bloquear("div");
            $.ajax({
                type: "POST",
                url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=3&CTLG_CODE=" + '' + "&p_ESTABLECIMIENTO=" + '' + "&P_ESTADO=" + '' + "&p_CODIGO=" + cod,
                async: false,
                success: function (datos) {
                    Desbloquear("div");
                    if (datos != null && datos != "" && datos != "[+]") {

                        var json = $.parseJSON(datos)
                        
                        $('#txtRequi').val(json[0].CODIGO)
                        $('#txtproducto').val(json[0].PRODUCTO)
                        $('#txtTotal').val(json[0].TOTAL)
                        $('#cboEstado').val(json[0].ESTADO)
                        $('#txtFase').val(json[0].FASE)
                        $('#txtFechaRegistro').val(json[0].FECHAREGISTRO)
                        $('#txtFechaIni').val(json[0].FECHAINI)
                        $('#txtFechaFin').val(json[0].FECHAFIN)
                        $('#txtGlosa').val(json[0].GLOSA)
                        $('#txtunidad').val(json[0].UNIDMEDIDAD)

                        $('#cboEstado').attr('disabled', true)

                        $('#txtFechaIni').attr('disabled', true)
                        $('#txtFechaFin').attr('disabled', true)
                        $('#txtunidad').attr('disabled', true)
                        $('#txtRequi').attr('disabled',true)
                        $('#txtproducto').attr('disabled', true)
                        $('#txtTotal').attr('disabled', true)
                        $('#txtFase').attr('disabled', true)
                        $('#txtFechaRegistro').attr('disabled', true)
                        $('#txtGlosa').attr('disabled', true)

                    }
                    else {
                        alertCustom("Error")


                    }
                },
                error: function (msg) {
                    Desbloquear("div");
                    alert(msg);

                }
            });

        }
        else {

        }

    }




    var eventoControles = function () {

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
            //llenaTabla();
            cargaInicial();
            eventoControles();
            listar();


        }
    };

}();






