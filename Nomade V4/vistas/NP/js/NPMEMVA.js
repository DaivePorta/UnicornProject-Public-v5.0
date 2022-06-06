var oTableVacacionesDetalle;
var oTableVac;
const EstadoVacGozada = 'G';
var NPMEMVA = function () {
    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();        
        $('#txtFechaInicio').datepicker();
        $('#txtFechaFin').datepicker();
    }


    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();            
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val());
                    fillCboEstablecimiento();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    };

    var fillCboEstablecimiento = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {

                    $('#cboSucursal').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    };

    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val() + "&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                $('#cboEmpleado').prepend('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', '').change();
                }
            },
            error: function (msg) {
                alertCustom("Empleados no se listaron correctamente");
            }
        });
    };



    function CargaContrato(v_PPBIDEN_PIDM, v_CTLG_CODE) {
        

        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=CONT&PIDM=" + v_PPBIDEN_PIDM + "&CTLG_CODE=" + v_CTLG_CODE + "&SCSL_CODE=&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (!isEmpty(datos)) {



                        $('#lblNroContrato').text(datos[0].NRO)
                        $('#lblFechaInicio').text(datos[0].FECHA_INI);
                        $('#lblFechaFin').text(datos[0].FECHA_FIN);
                        $('#lblEstadoCont').text(datos[0].ESTADO);

                        $('#lblFechaIngreso').text(datos[0].FECHA_INGRESO)

                        $('#lblRegLaboral').text(datos[0].REGLAB_DESC);
                        $('#hfREGLAB_CODE').val(datos[0].REGLAB_CODE);
                        $('#hfREGLAB_DIAS').val(datos[0].DIAS_VAC);
                        $('#hfSERIE_CONT').val(datos[0].SERIE);


                        $('#hfESTADO_CONT').val(datos[0].ESTADO_IND);

                        $('#DatosEmp').slideDown();
                        $('#btnAsignar').attr('disabled', 'disabled');
                        $('#cboEmpleado').attr('disabled', 'disabled');
                        $('#cboEmpresa').attr('disabled', 'disabled');
                        $('#cboSucursal').attr('disabled', 'disabled');

                        $('#btnCancelar').removeAttr('disabled');

                        GetPeriodoVac();
                        funcionalidadTabla();

                }
                else {
                    infoCustom("El empleado seleccionado no tiene un contrato asignado");
                }
            },
            error: function (msg) {

                alertCustom("Contrato no se listó correctamente");
            }
        });

    }



    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
        });


        $("#btnAsignar").on("click", function () {

            if ($('#btnAsignar').attr('disabled') != 'disabled') {
                if ($('#cboEmpleado').val() == "") {                   
                    infoCustom("Seleccione Empleado.")
                } else {
                       CargaContrato($('#cboEmpleado').val(), $("#cboEmpresa").val());
                }
            }

        });


        $("#btnCancelar").on("click", function () {
            if ($('#btnCancelar').attr('disabled') != 'disabled') {
                $('#btnAsignar').removeAttr('disabled');
                $('#cboEmpleado').removeAttr('disabled')
                $('#cboEmpresa').removeAttr('disabled')
                $('#cboSucursal').removeAttr('disabled')
          
                deshabilitaAgregarDetalle();

                $($(this).parents("tr")[0]).removeClass('selected');

                $('#DatosEmp').slideUp();
            }
        });


        $("#btnAddPeriodo").on("click", function () {
         

            var row = oTableVac.fnGetData(0);
            var NroFilas = oTableVac.fnGetData().length;
            var ultrow = oTableVac.fnGetData(NroFilas - 1)

            if ($('#hfESTADO_CONT').val() == 'F') {
                if (row[1] == "") {


                    if ($('#lblFechaFin').text() != '') {
                        if (DateDiff(new Date(ConvertirDate($('#lblFechaFin').text())), new Date(ConvertirDate($('#lblFechaIngreso').text()))) >= parseInt(pDiasVac)) {
                            CrearPeriodo();
                        }
                        else {
                            alertCustom("No se puede crear periodo,el trabajador debe tener un contrato mínimo de " + pDiasVac + " días");
                        }

                    }
                    else {
                        CrearPeriodo();
                    }



                }
                else {

                    if (ultrow[6] == ultrow[5]) {
                        //var nFechaIni = ultrow[3]
                        //var nFechaFin = $('#lblFechaFin').text()
                        //if (DateDiff(new Date(ConvertirDate(nFechaFin)), new Date(ConvertirDate(nFechaIni))) >= parseInt(pDiasVac)) {
                            CrearPeriodo();
                        //}
                        //else {
                        //    alertCustom("No se puede crear periodo,el trabajador debe tener un  mínimo de " + pDiasVac + " días en  relación al fin del  periodo anterior y a su nuevo contrato");
                        //}

                    }
                    else {
                        infoCustom("Para crear un nuevo periodo el trabajador debe gozar sus vacaciones del periodo anterior");
                    }

                }
            }
            else {
                infoCustom("EL contrato del empleado debe estar Firmado");
            }
        });


        $("#txtFechaInicio").datepicker().on("changeDate", function () {
            if ($("#txtFechaInicio").val() != '' && $("#txtFechaFin").val() != '') {
                CalculaDiasVac();
            }
        });

        $("#txtFechaFin").datepicker().on("changeDate", function () {
            if ($("#txtFechaInicio").val() != '' && $("#txtFechaFin").val() != '') {
                CalculaDiasVac();
            }
        });


        $("#btnAgregarVac").on("click", function () {
            if ($('#btnAgregarVac').attr('disabled') != 'disabled') {
                if ($('#hfESTADO_CONT').val() == 'F') {
                    CrearDetalleVac();
                }
                else {
                    alertCustom("El contrato del empleado debe estar firmado");
                }
            }
        });    
    }




    function CalculaDiasVac(){
        var diasV = DateDiff(new Date(ConvertirDate($("#txtFechaFin").val())), new Date(ConvertirDate($("#txtFechaInicio").val())));
        diasV = parseInt(diasV) + 1;
        $('#txtDias').val(diasV);
    }
  


    function cargainicial() {
        fillCboEmpresa();
        cargarParametrosSistema();
        $('#txtFechaInicio').attr('disabled', 'disabled');
        $('#txtFechaFin').attr('disabled', 'disabled');
        $('#btnAgregarVac').attr('disabled', 'disabled');
        $('#chkAdelanto').attr('checked', false).parent().removeClass("checked");
        $('#DatosEmp').slideUp();

        var pidm = ObtenerQueryString("pidm");
        var ctlg_code = ObtenerQueryString("ctlg_code");
        var scsl_code = ObtenerQueryString("scsl_code");

        if (pidm != undefined) {
            $('#cboEmpresa').select2('val', ctlg_code).change();
            $("#cboSucursal").select2('val', scsl_code).change();
            $('#cboEmpleado').select2('val', pidm).change();
            $('#btnAsignar').click();
        }

    }


        
    

    return {
        init: function () {
            plugins();
            eventoControles();
            cargainicial();

        }
    };

}();

var GetPeriodoVac = function () {
    var data = new FormData();
    data.append('PIDM', $('#cboEmpleado').val());
    data.append('SERIE', $('#hfSERIE_CONT').val())
    data.append('CTLG_CODE', $('#cboEmpresa').val())
    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NP/ajax/NPMEMVA.ashx?OPCION=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null) {
           $('#divPeriodoVac').html(datos);

           oTableVac = iniciaTabla('tblPeriodoVac' ,{})           
           oTableVac.api(true).columns(2).visible(false);
           oTableVac.api(true).columns(9).visible(false);
           oTableVac.api(true).columns(10).visible(false);

           $('#tblPeriodoVac_filter').remove();
           $('#tblPeriodoVac_length').remove();
           
           

       } else {
           noexito();    
       }
   })
   .error(function () {
       Desbloquear("ventana");
       noexito();
   });

}





function cargatablavaciaDetalleF(id, json) {

    oTableVacacionesDetalle = iniciaTabla(id, {
        data: json,
        columns: [
            //{
            //    data: { _: "FECHA.display", sort: "FECHA.order" },
            //    createdCell: function (td, cellData, rowData, row, col) {
            //        $(td).attr('align', 'center');

            //    }
            //},

             {
                 data: "ITEM",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },

             {
                 data: "FECHA_INICIO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
             {
                 data: "FECHA_FIN",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },



            {
                data: "DIAS",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },


            {
                data: "ESTADO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    //var valor = cellData;
                    //$(td).html(rowData.SIMBOLO_MONEDA + formatoMiles(valor));
                }
            },

              {
                  data: "ESTADO_IND",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center');
                  }
              },


               {
                    data: null,                 
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).css('text-align', 'center');
                        if (rowData.ESTADO_IND !== EstadoVacGozada) {
                            $(td).html("<a class='btn green ActVac' style='margin-left: 21px;' title='Goce Vacaciones'><i class='icon-ok-sign'></i></a> <a class='btn black ImpVac' title='Imp. Constancia'><i class='icon-print'></i></a> ");
                        }
                        else {
                            $(td).html(" <a class='btn black ImpVac' title='Imp. Constancia'><i class='icon-print'></i></a> ");
                        }

                    }
                },

        {
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).attr('align', 'center')
                $(td).css('text-align', 'center');
                if (rowData.ESTADO_IND !== EstadoVacGozada) {
                    $(td).html("<a class='btn red DelVac' title='Eliminar Vac.'><i class='icon-trash'></i></a>");
                }
                else {
                    $(td).html("");
                }
            }
        }

        ],
        "paging": false,
        scrollCollapse: true,
        //  sort: false,
        "sDom": "t"

    });
    oTableVacacionesDetalle.api(true).columns(0).visible(false);
    oTableVacacionesDetalle.api(true).columns(5).visible(false);
    

}

function EliminaDetalleVac(ITEM) {
    alert(ITEM)

}

function CrearPeriodo() {

  
        var varPeriodoVac = true

        varPeriodoVac = validarPeriodoVac();

        if (varPeriodoVac) {

            //Datos Basicos
            var PIDM = $('#cboEmpleado').val();
            var SERIE = $('#hfSERIE_CONT').val();
            var DIAS = $('#hfREGLAB_DIAS').val();
            var USUARIO = $('#ctl00_txtus').val();
            var CTLG_CODE = $('#cboEmpresa').val();
                        
            var data = new FormData();
            data.append('OPCION', "3");
            data.append('PIDM', PIDM);
            data.append('SERIE', SERIE);
            data.append('DIAS', DIAS);
            data.append('USUARIO', USUARIO);
            data.append('CTLG_CODE', CTLG_CODE);
               
            Bloquear("ventana");

            $.ajax({
                type: "POST",
                url: "vistas/np/ajax/npmemva.ashx",
                data: data,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        if (datos[0].SUCCESS == "OK") {
                            if (datos[0].VALIDACION != "") {
                                alertCustom(datos[0].VALIDACION);
                            }
                            else {
                                exito();
                                GetPeriodoVac();
                                funcionalidadTabla();
                                
                            }
                        }
                    }
                    else {
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexito();
                }
            });
        }


    

}



function CrearDetalleVac() {


    var varDetalleVac = true

    varDetalleVac = validarDetalleVac();

    if (varDetalleVac) {

        //Datos Basicos
        var PIDM = $('#cboEmpleado').val();
        var SECUENCIA = $('#hfSECUENCIA_VAC').val();
        var FECHA_INI = $('#txtFechaInicio').val();
        var FECHA_FIN = $('#txtFechaFin').val();
        var DIAS = $('#txtDias').val();
        var ESTADO = 'P';
        var USUARIO = $('#ctl00_txtus').val();
        var ADEL_IND = $('#chkAdelanto').is(':checked') == true ? 'S' : 'N';
        var CTLG_CODE = $('#cboEmpresa').val();

        var data = new FormData();
        data.append('OPCION', "4");
        data.append('PIDM', PIDM);
        data.append('SECUENCIA', SECUENCIA);
        data.append('FECHA_INI', FECHA_INI);
        data.append('FECHA_FIN', FECHA_FIN);
        data.append('DIAS', DIAS);
        data.append('ESTADO', ESTADO);
        data.append('USUARIO', USUARIO);
        data.append('ADEL_IND', ADEL_IND);
        data.append('CTLG_CODE', CTLG_CODE);

        
        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/np/ajax/npmemva.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].VALIDACION != "") {
                            alertCustom(datos[0].VALIDACION);
                        }
                        else {
                            exito();
                            $('#txtDias').val('');
                            $('#txtFechaInicio').val('');
                            $('#txtFechaFin').val('');
                            GetPeriodoVac();
                            funcionalidadTabla();
                            
                        }
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexito();
            }
        });
    }




}



function validarPeriodoVac() {

    var v_continue = true;
    return v_continue;

}

function validarDetalleVac() {

    var v_continue = true;

    var row = oTableVac.fnGetData($('#hfPOSICION').val());

    var diasPeriodo = row[5];
    var diasGoz = row[6];
    var diasProg = row[8];
    var dias = $('#txtDias').val();

    var fechaIni = $('#txtFechaInicio').val();
    var fechaFin = $('#txtFechaFin').val();

    var fechainiOrig = row[9];



    if ($('#lblFechaFin').text() != '') {
        var diasOrig = DateDiff(new Date(ConvertirDate($('#lblFechaFin').text())), new Date(ConvertirDate(fechainiOrig)));
        diasOrig = parseInt(diasOrig) + 1;

        if (parseInt(diasOrig) < 365) {
            diasPeriodo = parseInt((parseInt(diasOrig) * diasPeriodo) / 365)
        }
    }
 


    var NroFilas = 0;

    if (oTableVacacionesDetalle == null) {
        NroFilas = 0;
    }
    else {
        NroFilas = oTableVacacionesDetalle.fnGetData().length;
    }
     
    if (!vErrors(['txtFechaInicio', 'txtFechaFin'])) {
        v_continue = false;
    }
    else if (DateDiff(new Date(ConvertirDate(fechaFin)), new Date(ConvertirDate(fechaIni))) <= 0) {
            v_continue = false;
            infoCustom("La Fecha de Inicio no puede ser mayor o igual a la Fecha de Fin");
        }

    else if ((parseInt(diasGoz) + parseInt(diasProg) + parseInt(dias)) > parseInt(diasPeriodo)) {

        vErrorsNotMessage(['txtDias']);
        v_continue = false;
        infoCustom("La cantidad de días supera el total de dias correspondientes al periodo: " + diasPeriodo + " días");
    }

    else if (parseInt(NroFilas) > 0) {
        for (var i = 0; i <= parseInt(NroFilas) - 1; i++) {
            var row = oTableVacacionesDetalle.fnGetData(i);
            fechaIni_Tabla = row["FECHA_INICIO"]
            fechaFin_Tabla = row["FECHA_FIN"]

            fechaIni_Tabla = (fechaIni_Tabla).split("/").reverse().join("");
            fechaFin_Tabla = (fechaFin_Tabla).split("/").reverse().join("");

            fechaIni = (fechaIni).split("/").reverse().join("");
            fechaFin = (fechaFin).split("/").reverse().join("");


            if (parseInt(fechaIni) >= parseInt(fechaIni_Tabla) && parseInt(fechaIni) <= parseInt(fechaFin_Tabla)) {
                v_continue = false;
            }
            else if (parseInt(fechaFin) >= parseInt(fechaIni) && parseInt(fechaFin) <= parseInt(fechaFin_Tabla)) {
                v_continue = false;
            }

            if (!v_continue) {
                infoCustom("El rango de fechas ingresado ya está tomado o programado");
            }

        }
    }

    return v_continue;

}
var funcionalidadTabla = function () {


    $('#tblPeriodoVac tbody').on('click', '.detVac', function () {

        var pos = oTableVac.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableVac.fnGetData(pos);

        var id = row[1];
        var pidm = $('#cboEmpleado').val();
        var seq = row[2];
        var nTr = $(this).parents('tr')[0];
        var fechaIni = row[3];
        var fechaFin = row[4];
        var fechaIniOrig = row[9];
        var fechaFinOrig = row[10];


        $('#chkAdelanto').on('change', function () {
            if ($('#chkAdelanto').is(':checked')) {
                $('#txtFechaInicio').datepicker('setStartDate', fechaIniOrig).datepicker('update');
                $('#txtFechaInicio').datepicker('setEndDate', fechaFinOrig).datepicker('update');
                $('#txtFechaFin').datepicker('setStartDate', fechaIniOrig).datepicker('update');
                $('#txtFechaFin').datepicker('setEndDate', fechaFinOrig).datepicker('update');

            }
            else {
                $('#txtFechaInicio').datepicker('setStartDate', fechaIni).datepicker('update');
                $('#txtFechaInicio').datepicker('setEndDate', fechaFin).datepicker('update');
                $('#txtFechaFin').datepicker('setStartDate', fechaIni).datepicker('update');
                $('#txtFechaFin').datepicker('setEndDate', fechaFin).datepicker('update');

            }
            $('#txtFechaInicio').val('');
            $('#txtFechaFin').val('');

        });



        if (oTableVac.fnIsOpen(nTr)) {
            /* This row is already open - close it */
            this.src = "recursos/img/details_open.png";
            oTableVac.fnClose(nTr);
            deshabilitaAgregarDetalle();
            $($(this).parents("tr")[0]).removeClass('selected');
        }
        else {
            /* Open this row */
            this.src = "recursos/img/details_close.png";
            //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');
            $('#lblNroPeriodo').text(id);
            $('#hfSECUENCIA_VAC').val(seq);
            $('#hfPOSICION').val(pos);


            $('#txtFechaInicio').removeAttr('disabled');
            $('#txtFechaFin').removeAttr('disabled');
            $('#btnAgregarVac').removeAttr('disabled');
            $('#txtFechaInicio').datepicker('setStartDate', fechaIni);
            $('#txtFechaInicio').datepicker('setEndDate', fechaFin);
            $('#txtFechaFin').datepicker('setStartDate', fechaIni);
            $('#txtFechaFin').datepicker('setEndDate', fechaFin);
            $('#chkAdelanto').attr('checked', false).parent().removeClass("checked");
            $('#chkAdelanto').removeAttr('disabled');

            oTableVac.$('tr.selected').removeClass('selected');
            $($(this).parents("tr")[0]).addClass('selected');

            oTableVac.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
            oTableVac.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
            $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/np/ajax/npmemva.ashx?OPCION=2&PIDM=" + pidm + "&CTLG_CODE="  + $("#cboEmpresa").val() +  "&SECUENCIA=" + seq,
                async: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    var str = "";
                    var resb = "";
                    if (datos == "") {
                        resb = "No hay datos disponibles!"; $('#c' + id).html(resb);
                        oTableVacacionesDetalle = null;
                    }
                    else {
                        resb += "<table id='tblDetalleVac" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
                        resb += "<thead>";
                        resb += '<tr align="center">';
                        resb += "<th>ITEM</th>";
                        resb += "<th>FECHA_INICIO</th>";
                        resb += "<th>FECHA_FIN</th>";
                        resb += "<th>DIAS</th>";
                        resb += "<th>ESTADO</th>"
                        resb += "<th>ESTADO_IND</th>";
                        resb += "<th></th>";
                        resb += "<th></th>";
                        resb += "</tr>";
                        resb += "</thead>";
                        resb += "</table>";

                        $('#c' + id).html(resb);

                        oTableVacacionesDetalle = null;
                        cargatablavaciaDetalleF("tblDetalleVac" + id, $.parseJSON(datos));
                        funcionalidadTablaDetalle("#tblDetalleVac" + id);

                      
                      


                    }

                  
                }
            });

        }



       




    });

    function fnFormatDetails(nTr, id) {
        
        var sOut = '<div id="c' + id + '"></div>';
        return sOut;
    }
}


var deshabilitaAgregarDetalle = function () {

    $('#lblNroPeriodo').text('');
    $('#hfSECUENCIA_VAC').val('');
    $('#hfPOSICION').val('');
    $('#txtDias').val('');

    $('#txtFechaInicio').val('');
    $('#txtFechaFin').val('');
    $('#txtFechaInicio').attr('disabled', 'disabled');
    $('#txtFechaFin').attr('disabled', 'disabled');
    $('#btnAgregarVac').attr('disabled', 'disabled')

    $('#chkAdelanto').attr('checked', false).parent().removeClass("checked");
    $('#chkAdelanto').attr('disabled', 'disabled');


}


var funcionalidadTablaDetalle = function (id) {

    
    $(id + ' tbody').on('click', '.DelVac', function () {


        if ($('#hfESTADO_CONT').val() == 'F') {
            var pos = oTableVacacionesDetalle.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableVacacionesDetalle.fnGetData(pos);


            var estadoIND = row["ESTADO_IND"];
            if (estadoIND == 'P') {



                var ITEM = row["ITEM"];

                var data = new FormData();
                data.append('OPCION', "5");
                data.append('ITEM', ITEM);


                Bloquear("ventana");

                $.ajax({
                    type: "POST",
                    url: "vistas/np/ajax/npmemva.ashx",
                    data: data,
                    contentType: false,
                    processData: false,
                    cache: false,
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos != null) {
                            if (datos[0].SUCCESS == "OK") {
                                if (datos[0].VALIDACION != "") {
                                    alertCustom(datos[0].VALIDACION);
                                }
                                else {
                                    exito();
                                    GetPeriodoVac();
                                    funcionalidadTabla();
                                    deshabilitaAgregarDetalle();

                                }
                            }
                        }
                        else {
                            noexito();
                        }
                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        noexito();
                    }
                });
            }
            else {
                alertCustom("No se puede eliminar,las Vacaciones ya fueron gozadas");
            }
        }
        else {

            alertCustom("No se puede eliminar Vacaciones , el contrato debe estar firmado");
        }
       
    });

    
    $(id + ' tbody').on('click', '.ActVac', function () {

        if ($('#hfESTADO_CONT').val() == 'F') {
            var pos = oTableVacacionesDetalle.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableVacacionesDetalle.fnGetData(pos);

           

            var estadoIND = row["ESTADO_IND"];
            if (estadoIND == 'P') {
                var fechaIni = row["FECHA_INICIO"];
                var fechaFin = row["FECHA_FIN"];
                var fechaFinCont = $('#lblFechaFin').text();
                var bandera = true

                fechaIni = (fechaIni).split("/").reverse().join("");
                fechaFin = (fechaFin).split("/").reverse().join("");
                fechaFinCont = (fechaFinCont).split("/").reverse().join("");

                if ($('#lblFechaFin').text() != '') {
                    if (fechaIni <= fechaFinCont && fechaFin <= fechaFinCont) {
                        bandera = true;
                    }
                    else {
                        bandera = false
                        alertCustom("El empleado no puede gozar vacaciones después de la fecha de fin de su contrato actual")
                    }          
                }

                
                if (bandera){
                        var ITEM = row["ITEM"];
                        var ESTADO = 'G'

                        var data = new FormData();
                        data.append('OPCION', "6");
                        data.append('ITEM', ITEM);
                        data.append('ESTADO', ESTADO);


                        Bloquear("ventana");

                        $.ajax({
                            type: "POST",
                            url: "vistas/np/ajax/npmemva.ashx",
                            data: data,
                            contentType: false,
                            processData: false,
                            cache: false,
                            async: false,
                            success: function (datos) {
                                Desbloquear("ventana");
                                if (datos != null) {
                                    if (datos[0].SUCCESS == "OK") {
                                        if (datos[0].VALIDACION != "") {
                                            alertCustom(datos[0].VALIDACION);
                                        }
                                        else {
                                            exito();
                                            GetPeriodoVac();
                                            funcionalidadTabla();

                                        }
                                    }
                                }
                                else {
                                    noexito();
                                }
                            },
                            error: function (msg) {
                                Desbloquear("ventana");
                                noexito();
                            }
                        });
                    }
                    //else {
                    //    alertCustom("El empleado no puede gozar vacaciones después de la fecha de fin de su contrato actual")
                    //}
                
            }
            else {
                alertCustom("No se puede actualizar,las Vacaciones ya fueron gozadas");
            }
        }
        else {
            alertCustom("No se puede actualizar estado de Vacaciones , el estado del último contrato debe estar firmado");
        }

    });


    $(id + ' tbody').on('click', '.ImpVac', function () {

        //if ($('#hfESTADO_CONT').val() != 'I') {
            var pos = oTableVacacionesDetalle.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableVacacionesDetalle.fnGetData(pos);
            var estadoIND = row["ESTADO_IND"];
            if (estadoIND == 'G') {
               
                    var ITEM = row["ITEM"];
                    var CTLG_CODE = $('#cboEmpresa').val();
                   var PIDM = $('#cboEmpleado').val()
                    var data = new FormData();
                    data.append('OPCION', "7");
                    data.append('ITEM', ITEM);
                    data.append('CTLG_CODE', CTLG_CODE);
                   
                    $.ajax({
                        type: "POST",
                        url: "vistas/np/ajax/npmemva.ashx",
                        data: data,
                        contentType: false,
                        processData: false,
                        cache: false,
                        async: false,
                        success: function (datos) {
                            if (datos == "OK") {
                            
                                exito();
                                var NombArchivo = ITEM + PIDM
                                window.open('/Archivos/' + NombArchivo + '.pdf', '_blank')
                               
                            } else {

                               noexito
                            }

                            Desbloquear("ventana");
                        },
                        error: function (msg) {
                            alertCustom(msg);
                            Desbloquear("ventana");
                        }

                    });
               
            }
            else {
                infoCustom("Sólo se puede imprimir constancia de vacaciones gozadas.");
            }
        //}
        //else {
        //    alertCustom("No se puede actualizar estado de Vacaciones , el estado del último contrato es TERMINADO");
        //}

    });

    
   
}

var pDiasVac;
var cargarParametrosSistema = function () {

    //OBTENER PARAMETRO DE REDONDEO
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIVA",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                pDiasVac = datos[0].VALOR - 1;
            }
            else {
                alertCustom("No se recuperó el Parámetro de días de Vacaciones");
                pDiasVac = '364';
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}