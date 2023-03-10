var NSMASIS = function () {
   
    return {
        init: function () {
            $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
            $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
            ListarSucursal();
            $('#cboSucursal').select2();
            $('#cboBiometrico').select2();
            $('#cboHoraEntrada').select2();
            $('#cboHoraSalida').select2();
            $('#cboFecha').select2();
            $('#cboHoraEntradaTrabajador').select2();
            $('#cboHoraSalidaTrabajador').select2();            
            var Sucu=$('#ctl00_hddestablecimiento').val();
            $('#cboSucursal').val(Sucu);
            CargaConfiguracion();

            $('#Tabla').append($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfTable').val());

           

           
            ListarAsistencia();
            $('#tblAsistencia').dataTable();
            
        }
    };
    function ListarSucursal() {
        $('#cboSucursal').empty();
        $.ajax({
            type: "post",
            //url: "vistas/NS/ajax/NSMASIS.ashx?Opcion=O&emp=" + $("#ctl00_hddctlg").val(),
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#ctl00_hddctlg").val(),
            async: false,
            success: function (datos) {
                if (datos != null) {
                    //$('#cboSucursal').append(datos);
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cboSucursal").select2("val", $("#ctl00_hddestablecimiento").val());
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };
    //function CargaConfiguracion() {

    //    var Emp = $("#ctl00_hddctlg").val();
    //    var Suc = $('#ctl00_hddestablecimiento').val();

    //    if (Emp != null) {

    //        //$("#grabar").html("<i class='icon-pencil'></i>Modificar");
    //        //$("#grabar").attr("href", "javascript:Modificar();");

    //        $.ajax({
    //            type: "POST",
    //            url: "vistas/NS/ajax/NSMASIS.ashx?Opcion=L&Emp=" + Emp + "&Suc=" + Suc,
    //            contentType: "application/json;",
    //            dataType: "json",
    //            success: function (datos) {
    //                $("#hfCodigo").val(datos[0].CODIGO);
    //                $('#cboBiometrico').val(datos[0].BIOMETRICO);
    //                $('#cboFecha').val(datos[0].FECHA);
    //                $('#cboHoraEntrada').val(datos[0].HORA_ENTRADA);
    //                $('#cboHoraSalida').val(datos[0].HORA_SALIDA);
    //                $('#cboHoraEntradaTrabajador').val(datos[0].HORA_ENTRADA_TRABAJADOR);
    //                $('#cboHoraSalidaTrabajador').val(datos[0].HORA_SALIDA_TRABAJADOR);
    //            },
    //            error: function (msg) {
    //                alert(msg);
    //            }
    //        });
    //    } else {
    //        //$("#hfPeriodo").val(fe);
    //        //$("#hfEmpresa").val(emp);
    //        //$("#cbAFP").val(emp);
    //        //$("#cbONP").val(emp);
    //    }
    //}
}();
function CargaConfiguracion() {

    var Emp = $("#ctl00_hddctlg").val();
    var Suc = $('#cboSucursal').val();
    var us = $('#ctl00_txtus').val();

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var cm = mm + " " + aa;


    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfEmpresa').val(Emp);

    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfSucursal').val(Suc);

    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val(us);

    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPeriodo').val(cm.toUpperCase());


    //$('#Tabla').last().remove();
    //$('#tblAsistencia').dataTable().fnDestroy()
    //$('#tblAsistencia').remove();
    //$('#DOS').remove();
    //$('#UNO').remove();
    //$('#DIVTABLA').remove();

    //$('#Tabla').append($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfTable').val());



    if (Emp != null) {

        //$("#grabar").html("<i class='icon-pencil'></i>Modificar");
        //$("#grabar").attr("href", "javascript:Modificar();");

        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMASIS.ashx?Opcion=L&Emp=" + Emp + "&Suc=" + Suc,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                //if (datos != "null") {
                    $("#hfCodigo").val(datos[0].CODIGO);
                    $('#cboBiometrico').val(datos[0].BIOMETRICO);
                    $('#cboFecha').val(datos[0].FECHA);
                    $('#cboHoraEntrada').val(datos[0].HORA_ENTRADA);
                    $('#cboHoraSalida').val(datos[0].HORA_SALIDA);
                    $('#cboHoraEntradaTrabajador').val(datos[0].HORA_ENTRADA_TRABAJADOR);
                    $('#cboHoraSalidaTrabajador').val(datos[0].HORA_SALIDA_TRABAJADOR);
                    $("#cboBiometrico, #cboFecha, #cboHoraEntrada, #cboHoraSalida, #cboHoraEntradaTrabajador, #cboHoraSalidaTrabajador").change();
                    $('#lblTitulo').text(" CONFIGURACIÓN DE COLUMNAS " + $('#cboSucursal :selected').text());
                    ListarAsistencia();
                //}
                
            },
            error: function (msg) {
                alert(msg);
            }
        });
    } else {
        //$("#hfPeriodo").val(fe);
        //$("#hfEmpresa").val(emp);
        //$("#cbAFP").val(emp);
        //$("#cbONP").val(emp);
    }
}
function Modificar() {

    var us = $('#ctl00_txtus').val();
    var cod = $("#hfCodigo").val();
    var bio = $("#cboBiometrico").val();
    var fec = $("#cboFecha").val();
    var he = $("#cboHoraEntrada").val();
    var hs = $("#cboHoraSalida").val();
    var het = $("#cboHoraEntradaTrabajador").val();
    var hst = $("#cboHoraSalidaTrabajador").val();

    var v_Errors = true;

    //v_Errors = validarRegimen();

    if (v_Errors) {      

        Bloquear("ventana");

        $.post("vistas/NS/ajax/NSMASIS.ashx",
            {
                opcion: 'M', cod: cod, bio: bio, fec: fec, he: he, hs: hs,
                het: het, hst: hst, us: us
            },
            function (res) {
                Desbloquear("ventana");
                if (res != 'EXIS') {
                    exito();
                } else {
                    //switch (res) {
                    //    //SI ESTA SIENDO USADO EL CODIGO DE SUNAT
                    //    case 'EXIS':
                    //        existeCod(cod_sunat);
                    //        break;
                    //        //SI ESTA SIENDO USADO LA DESCRIPCIÓN
                    //    case 'DUP':
                    //        duplicidadCod(pension);
                    //        break;
                    //        // SI ESTA SIENDO USADO EL CÓDIGO DE SUNAT Y LA DESCRIPCIÓN 
                    //    case 'CSN':
                    //        CodDescDup(cod_sunat, pension);
                    //        break;
                    //}
                }
            });
    }
}

var ListarAsistencia = function () {
    var v_Errors = true;

    var emp = $("#ctl00_hddctlg").val();

    var Sucu = $('#cboSucursal').val();


    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var cm = mm + " " + aa;

    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPeriodo').val(cm.toUpperCase());

    //var fe = $("#hffecha").val();

    if (!vErrorsNotMessage(["optanho", "optmes"])) {
        v_Errors = false;
    }
    
    $.ajax({
        type: "POST",
        url: "vistas/NS/ajax/NSMASIS.ashx?Opcion=D&Emp=" + emp + "&Suc=" + Sucu + "&peri=" + cm,
        //contentType: "application/json;",
        //dataType: "json",
        success: function (res) {
            //$('#DIVTABLA').html(res);
            Bloquear("Ventana");
            $('#Tabla').html(res);
            $('#tblAsistencia').dataTable({});
            Desbloquear("Ventana");
            //$('#tblAsistencia').dataTable({
            //    "scrollX": true,
            //    //"scrollY": true,
            //    "paging": false,
            //    "info": false,
            //    "searching": false,
            //    "sorting": false
            //});
        },
        error: function (msg) {
            alert(msg);
        }
    });
  
}

$('#optmes').on('change', function () {

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var cm = mm + " " + aa;

    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPeriodo').val(cm.toUpperCase());
});

//function Modificar() {



//    if (Emp != null) {

//        //$("#grabar").html("<i class='icon-pencil'></i>Modificar");
//        //$("#grabar").attr("href", "javascript:Modificar();");

//        $.ajax({
//            type: "POST",
//            url: "vistas/NS/ajax/NSMASIS.ashx?Opcion=L&Emp=" + Emp + "&Suc=" + Suc,
//            contentType: "application/json;",
//            dataType: "json",
//            success: function (datos) {
//                if (datos != "null") {
//                    $("#hfCodigo").val(datos[0].CODIGO);
//                    $('#cboBiometrico').val(datos[0].BIOMETRICO);
//                    $('#cboFecha').val(datos[0].FECHA);
//                    $('#cboHoraEntrada').val(datos[0].HORA_ENTRADA);
//                    $('#cboHoraSalida').val(datos[0].HORA_SALIDA);
//                    $('#cboHoraEntradaTrabajador').val(datos[0].HORA_ENTRADA_TRABAJADOR);
//                    $('#cboHoraSalidaTrabajador').val(datos[0].HORA_SALIDA_TRABAJADOR);
//                }

//            },
//            error: function (msg) {
//                alert(msg);
//            }
//        });
//    } else {
//        //$("#hfPeriodo").val(fe);
//        //$("#hfEmpresa").val(emp);
//        //$("#cbAFP").val(emp);
//        //$("#cbONP").val(emp);
//    }
//}

