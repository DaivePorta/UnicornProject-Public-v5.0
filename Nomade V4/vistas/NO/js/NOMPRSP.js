var seleccionados = []
var hiden = 0;
var NOMPRSP = function () {

    var flagTb = false;

    var plugins = function () {
        $('#cboArea').select2();
        $('#cboSeccion').select2();
        $('#cboProceso').select2();
        $('#cboActividad').select2();
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();

        $('#cboRque').select2();
        $('#cbPrioridad').select2();
        $("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });

        $('.fecha').datepicker();

        $('.fecha').datepicker("setDate", "now");
    }

    function listar() {
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=9&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&P_CABEUSUARIO=" + '',
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null && datos != "" && datos != "[+]") {
                    var json = $.parseJSON(datos)
                    oTabledetalle.fnClearTable()
                    oTabledetalle.fnAddData(json)
                }
                else {
                    oTabledetalle.fnClearTable()
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    var ic = 0;
    var funcionalidadTabla = function () {
        $('#detalle tbody').on('click', '.detDoc', function () {

            var pos = oTabledetalle.api(true).row($(this).parents("tr")[0]).index();
            var row = oTabledetalle.fnGetData(pos);

            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];

            if (oTabledetalle.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTabledetalle.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTabledetalle.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTabledetalle.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
                Bloquear("ventana");
                $.ajax({
                    type: "POST",
                    url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=1&CODIGO=" + id + "&P_ESTADO=" + '2',
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        var str = "";
                        var resb = "";
                        ic = ic + 1
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + ic + "' class='display DTTT_selectable tblBandejaDetalleFd' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>CODIGO</th>";
                            resb += "<th>ITEM</th>";
                            resb += "<th>CODE. PRODUCTO</th>";
                            resb += "<th>DESC. PRODUCTO</th>";
                            resb += "<th>CANT. APROBADA</th>";
                            resb += "<th>UND. MEDIDA</th>";
                            resb += "<th>ATENDER</th>";
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + ic, $.parseJSON(datos));
                        }


                    }
                });

            }

        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
    }

    function cargatablavaciaDetalleF(id, json) {
        oTableDeudasDetalle = iniciaTabla(id, {
            data: json,
            scrollX: true,
            order: [[1, 'desc']],
            columns: [

                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },

                 {
                     data: "ITEM",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },
                 {
                     data: "CODE_PRODUCTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },

                 {
                     data: "DESCP",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },
                 {
                     data: "CANTIDAD_APROBADA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },



                {
                    data: "UNIDAM",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                }
                ,
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                        hiden = hiden + 1;
                        var idex = hiden - 1;
                        //var index = id.split('tblBandejaDetalleF').join("")
                        //var hiden = hiden - 1

                        $(td).html("<input type='checkbox' id=ch_" + rowData.CODIGO + " class='chek' name='ver' /> <input type='hidden' value=" + idex + " id=hd" + idex + " />");

                        $(td).children(".chek").click(function () {

                            var cod = $("#ch_" + rowData.CODIGO + "").parent().parent().children().eq(2).text()
                            if ($("#ch_" + rowData.CODIGO + "").is(":checked")) {
                                var pos = $("#hd" + idex + "").val()
                                //seleccionados.push(cod);
                                seleccionados.push({ "index": "" + pos + "", "valor": "" + cod + "" });
                                $('#hdproducto').val(cod);
                            }
                            else {

                                var pos = $("#hd" + idex + "").val();
                                seleccionados.filter(function (d, e) { if (d.index == pos) { seleccionados.splice(e, 1) } })
                                var codd = recorridocheck();
                                if (codd == 0) {
                                    $('#hdproducto').val("");
                                }
                                else { $('#hdproducto').val(codd); }


                            }



                        });
                    }
                }


            ],
            "paging": false,
            scrollCollapse: true,
            //  sort: false,
            "sDom": "t"

        });




    }

    function llenaTabla() {
        var parms = {
            data: [],
            order: [[0, 'desc']],
            scrollX: true,
            columns: [
                 {
                     data: null,
                     defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                     createdCell: function (td, cellData, rowData, row, col) {

                         $(td).attr('align', 'center')

                     }
                 },
                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "IND_CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },


                 {
                     data: "CLIENTE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "TIPOREQUE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
               ,
                {
                    data: "PRIORIDAD",
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

        oTabledetalle = iniciaTabla('detalle', parms);








    }

    var eventoControles = function () {
        $('#cboEmpresas').on('change', function () {
            fillCboEstablecimiento();
            listar();
        });

        $('#cboEstablecimiento').on('change', function () {
            listar();
        });

        $('#guardar').click(function () {
            var neroDias = DateDiff(new Date(ConvertirDate($('#txtFechaFin').val())), new Date(ConvertirDate($('#txtFechaInicio').val())))
            if (parseInt(neroDias) < 0) {
                alertCustom("La Fecha Fin  debe ser mayor a la Fecha de Inicio");
                return;
            } else {
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
                        } else {
                            alertCustom("error" & obj.valor);
                        }
                    }
                    if (ij == seleccionados.length) {
                        var datos = recorrido()
                        registrar();
                    } else {
                        alertCustom("Seleccione items del mismo producto.")
                    }
                } else {
                    alertCustom("Seleccione un item.")
                }
            }
        });
    }

    function registrar() {
        var tablas = recorrido();
        var cantidadTotal = recorridoTotal();
        var data = new FormData;

        data.append('p_CATALOGO', $('#cboEmpresas').val());
        data.append('P_SURCURSAL', $('#cboEstablecimiento').val());
        data.append('P_FECHAINI', $('#txtFechaInicio').val());
        data.append('P_FECHAFIN', $('#txtFechaFin').val());
        data.append('p_GLOSA', $('#txtGlosa').val());
        data.append('P_PRODUCTO', $('#hdproducto').val());
        data.append('P_TOTAL', cantidadTotal);
        data.append('P_TXT', tablas);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana")
                seleccionados = [];
                listar();
                exito();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function recorridocheck() {

        var chc = "";
        var datos_tabla = '';
        var datos_fila = '';
        var id = 0;
        //$($('#detalle tbody').children().find('.tblBandejaDetalleFd tbody').children().find('td').eq(4).children()[0]).attr('id')
        //$('#detalle tbody').children().find('tr').eq(1).children().each(function (i) {
        $('#detalle tbody').children().find('.tblBandejaDetalleFd tbody').children().each(function (i) {

            var codigos;

            codigos = $($(this).find('td').eq(6).children()[0]).attr('id');

            if ($("#" + codigos + "").is(":checked")) {
                id = $("#" + codigos + "").parent().parent().children().eq(2).text();

            }

        });
        return id;


    }

    function recorridoTotal() {
        var chc = "";
        var cantidad = 0;
        var total = 0;
        var datos_tabla = '';
        var datos_fila = '';
        //$($('#detalle tbody').children().find('.tblBandejaDetalleFd tbody').children().find('td').eq(4).children()[0]).attr('id')
        //$('#detalle tbody').children().find('tr').eq(1).children().each(function (i) {
        $('#detalle tbody').children().find('.tblBandejaDetalleFd tbody').children().each(function (i) {

            var codigos;
            var id = "";
            codigos = $($(this).find('td').eq(6).children()[0]).attr('id');

            if ($("#" + codigos + "").is(":checked")) {
                cantidad = $("#" + codigos + "").parent().parent().children().eq(4).text();
                total = parseFloat(total) + parseFloat(cantidad);

            }


            //chc += codigos;


        });

        return total;



    }

    function recorrido() {
        var chc = "";
        var datos_tabla = '';
        var datos_fila = '';
        //$($('#detalle tbody').children().find('.tblBandejaDetalleFd tbody').children().find('td').eq(4).children()[0]).attr('id')
        //$('#detalle tbody').children().find('tr').eq(1).children().each(function (i) {
        $('#detalle tbody').children().find('.tblBandejaDetalleFd tbody').children().each(function (i) {

            var codigos;
            var id = "";
            codigos = $($(this).find('td').eq(6).children()[0]).attr('id');

            if ($("#" + codigos + "").is(":checked")) {

                id = $("#" + codigos + "").parent().parent().children().eq(0).text();
                datos_fila += id + ',' + 'N';
                datos_fila += '|';

            }


            //chc += codigos;


        });
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;



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

    var tablaVacia = function () {
        var parms = {
            data: null,
            order: [[0, 'desc']],
            columns: [
                 {
                     data: null,
                     //defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                     //createdCell: function (td, cellData, rowData, row, col) {

                     //    $(td).attr('align', 'center')

                     //}
                 },
                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "IND_CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },


                 {
                     data: "CLIENTE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "TIPOREQUE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
               ,
                {
                    data: "PRIORIDAD",
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

        oTable = iniciaTabla('detalle', parms);
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
            llenaTabla()
            fillCboEmpresa();
            eventoControles();
            funcionalidadTabla();
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
    $('#txtcodprod, #txtdescprod, #txtUnidad, #txtcant').val("");
}