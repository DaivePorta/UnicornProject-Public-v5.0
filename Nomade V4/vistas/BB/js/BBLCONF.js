var BBLCONF = function () {

    var ListarConfiguracion = function () {
        $('#tblConfiguracion').dataTable().fnDestroy()
        var emp = $("#ctl00_hddctlg").val();

        var aa = $("#optanho").val();
        var mm = $("#optmes").val();
        var fe = mm + " " + aa;
        fe = fe.toUpperCase();
 

        $.ajax({
            type: "POST",
            url: "vistas/BB/ajax/BBLCONF.ASHX?Opcion=L&emp=" + emp + "&fe=" + fe,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos == null) {
                    iniciaTabla('tblConfiguracion');
          
                    return false;
                }
                var combo = "";
           
                var parms = {
                    data: datos,
                    "iDisplayLength": -1,
                    columns: [
                
                        {
                            data: "CODIGO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                                $(td).css('display', 'none')
                            }
                        },
                        {
                            data: "COLUMNA",
                        
                            createdCell: function (td, cellData, rowData, row, col) {
                           
                                $(td).attr('align', 'center')
                                $(td).css('display', 'none')
                           
                            }
                        },
                        {
                            data: "DESCRIPCION",
                            createdCell: function (td, cellData, rowData, row, col) {
                     
                                $(td).attr('align', 'left')
                            }
                        },
                        {
                            data: "PADRE",
                            createdCell: function (td, cellData, rowData, row, col) {
                           
                                $(td).attr('align', 'center')
                            }
                        },
                
                        {
                            data: "AFP",
                            createdCell: function (td, cellData, rowData, row, col) {
                          
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "ONP",
                            createdCell: function (td, cellData, rowData, row, col) {
                       
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "OTROS",
                            createdCell: function (td, cellData, rowData, row, col) {
                          
                                $(td).attr('align', 'center')
                                $(td).css('display', 'none')
                            }
                        },
                         {
                             data: "NESTADO",
                             createdCell: function (td, cellData, rowData, row, col) {

                                 $(td).attr('align', 'center')
             
                             }
                         }
              
                    ]

                }

                oTableRegimen = iniciaTabla('tblConfiguracion', parms);

                $('#tblConfiguracion').removeAttr('style');

         
                    $('#tblConfiguracion tbody').on('click', 'tr', function () {

                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            oTableRegimen.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');

                            var pos = oTableRegimen.fnGetPosition(this);
                            var row = oTableRegimen.fnGetData(pos);
                            var codigo = row.CODIGO;
                    

                         aa = $("#optanho").val();
                         mm = $("#optmes").val();
                         fe = mm + " " + aa;
                         fe = fe.toUpperCase();

                            window.location.href = '?f=BBMCONF&codigo=' + codigo + "&fe=" + fe + "&Emp=" + emp;
                     
                        }

                    });
           

          



            },
            error: function (msg) {
                alert(msg);
            }
        });

    }




    var eventos = function () {


        $("#btn_filtrar").on("click", function () {

            ListarConfiguracion();

        });


        
    }




    return {
        init: function () {

        
            eventos();
            $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
            $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
            ListarConfiguracion();

        }
    };







   
    
}();







function Listar_Concepto() {
    $('#cboConcepto').html('');
    var tipa = $('#cboParemetro').val();
    $.ajax({
        type: "post",
        url: "vistas/BB/ajax/BBMCONF.ASHX?Opcion=X&tipa=" + tipa,
        async: false,
        success: function (datos) {
            $('#cboConcepto').append(datos);
            $('#cboConcepto').select2();
        },
        error: function (msg) {
            alert(msg.d);
        }
    });
};

function Listar_Concepto_Codigo(codg) {
    $('#cboConcepto').html('');
    var tipa = $('#cboParemetro').val();
    $.ajax({
        type: "post",
        url: "vistas/BB/ajax/BBMCONF.ASHX?Opcion=Z&codg=" + codg + "&tipa=" + tipa,
        async: false,
        success: function (datos) {
            $('#cboConcepto').append(datos);
            $('#cboConcepto').select2();
        },
        error: function (msg) {
            alert(msg.d);
        }
    });
};







var BBMCONF = function () {

    var Listar_Parametro = function () {
        $('#cboParemetro').html('');
        $.ajax({
            type: "post",
            url: "vistas/BB/ajax/BBMCONF.ASHX?Opcion=P",
            async: false,
            success: function (datos) {
                $('#cboParemetro').html("");
                $('#cboParemetro').append(datos);
                $('#cboParemetro').select2();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var CargaInicial = function () {

        var codigo = ObtenerQueryString("codigo");
        var fe = ObtenerQueryString("fe");
        var emp = ObtenerQueryString("Emp");
        if (codigo != null) {

            $("#grabar").html("<i class='icon-pencil'></i>Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "POST",
                url: "vistas/BB/ajax/BBMCONF.ASHX?Opcion=0&codigo=" + codigo + "&fe=" + fe + "&Emp=" + emp,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#txtCodigo").val(datos[0].CODIGO);
                    $("#hfColumna").val(datos[0].COLUMNA);

                    $("#cboParemetro").select2("val", datos[0].PADRE).change();
                    Listar_Concepto_Codigo(datos[0].CODIGO)



                    $("#cboConcepto").val(datos[0].DESCRIPCION);
                    $('#cboConcepto').change();
                    $("#hfEstado").val(datos[0].ESTADO);
                 
                    $("#hfPeriodo").val(datos[0].PERIODO);
                    $("#hfEmpresa").val(emp);
                    $("#cboTipo").val(datos[0].TIPO);



                    if (datos[0].AFP == "1") {
          
                        $('#uniform-cbAFP span').removeClass().addClass("checked");
                        $('#cbAFP').attr('checked', true);
                    } else {
                        $('#uniform-cbAFP span').removeClass();
                        $('#cbAFP').attr('checked', false);
                    }

                    if (datos[0].ONP == "1") {
                        $('#uniform-cbONP span').removeClass().addClass("checked");
                        $('#cbONP').attr('checked', true);
                    } else {
                        $('#uniform-cbONP span').removeClass();
                        $('#cbONP').attr('checked', false);
                    }

                    if (datos[0].ESTADO == "1") {
                        $('#uniform-cboEstado span').removeClass().addClass("checked");
                        $('#cboEstado').attr('checked', true);
                    } else {
                        $('#uniform-cboEstado span').removeClass();
                        $('#cboEstado').attr('checked', false);
                    }
  
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        } else {
            $("#hfPeriodo").val(fe);
            $("#hfEmpresa").val(emp);
  
        }
    }


    return {
        init: function () {
            Listar_Parametro();
            Listar_Concepto();
            CargaInicial();
          
            
        }
    };



}();

function Nuevo() {
    //$("#txtCodigo").val();
    //var columna=$("#hfColumna").val();
    //var es = $("#hfEstado").val();
    var fe = $("#hfPeriodo").val();
    var emp = $("#hfEmpresa").val();

    window.location.href = "?f=BBMCONF&fe=" + fe + "&Emp=" + emp;

 
}

function NuevoListado() {
    var fe = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hffecha").val();
    var emp = $("#ctl00_hddctlg").val();

    window.location.href = "?f=BBMCONF&fe=" + fe + "&Emp=" + emp;


}
function Crear() {

    var v_Errors = true;

    v_Errors = Validar();

    if (v_Errors) {
        var emp = $("#ctl00_hddctlg").val();
        var descripcion = $('#cboConcepto').val();
        var padre = $('#cboParemetro').val();
        var usuario = $('#ctl00_lblusuario').html();

  




        var tipo = $('#cboTipo').val();

        var estado = $('#cboEstado').is(':checked') ? '1' : '0';

        var afp = $('#cbAFP').is(':checked') ? '1' : '0';
        var onp = $('#cbONP').is(':checked') ? '1' : '0';
        var otro = "0";
   

        Bloquear("ventana");

        $.post("vistas/BB/ajax/BBMCONF.ASHX",
            {
                opcion: 'C', emp: emp, descripcion: descripcion, padre: padre, estado: estado,
                afp: afp, onp: onp, otro: otro, usuario: usuario, tipo: tipo
            },
            function (res) {
                Desbloquear("ventana");
                if (res != 'EXIS' && res.length == 8) {
                    $('#txtCodigo').val(res);
                    $("#grabar").html("<i class='icon-pencil'></i> modificar");
                    $("#grabar").attr("href", "javascript:Modificar()");
                    exito();
                } else {
                    

            
                }
            });
    }
}

function Modificar() {

    var v_Errors = true;

    v_Errors = Validar();

    if (v_Errors) {
        
        var codigo = $("#txtCodigo").val();
        var emp = $("#ctl00_hddctlg").val();
        var descripcion = $('#cboConcepto').val();
        var padre = $('#cboParemetro').val();
        var usuario = $('#ctl00_lblusuario').html();
        var periodo = $("#hfPeriodo").val();
      

        var estado = $('#cboEstado').is(':checked') ? '1' : '0';

        var tipo = $('#cboTipo').val();

        var afp = $('#cbAFP').is(':checked') ? '1' : '0';
        var onp = $('#cbONP').is(':checked') ? '1' : '0';
        var otro = "0";
             

        Bloquear("ventana");

        $.post("vistas/BB/ajax/BBMCONF.ASHX",
            {
                opcion: 'M',codigo:codigo, emp: emp, descripcion: descripcion,periodo:periodo, padre: padre, estado: estado,
                afp: afp, onp: onp, otro: otro, usuario: usuario, tipo: tipo
            },
            function (res) {
               
                if (res == 'OK') {
                    
                    exito();
                }

                if (res == 'E') {

                    alertCustom("No es posible  modificar una configuracion del mes anterior")
                }
                Desbloquear("ventana");
            });
    }
}

function Validar() {
    var v_Errors = true;

    //if ($('#chkEstado').is(':checked')) {
    //    offObjectEvents('txtfechfin');
    //    if (!vErrorsNotMessage(["txtCodigoSunat", "txtPension", "txtfechi"])) {
    //        v_Errors = false;
    //    }
    //}
    //else {
    if (!vErrorsNotMessage(["cboConcepto"])) {
            v_Errors = false;
        }
    //}

    if (!v_Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
    }

    return v_Errors;
}