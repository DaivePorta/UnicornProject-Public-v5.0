function ActualizarCliente() {
    var p_acti = $('#chkactivoclie').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cate = $('#slcTipoclie').val();
    var p_fect = $('#txtfechatclie').val();
    var p_feci = $('#txtfechaiclie').val();
    var p_empr = $('#slcEmpresaclie').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_sgmt = $('#slcTipoNegocio').val();

    if (vErrors(["slcTipoclie", "txtfechaiclie", "slcEmpresaclie"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Cliente.ASHX", { flag: 2, pidm: p_pidm, cate: p_cate, feci: p_feci, user: p_user, acti: p_acti, fect: p_fect, empr: p_empr, sgmt: p_sgmt },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabarclie").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarclie").attr("href", "javascript:ActualizarCliente();");
                } else {
                    noexito();
                }
            });
    }
}


function CrearCliente() {

    var p_acti = $('#chkactivoclie').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cate = $('#slcTipoclie').val();
    var p_fect = $('#txtfechatclie').val();
    var p_feci = $('#txtfechaiclie').val();
    var p_empr = $('#slcEmpresaclie').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_sgmt = $('#slcTipoNegocio').val();

    if (vErrors(["slcTipoclie", "txtfechaiclie", "slcEmpresaclie"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Cliente.ASHX", { flag: 1, pidm: p_pidm, cate: p_cate, feci: p_feci, user: p_user, acti: p_acti, fect: p_fect, empr: p_empr, sgmt: p_sgmt },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabarclie").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarclie").attr("href", "javascript:ActualizarCliente();");
                } else {
                    noexito();
                }
            });
    }
}




var CLIENTE = function () {

    haveEvent = false;
    haveEvent2 = false;

    var cargainicial = function () {

      
        $('#chkactivoclie').on('change', function () {
            if ($("#chkactivoclie").is(':checked')) {

                $('#txtfechatclie').attr("disabled", true);
                $('#txtfechatclie').val('');
            } else {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = dd + '/' + mm + '/' + yyyy;
                $('#txtfechatclie').val(today);
                $('#txtfechatclie').attr("disabled", false);
            }
        });

        /*SEGMENTACION*/

        CargaSegmentacion($("#slcCanal"),"C");       


        if (!haveEvent)
        $("#slcCanal").on('change', function (event,valChild, valChild2) {           
            
            $("#slcSubCanal,#slcTipoNegocio").select2("val", "").attr("disabled", true);

            var f1 = (valChild !== undefined && valChild !== "") ? function () { $("#slcSubCanal").select2("val", valChild).change(); } : function () { };

            CargaSegmentacion($("#slcSubCanal"), 'SC', $(this).val(),f1);

            haveEvent |= 1;

            if (!haveEvent2)
                $("#slcSubCanal").on('change', function () {

                $("#slcTipoNegocio").select2("val", "").attr("disabled", true);
                
                var f2 = (valChild2 !== undefined && valChild2 !== "") ? function () {$("#slcTipoNegocio").select2("val", valChild2); } : function () { };

                CargaSegmentacion($("#slcTipoNegocio"), 'TN', $(this).val(), f2);

                haveEvent2 |= 1;

            });

        });

       /*FIN SEGMENTACION*/

       
        $.post("vistas/NC/estereotipos/ajax/Cliente.ASHX", { flag: 3, usua: $("#ctl00_txtus").val() },
             function (res) {
                 $("#controlempresaclie").html(res);
                 $("#slcEmpresaclie option[value=0]").remove();
                 $("#slcEmpresaclie").select2({
                     placeholder: "EMPRESA",
                     allowclear: true

                 });                 

                 if ($("#hfPPBIDEN_PIDM").val() != "")
                 { cargarCliente($("#ctl00_hddctlg").val()); }

             }).complete(function () {
                 
                 $("#slcEmpresaclie").change(function (event, catClie) {
                     emprsa = $(this).val();
                     cargat_cliente(emprsa,"");
                     if ( emprsa === "") {

                         empresa = $('#slcEmpresaclie').val();

                         $("#txtfechaiclie").datepicker("setDate", "now");;

                         $("#slcTipoclie").select2("val", "");

                         $("#txtfechatclie").val("");

                         $("#grabarclie").html("<i class='icon-pencil'></i> Grabar Datos");
                         $("#grabarclie").attr("href", "javascript:CrearCliente();");
                     }                    
                    

                     CargaSegmentacion($("#slcCanal"), "C")
                     setTimeout(function () {
                         cargarCliente(emprsa);
                     },100);

                 });

                $("#slcEmpresaclie").select2("val", $("#ctl00_hddctlg").val()).change();

             });      

    }

    function cargarCliente(empresa) {

        Bloquear("ventana");
        $.ajax({
            type: "GET",
            url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
            data: {
                flag: 5,
                pidm: $("#hfPPBIDEN_PIDM").val(),
                empr: empresa
            },
            contentType: "application/json;",
            dataType: "json",

            success: function (datos) {
                if (datos.length > 0) {
                    $("#grabarclie").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarclie").attr("href", "javascript:ActualizarCliente();");

                    $("#slcEmpresaclie").select2("val", datos[0].EMPRESA);

                    cargat_cliente(datos[0].EMPRESA,  datos[0].CODIGO_CATEGORIA);

                    //  $('#slcTipoclie').select2("val",datos[0].CODIGO_CATEGORIA);
                    $('#txtfechatclie').datepicker("setDate", datos[0].FECHA_TERMINO);
                    $('#txtfechaiclie').datepicker("setDate", datos[0].FECHA_INICIO);


                    if (datos[0].SGMT_CODE1 !== "") {
                     
                        $("#slcCanal").select2("val", datos[0].SGMT_CODE1).trigger('change', [datos[0].SGMT_CODE2, datos[0].SGMT_CODE3]);
                    } else {
                        $("#slcSubCanal,#slcTipoNegocio").select2("val", "").attr("disabled", true);
                    }


                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivoclie span').removeClass().addClass("checked");
                        $('#chkactivoclie').attr('checked', true);
                        $('#txtfechatclie').attr("disabled", true);
                    } else {

                        $('#uniform-chkactivoclie span').removeClass();
                        $('#chkactivoclie').attr('checked', false);
                        $('#txtfechatclie').attr("disabled", false);
                    }
                } else {
                    $("#txtfechaiclie").datepicker("setDate", "now");;

                    $("#slcTipoclie").select2("val", "");

                    $("#txtfechatclie").val("");

                    $("#slcSubCanal,#slcTipoNegocio").select2("val", "").attr("disabled", true);     

                    $("#grabarclie").html("<i class='icon-pencil'></i> Grabar Datos");
                    $("#grabarclie").attr("href", "javascript:CrearCliente();");
                }
            },
            error: function () {
                alertCustom("Error al obtener datos cliente.")
            }
        });

        //Cargar datos resumen linea crédito
        $.ajax({
            type: "GET",
            url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
            data: {
                flag: 7,
                pidm: $("#hfPPBIDEN_PIDM").val(),
                empr: empresa
            },
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                var modeda = '';
                if (datos != "" & datos != null) {
                    if (datos[0].MONEDA != "") {
                        if (datos[0].MONEDA == '0002') {
                            modeda = 'S/. ';
                        } else {
                            modeda = 'US$. ';
                        }
                    }
                    $("#txtocupadoclie").val(modeda + formatoMiles(datos[0].USADO));
                    $("#txtdisponibleclie").val(modeda + formatoMiles(datos[0].ACTUAL));
                    $("#txtvencidoclie").val(modeda + formatoMiles(datos[0].MONTO_VENCIDO));
                    $("#txttiempoatrasclie").html(datos[0].TIEMPO_VENCIDO);
                    $("#txtestadodelineaclie").html("");
                }
            },
            error: function () {
                alertCustom("Error al obtener datos de línea de crédito del Cliente.");
            }
        });

        //Cargar datos resumen ventas
        $.ajax({
            type: "GET",
            url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
            data: {
                flag: 8,
                pidm: $("#hfPPBIDEN_PIDM").val(),
                empr: empresa
            },
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                var modeda = '';
                if (datos != "" & datos != null) {
                    if (datos[0].MONEDA != "") {
                        if (datos[0].MONEDA == '0002') {
                            modeda = 'S/. ';
                        } else {
                            modeda = 'US$. ';
                        }
                    }
                    $("#txtcompramesanteriorclie").val(modeda + formatoMiles(datos[0].VENTAS_MES_ANTERIOR));
                    $("#txtcompraanhoanteriorclie").val(modeda + formatoMiles(datos[0].VENTAS_ANIO_ANTERIOR));
                    $("#txtcompramensualpromclie").val(modeda + formatoMiles(datos[0].VENTAS_PROM_MENSUAL));
                    $("#txtcompraacumuladaclie").val(modeda + formatoMiles(datos[0].VENTAS_ACUMULADO));
                }
            },
            error: function () {
                alertCustom("Error al obtener datos de resumen de venta del Cliente.");
            }
        });


    }

    function cargat_cliente(empresa, valor) {   //categoria cliente       

        $.post("vistas/NC/estereotipos/ajax/Cliente.ASHX", { flag: 4, empr: empresa },
           function (res) {
               $("#controlcatclie").html(res);
               $("#slcTipoclie option[value=0]").remove();
               $("#slcTipoclie").select2({
                   placeholder: "CATEGORIA",
                   allowclear: true

               });
           }).complete(function () { $("#slcTipoclie").select2("val", valor); });

    }

    function CargaSegmentacion(obj, tipo, depend_cod, callback) {
        

        /* carga Segmentacion  */
        depend_cod = depend_cod == undefined ? '' : depend_cod;

        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Cliente.ashx?flag=9&tipo=" + tipo + "&depend_code=" + depend_cod + "&empr=" + ($("#slcEmpresaclie").val() == "" ? $("#ctl00_hddctlg").val() : $("#slcEmpresaclie").val()),
            contenttype: "application/json;",
            beforeSend: function () { Bloquear($(obj.parents("div")[0])); },
            datatype: "json",
            async: true,
            success: function (datos) {
                obj.html("<option></option>");
                if (datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {                       
                        obj.append('<option value="' + datos[i].CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }                 
                }
            },
            complete: function () { obj.removeAttr("disabled").select2("val", ""); Desbloquear($(obj.parents("div")[0])); if(callback!==undefined)callback(); },
            error: function (msg) {
                alert(msg);
            }
        });

        /* */
    }

    var plugins = function () {

        aMayuscula(":input");
        inifechas("txtfechaiclie", "txtfechatclie");
        $("#slcCanal, #slcSubCanal, #slcTipoNegocio").select2();    


    }




    return {
        init: function () {
            plugins();
            cargainicial();

            

        }
    };


}();