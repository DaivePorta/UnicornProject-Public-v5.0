var oTableEmpleado;
var oTableBenef;


function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}


var NPMEMDH = function () {

    var plugins = function () {
        $("#cboParentesco, #cboVincFam , #cboMotivoBaja").select2();

        $("#txtFechaIni").datepicker();
        $("#txtFechaIni").inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $("#txtFechaIni").datepicker("setDate", "now");

        $("#txtFechaFin").datepicker();
        $("#txtFechaFin").inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $("#txtFechaFin").datepicker("setDate", "now");

    }

    var eventoControles = function () {

        $('#btnCancelarBenef').on('click', function () {
            limpiaDerechoHabientes();
        });

        $('#btnAceptarConfir').on('click', function () {

            var idDerechoHab = $("#hfIdBenef").val();
            var FechaIni = $('#hfFechaIni').val();
            var FechaFin = $("#txtFechaFin").val();
            var CodMotivoBaja = $("#cboMotivoBaja").val();

            if (idDerechoHab == "") {
                noexitoCustom("Error al desactivar Derechohabiente");
                return;
            }
            else if (FechaFin == "" || CodMotivoBaja == "") {
                alertCustom("Ingrese el Motivo de Baja y la Fecha de Fin");
                return;
            }


            Bloquear("modal-confirmar")

            setTimeout(function () {
                $.ajax({
                    type: "post",
                    url: "vistas/np/ajax/npmemdh.ashx?sOpcion=DDH&IdDerechoHab=" + idDerechoHab + "&sFechaFin=" + FechaFin + "&sCodMotivoBaja=" + CodMotivoBaja + "&sFechaIni=" + FechaIni,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    success: function (datos) {

                        if (datos == 'OK') {
                            exito();
                            $("#txtFechaFin").datepicker("setDate", "now");
                            listaDerechoHAb();
                            $("#modal-confirmar").modal("hide");
                        }
                        else if (datos == 'fecha') {
                            alertCustom("La Fecha Fin debe sera Mayor a la Fecha de Inicio del Derechohabiente")
                        }
                        else {
                            noexitoCustom("Error al desactivar");
                            $("#modal-confirmar").modal("hide");
                        }
                        Desbloquear("modal-confirmar")

                    },
                    error: function (msg) {
                        noexitoCustom("Error al al desactivar Derechohabiente");
                        $("#modal-confirmar").modal("hide");
                        Desbloquear("modal-confirmar")
                    }
                });


            }, 500)
          
        });

        $("#btnCancelarConfir").on("click", function () {
            $("#modal-confirmar").modal("hide");
            $("#hfIdBenef").val("");
        });

    }
   

    
    var cargaInicial = function () {

        var cod = ObtenerQueryString("pidm");
        var ctlg = ObtenerQueryString("ctlg");

        console.log(ctlg);

        if (cod != undefined) {

            $.ajax({
                type: "POST",
                url: "vistas/nc/estereotipos/ajax/Empleado.ASHX?OPCION=LEMP&PIDM=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    if (!isEmpty(datos)) {

                        $('#hfIDPEREMP').val(datos[0].PIDM);
                        $('#hfDOCEMP').val(datos[0].DNI);
                        $('#hfCODESTADO').val(datos[0].ESTADO_IND)
                        $('#txtDniEmpleado').val(datos[0].DNI);
                        $('#txtNombreEmpleado').val(datos[0].NOMBRE_EMPLEADO);

                        limpiaDerechoHabientes();
                        listaDerechoHAb();

                        if ($('#hfCODESTADO').val() == 'A') {
                            $("#divBeneficiario").slideDown();
                            $("#divInfo").html("");
                        }
                        else {
                            $("#divBeneficiario").slideUp();
                            $("#divInfo").html("<div class=\"span12\"><div class=\"alert alert-block alert-info fade in\"><h4 class=\"alert-heading\">Info!</h4><p>No se puede agregar derechohabientes porque el empleado no está activo </b></p></div></div>");
                        }


                    }
                    else {
                        noexitoCustom('Error al obtener Información del Empleado');
                    }
                },
                error: function (msg) {
                    noexitoCustom('Error al obtener Información del Empleado');
                }
            });

        }
    }


    return {
        init: function () {
            plugins();
            eventoControles();                    
            fillcboVinculoFam();
            iniciaTablaDerechoHab();
            iniciaTablaEmpleado();
            iniciaTablaPersona();            
            
            $("#divBeneficiario").slideUp();
            cargaInicial();

        }
    };
}();


// ------- EMPLEADO ------//

var showModalEmpleado = function () {

    Bloquear("div_empl")
    setTimeout(function () {

        listaEmpleados();


    }, 1000)

   
}

var iniciaTablaEmpleado = function () {

    if (typeof oTableEmpleado != "undefined") {
        oTableEmpleado.fnClearTable();
    }
    var json = null;
    var parms = {
        data: json,
        order: [[3, 'asc']],
        info: true,
        paging: true,
        iDisplayLength: 5,
        columns: [

            {
                data: "DNI",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left');
                }

            },

                       {
                           data: "NOMBRE_EMPLEADO",
                           createdCell: function (td, cellData, rowData, row, col) {
                               $(td).css('text-align', 'left');
                           }

                       },
                             {
                                 data: "SCSL_DESC",
                                 createdCell: function (td, cellData, rowData, row, col) {
                                     $(td).css('text-align', 'left');
                                 }
                             },
               {
                   data: "CARGO",
                   createdCell: function (td, cellData, rowData, row, col) {
                       $(td).css('text-align', 'left');
                   }

               },
                     {
                         data: "ESTADO",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css('text-align', 'left');
                         }

                     },
                           {
                               data: "PIDM",
                               visible: false,
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).attr('style', 'display:none');
                               }

                           },
                            {
                                data: "ESTADO_IND",
                                visible: false,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).attr('style', 'display:none');
                                }

                            }


        ]

    }
    oTableEmpleado = iniciaTabla("tbl_empleado", parms);

    $('#tbl_empleado tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('#hfPOSICION').val('');
        }
        else {
            oTableEmpleado.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var pos = oTableEmpleado.fnGetPosition(this);
            $('#hfPOSICION').val(pos);

        }
    });


}




var listaEmpleados = function () {


    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/empleado.ashx?OPCION=LEMP",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (!isEmpty(datos)) {
                if (typeof oTableEmpleado != "undefined") {
                    oTableEmpleado.fnClearTable();
                }
                oTableEmpleado.fnAddData(datos);
                setTimeout(function () {
                    oTableEmpleado.fnAdjustColumnSizing()
                }, 200)
                $('#hfPOSICION').val('');
                $('#ModalEmpleado').modal('show');
                
            }
            else {
                if (typeof oTableEmpleado != "undefined") {
                    oTableEmpleado.fnClearTable();
                }

            }
            Desbloquear("div_empl")
        },
        error: function (msg) {
            noexitoCustom("Error al obtener lista de Empleados");
            Desbloquear("div_empl")
        }
    });


}

var seleccionaEmpleado = function () {
    if (typeof oTableEmpleado != "undefined") {

        if ($('#hfPOSICION').val() != '[object Object]' && $('#hfPOSICION').val() != '') {
            var row = oTableEmpleado.fnGetData($('#hfPOSICION').val())
            var NobreEmpleado = row['NOMBRE_EMPLEADO'];
            var idPerSoc = row['PIDM'];
            var NroDoc = row['DNI'];
            var EstadoInd = row['ESTADO_IND'];

            $('#hfPOSICION').val('');
            $('#hfIDPEREMP').val(idPerSoc);
            $('#hfDOCEMP').val(NroDoc);
            $('#hfCODESTADO').val(EstadoInd)


            $('#txtDniEmpleado').val(NroDoc);
            $('#txtNombreEmpleado').val(NobreEmpleado);

            limpiaDerechoHabientes();
            $('#ModalEmpleado').modal('hide');

            if ($('#txtDniEmpleado').parent().parent().hasClass('error')) {
                $('#txtDniEmpleado').parent().parent().removeClass('error').addClass('success')
                $('#txtNombreEmpleado').parent().parent().removeClass('error').addClass('success')
            }

            listaDerechoHAb();
            if ($('#hfCODESTADO').val() == 'A') {
                $("#divBeneficiario").slideDown();
                $("#divInfo").html("");
            }
            else {
                $("#divBeneficiario").slideUp();
                $("#divInfo").html("<div class=\"span12\"><div class=\"alert alert-block alert-info fade in\"><h4 class=\"alert-heading\">Info!</h4><p>No se puede agregar derechohabientes porque el empleado no está activo </b></p></div></div>");
            }

        }
        else {
            alertCustom('Seleccione Empleado')
        }

    }

}

//------------------------//


var limpiaDerechoHabientes = function () {
    $('#txtBeneficiario').val('');
    $("#cboParentesco").select2('val', '').change();
    $("#cboParentesco").attr('disabled', 'disabled');
    $("#cboVincFam").select2('val', '').change();
    $("#cboVincFam").attr('disabled', 'disabled');

    $('#fhIDPERSONA').val('');
    $('#hfSEXOPER').val('');
    $("#divInfo").html('');

    $("#txtFechaIni").datepicker("setDate", "now");
}



// ------- PERSONA ------//
var contador = 0;

var iniciaTablaPersona = function () {
    var json = null;
    var parms = {
        data: json,
        responsive: true,
        // order: [[3, 'asc']],
        info: true,
        paging: true,
        iDisplayLength: 5,
        columns: [
             {
                data: "PIDM",
                visible: false,
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('style', 'display:none');
                 }

             },
          {
              data: "DOCUMENTOS",
              createdCell: function (td, cellData, rowData, row, col) {
                  var json_parc = JSON.parse(cellData);
                  $(td).attr('align', 'center')
                  var newString = new Array;
                  json_parc.filter(function (a) { newString.push(a.TIPO_DOCUMENTO) })

                  $(td).html(newString.join("<BR>"));

              }
          },
        {
            data: "DOCUMENTOS",
            createdCell: function (td, cellData, rowData, row, col) {

                $(td).attr('align', 'center')
                var json_parc = JSON.parse(cellData);
                $(td).attr('align', 'center')
                var newString = new Array;
                json_parc.filter(function (a) { newString.push(a.NRO_DOCUMENTO) })

                $(td).html(newString.join("<BR>"));

            }
        },
            {
                data: "NOMBRE_COMP",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'LEFT')
                }
            },
        {
            data: "SEXO",
            visible: false,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).attr('style', 'display:none');
            }
        }

        ]

    }

    oTablePersona = iniciaTabla("tbl_Persona", parms);


    if (contador == 0) {

        $('#tbl_Persona tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $('#hfPOSICIONPER').val('');
            }
            else {
                oTablePersona.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                if (typeof oTablePersona != "undefined") {
                    var pos = oTablePersona.fnGetPosition(this);
                }
                $('#hfPOSICIONPER').val(pos);
            }
        });
    }



}

var showModalPersona = function () {

    if ($('#hfDOCEMP').val() == '' || $('#hfIDPEREMP').val() == '' || $('#hfCODESTADO').val() == '') {
        vErrorsNotMessage(['txtDniEmpleado']);
        vErrorsNotMessage(['txtNombreEmpleado']);
        alertCustom('Seleccione primero el Empleado');
    }
    else {

        Bloquear("div_pers")
        //setTimeout(function () {

            ListarPersonas();
           
        //}, 1000)
       
       
    }

}

function ListarPersonas() {

    $.ajax({
        type: "POST",
        url: "vistas/NP/ajax/NPMEMDH.ashx?sOpcion=1&nIdPersSoc=" + $('#hfIDPEREMP').val(),
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            
            if (!isEmpty(datos)) {
                if (typeof oTablePersona != "undefined") {
                    oTablePersona.fnClearTable();
                }
                oDatos = datos;
                //oTablePersona.fnAddData(datos);
                //setTimeout(function () {
                //    oTablePersona.fnAdjustColumnSizing();
                //}, 200)                
                //contador = 1;
               

            }
            else {
                if (typeof oTablePersona != "undefined") {
                    oTablePersona.fnClearTable();
                }

            }
            Desbloquear("div_pers")
        },
        complete: function () {
            
                oTablePersona.fnClearTable();
                if (!isEmpty(oDatos)) {
                    oTablePersona.fnAddData(oDatos);
                    contador = 1;
                    $('#ModalPersona').modal('show');
                }
            setTimeout(function () {
                    oTablePersona.fnAdjustColumnSizing();
            }, 500);

        },
        error: function (msg) {
            noexitoCustom("Error al Listar Persona");
            Desbloquear("div_pers")
        }
    });

}

var seleccionaPersona = function () {
    if (typeof oTablePersona != "undefined") {
        var CodSocio;
        if ($('#hfPOSICIONPER').val() != '[object Object]' && $('#hfPOSICIONPER').val() != '') {
            var row = oTablePersona.fnGetData($('#hfPOSICIONPER').val())
            var NobrePersona = row['NOMBRE_COMP'];
            var IdPersona = row['PIDM'];
            var SexoPEr = row['SEXO'];

            if (IdPersona == $('#hfIDPEREMP').val()) {
                alertCustom('Seleccione una persona que no sea e');
                return;
            }

            $('#hfPOSICIONPER').val('');
            $('#txtBeneficiario').val(NobrePersona);
            $('#fhIDPERSONA').val(IdPersona)
            $('#hfSEXOPER').val(SexoPEr)
            $("#cboVincFam").removeAttr('disabled');
           // fillcboParentesco();
           // verificaFamiliar();
            $('#ModalPersona').modal('hide');

            if ($('#txtBeneficiario').parent().parent().hasClass('error')) {
                $('#txtBeneficiario').parent().parent().removeClass('error').addClass('success')
                $('#txtBeneficiario').parent().parent().removeClass('error').addClass('success')
            }

        }
        else {
            alertCustom('Seleccione Persona')
        }

    }

}

// ---------------- ------//



//------- LLENADO COMBOS ------//

var fillcboParentesco = function () {
    select = $('#cboParentesco');
    $.ajax({
        type: "post",
        url: "vistas/AD/ajax/ADMSOBE.ASHX?sOpcion=2&sCodigo=&sGenero=" + $('#hfSEXOPER').val() + "&sFamilia=&sEstado=A",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            select.empty();
            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        select.append('<option></option>');
                    }
                    select.append('<option value="' + datos[i].COD_PAREN + '" value_Fam ="' + datos[i].IND_FAMILIA + '">' + datos[i].DESC_PAREN + '</option>');
                }
                $("#cboParentesco").select2()
            }
            else {
                select.append('<option></option>');
                $("#cboParentesco").select2()
            }

        },
        error: function (msg) {
            noexitoCustom("Error al obtener lista de Parentesco.");
            $("#cboParentesco").select2()
        }
    });
}

var fillcboVinculoFam = function (CodParentesco) {
    select = $('#cboVincFam');
    $.ajax({
        type: "post",
        url: "vistas/NP/ajax/NPMEMDH.ASHX?sOpcion=LVXP&sEstado=A",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            select.empty();
            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        select.append('<option></option>');
                    }
                    select.append('<option value="' + datos[i].Codigo + '" val_sunat ="' + datos[i].Codigo_Sunat + '" val_gen ="' + datos[i].GENERO + '">' + datos[i].Descripcion + '</option>');
                }
                select.select2()
                $('#cboVincFam').removeAttr('disabled')
            }
            else {
                select.append('<option></option>');
                select.select2()
                $('#cboVincFam').attr('disabled', 'disabled')
            }
        },
        error: function (msg) {
            noexitoCustom("Error al obtener lista de Vinculo del Derechohabiente.");
            $("#cboVincFam").select2()
        }
    });
}



var fillcboMotivoBaja = function (CodMotivoBaja) {

    select = $('#cboMotivoBaja');
    $.ajax({
        type: "post",
        url: "vistas/NP/ajax/NPMEMDH.ASHX?sOpcion=LMBXV&sCodVincFam=" + CodMotivoBaja + "&sEstado=A",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            select.empty();
            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        select.append('<option></option>');
                    }
                    select.append('<option value="' + datos[i].Codigo + '" val_sunat ="' + datos[i].Codigo_Sunat + '">' + datos[i].Descripcion + '</option>');
                }
                select.select2()
               
            }
            else {
                select.append('<option></option>');
                select.select2()
            }
            $("#modal-confirmar").modal("show");
            Desbloquear("ventana");
        },
        error: function (msg) {
            noexitoCustom("Error al obtener lista de Motivos de Baja.");
            $("#cboMotivoBaja").select2()
            Desbloquear("ventana");
        }
    });



}

//----------------------//




//------- Derecho Habientes ------//
var CrearDerechoHabiente = function () {


    var IdPersona = $('#hfIDPEREMP').val();
    var IdPersDH = $('#fhIDPERSONA').val();
    var sCodParentesco = $('#cboParentesco').val();
    var sCodVincFam = $('#cboVincFam').val();
    var sFechaIni = $('#txtFechaIni').val();
    var sEmpresa = $('#cboEmpresa').val();

    var sexPer = $('#hfSEXOPER').val()
    var gen = $('#cboVincFam [value="' + $('#cboVincFam').val() + '"]').attr('val_gen');



    if ($('#hfCODESTADO').val() == 'A') {
        if (vErrors(["txtDniEmpleado", "txtNombreEmpleado", "txtBeneficiario", "cboVincFam", "txtFechaIni"])) {

            if (gen != 'A' && sexPer != gen) {
                alertCustom("El sexo de la persona no corresponde al Vínculo seleccionado")
                return false;
            }


            Bloquear("ventana");
            $.post("vistas/NP/ajax/NPMEMDH.ASHX", {
                sOpcion: 'CRDH',
                IdPersona: IdPersona,
                IdPersDH: IdPersDH,
                sCodVincFam: sCodVincFam,
                sFechaIni: sFechaIni,
                sCodParentesco: sCodParentesco,
                sEmpresa: sEmpresa
            }).done(function (res) {

                Desbloquear("ventana");

                if (res.indexOf("[Error]:") > -1) {
                    noexitoCustom('Error al registrar Derechohabiente.');
                    return;
                }

                if (res[0].SUCCESS == "OK") {

                    if (res[0].RPTA == "OK") {

                        exito();
                        limpiaDerechoHabientes();
                        listaDerechoHAb();

                    }
                    else {
                        Desbloquear("ventana");
                        alertCustom("No se pudo agregar Derechohabiente." + " " + res[0].RPTA)
                    }

                }
                else {
                    Desbloquear("ventana");
                    noexito();
                }
            })
            .fail(function () {
                noexito();
                Desbloquear('ventana');
            });

        }
    }
    else {
        alertCustom("El Empleado debe estar activo para modificar Derechohabiente");
    }
}


var iniciaTablaDerechoHab = function () {

    if (typeof oTableBenef != "undefined") {
        oTableBenef.fnClearTable();
    }
    var json = null;
    var parms = {
        data: json,
        order: [[10, 'asc']],
        info: false,
        paging: false,
        columns: [
            {
                data: "IdDerechoHab",
                visible: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'display:none');
                }
            },

            {
                data: "IdPersonaDH",
                visible: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'display:none');
                }
            },
            {
                data: "DNI_DH",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                }
            },

            {
                data: "NombreDH",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left');
                }
            },

            {
                data: "VinculoFam",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                }
            },
            {
                data: "CodVincFamDH",
                visible: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'display:none');
                }

            },
            {
                data: "FechaInicio",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                }

            },
            {
                data: "FechaFin",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                }

            },
            {
                data: "MotivoBaja",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left');
                }

            },

            {
                data: "EstadoInd",
                visible: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'display:none');
                }
            },
            {
                data: "Estado",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                }
            },


             {
                 data: null,
                 defaultContent: '<a class="btn red inact" ><i class="icon-remove-circle"></i></a>',
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             }

        ]

    }
    oTableBenef = iniciaTabla("tbl_Benef", parms);

    $('#tbl_Benef tbody').on('click', '.inact', function () {

        //$(this).parent().parent().addClass('selected');


        var pos = oTableBenef.api(true).row($(this).parent().parent()).index();
        var row = oTableBenef.fnGetData(pos);
        $('#hfIdBenef').val(row.IdDerechoHab);
        $('#hfFechaIni').val(row.FechaInicio);
        var CodEstado = row.EstadoInd;
        var NombrePers = row.NombreDH;
        var CodVincFamDH = row.CodVincFamDH;

        $('#lblDerechoHab').text('');
        if ($('#hfCODESTADO').val() == 'A') {
            if (CodEstado == 'A') {
                $("#mensaje").html("Ingrese Motivo de Baja y Fecha Fin");
                $('#lblDerechoHab').text(NombrePers);

                Bloquear("ventana");
                setTimeout(function () {

                    fillcboMotivoBaja(CodVincFamDH);

                }, 500)
               
              
            }
            else {
                alertCustom("El registro ya está desactivado");
            }
        }
        else {
            alertCustom("El Empleado debe estar activo para modificar Derechohabientes");
        }


    });
}

var listaDerechoHAb = function () {
    var idPersona = $('#hfIDPEREMP').val();
    $.ajax({
        type: "post",
        url: "vistas/np/ajax/npmemdh.ashx?sOpcion=LDH&IdPersona=" + idPersona,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (!isEmpty(datos)) {
                if (typeof oTableBenef != "undefined") {
                    oTableBenef.fnClearTable();
                }
                oTableBenef.fnAddData(datos);
            }
            else {
                if (typeof oTableBenef != "undefined") {
                    oTableBenef.fnClearTable();
                }
            }

        },
        error: function (msg) {
            noexitoCustom("Error al obtener lista de DerechoHabientes");
        }
    });

}

//----------------------//



var verificaFamiliar = function () {

    var idPersSoc = $('#hfIDPEREMP').val();
    var idPers = $('#fhIDPERSONA').val();

    $.ajax({
        type: "POST",
        url: "vistas/AD/ajax/ADMSOBE.ASHX?sOpcion=5&nIdPersSoc=" + idPersSoc + "&nIdPersona=" + idPers,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (!isEmpty(datos)) {
                $("#cboParentesco").select2('val', datos[0].COD_PARENTESCO).change()
                $("#cboParentesco").attr('disabled', 'disabled')
            }
            else {
                $("#cboParentesco").removeAttr('disabled')
                $("#cboParentesco").select2('val', '').change()
            }
        },
        error: function (msg) {
            noexitoCustom('Error al obtener Información de Familiar');
        }
    });



}

var EnviaEditarEmpleado = function () {
    if (vErrors(["txtDniEmpleado", "txtNombreEmpleado"])) {
        var tipoDoc = '1'
        var NroDoc = $('#hfDOCEMP').val().trim();
        window.open("?f=NPMEMPL&tp=N&td=" + tipoDoc + "&d=" + NroDoc, '_blank');

    }
}









