var COLRECO = function () {
    var plugins = function () {
        $('#cboEmpresa').select2()      
        $("#cboMes").select2();
        $('#txtanio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
        $("#cboTipo").select2();
    }

    var fillCboEmpresa = function () {
        Bloquear("divCboEmpresa");
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divCboEmpresa");
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '" ruc="' + datos[i].RUC + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                Desbloquear("divCboEmpresa");
                alertCustom("Empresas no listaron correctamente.");
            }
        });
    }

    //var fillCboEstablecimiento = function (ctlg) {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/cc/ajax/cclrfva.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $('#cboEstablecimiento').empty();
    //            $('#cboEstablecimiento').append('<option></option>');
    //            if (datos != null) {
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
    //                }
    //                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
    //            } else {
    //                $('#cboEstablecimiento').select2('val', '');

    //            }
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });

    //}

    //function listarANIO() {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/co/ajax/colreco.ashx?OPCION=2",
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $("#txtanio").empty();
    //            if (datos != null) {
    //                $("#txtanio").html(datos);
    //            }
    //            $('#txtanio').select2('val', '');
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });
    //}

    function listarMES() {
        $('#cboMes').select2();
        $('#cboMes').select2('val', '');
        //$.ajax({
        //    type: "post",
        //    url: "vistas/co/ajax/colreco.ashx?OPCION=3",
        //    contenttype: "application/json;",
        //    datatype: "json",
        //    async: false,
        //    success: function (datos) {
        //        $("#cboMes").empty();

        //        if (datos != null) {
        //            $("#cboMes").html(datos);
        //        }
        //        $('#cboMes').select2('val', '');
        //    },
        //    error: function (msg) {
        //        alert(msg);
        //    }
        //});
    }
    
    
    function listarRegistroCompras() {
        var mes = $('#cboMes').val();

        if (mes.length == 1) {
            mes = ("0" + mes).slice(-2);
        } else {
            mes;
        }
        var data = new FormData();
        data.append('OPCION', "4");
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ANIO', $('#txtanio').val());
        data.append('p_MES', mes);
        data.append('p_RUC', $('#cboEmpresa option:selected').attr('ruc'));
        data.append('p_MES_DES', $('#cboMes option:selected').html());
        data.append('p_DESC_EMPRESA', $('#cboEmpresa option:selected').html());

        //Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CO/ajax/colreco.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            beforeSend: function () { Bloquear($("#ventana"), "Generando libro de compras ...") },
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divRegistroCompras').html(datos);
               $("#filtros_2 #correcto").parent().remove();
               $('#btnDescargarLibroPDF, #btnDescargarLibroTXT').attr('disabled', false);
               $('.btnLibroXls').attr('disabled', false);
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("N");
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
           } else {
               if (datos == "") {
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("S");
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
               } else {
                   noexito();
               }
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }

    var eventoComtroles = function () {

      
        var today = new Date();
        var yyyy = today.getFullYear();
        $("#txtanio").keyup(function (e) { if (parseInt($(this).val()) > yyyy) $(this).val(""); });

        $('#cboMes').on('change', function () {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#txtanio').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddMes").val($('#cboMes').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescMes").val($('#cboMes :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());            

            //$('.btnLibroPDF').attr('disabled', true);
            //$('.btnLibroTXT').attr('disabled', true);
            //$('.btnLibroXls').attr('disabled', true);
        });
        
        $('#cboEmpresa').on('change', function () {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#txtanio').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddMes").val($('#cboMes').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescMes").val($('#cboMes :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());

            //$('.btnLibroPDF').attr('disabled', true);
            //$('.btnLibroTXT').attr('disabled', true);
            //$('.btnLibroXls').attr('disabled', true);
        });

        //$('#btnGenerarLibro').on('click', function () {
        //    if (vErrors([ "cboEmpresa", "txtanio", "cboMes"])) {
        //        //$('.btnLibroPDF').attr('disabled', false);
        //        //$('.btnLibroTXT').attr('disabled', false);
        //        //$('.btnLibroXls').attr('disabled', false);
        //        Exportar();
        //    }
        //});   

        $('#btnDescargarLibroPDF').on('click', function () {
            if (vErrors([ "cboEmpresa", "txtanio", "cboMes"])) {
                fnGenerarPDF();
            }
        });  

        $('#btnDescargarLibroTXT').on('click', function () {
            if (vErrors(["cboEmpresa", "txtanio", "cboMes"])) {
                //fnGenerarTXT();
                $("[id*=btnLibroTXT]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
            }
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa","txtanio", "cboMes"])) {
                listarRegistroCompras();
            }
        });    

    }

    function fnGenerarPDF() {
        var mes = $('#cboMes').val();

        if (mes.length == 1) {
            mes = ("0" + mes).slice(-2);
        } else {
            mes;
        }

        var data = new FormData;
        data.append('p_ANIO', $('#txtanio').val());
        data.append('p_MES', mes);
        data.append('p_MES_DES', $('#cboMes option:selected').html());
        data.append('p_RUC', $('#ruc').html());
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());

        $.ajax({
            type: "POST",
            url: "vistas/co/ajax/colreco.ashx?OPCION=5",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            beforeSend: function () { Bloquear($("#ventana"), "Generando archivo ...") },
            success: function (datos) {
                if (datos == 'ok') {
                    exito();
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("N");
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
                    $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
                    //$('.btnLibroPDF').attr('disabled', false);
                    //$('.btnLibroTXT').attr('disabled', false);
                    //$('.btnLibroXls').attr('disabled', false);
                }
                else {
                    if (datos == 'vacio') {
                        exito();
                        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("S");
                        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
                        $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
                        //$('.btnLibroPDF').attr('disabled', false);
                        //$('.btnLibroTXT').attr('disabled', false);
                        //$('.btnLibroXls').attr('disabled', false);
                    } else { noexito(); }
                }                
            },
            complete: function () {
                Desbloquear("ventana");
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
       
    //function fnGenerarTXT() {
    //    var mes = $('#cboMes').val();

    //    if (mes.length == 1) {
    //        mes = ("0" + mes).slice(-2);
    //    } else {
    //        mes;
    //    }

    //    var data = new FormData;
    //    data.append('p_ANIO', $('#txtanio').val());
    //    data.append('p_MES', mes);
    //    data.append('p_MES_DES', $('#cboMes option:selected').html());
    //    data.append('p_RUC', $('#ruc').html());
    //    data.append('p_CTLG_CODE', $('#cboEmpresa').val());

    //    $.ajax({
    //        type: "POST",
    //        url: "vistas/co/ajax/colreco.ashx?OPCION=6",
    //        contentType: false,
    //        data: data,
    //        processData: false,
    //        cache: false,
    //        beforeSend: function () { Bloquear($("#ventana"), "Generando archivo ...") },
    //        success: function (datos) {
    //            if (datos == 'ok') {
    //                exito();
    //                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("N");
    //                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
    //                $("[id*=btnLibroTXT]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
    //                //$('.btnLibroPDF').attr('disabled', false);
    //                //$('.btnLibroTXT').attr('disabled', false);
    //                //$('.btnLibroXls').attr('disabled', false);
    //            }
    //            else {
    //                if (datos == 'vacio') {
    //                    exito();
    //                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("S");
    //                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
    //                    $("[id*=btnLibroTXT]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
    //                    //$('.btnLibroPDF').attr('disabled', false);
    //                    //$('.btnLibroTXT').attr('disabled', false);
    //                    //$('.btnLibroXls').attr('disabled', false);
    //                } else { noexito(); }
    //            }
    //        },
    //        complete: function () {
    //            Desbloquear("ventana");
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });
    //}

    var cargaInicial = function () {
        $('#btnDescargarLibroPDF, #btnDescargarLibroTXT').attr('disabled', true);
        $('.btnLibroXls').attr('disabled', true);
    }


    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            //fillCboEstablecimiento($("#ctl00_hddctlg").val());
            listarMES();
            eventoComtroles();
            cargaInicial();
        }
    };

}();

var NuevaPantalla = function () {
    window.location.href = '?f=COLRECO';
}
