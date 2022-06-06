/*
Permite importar un archivo .txt para actualización masiva de indicador de: Agente de Retención, Agente de Percepción y Buen Contribuyente

El proceso de carga se realiza de la siguiente manera:

- Seleccionar en el combo que indicador desea actualizar (Agente de Retención, Agente de Percepción, Buen Contribuyente)
- Haga clic en Seleccionar Archivo, y busque el archivo .txt que contenga la información. Clic en Aceptar
- Haga clic en Cargar. Se mostrarán registros de ejemplo e información del archivo para que pueda verificar si la lectura se está haciendo de forma correcta
- Si todo está conforme haga clic en 'Procesar y Actualizar'. Se mostrará una barra de progreso durante la transacción. Procure no cerrar la pestaña activa mientras se realizar el procesamiento de datos.
- Se mostrará mensajes de confirmación  al finalizar la operación.

NOTAS
- Solo se procesan las coincidencias entre el archivo y los registros existentes en el sistema
- Para aquellas personas que no estén en el txt y sí en el sistema, se asumirá que no cumplen con el requisito y los registros de sus indicadores se borrarán.
- Verifique que el archivo txt tenga el siguiente formato:

Ruc|Nombre/Razon|A partir del|Resolucion|
20512081372|'NEGOCIACION KIO' SOCIEDAD ANONIMA CERRADA|01/06/2012|RS R.S.096-2012|
20505108672|1818 S.A.C|01/02/2006|RS R.S.254-2005|
20100119227|3M PERU S A|01/06/2002|RS R.S.037-2002|

* La cabecera debe incluirse, de lo contrario la primera fila no será incluida durante la lectura del archivo
* El caracter "|" sólo debe usarse para separar información, nunca como parte de ella
*/
var rucs = [];
var personas = [];
var coincidencias = [];
var estado = "";//indica si se estan procesando registros con el archivo importado

var NCMAGEN = function () {

    var plugins = function () {
        $("#cboTipoAgente").select2();
    }

    function ListarPersonas(asincrono) {
        if (asincrono == undefined) {
            asincrono = false;
        }
        //PERSONAS
        personas = [];
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/NCMAGEN.ashx?OPCION=0&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: asincrono,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (parseInt(datos[i].CODIGO_TIPO_DOCUMENTO) == 6) {

                            var objAux = {}
                            objAux.PERSONA = datos[i].RAZON_SOCIAL;
                            objAux.PIDM = datos[i].PIDM;
                            objAux.RUC = $.trim(datos[i].NRO_DOCUMENTO);

                            personas.push(objAux);
                        } else if (datos[i].NRO_RUC != "") {
                            var objAux = {}
                            objAux.PERSONA = datos[i].RAZON_SOCIAL;
                            objAux.PIDM = datos[i].PIDM;
                            objAux.RUC = $.trim(datos[i].NRO_RUC);
                            personas.push(objAux);
                        } 
                    }
                }
            },
            error: function (msg) {
                alertCustom("Lista de personas para verificación no se cargó correctamente")
            }
        });

    }

    var eventoControles = function () {
        $("#btnVerActualizados").on("click", function () {
            for (var i = 0; i < length; i++) {

            }
            $("#modalActualizados").modal("show");
        });

        $("#btnVerNoActualizados").on("click", function () {
            $("#tblNoActualizados tbody tr").remove();
            for (var i = 0; i < noEncontrados.length; i++) {
                var tr = '';
                tr += '<tr>'
                tr += '<td style="text-align:center;">' + noEncontrados[i].NRO + '</td>'
                tr += '<td>' + noEncontrados[i].RUC + '</td>'
                tr += '<td>' + noEncontrados[i].PERSONA + '</td>'
                tr += '<td>' + noEncontrados[i].ERROR + '</td>'
                tr += '</tr>';
                $("#tblNoActualizados tbody").append(tr);
            }
            $("#modalNoActualizados").modal("show");
        });

        $("#archivoTexto").on("click", function () {
            $("#divBarraProgreso").slideUp();
            $("#divInfo").slideUp();
            $("#btnActualizar").hide();
            $("#divInfoActualizar").slideUp();
        });

        $("#btnCargar").on("click", function () {

            if (vErrors(['cboTipoAgente'])) {
                rucs = [];
                coincidencias = [];
                $("#lblCoincidencias").html(coincidencias.length);
                $("#lblTotalRegistros").html(rucs.length);
                $("#lblSinMostrar").html("0");

                var data = new FormData();
                data.append('FILE_TEXT', $("#archivoTexto")[0].files[0]);
                Bloquear("ventana");
                $.ajax({
                    url: "vistas/NC/ajax/NCMAGEN.ashx?OPCION=1",
                    type: 'POST',
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async: true,
                    success: function (res) {
                        Desbloquear("ventana");
                        $("#tblDatos tbody tr").remove()

                        if (res != "VACIO") {
                            var c = 1;
                            var valores = res.split("|");
                            var cant = valores.length;
                            restantes = (cant - 5) / 4 - 200;
                            var cantidadFor = ((cant - 1) / 4 <= 200) ? cant : 800;

                            for (var i = 4; i <= cantidadFor; i += 4) {
                                var tr = "";
                                if (typeof (valores[i]) != "undefined" && typeof (valores[i + 1]) != "undefined" &&
                                    typeof (valores[i + 2]) != "undefined" && typeof (valores[i + 3]) != "undefined") {
                                    tr += '<tr>';
                                    tr += '<td>' + c + '</td>';
                                    tr += '<td>' + valores[i] + '</td>';
                                    tr += '<td>' + valores[i + 1] + '</td>';
                                    tr += '<td>' + valores[i + 2] + '</td>';
                                    tr += '<td>' + valores[i + 3] + '</td>';
                                    tr += '</tr>';
                                    c++;
                                    $("#tblDatos tbody").append(tr);
                                }

                            }
                                                      
                            infoCustom2("Datos se cargaron.<br/>Verifique datos de ejemplo y proceda a 'Actualizar'");
                            $("#btnActualizar").show();
                            $("#divInfo").slideDown();

                            for (var i = 4; i < (cant - 4) ; i += 4) {
                                var objAux = {};
                                objAux.RUC = $.trim(valores[i]);
                                objAux.PERSONA = valores[i+1];
                                objAux.FECHA_INICIO = valores[i+2];
                                objAux.RESOLUCION = valores[i+3];
                                rucs.push(objAux);
                            }
                            
                            for (var i = 0; i < rucs.length; i++) {
                                for (var j = 0; j < personas.length; j++) {
                                    if ($.trim(rucs[i].RUC) == $.trim(personas[j].RUC)) {
                                        rucs[i].PIDM = personas[j].PIDM;
                                        coincidencias.push(rucs[i]);
                                        break;
                                    }
                                }
                            }

                            $("#lblCoincidencias").html(coincidencias.length);
                            $("#lblTotalRegistros").html(rucs.length);
                            $("#lblSinMostrar").html((restantes > 0) ? restantes : "0");

                        } else {
                            alertCustom("Debe seleccionar un archivo para continuar");
                            $("#btnActualizar").hide();
                            $("#divInfo").slideUp();
                        }                   
                    },
                    error: function () {
                        Desbloquear("ventana");
                        noexito();
                    }
                });
            }


        });

        $("#btnActualizar").on("click", function () {
            if (estado == "") {
                registroActualizados = 0;
                registroProcesados = 0;
                noEncontrados = [];              
                $("#divBarraProgreso").slideDown();
                $("#divInfoActualizar").slideUp();                
                Bloquear("ventana");
                EliminarRegistros();
                ActualizarLimpiarRegistros();               
                for (var i = 0; i < coincidencias.length; i++) {
                    //ActualizarRegistros(pidm, ruc, fecha_inicio, resolucion, n)
                    ActualizarRegistros(coincidencias[i].PIDM, coincidencias[i].RUC, coincidencias[i].FECHA_INICIO, coincidencias[i].RESOLUCION, coincidencias[i].PERSONA, i);
                }
                estado = "procesando"
            } else {
                infoCustom2("Se está procesando información. Si desea procesar refresque la página!");
            }

        });
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            inputFileCustom("archivoTexto");
            ListarPersonas();
        }
    };

}();

function inputFileCustom(id_Input) { //parametros: (id_input: el id del objeto con etiqueta input- el boton String, id_img=el id de la imagen String)

    if ($('#' + id_Input).attr("accept") != "text/*") {
        $('#' + id_Input).attr("accept", "text/*");
        $('#' + id_Input).bootstrapFileInput();
        $("#" + id_Input).siblings("span").html("<i class=\"icon-search\"></i> Seleccionar Archivo")
    }

    var obtenerTipoMIME = function obtenerTipoMIME(cabecera) {
        return cabecera.replace(/data:([^;]+).*/, '\$1');
    }

    var mostrarVistaPrevia = function mostrarVistaPrevia() {

        var Archivo, Lector;

        Archivo = jQuery('#' + id_Input)[0].files;
        if (Archivo.length > 0) {

            Lector = new FileReader();
            Lector.onloadend = function (e) {
                var origen, tipo;

                //Envia la imagen a la pantalla
                origen = e.target; //objeto FileReader
                //Prepara la información sobre la imagen
                tipo = obtenerTipoMIME(origen.result.substring(0, 30));

                //Si el tipo de archivo es válido lo muestra, sino muestra un mensaje 
                if (tipo !== 'text/plain') {
                    alertCustom('El formato de imagen no es v&aacute;lido: debe seleccionar un archivo TXT');
                } else {
                    var v_src = origen.result;

                }

            };
            Lector.onerror = function (e) {
                console.log(e)
            }
            Lector.readAsDataURL(Archivo[0]);

        } else {

            objeto.replaceWith(objeto.val('').clone());
        };


    };

    if ($("#" + id_Input).attr("multiple") == undefined) {
        $("#" + id_Input).parent().parent().change(function () { mostrarVistaPrevia(); });
    }

}

var registroActualizados = 0;
var registroProcesados = 0;
var noEncontrados = [];

function ActualizarRegistros(pidm,ruc,fecha_inicio,resolucion,persona, n) {

    var data = new FormData();
    data.append("PIDM", pidm);
    data.append("TIPO", $("#cboTipoAgente").val());
    data.append("RUC", ruc);
    data.append("FECHA_INICIO", fecha_inicio);
    data.append("RESOLUCION", resolucion);
    data.append("USUA_ID", $("#ctl00_txtus").val());

    var insert = $.ajax({
        url: "vistas/NC/ajax/NCMAGEN.ashx?OPCION=2&n=" + n,
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true,
        success: function (res) {
            registroProcesados++;
            try {
                // res= JSON.parse(res);
                if (res[0].RESPUESTA == "OK") {
                    registroActualizados++;
                } else {
                   //  res[0].RESPUESTA == "NO_ENCONTRADO"  //Registros no actualizados // Agregar a un arreglo para ver detalles
                    var objAux = {};
                    objAux.RUC = ruc;
                    objAux.PERSONA = persona;
                    objAux.FECHA_INICIO = fecha_inicio;
                    objAux.RESOLUCION = resolucion;
                    objAux.NRO = n;
                    objAux.ERROR = res[0].RESPUESTA;
                    noEncontrados.push(objAux);   
                }                
            } catch (e) {
                var objAux = {};
                objAux.RUC = ruc;
                objAux.PERSONA = persona;
                objAux.FECHA_INICIO = fecha_inicio;
                objAux.RESOLUCION = resolucion;
                objAux.NRO = n;
                objAux.ERROR = res[0].RESPUESTA;
                noEncontrados.push(objAux);
            }          
            FinProcesado();

            $("#porcentaje").css("width", ((registroProcesados * 100) / coincidencias.length) + "%");
            $("#porcentaje").text(((registroProcesados * 100) / coincidencias.length).toFixed(2) + "%");
        },
        error: function () {
            registroProcesados++;
            FinProcesado();           
        }
    });

}

function FinProcesado() {
    if (registroProcesados >= coincidencias.length) {
        exitoCustom("Se procesaron todos los registros")
        Desbloquear("ventana");
        estado = "";
        $("#lblRegistrosActualizados").html(registroActualizados);
        $("#lblRegistrosSinActualizar").html(noEncontrados.length);
        $("#divInfoActualizar").slideDown();
    }
}

function ActualizarLimpiarRegistros() {
    var data = new FormData();
    data.append("TIPO", $("#cboTipoAgente").val());

    var insert = $.ajax({
        url: "vistas/NC/ajax/NCMAGEN.ashx?OPCION=3",
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,
        success: function (res) {
            $("#porcentaje").css("width", "100%");
            $("#porcentaje").text("100%");
            if (coincidencias.length == 0) {
                estado = "";
                Desbloquear("ventana");
                infoCustom2("Ahora ninguna persona figura como '" + $("#cboTipoAgente :selected").html() + "'");
                EliminarRegistros();
            }
           
        },
        error: function () {
            noexito();
        }
    });

}

function EliminarRegistros() {
    var data = new FormData();
    data.append("PIDM", "TODOS");
    data.append("TIPO", $("#cboTipoAgente").val());  
    var insert = $.ajax({
        url: "vistas/NC/ajax/NCMAGEN.ashx?OPCION=2",
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,
        success: function (res) {
            
        },
        error: function () {
            noexito();
        }
    });

}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

var NCLAGEN = function () {

    var plugins = function () {
        $("#cboTipoAgente").select2();
    }    

    var eventoControles = function () {      

        $("#buscar").on("click", function () {
            ListarDatosTipoAgente();       
        });    
    }

    var ListarDatosTipoAgente = function (pidm) {
        if (pidm == undefined) {
            pidm = "";
        }
        var data = new FormData();
        data.append("PIDM", pidm);
        data.append("TIPO", $("#cboTipoAgente").val());    

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMAGEN.ashx?OPCION=4",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {

               $('#divTblDatos').html(datos);

               $("#tblDatos").dataTable({                  
                   "sDom": 'T<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
                   "scrollX": true,
                   "oLanguage": {
                       "sEmptyTable": "No hay datos disponibles en la tabla.",
                       "sZeroRecords": "No hay datos disponibles en la tabla."
                   },
                   "oTableTools": {
                       "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                       "aButtons": [
                   {
                       "sExtends": "copy",
                       "sButtonText": "Copiar"
                   },
                   {
                       "sExtends": "pdf",
                       "sPdfOrientation": "landscape",
                       "sButtonText": "Exportar a PDF"
                   },
                   {
                       "sExtends": "xls",
                       "sButtonText": "Exportar a Excel"
                   }
                       ]
                   }
               });

               var oTable = $('#tblDatos').dataTable();
               oTable.fnSort([[2, "asc"]]);
               oTable.fnSetColumnVis(0, false, true);

           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }

    return {
        init: function () {
            plugins();
            eventoControles();         
          
        }
    };

}();
