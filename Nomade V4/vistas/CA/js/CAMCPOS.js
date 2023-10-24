
var CALCPOS = function () {

    var cargarCombos = function () { 

        $("#slcEmpr, #slcEstb,#slcMoneda,#slcPOS").select2();

        function cargarEmpresas() {
            var select = $('#slcEmpr');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camcpos.ashx?flag=5",
                async: false,
                success: function (datos) {
                    select.empty();
                    select.html(datos);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
            select.select2('val', $('#ctl00_hddctlg').val()).change(function () { $("#slcEstb, #slcPOS").select2("val", ""); cargarEstablecimientos(); cargarPOS(); });
        };

        function cargarEstablecimientos() {
            var select = $('#slcEstb');
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#slcEmpr').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    select.empty();
                    select.append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }                        
                    }
                },
                error: function (msg) {
                    alert(msg.d);
                }
            });
            select.select2('val', $('#ctl00_hddestablecimiento').val()).change(function () { $("#slcPOS").select2("val", ""); cargarPOS(); });
        }
        
        function cargarMoneda(codMoneda) {
            var select = $('#slcMoneda');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camcpos.ashx?flag=MO&empresa=" + $('#slcEmpr').val(),
                success: function (datos) {
                    select.empty();
                    select.html(datos);                    
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () {
                select.attr("disabled", false);
                var v_monedas = $('#slcPOS :selected').attr("moneda");
                $("#slcMoneda option").filter(function (e, d) {
                    var val0r = $(d).val();
                    if (v_monedas.indexOf(val0r) < 0)
                    {
                        $("#slcMoneda option[value=" + val0r + "]").remove();
                        select.select2('val', codMoneda);
                        cargarSimboloMoneda()
                        //select.change();
                    }

                });

                if ($('#slcEstb').val() == "") {
                    $("#slcEstb").select2('val', $("#slcPOS option:selected").attr("scslCode"))
                }

                //select.change(function () { cargarSimboloMoneda(); });
            });
        }

        function cargarPOS() {
            $('#slcMoneda').attr("disabled", true);
            var select = $('#slcPOS');
            select.attr("disabled", true);
            let codigoPOS = "";
            let monedaPOS = "";
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camcpos.ashx?flag=4.5&empresa=" + $('#slcEmpr').val() + "&establecimiento=" + $('#slcEstb').val(),
                success: function (datos) { 
                    select.empty();
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            select.append('<option value="' + datos[i].CODIGO + '" codOpe="' + datos[i].CODIGO_OPERADOR + '" moneda="' + datos[i].MONEDA + '" scslCode="' + datos[i].SCSL_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                            codigoPOS = datos[i].CODIGO;
                            monedaPOS = datos[i].MONEDA;
                        }
                        select.select2('val', codigoPOS);
                        select.change();
                    } else {
                        select.select2('val', "");
                        $('#slcMoneda').select2('val', "");
                        select.change();
                    }                    
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () {
                select.attr("disabled", false);

            });
            select.change(function () {

                cargarMoneda(monedaPOS);
                //$('#slcMoneda').select2("val", "");
                table.fnClearTable();
            });

        }

        cargarEmpresas();
        cargarEstablecimientos();
        cargarPOS();

    }

    var datatable = function () {

        var parms = {
            data: null,
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
                    data: "NUMERO"
                },
                {
                    data: { _: "FECHA.display", sort: "FECHA.order" }, createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "CANTIDAD_ORDENES", createdCell: function (td, cellData, rowData, row, col) {

                         $(td).attr("align", "right");

                     }
                 },
                {
                    data: "MONTO_CIERRE", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(simbolo + formatoMiles(cellData)).attr("align", "right");

                    }
                },
                {
                    data: "DESCUENTOS", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(simbolo + formatoMiles(cellData)).attr("align", "right");

                    }
                },                  
                { data: "USUARIO" },
            ]

        }


        table = iniciaTabla('tblBandeja', parms);
        $("#tblBandeja").removeAttr("style");
    
        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);

            }

        });


        $("#btnFiltrar").click(function () {
            if (vErrors(["slcMoneda", "slcPOS"])) {
                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/camcpos.ashx?flag=L&moneda=" + $("#slcMoneda").val() + "&pos=" + $("#slcPOS").val(),
                    async: false,
                    success: function (datos) {

                        table.fnClearTable();
                        if (datos.indexOf("error") < 0) {

                            var json = $.parseJSON(datos);
                            if (json != null)
                                table.fnAddData(json);
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            }
        });



        $('#tblBandeja tbody').on('click', '.detDoc', function () {

            var pos = table.api(true).row($(this).parents("tr")[0]).index();
            var row = table.fnGetData(pos);

            var id = row.CODIGO;
            var detalle = row.DETALLE;
            var nTr = $(this).parents('tr')[0];

            if (table.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                table.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                table.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                table.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
                Bloquear("tblBandeja_wrapper");
                $.ajax({
                    type: "POST",
                    url: "vistas/ca/ajax/camcpos.ashx?flag=ld&detalle=" + detalle,
                    async: false,
                    success: function (datos) {

                        var str = "";
                        var resb = "";
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += "<th>FECHA</th>";
                            resb += "<th>DOC. VTA.</th>";
                            resb += "<th style='width:28%'>RESPONSABLE DE PAGO</th>";
                            resb += "<th>BCO.</th>";
                            resb += "<th>MARCA</th>";
                            resb += "<th>ULT. DIG</th>";
                            resb += "<th>COD. AUT.</th>";
                            resb += "<th>MONTO</th>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + id, $.parseJSON(datos));

                        }
                        Desbloquear("tblBandeja_wrapper");

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

    return {
        init: function () {

            cargarCombos();
            datatable();

        }
    };
}();

var CAMCPOS = function () {


    var plugins = function () {

        $("#txtFecha").datepicker("setDate", new Date()).datepicker('update');;

        $("#slcMoneda, #slcEmpr, #slcEstb,#slcPOS").select2();

        $("#txtNroLote").inputmask({ "mask": "9", "repeat": 6, "greedy": false });


    }

    var cargarCombos = function () {

        $("#slcPOS,#slcMoneda").change(function () {
            if ($("#slcPOS").val() != "" && $("#slcMoneda").val() != "") {

                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/camcpos.ashx?flag=V1&empresa=" + $("#slcEmpr").val() + "&moneda=" + $("#slcMoneda").val() + "&operador=" + $('#slcPOS :selected').attr("codope"),
                    async: false,
                    success: function (datos) {

                        if (datos != "") {
                            var hoy = new Date(datos.split("|")[1].split("/").reverse().join("-"));
                            var diasgt = new Date(hoy);
                            diasgt.setDate(hoy.getDate() + 2);
                            $("#txtFecha").datepicker("setStartDate", diasgt).datepicker("setEndDate", new Date()).val("");
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });

            }
        });

        function cargarEmpresas() {
            var select = $('#slcEmpr');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camcpos.ashx?flag=5",
                async: false,
                success: function (datos) {
                    select.empty();
                    select.html(datos);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
            select.select2('val', $('#ctl00_hddctlg').val()).change(function () { $("#slcEstb, #slcPOS").select2("val", ""); cargarEstablecimientos(); cargarPOS(); });
        };


        function cargarEstablecimientos() {
            var select = $('#slcEstb');
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#slcEmpr').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    select.empty();
                    select.append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                },
                error: function (msg) {
                    alert(msg.d);
                }
            });
            select.select2('val', $('#ctl00_hddestablecimiento').val()).change(function () { $("#slcPOS").select2("val", ""); cargarPOS(); });
        }

        function cargarMoneda(codMoneda) {
            var select = $('#slcMoneda');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camcpos.ashx?flag=MO&empresa=" + $('#slcEmpr').val(),
                // async: false,
                success: function (datos) {
                    select.empty();
                    select.html(datos);
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () {
                select.attr("disabled", false);
                var v_monedas = $('#slcPOS :selected').attr("moneda");
                $("#slcMoneda option").filter(function (e, d) {
                    var val0r = $(d).val();
                    if (typeof v_monedas != "undefined") {
                        if (val0r != "") {
                            if (v_monedas.indexOf(val0r) < 0) {
                                $("#slcMoneda option[value=" + val0r + "]").remove();
                                select.select2('val', codMoneda);
                                cargarSimboloMoneda()
                                //select.change();
                            }
                        }
                    }                                       
                });

                if ($('#slcEstb').val() == "") {
                    $("#slcEstb").select2('val', $("#slcPOS option:selected").attr("scslCode"))
                }

                //select.change(function () { cargarSimboloMoneda(); });
            });
        }

        function cargarPOS() {
            var select = $('#slcPOS');
            select.attr("disabled", true);
            let codigoPOS = "";
            let monedaPOS = "";
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camcpos.ashx?flag=4.5&empresa=" + $('#slcEmpr').val() + "&establecimiento=" + $('#slcEstb').val(),
                //async: false,
                success: function (datos) {
                    select.empty();
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            select.append('<option value="' + datos[i].CODIGO + '" codOpe="' + datos[i].CODIGO_OPERADOR + '" moneda="' + datos[i].MONEDA + '" scslCode="' + datos[i].SCSL_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                            codigoPOS = datos[i].CODIGO;
                            monedaPOS = datos[i].MONEDA;
                        }
                        select.select2('val', codigoPOS);
                        select.change();
                    } else {
                        select.select2('val', "");
                        $('#slcMoneda').select2('val', "");
                        select.change();
                    }                   
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () {
                select.attr("disabled", false);
            });
            select.change(function () {

                cargarMoneda(monedaPOS);
                //$('#slcMoneda').select2("val", "");
                //table.fnClearTable();
            });
        }

        cargarEmpresas();
        cargarEstablecimientos();
        cargarPOS();
        //cargarMoneda();
    }



    var funcionalidad = function () {

        function botonFiltrar() {
            $("#btnFiltrar").click(function () {
                if (vErrors(["slcMoneda", "slcPOS"])) {
                    $.ajax({
                        type: "post",
                        url: "vistas/ca/ajax/camcpos.ashx?flag=3&moneda=" + $("#slcMoneda").val() + "&pos=" + $("#slcPOS").val(),
                        async: false,
                        success: function (datos) {

                            if ($(".chkTdo").is(":checked")) {
                                $($(".chkTdo").attr("checked", false).parent()).removeClass("checked");
                            }


                            var json = $.parseJSON(datos);
                            oTable.fnClearTable()

                            if (json != null)
                                oTable.fnAddData(json);


                            $("#txtMontoCierre")
                                .val("")
                                .attr("monto", "");


                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });
                }
            });

        }


        botonFiltrar();

    }

    json_selec = new Array();
    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.selecChk', function () {


            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            var monto = parseFloat(row.MONTO);
            var valor_monto = parseFloat($("#txtMontoCierre").attr("monto") == "" ? 0 : $("#txtMontoCierre").attr("monto"));


            if (!$(this).parent().parent().hasClass("selected")) {

                $(this).parent().parent().addClass('selected');

                valor_monto += monto;

                json_selec.push(row);

            } else {

                $(this).parent().parent().removeClass('selected');

                valor_monto -= parseFloat(monto.toFixed(2));

                json_selec.filter(function (e, f) {
                    if (e == row) { json_selec.splice(f, 1); }
                });

            }

            $("#txtMontoCierre")
                .val(simbolo + formatoMiles(valor_monto))
                .attr("monto", valor_monto.toFixed(2));

        });

        $(".chkTdo").click(function () {
            var val0r_ini = $("#tblBandeja_rppag").val();

            $("#tblBandeja_rppag").val("-1").change();

            if (!$(this).is(":checked")) {

                $('#tblBandeja tbody .selecChk').each(function () {
                    if (!$(this).is(":checked"))
                    { $(this).click(); }

                });
            } else {
                $('#tblBandeja tbody .selecChk').each(function () {
                    if ($(this).is(":checked"))
                    { $(this).click(); }

                });

            }


            $('#tblBandeja tbody .selecChk').click();
            $("#tblBandeja_rppag").val(val0r_ini).change();

        });

    }

    return {
        init: function () {

            plugins();
            cargarTabla();
            funcionalidadTabla();
            cargarCombos();
            funcionalidad();

            //  cargainicial();

        }
    };
}();
simbolo = "";
function cargarSimboloMoneda() {
    var v_monedas = $('#slcPOS :selected').attr("moneda");
    if (typeof v_monedas != "undefined") {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camcpos.ashx?flag=M&codigo=" + $('#slcPOS :selected').attr("moneda"),
            //  async: false,
            success: function (datos) {
                simbolo = datos;

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }   
}

function cargarTabla() {

    oTable = iniciaTabla("tblBandeja", {
        data: null,
        columns: [
            {
                data: null,
                defaultContent: '  <input type="checkbox" class="selecChk" />',
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            },
            {
                data: { _: "FECHA.display", sort: "FECHA.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                }
            },
             {
                 data: "DOCUMENTO.valor",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
             {
                 data: "CLIENTE.valor",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
               {
                   data: "BANCO.valor",
                   createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'center');
                   }
               },
                 {
                     data: "MARCA.valor",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },
             {
                 data: "ULT_DIGITOS",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');

                 }
             },
             {
                 data: "CODIGO_AUTORIZACION",
                 createdCell: function (td, cellData, rowData, row, col) {


                 }
             },

            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {


                    $(td).html(simbolo + formatoMiles(cellData)).attr("align", "right");;

                }
            }


        ]

    });


}

function cerrarLote() {


    var p_numero = $("#txtNroLote").val();
    var p_fecha = $("#txtFecha").val();
    var p_monto_cierre = $("#txtMontoCierre").attr("monto");
    var p_pos = $("#slcPOS").val();
    var p_moneda = $("#slcMoneda").val();
    var p_empresa = $("#slcEmpr").val();
    var p_establecimiento = $("#slcEstb").val();
    var p_detalle = "";
    var p_transaccion = "PAGO POR POS";

    json_selec.filter(function (e) {


        if (p_detalle == "") {

            p_detalle = e.CODIGO_MCAJA;

        } else {

            p_detalle += ("," + e.CODIGO_MCAJA);

        }



    });

    var p_user = $('#ctl00_lblusuario').html();

    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/CA/ajax/CAMCPOS.ashx", {
            flag: 1,
            numero: p_numero,
            fecha: p_fecha,
            monto_cierre: p_monto_cierre,
            pos: p_pos,
            moneda: p_moneda,
            empresa: p_empresa,
            establecimiento: p_establecimiento,
            detalle: p_detalle,
            usuario: p_user,
            ttransaccion: p_transaccion
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "" && res != "ERROR") {
                    exito();
                    $("#txtNroLote").val("");
                    $("#btnFiltrar").click();
                    json_selec = new Array();
                } else {
                    noexito();
                }
            });
    }

}

function cargatablavaciaDetalleF(id, json) {

    oTableDeudasDetalle = iniciaTabla(id, {
        data: json,
        columns: [
          {
              data: { _: "FECHA.display", sort: "FECHA.order" },
              createdCell: function (td, cellData, rowData, row, col) {
                  $(td).attr('align', 'center');

              }
          },
             {
                 data: "DOCUMENTO.valor",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
             {
                 data: "CLIENTE.valor",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
               {
                   data: "BANCO.valor",
                   createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'center');
                   }
               },
                 {
                     data: "MARCA.valor",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     }
                 },
             {
                 data: "ULT_DIGITOS",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');

                 }
             },
             {
                 data: "CODIGO_AUTORIZACION",
                 createdCell: function (td, cellData, rowData, row, col) {


                 }
             },

            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {


                    $(td).html(simbolo + formatoMiles(cellData));

                }
            }

        ],
        "paging": false,
        scrollCollapse: true,
        //  sort: false,
        "sDom": "t"

    });


}