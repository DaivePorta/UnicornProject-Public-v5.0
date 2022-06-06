
var NOMCRCO = function () {
    var plugins = function () {
       
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();

        $('#cboRque').select2();
        $('#cbPrioridad').select2();
        $("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });




       
    }

    var eventoControles = function () {


        $('input').on('keydown', function (e)
        {
            if (e.keyCode === 13)
            {
                var curreTabindex = $(this).attr('tabindex');
                var nextabindex = parseInt(curreTabindex) + 1;
                var nextfield = $('[tabindex=' + nextabindex + ']');

                if (nextfield.length > 0)
                {
                    nextfield.focus();
                    e.preventDefault();
                }
            }
        });


        $("#btnAceptar").on("click", function () {
            REGISTRAR();
            $("#modal-confirmar").modal("hide");

        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");

        });
       

        $('#cboEmpresas').on('change', function () {

            fillCboEstablecimiento();
            //Genera_Centro_Costos()
            //ListarAreas();
        });

 

        $('#idRegis').on('click', function () {


            if (oTableTReg.fnGetData().length == 0) {
                exito();
                window.location.href = '?f=NOLCCOM';
            }
            else {


                if (!vErrorBodyAnyElement('.cantidad')) {
                    $("#modal-confirmar").modal("show");
                }
                
               

            }

        });


    }

    function datosTabla() {
        var datos_tabla;
        var datos_fila = '';
        $('#detalle tbody').children().each(function (i) {

            var CODIGO, CANTIDAD;

            CODIGO = $(this).find('td').eq(0).text();
            CANTIDAD = $('#txt_' + CODIGO + '').val();
            ESTADO = $("#ch_" + CODIGO + "").is(":checked") ? "N" : "S"


            datos_fila += CODIGO + ',' + CANTIDAD + ',' + ESTADO;
            datos_fila += '|';
        });
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    }

    function REGISTRAR() {
        var tablas = datosTabla();
        var data = new FormData;

        
        data.append('P_APR_DETALLE', tablas);
        data.append('tipoRequerimiento', $('#cboRque').val());

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=14",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {
                Desbloquear("ventana");
                
                if (datos == 'OK')

                {
                    exito();
                    $('#idRegis').remove();
                    $('#detalle').DataTable().columns(6).visible(false);
                    $('.cantidad').attr('disabled', true);
                    $('.chek').attr('disabled', true);
                }
                else {
                    noexito();
                }
              


               

            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    function NombreUsuario() {
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=5&p_usuario=" + $('#ctl00_txtus').val(),
            async: false,
            success: function (datos) {
                if (datos != null) {

                    $("#txtSolici").val(datos);

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }





    var cargaInicial = function () {

       

        var F = new Date();
        $("#txtFecha").attr('disabled', true);
        $("#txtSolici").attr('disabled', true);
        $("#txtRequi").attr('disabled', true);


        $("#txtUnidad").attr('disabled', true);
        $("#txtcodprod").attr('disabled', true);


        $("#txtFecha").val(F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear())



    }



    function cantidad() {
        var canti = document.getElementById("detalle").rows.length;
        alert(canti)
    }

    var datosDetalle = function () {
        var codigo = ObtenerQueryString('codigo');
        //ALERT('HOLA');
        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=12&p_CODEDETALLE=" + codigo + "&P_ESTADO=" + 'null',
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {

                        var json=$.parseJSON(data)
                        llenaTabla(json)
                       
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };

    function llenaTabla(datos)
    {
        var parms = {
            data: datos,
            paging: false,
            filter: false,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                
                      {
                          data: null,
                          createdCell: function (td, cellData, rowData, row, col) {
                              //type = 'number' min= '1'
                              $(td).html("<input   style='text-align:center;width:40%' id=txt_" + rowData.CODIGO + "  tabindex=" + rowData.CODIGO + " class='cantidad' disabled='false' value=" + rowData.CANTIDAD_SOLI +"     />");
                              $(td).attr('align', 'center')

                          }
                      },
                 {
                     data: "CANTIDAD_SOLI",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "CANTIDAD_RESTANTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "UNIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<input type='checkbox' id=ch_" + rowData.CODIGO + " class='chek' />");
                        $(td).attr('align', 'center')


                        $(".chek").removeAttr('disabled');

                        $(td).children(".chek").click(function () {

                            if ($("#ch_" + rowData.CODIGO + "").is(':checked')) {
                                $("#txt_" + rowData.CODIGO + "").attr('disabled', true)
                                $("#txt_" + rowData.CODIGO + "").val(0);
                            }
                            else {
                                $("#txt_" + rowData.CODIGO + "").attr('disabled', false)
                                $("#txt_" + rowData.CODIGO + "").val("");
                            }

                        });

                      



                    }
                }
                

            ]

        }

        oTableTReg = iniciaTabla('detalle', parms);

        $('#detalle tbody').on('click', '.eliminar', function () {

 

            var pos = oTableTReg.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableTReg.fnGetData(pos);
            oTableTReg.fnDeleteRow(pos);

            eliminar(row.CODIGO);

       

        });

        $('#detalle tbody').on('keydown', 'input', function (e) {

            if (e.keyCode == 13) {
                var curreTabindex = $(this).attr('tabindex');
                var nextabindex = parseInt(curreTabindex) + 1;
                var nextfield = $('[tabindex=' + nextabindex + ']');

                if (nextfield.length > 0) {
                    nextfield.focus();
                    e.preventDefault();
                }
            
            }
        });


    }


    function eliminar(codigo)
    {
       
        //alert(codigo)

        var data = new FormData;
        data.append('P_CODE_DETA', codigo);
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=13",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {


                exito();


            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var cargarPOS = function () {
        var codigo = ObtenerQueryString('codigo');
        //ALERT('HOLA');
        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=9&p_CODEUSU=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {


                        $('#cboEmpresas').select2('val', data[0].CATALOGO).change();
                        $('#cboEstablecimiento').select2('val', data[0].ESTABLECIMIENTO);
                        $('#txtRequi').val(data[0].CODIGO);
                        $('#txtFecha').val(data[0].FECHA);
                        $('#txtSolici').val(data[0].SOLICITA_NOMBRE);
                        $('#cbPrioridad').select2('val', data[0].PRIORIDAD);
                        $('#cboRque').select2('val', data[0].TIPOREQUE);
                        $('#lblCentroCostos').text(data[0].CENTRO_COSTOS);
                        $('#txtGlosa').val(data[0].GLOSA);

                        $('#div select').attr('disabled', true);
                        $('#div input').attr('disabled', true);
                        
                        $('.cantidad').attr('disabled', false);
                        $('.cantidad').inputmask({ "mask": "9", "repeat": 9, "greedy": false });

                        $('#div textarea').attr('disabled', true);
                        $('#oculta').remove();
                        $('#btnMail').removeClass('hidden');
                        $(".chek").removeAttr('disabled');
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };







    $('#cboALmc_tranf').change(function () {
        $('#txtorigenT').val($('#cboALmc_tranf :selected').attr('direccion'));
    });







    return {
        init: function () {


            plugins();
            fillCboEmpresa();      
            eventoControles();
            cargaInicial();
            NombreUsuario();
            datosDetalle();
            cargarPOS();

        }
    };

}();




function GrabarDet() {



    if ($('#txtcant').val() == "") {
        alertCustom("Ingrese Cantidad")
    }

    else {
        var a = {
            "CODIGO": $('#txtcodprod').val(),
            "DES_PRODUCTO": $('#txtdescprod').val(),
            "UNIDAD_MEDIDAD": $('#txtUnidad').val(),
            "CODIGO_MEDIDAD": $('#hdcodUNI').val(),
            "CANTIDAD": $('#txtcant').val(),
            "FECHA REQ": $("#txtFecha").val()
        }

        var ar = oTableActividad.fnGetData();
        var flag = false;
        ar.filter(function (e, f) {
            if (e.CODIGO == $('#txtcodprod').val()) {

                alertCustom("Producto Repetido")
                flag = true;

            }

        });
        if (!flag) {
            oTableActividad.fnAddData(a);
            limpiar();
        }
    }
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
                //ListarAreas();



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
                $('#cboEstablecimiento').select2('val',datos[0].CODIGO);
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

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        Bloquear('divMail_body');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
                "&NREMITENTE=" + $('#txtNRemitente').val() +
                "&DESTINATARIOS=" + destinos +
                "&ASUNTO=" + $('#txtAsunto').val() +
                "&MENSAJE=" + $('#txtcontenido').val() +
                "&EMPRESA=" + $('#ctl00_lbl_empresa').text() +
                "&ESTABLECI=" + $('#cboEstablecimiento option:selected').html() +

                "&SOLICITANTE=" + $('#txtSolici').val() +
                "&NUM_DOC_ORIGEN=" + $('#txtRequi').val() +

                "&Carea=" + $('#cboArea option:selected').html() +
                "&Cseccion=" + $('#cboSeccion option:selected').html() +
                "&Cproceso=" + $('#cboProceso option:selected').html() +
                "&Cactividad=" + $('#cboActividad option:selected').html() +

                "&GLOSA=" + $('#txtGlosa').val(),



            contentType: "application/json;",
            async: false,
            dataType: false,
            success: function (datos) {
                exito();
                setTimeout(function () { $('#divMail').modal('hide'); }, 50);
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            }
        });
        Desbloquear('divMail_body');
    }
};

function ENVIAGLOSA(codigoCaja) {



    var glosa = $('#txt_' + codigoCaja).val();



    var data = new FormData;

    data.append('P_CODE_DETA', codigoCaja);
    data.append('P_GLOSA_DETA', glosa);



    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=11",
        contentType: false,
        data: data,
        processData: false,
        cache: false,

        success: function (datos) {


            exito();
            window.location.href = '?f=NOMRCOM&codigo=' + $('#txtRequi').val();



        },
        error: function (msg) {
            alert(msg);
        }
    });


}


function Genera_Centro_Costos() {
    Bloquear("div_cc")

    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=20&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (!isEmpty(datos)) {
                var x = 0;
                for (var i = 0 ; i < datos.length ; i++) {

                    if (datos[i].ESTADO_IND == "A") {

                        $("#div_cc").attr("style", "");

                        code_CECC = datos[i].CODE
                        var niveles = (datos[i].NIV).split(",")
                        console.log(niveles);
                        var cadena = '';
                        for (var j = 0 ; j < niveles.length ; j++) {
                            if (niveles[j] !== "") {

                                cadena += "<div class='span1'><div class='control-group '><label>" + niveles[j] + "</label></div></div>"

                                cadena += "<div class='span2'><div class='controls'><select id='cbo_" + (x += 1) + "' class='span12 combo' data-placeholder='" + niveles[j] + "'><option></option></select></div></div>"
                            }

                        }


                        $("#div_cc").html(cadena)
                        $(".combo").select2();
                        ListarAreas();

                        var num_niv = (datos[i].NUM_NIV).split(",")
                        numero_niveles = (datos[i].NUM_NIV).split(",")
                        if (num_niv.length > 0) {
                            for (var k = 0  ; k < num_niv.length; k++) {
                                if (num_niv[k] === "") {

                                    num_niv.splice(k, 1);
                                    numero_niveles.splice(k, 1);
                                }
                            }
                            num_niv.sort(function (a, b) { return a - b })
                            numero_niveles.sort(function (c, d) { return c - d })
                            num_niv.splice(0, 1);


                            for (var z = 1  ; z <= $("#div_cc select").length - 1 ; z++) {
                                var select = $('#cbo_' + z)

                                if ((z) <= ($("#div_cc select").length - 1)) {


                                    select.attr("niv", num_niv[z - 1].toString());


                                    select.on('change', function () {
                                        var xxx = $(this).attr("id").toString();
                                        var xx2 = xxx.indexOf('_');
                                        var xx3 = parseInt(xxx.substring(xx2 + 1));
                                        var xx4 = xx3 + 1;
                                        var nombre = ('#cbo_' + xx4);

                                        var n = $(this).attr("niv").toString();

                                        ListarDatosCentroCosto(nombre, $(this).val(), n);

                                    });
                                }

                            }
                        }
                        return
                    } else {
                        $("#div_cc").html("NO EXISTE ESTRUCTURA CENTRO COSTOS ACTIVA");

                        $("#div_cc").css({
                            'text-align': 'center',
                            'font-size': 'large',
                            'color': 'red'
                        });

                    }
                }
            }
            else {
                $("#div_cc").html("NO EXISTE ESTRUCTURA CENTRO COSTOS");

                $("#div_cc").css({
                    'text-align': 'center',
                    'font-size': 'large',
                    'color': 'red'
                });

            }

            Desbloquear("div_cc");

        },
        error: function (msg) {
            alert(msg);
            Desbloquear("div_cc");
        }

    });


}

function ListarAreas() {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=1&CTLG_CODE=" + $("#cboEmpresas").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cbo_1').empty();
            $('#cbo_1').html("<option></option>");
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_1').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }

            }
            else {
                alertCustom("error cargar las areas del centro costo")
            }
        },
        error: function (msg) {

            alertCustom("error cargar las areas  del centro costo")
        }
    });


}



function ListarDatosCentroCosto(select ,depend_code , nivel) {

    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=22&DEPEND_CODE=" + depend_code + "&CODE_CECC=" + code_CECC + "&NIVEL=" + nivel,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $(select).empty();
            $(select).html("<option></option>");
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].CODE + '">' + datos[i].DESCC + '</option>');
                }
           
            }
            else {
                alertCustom("error cargar ares centro costo")
            }
            $(select).select2('val', '').change();
        },
        error: function (msg) {
            
            alertCustom("error cargar ares centro costo")
        }
    });


}