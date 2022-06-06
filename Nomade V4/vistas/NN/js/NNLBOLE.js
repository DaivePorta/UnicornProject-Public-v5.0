
var NNLBOLE = function () {
    var plugins = function () {

        $('#cboEmpresa').select2()
        $("#cbo_planilla").select2();

    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }






    function GeneraBoleta() {

        var data = new FormData();
        data.append('OPCION', "1");
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ANIO', $("#cbo_planilla option:selected").attr("anio"));
        data.append('p_MES', $("#cbo_planilla option:selected").attr("mes_num"));


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/nnlbole.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != "") {
               $('#divBoletas').html(datos);
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }

    var eventoComtroles = function () {


  

        var emp_ant = "";
        $('#cboEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana")
                setTimeout(function () {

                    fillCbo_Planilla($('#cboEmpresa').val())

                    $("#div_btn_descargar").attr("style", "display:none")
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").attr("disabled", true)
                    $('#btnGenerarLibro').attr('disabled', true);
                    $('#divBoletas').html("");
                    emp_ant = $(this).val();

                }, 1000);

            } else { emp_ant = ""; }
        });

        var pla_ant = "";
        $('#cbo_planilla').on('change', function () {
            if (pla_ant != $(this).val()) {

                $("#div_btn_descargar").attr("style", "display:none")
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").attr("disabled", true)
                $('#btnGenerarLibro').attr('disabled', true);
              
                    pla_ant = $(this).val();
            } else { pla_ant = ""; }
        });


        

        $('#btnGenerarLibro').on('click', function () {
            $("#btnGenerarLibro").blur()
            CreaPDF();
          
         
          
        });

        $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF').on('click', function () {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").blur()



        });



        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "cbo_planilla"])) {
                GeneraBoleta();
                $("#div_btn_descargar").attr("style", "display:none")
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").attr("disabled", true)
            $('#btnGenerarLibro').attr('disabled', false);
            }
        });

    }

    var fillCbo_Planilla = function (ctlg_code) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcepl.ashx?OPCION=2&p_CTLG_CODE=" + ctlg_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla').empty();
                $('#cbo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_planilla').append('<option   mes_num="' + datos[i].MES_NUM + '" anio="' + datos[i].ANIO + '"   mes="' + datos[i].MES + '"     value="' + datos[i].DESC_PLANILLA + '">' + datos[i].DESC_PLANILLA + '</option>');
                    }



                }
                Desbloquear("ventana")
                $('#cbo_planilla').select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error cargar planilla");
                Desbloquear("ventana")
            }
        });
    }


    function Exportar() {
        var data = new FormData;
        data.append('p_ANIO', $('#txtanio').val());
        data.append('p_MES', $('#cboMes').val());
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
            success: function (datos) {
                if (datos == 'ok') {
                    exito();
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("N");
                }
                else {
                    if (datos == 'vacio') {
                        exito();
                        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("S");

                    } else { noexito(); }
                }
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    function CreaPDF() {
        
        var data = new FormData;
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ANIO', $("#cbo_planilla option:selected").attr("anio"));
        data.append('p_MES', $("#cbo_planilla option:selected").attr("mes_num"));

        $.ajax({
            type: "POST",
            url: "vistas/nn/ajax/nnlbole.ashx?OPCION=2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {

                if (datos == "OK") {
                    exito();
                    $("#div_btn_descargar").attr("style", "display:block")
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").attr("disabled",false)
                }
                else {
                    alertCustom("No se genero el pdf correctamente")
                    $("#div_btn_descargar").attr("style", "display:none")
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").attr("disabled", true)
                }
            },
            error: function (msg) {
                alertCustom("No se genero el pdf correctamente")
                $("#div_btn_descargar").attr("style", "display:none")
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnLibroPDF").attr("disabled", true)
            }
        });

        

    }



    var cargaInicial = function () {
        $('.btnLibroPDF').attr('disabled', true);
        $('.btnLibroTXT').attr('disabled', true);

        $('#btnGenerarLibro').attr('disabled', true);
    }


    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCbo_Planilla($('#cboEmpresa').val())
            eventoComtroles();
            cargaInicial();
        }
    };

}();