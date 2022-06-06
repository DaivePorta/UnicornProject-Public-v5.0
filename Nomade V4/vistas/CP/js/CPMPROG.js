
var fechaActual; // yyyy-mm-yyy
var fechaActual2;// dd/mm/yyyy
var fechaForm;
var eventoSeleccionado;
var ultimaFecha; // Almacena la fecha de postergación para cargar el calendar en el mes seleccionado
revert = false; //true para indicar si se carga sólo la fecha del calendar
var CPMPROG = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $("#cboMes").select2();
        $('#txtanio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
        inifechas("txtFeIn", "txtFeFi");
    }

    var cargarFechaDefecto = function () {
        $('#txtanio').val(new Date().getFullYear().toString());
        var mes = new Date().getMonth() + 1;
        if (parseInt(mes) < 10) {
            mes = "0" + mes.toString()
        }
        $('#cboMes').select2("val", mes.toString());
        var dia = new Date().getDate();
        if (parseInt(dia) < 10) {
            dia = "0" + dia.toString()
        }

        fechaActual = new Date().getFullYear().toString() + "-" + mes + "-" + dia;
        fechaActual2 = dia + "/" + mes + "/" + new Date().getFullYear().toString();
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cplrfca.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }          
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            },
            complete: function () { cargarSucursales();}
        });
    }

    var cargarSucursales = function () {
        var select = $('#slcEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {


                select.multiselect({
                    nonSelectedText: 'TODOS'

                });

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };




    function listarMES() {
        $('#cboMes').select2();
        $('#cboMes').select2('val', '');         
    }

    var eventoComtroles = function () {
        $('#buscar').on('click', function () {
            CargarDatosCobranzas();
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            listarMES();
            cargarFechaDefecto();
            eventoComtroles();

        }
    };
}();

var obtenerFechaForm = function () {
    var anio = $('#txtanio').val();
    var mes = $('#cboMes').val();
    if (parseInt(anio) < 1900) {
        anio = new Date().getFullYear().toString()
        $('#txtanio').val(anio);
    }

    if ($.trim($("#calendar").html()) != "" && revert == true) {
        mes = parseInt($("#calendar").fullCalendar('getDate').month()) + 1;
        anio = $("#calendar").fullCalendar('getDate').year();
        if (parseInt(mes) < 10) {
            mes = "0" + mes.toString()
        }
        revert = false;
    }
    if (typeof ultimaFecha != "undefined" && ultimaFecha != "") {
        var fecha = new Date(ConvertirDate(ultimaFecha));
        anio = fecha.getFullYear();
        mes = fecha.getMonth() + 1;
        if (parseInt(mes) < 10) {
            mes = "0" + mes.toString()
        }
    }
    fechaForm = anio + "-" + mes + "-01";
}

var CargarDatosCobranzas = function () {

    if (typeof $("#_modal").html() != "undefined") {
        $("#_modal").modal('hide');
    }
    var data = new FormData();
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_USUA_ID', $("#ctl00_txtus").val());
    data.append('p_SCSL_CODE', ($("#slcEstablec").val() === null ? '' : $("#slcEstablec").val().toString()));

    
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/cp/ajax/cpmprog.ashx?OPCION=1",
        contentType: false,
        beforeSend:function(){Bloquear("ventana");},
        async: true,
        data: data,
        processData: false,
        cache: false
    })
   .success(function (datos) {
      
       if (datos != null) {
           obtenerFechaForm();
           CargarCalendario2(fechaForm, datos)
           ultimaFecha = "";
       } else {
           noexito();
       }
   })
   .error(function () {
      
       noexito();
   })
    .complete(function () { Desbloquear("ventana"); });
}

function GrabarPostergacion() {

    if (vErrors(["txtHasta", "txtHora"])) {

        var fechaAnterior = new Date(new Date(eventoSeleccionado.fecha_cobranza).getTime() + (5 * 60 * 60 * 1000));
        var fechaAnterior2 = new Date(new Date(fechaActual + "T" + eventoSeleccionado.hora_cobranza).getTime() + (5 * 60 * 60 * 1000));
        var fechaNueva=  new Date(eventoSeleccionado.start + (5 * 60 * 60 * 1000));
        var dias;
       // dias = parseInt(DateDiff(new Date(fechaNueva), new Date(fechaAnterior2)))
        dias = DateDiff(new Date(ConvertirDate($("#txtHasta").val())), new Date(ConvertirDate(fechaActual2)))      
        if (dias < 0) {
            alertCustom("La nueva fecha de pago no puede ser menor a la  Fecha Actual " + fechaActual2)
            $("#txtHasta").removeAttr("disabled");
        }
        else if (parseInt($("#txtHora").val().search("_")) !== -1) {
            alertCustom("Ingrese una hora válida!")
        }
        else {
            ultimaFecha = $("#txtHasta").val();
            if (typeof $("#_modal").html() != "undefined") {
                $("#_modal").modal('hide');
            }
            var data = new FormData();
            data.append('p_USUA_ID', $("#ctl00_txtus").val());
            data.append('p_CTLG_CODE', eventoSeleccionado.ctlg);
            data.append('p_SCSL_CODE', eventoSeleccionado.scsl);
            data.append('p_FECHA_COBRANZA', ConvertirDate($("#txtHasta").val()) + "T" + $("#txtHora").val() + ":00");
            data.append('p_FECHA_ANTERIOR', eventoSeleccionado.fecha_cobranza);
            data.append('p_DCTO_CODE', eventoSeleccionado.codigo);
            data.append('p_DCTO_TIPO', eventoSeleccionado.tipo);// F / L

            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/cp/ajax/cpmprog.ashx?OPCION=2",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               if (datos != null) {
                   exito();
                   CargarDatosCobranzas();

               } else {
                   noexito();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }
}

function MostrarPostergar(event) {
    eventoSeleccionado = event;
    Bloquear("ventana")
    var html =
    '<div id="_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 40%; left: 50%!important;aria-hidden="true">' +
    '<div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">' +
    ' <button id="btnCerrar" type="button" class="btn red" style="margin-top: 6px; float: right;" aria-hidden="true">' +
    '  <i class="icon-remove"></i>' +
    ' </button>' +
    '        <h4 id="myModalLabel">ACTUALIZAR FECHA PAGO</h4>' +
    '    </div>' +
    '    <div class="modal-body" id="ventanaBuscarDocumento">' +
    '       <div class="row-fluid" >' +
    '            <div class="span5"><p>FECHA ANTERIOR</p></div>' +
    '            <div class="span7">' +
    '                       <div class="control-group span12"><div class="controls">' +
    '                       <input type="text" class="span11"  id="txtActual"/>' +
    '                       </div></div>' +
    '            </div>' +
    '       </div>' +
    '       <div class="row-fluid" >' +
    '            <div class="span5"><p>FECHA NUEVA</p></div>' +
    '            <div class="span7">' +
    '                       <div class="control-group span12"><div class="controls">' +
    '                       <input type="text" class="span11 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />' +
    '                       </div></div>' +
    '            </div>' +
    '       </div>' +
    '       <div class="row-fluid" >' +
    '            <div class="span5">HORA</div>' +
    '            <div class="span7">' +
    '                       <div class="control-group span12"><div class="controls">' +
    '                       <input type="text" class="span11" placeholder="hh:mm" id="txtHora" />' +
    '                       </div></div>' +
    '            </div>' +
    '       </div>' +
    '       <div class="row-fluid" >' +
    '            <div class="span5">DÍAS</div>' +
    '            <div class="span7">' +
    '                       <div class="control-group span12"><div class="controls">' +
    '                       <input type="number" class="span11" placeholder="Días" id="txtDias" disabled="disabled"/>' +
    '                       </div></div>' +
    '            </div>' +
    '       </div>' +
    '       <div class="row-fluid" >' +
    '            <div class="span12">' +
    '                     <div class="form-actions">' +
    '                        <a id="cancelar" class="btn" href="javascript:revert = true;CargarDatosCobranzas();"><i class="icon-remove"></i>&nbsp;Cancelar</a>' +
    '                        <a id="grabar" class="btn blue" href="javascript:GrabarPostergacion();"><i class="icon-save"></i>&nbsp;Grabar</a>' +
    '                     </div>' +
    '            </div>' +
    '       </div>' +
    '    </div>' +
    '</div>';

    if ($("#_modal").html() == undefined) {
        $("body").append(html);
    } else {
        $("#_modal").remove();
        $("body").append(html);
    }
    //Activando plugins
    $('#txtHasta').datepicker('setStartDate', new Date().toLocaleDateString());
    if (event != null) {
        $('#txtHasta').datepicker().change(function () {
            var fechaAnterior = new Date(new Date(event.fecha_cobranza).getTime() + (5 * 60 * 60 * 1000));
            var fechaNuevaCalendario = new Date(ConvertirDate($("#txtHasta").val()) + "T" + event.hora_cobranza).getTime() + (5 * 60 * 60 * 1000);
            $('#txtDias').val(parseInt(DateDiff(new Date(fechaNuevaCalendario), new Date(fechaAnterior))));
        });
    }
    $("#txtHora").focus(function () { $(this).inputmask("H:0") });
    //Refrescar datos cuando la operacion no se complete
    $("#btnCerrar").on("click", function () {
        revert = true;
        CargarDatosCobranzas();
    });
    Desbloquear("ventana")
    $("#_modal").modal('show');
    $("div.modal-backdrop").on("click", function () {
        revert = true;
        CargarDatosCobranzas();
    });

}

function MostrarDatos(cliente, documento, monto, amortizado, deuda, x, y) {

    var html =
    '<div id="modal_info" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="max-width:30% !important;">' +
    '<div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color:#ffffff;">' +
    '        <h4 id="myModalLabel">Información </h4>' +
    '    </div>' +
    '    <div class="modal-body" id="ventanaInfo">' +
    '       <div class="row-fluid" >' +
    '         <div class="span12" id="divInfo" >' +
    '            <table id="tblInfo" class="table display DTTT_selectable" style="width: 100%;">' +
    '                 <tbody>' +
    '                    <tr>' +
    '                       <th>CLIENTE</th>' +
    '                       <td>' + cliente + '</td>' +
    '                   </tr>' +
    '                    <tr>' +
    '                       <th>DOCUMENTO</th>' +
    '                       <td>' + documento + '</td>' +
    '                   </tr>' +
    '                    <tr>' +
    '                       <th>MONTO</th>' +
    '                       <td>' + monto + '</td>' +
    '                   </tr>' +
    '                    <tr>' +
    '                       <th>AMORTIZADO</th>' +
    '                       <td>' + amortizado + '</td>' +
    '                   </tr>' +
    '                    <tr>' +
    '                       <th>DEUDA</th>' +
    '                       <td>' + deuda + '</td>' +
    '                   </tr>' +
    '               </tbody>' +
    '            </table>    ' +
    '           </div>' +
    '       </div>' +
    '    </div>' +
    '</div>';

    if ($("#modal_info").html() == undefined) {
        $("body").append(html);
    } else {
        $("#modal_info").remove();
        $("body").append(html);
    }
    var ancho = x + parseInt($("#modal_info").width());
    var alto = y - parseInt($("#modal_info").height())
    var x2, y2;
    x2 = x - $(document).scrollLeft();
    y2 = alto - 30 - $(document).scrollTop();
    $("#modal_info").css("position", "fixed !important;");
    $("#modal_info").attr("style", "max-width:30% !important;left:" + x2 + "px !important; top:" + y2 + "px !important;");
    $("#modal_info").show();
}

function OcultarDatos() {
    if ($("#modal_info").html() != undefined) {
        $("#modal_info").hide();
    }
}

function CargarCalendario2(fechaCarga, eventos) {

    if (eventos == "") {
        $('#calendar').fullCalendar('destroy');
        $("#mensaje").html("No hay datos para la Empresa y Año seleccionados.");
    } else {
        $("#mensaje").html("");
        $('#calendar').fullCalendar('destroy');
        var jsonEventos = JSON.parse(eventos.toString());
        function renderCalendar() {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                height: 556,
                ignoreTimezone: true,
                defaultTimedEventDuration: '01:00:00',
                selectable: true,
                droppable: true,
                draggable: true,
                resizable: false,
                eventMouseover: function (event, jsEvent, view) {
                    MostrarDatos(event.cliente, event.documento, formatoMiles(event.monto), formatoMiles(event.amortizado), formatoMiles(event.deuda), jsEvent.pageX, jsEvent.pageY)
                },
                eventMouseout: function (event, jsEvent, view) {
                    OcultarDatos();
                },
                eventClick: function (event, jsEvent, view) {
                    OcultarDatos();
                    MostrarPostergar(event);
                    var fechaAnterior = new Date(new Date(event.fecha_cobranza).getTime() + (5 * 60 * 60 * 1000));
                    $("#txtActual").val(new Date(fechaAnterior).toLocaleDateString());
                    $("#txtActual").attr("disabled", "disabled");
                    if (eventoSeleccionado.hora_cobranza.length == 8) {
                        $("#txtHora").val((eventoSeleccionado.hora_cobranza).substring(0, 5));
                    }
                },
                eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
                    MostrarPostergar(event);
                    var fechaAnterior = new Date(new Date(event.fecha_cobranza).getTime() + (5 * 60 * 60 * 1000));
                    var fechaNueva = new Date(event.start + (5 * 60 * 60 * 1000));
                    var dias = parseInt(DateDiff(new Date(fechaNueva), new Date(fechaAnterior)))

                    $("#txtActual").val(new Date(fechaAnterior).toLocaleDateString());
                    $("#txtActual").attr("disabled", "disabled");
                    $("#txtHasta").val(new Date(fechaNueva).toLocaleDateString());
                    $("#txtDias").val(dias);

                    var horas, minutos;
                    horas = fechaNueva.getHours();
                    minutos = fechaNueva.getMinutes();
                    if (parseInt(fechaNueva.getHours()) < 10) {
                        horas = "0" + fechaNueva.getHours();
                    }
                    if (parseInt(fechaNueva.getMinutes()) < 10) {
                        minutos = "0" + fechaNueva.getMinutes();
                    }
                    $("#txtHora").val(horas + ":" + minutos);
                },
                events: jsonEventos,
                defaultDate: fechaCarga,
                lang: 'es',
                buttonIcons: false, // show the prev/next text
                weekNumbers: true,
                editable: true,
                eventLimit: true, // allow "more" link when too many events          
                allDefaultDay: false
            });
        }

        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', jsonEventos);
        renderCalendar();
        //Elimina el resize
        $("#calendar button").on("click", function () {
            $('.fc-resizer').attr("style", "display:none");
            if ($('#calendar').fullCalendar('getView').name != 'month') {
                $('.fc-day-grid').attr("style", "display:none");
            }
        });
    }
}



/* //Ejemplo de calendar
function CargarCalendario(fechaCarga) {   
    function renderCalendar() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            droppable: true,
            draggable: true,
            selectHelper: true,
            select: function (start, end) {

                var fechaIni = (new Date(start)).toLocaleDateString();
                var fechaFin = (new Date(end)).toLocaleDateString();
                var horaIni = (new Date(start)).toLocaleTimeString();
                var horaFin = (new Date(end)).toLocaleTimeString();
                      
                //var title = prompt('Event Title:');
                //var eventData;
                //if (title) {
                //    eventData = {
                //        title: title,
                //        start: start,
                //        end: end
                //    };
                //    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                //}
                //$('#calendar').fullCalendar('unselect');
            },
            eventMouseover: function(event, jsEvent, view) {
            //    alert("1")
                if (view.name !== 'agendaDay') {
                    $(jsEvent.target).attr('title', event.title);
                }
            },
            //events: {
            //    url: '/getEvents.php',
            //    type: 'POST',
            //    cache: false,
            //    error: function() {
            //        // error
            //    },
            //},
            //eventDrop: function (event, delta, revertFunc) {
            //    alert("2")

            //    if (!confirm("Are you sure about this change?")) {
            //        revertFunc();
            //    }
            //},
            eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {

                alert(
                    event.title + " was moved " +
                    dayDelta + " days and " +
                    minuteDelta + " minutes."
                );

                if (allDay) {
                    alert("Event is now all-day");
                }else{
                    alert("Event has a time-of-day");
                }

                if (!confirm("Are you sure about this change?")) {
                    revertFunc();
                }
            },
            defaultDate: fechaCarga,
            lang: 'es',
            buttonIcons: false, // show the prev/next text
            weekNumbers: true,
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [
                {
                    title: "All Day Event Mk",
                    start: '2014/11/01'
                    
                },
                {
                    title: 'Long Event',
                    start: '2014-11-07',
                    end: '2014-11-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2014-11-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2014-11-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2014-11-11',
                    end: '2014-11-13'
                },               
                {
                    title: 'Meeting',
                    start: '2014-11-13T11:00:00',
                    constraint: 'availableForMeeting', // defined below
                    color: '#BCE9B0'
                },
				// areas where "Meeting" must be dropped
				{
				    id: 'availableForMeeting',
				    start: '2014-11-11T10:00:00',
				    end: '2014-11-11T16:00:00',
				    rendering: 'background',			
				    color: '#BCE9B0'
				},
				{
				    id: 'availableForMeeting',
				    start: '2014-11-13T10:00:00',
				    end: '2014-11-13T16:00:00',
				    rendering: 'background',
				    color: '#BCE9B0'
				},
				// red areas where no events can be dropped
				{
				    start: '2014-11-24',
				    end: '2014-11-28',
				    overlap: false,
				    rendering: 'background',
				    color: '#ff9f89'
				},				          
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2014-11-28'
                }
            ]
        });
    }
    renderCalendar();
}*/