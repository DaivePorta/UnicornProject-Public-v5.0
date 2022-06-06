var NFLCRSU = function () {
    var table = null;
    var oTableASG = null;

    var cargainicial = function ()
    {
        var fecha = new Date();
        var anio = fecha.getFullYear();

        //cargacombo();
        //cargaanios();
        //CargarAniosRegistrados();
        eventos();
        
        filltabla();
        filltablaAsignaciones();
        $('#grabar').attr('disabled', true);
        $('#btnCompletarC').attr('disabled', true);
        $('#btnCancelar').attr('disabled', true);
        $('#btnImprimir').attr('disabled', true); 
        $('#btnAsignarC').attr('disabled', true);

       
        
    }

    var eventos = function () {

        $('#buscar').on('click', function () {

            var periodoinicial = $('#cbAnioIni').val() + ($("#cboMesIni").datepicker('getDate').getMonth() + 1).toString();
            var periodofinal = $('#cboAnioFin').val() + ($("#cboMesFin").datepicker('getDate').getMonth() + 1).toString();

            periodoinicial = parseInt(periodoinicial);
            periodofinal = parseInt(periodofinal);
            if (parseInt($('#cbAnioIni').val()) == parseInt($('#cboAnioFin').val())) {

                if (periodoinicial > periodofinal) {
                    infoCustom2('El periodo inicial no puede ser mayor que el periodo final');
                    return false;

                } else {
                    cargatabla();
                    asigfechas();
                }
            } else {
                infoCustom2("Los Periodos deben pertenecer al mismo año");
            }
           
            
        });

        $('#grabar').on('click', function () {
            if ($('#grabar').attr('disabled') != 'disabled') {
                grabar();
            }
        });

        $('#btnCompletarC').on('click', function () {
            if ($('#btnCompletarC').attr('disabled') != 'disabled') {
                CompletarCronograma();
                setTimeout(function () {
                    cargatabla();
                    asigfechas();
                },200);
            }
        });

        $('#btnImprimir').on('click', function () {
            if ($('#btnImprimir').attr('disabled') != 'disabled') {
                imprimirDiv2("tblBandeja");
            }
        });

        $('#btnCancelar').on('click', function () {
            if ($('#btnCancelar').attr('disabled') != 'disabled') {
                Cancelar();
            }
        });

        $('#btnAsignarC').on('click', function () {
            if ($('#btnAsignarC').attr('disabled') != 'disabled') {
                CrearAsignacionCronogramaEmpresas();
                $('#divAsignaciones').css("display", "block");
            }
        });
        
        $('#btnCompletarAC').on('click', function () {
            if ($('#btnCompletarAC').attr('disabled') != 'disabled') {
                CompletarAsignacionCronogramaEmpresas();
                cargatablaAsignaciones();
            }
        });

        $('#btnVerC').on('click', function () {
            if ($('#btnVerC').attr('disabled') != 'disabled') {
                if ($('#divAsignaciones').css('display') != 'none') {
                    $('#divAsignaciones').css("display", "none");
                } else {
                    cargatablaAsignaciones();
                    asigfechasAsignaciones();
                    $('#divAsignaciones').css("display", "block");
                }
            }
        });


    }

    var filltabla = function () {
        var completo_ind = true;
        var parms = {
            data: null,
            columns: [
                {
                    data: "pertrib", width: '4%'
                },
                {
                    data: "dig0",
                    createdCell: function (td, cellData, rowData, row, col) {

                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig0 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_0' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig0 + '>')
                                //$('#txt_' + rowData.pertrib + '_0').val(rowData.dig0);
                            } else {
                                $(td).html('<input type="text" style="font-size:12px;" disabled class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_0' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig0 + '>')
                                //$('#txt_' + rowData.pertrib + '_0').val(rowData.dig0);
                                
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_0' + ' data-date-format="dd/mm/yyyy" value="-" >')
                        }
                        $(td).css('width', '10%');

                    }
                },
                {
                    data: "dig1",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig1 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_1' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig1 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_1' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig1 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_1' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');
                    }

                },
                {
                    data: "dig2",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig2 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_2' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig2 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_2' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig2 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_2' + ' data-date-format="dd/mm/yyyy" value="-" >')
                        }
                        $(td).css('width', '10%');
                    }
                },
                {
                    data: "dig3",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig3 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px; te" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_3' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig3 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px; te" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_3' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig3 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_3' + ' data-date-format="dd/mm/yyyy" value="-" >')
                        }
                        $(td).css('width', '10%');
                    }
                },
                {
                    data: "dig4",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig4 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_4' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig4 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_4' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig4 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_4' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');
                    }
                },
                {
                    data: "dig5",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig5 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_5' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig5 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_5' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig5 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_5' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');
                    }
                },
                {
                    data: "dig6",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig6 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_6' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig6 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_6' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig6 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_6' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');
                    }
                },
                {
                    data: "dig7",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig7 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_7' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig7 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_7' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig7 + '>')
                            }

                        }
                        else {
                            $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_7' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');

                    }
                },
                {
                    data: "dig8",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib);

                        $(td).attr('align', 'center')
                        if (rowData.dig8 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_8' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig8 + '>')
                            } else {
                                $(td).html('<input type="text" disabled style="font-size:12px;" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_8' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig8 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text"  class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_8' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');

                    }
                },
                {
                    data: "dig9",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib)

                        $(td).attr('align', 'center')
                        if (rowData.dig9 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_9' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig9 + '>')
                            } else {
                                $(td).html('<input type="text" disabled class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_9' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig9 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_9' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');
                    }
                },
                {
                    data: "dig10",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var fec = muestrafecini(rowData.pertrib)

                        $(td).attr('align', 'center')
                        if (rowData.dig10 != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_10' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig10 + '>')
                            } else {
                                $(td).html('<input type="text" disabled class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_10' + ' data-date-format="dd/mm/yyyy" value=' + rowData.dig10 + '>')
                            }
                        }
                        else {
                            $(td).html('<input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.pertrib + '_10' + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                        $(td).css('width', '10%');

                    }
                }
            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "order": [],
            "paging": false
        }

        table = $('#tblBandeja').dataTable(parms);
        

        $('#tblBandeja').removeAttr('style');
        $('#tblBandeja').css("font-size", "12px");

    };

    var filltablaAsignaciones = function () {

        var parms = {
            data: null,
            columns: [
                 {
                     data: "CTLG_CODE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                         $(td).css("display", "none");
                     }
                 },
                {
                    data: "EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "ANIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "ENERO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FEBRERO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MARZO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "ABRIL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "MAYO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "JUNIO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "JULIO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "AGOSTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "SETIEMBRE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "OCTUBRE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "NOVIEMBRE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "DICIEMBRE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "RENTA_ANUAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.RENTA_ANUAL != "") {
                            if (rowData.ESTADO == "N") {
                                $(td).html('<input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.CTLG_CODE + ' data-date-format="dd/mm/yyyy" value=' + rowData.RENTA_ANUAL + '>')
                            } else {
                                $(td).html('<input type="text" disabled class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.CTLG_CODE + ' data-date-format="dd/mm/yyyy" value=' + rowData.RENTA_ANUAL + '>')
                                $(td).css('width', '30px');
                            }
                        }
                        else {
                            $(td).html('<input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id=txt_' + rowData.CTLG_CODE + ' data-date-format="dd/mm/yyyy" value="-">')
                        }
                       

                    }
                }
               
            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            "iDisplayLength": 5,
            "order": [],
            "paging": false

        }

        oTableASG = $('#tbAsignaciones').dataTable(parms);
        //$('#tbAsignaciones').css("font-size", "10px");
    };

    var cargatabla = function () {
        Bloquear("ventana");

        var mes_ini = ($("#cboMesIni").datepicker('getDate').getMonth() + 1).toString();
        var mes_fin = ($("#cboMesFin").datepicker('getDate').getMonth() + 1).toString()
        if (mes_ini.length == 1) { mes_ini = "0" + mes_ini; }
        if (mes_fin.length == 1) { mes_fin = "0" + mes_fin; }

        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/NFLCRSU.ashx?opcion=1&pmesini=" + mes_ini + '&panioini=' + $('#cbAnioIni').val() + '&pmesfin=' + mes_fin + '&paniofin=' + $('#cboAnioFin').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    
                    table.fnClearTable();
                    table.fnAddData(datos);
                    $('.date-picker').datepicker();
                    $('#grabar').attr('disabled', false);
                    $('#btnCompletarC').attr('disabled', false);
                    $('#btnCancelar').attr('disabled', false);
                    $('#btnImprimir').attr('disabled', false);
                    $('#btnAsignarC').attr('disabled', false);
                    Desbloquear("ventana");
                } else {
                    table.fnClearTable();
                    Desbloquear("ventana");
                }
               
            },
            error: function (msg) {
                Bloquear("div");
                alert(msg);
            }
        });

    }

    var cargatablaAsignaciones = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/NFLCRSU.ashx?opcion=5&panio=" + $('#cbAnioIni').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    oTableASG.fnClearTable();
                    oTableASG.fnAddData(datos);
                    $('#btnCompletarAC').attr('disabled', false);
                } else {
                    oTableASG.fnClearTable();
                    infoCustom2("No tine Asignasiones ...!");
                    $('#divAsignaciones').css("display", "none");
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                Desbloquear("ventana");
                alert(msg);
            }
        });

    }

    var plugins = function () {
  
        $('.date-picker').datepicker();

        

       
       var  mifecha2 = new Date()
        var mifecha = new Date(mifecha2.getFullYear(), "0", "01")

        $('#cbAnioIni').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y').datepicker('setDate', 'y').keydown(function () { return false; });
        $('#cboMesIni').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {
            return false;
        }).datepicker("setDate", mifecha);


        $('#cboAnioFin').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y').datepicker('setDate', 'y').keydown(function () { return false; });
        $('#cboMesFin').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {
            return false;
        }).datepicker("setDate", new Date());
    }

    var cargacombo = function () {
        var mes = [
             {
                 id: '01',
                 nom: 'Enero'
             },

            {
                id: '02',
                nom: 'Febrero'
            },
            {
                id: '03',
                nom: 'Marzo'

            },
            {
                id: '04',
                nom: 'Abril'
            },
            {
                id: '05',
                nom: 'Mayo'
            },
            {
                id: '06',
                nom: 'Junio'
            },
            {
                id: '07',
                nom: 'Julio'
            },
            {
                id: '08',
                nom: 'Agosto'
            },
            {
                id: '09',
                nom: 'Setiembre'
            },
            {
                id: '10',
                nom: 'Octubre'
            },
            {
                id: '11',
                nom: 'Noviembre'
            },
            {
                id: '12',
                nom: 'Diciembre'
            }

        ];

        $.each(mes, function (i, o) {
            $('#cboMesIni').append($('<option></option>').val(o.id).html(o.nom));
        });

        $.each(mes, function (i, o) {
            $('#cboMesFin').append($('<option></option>').val(o.id).html(o.nom));
        });

        var d = new Date();
        var mes = d.getMonth() + 1;
        var m = mes.toString();

        if (m.length == 1) {
            mes = '0' + mes;
        }


        $('#cboMesFin').val(mes);
        $('#cboMesIni').val('01');

    }

    var cargaanios = function () {

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var anoi = ano - 5;

        for (i = anoi; i <= ano; i++)
        {
            $('#cbAnioIni').append('<option value=' + i + '>' + i + '</option>');
            $('#cboAnioFin').append('<option value=' + i + '>' + i + '</option>');
        }

        $('#cbAnioIni').val(ano);
        $('#cboAnioFin').val(ano);

    }

    var asigfechas = function () {

        var periodoini = '';
        var periodo = '';
        var nombre = '';
        var perfin = '';

        $('#tblBandeja tbody tr').each(function (index) {
            var campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11;
            var val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11;
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 0:
                        periodo = $(this).text();
                        //periodoini = periodo;
                        //periodo = muestrafecini(periodo);
                        //perfin = muestrafecfin(periodoini);

                        //periodoini = periodo;
                        periodoini = muestrafecini(periodo);
                        perfin = muestrafecfin(periodo);
                        break;
                    case 1:
                        val1 = $(this).children(".date-picker").val();
                        campo1 = $(this).children(".date-picker").attr("id");

                        if (val1 == '') {
                            $('#' + campo1).datepicker("setDate", periodo);
                        }
                        $('#' + campo1).datepicker("setStartDate", periodoini);
                        $('#' + campo1).datepicker("setEndDate", perfin);
                        $('#' + campo1).datepicker();
                        break;
                    case 2:
                        val2 = $(this).children(".date-picker").val();
                        campo2 = $(this).children(".date-picker").attr("id");
                        if (val2 == '')
                        {
                            $('#'+ campo2).datepicker("setDate", periodo);
                        }                        
                        $('#' + campo2).datepicker("setStartDate", periodoini);
                        $('#' + campo2).datepicker("setEndDate", perfin);
                        $('#' + campo2).datepicker();
                        break;
                    case 3:
                        val3 = $(this).children(".date-picker").val();
                        campo3 = $(this).children(".date-picker").attr("id");
                        if (val3 == '') {
                            $('#' + campo3).datepicker("setDate", periodo);
                        }
                        $('#' + campo3).datepicker("setStartDate", periodoini);
                        $('#' + campo3).datepicker("setEndDate", perfin);
                        $('#' + campo3).datepicker();
                        break;
                    case 4:
                        val4 = $(this).children(".date-picker").val();
                        campo4 = $(this).children(".date-picker").attr("id");
                        if (val4 == '') {
                            $('#' + campo4).datepicker("setDate", periodo);
                        }
                        $('#' + campo4).datepicker("setStartDate", periodoini);
                        $('#' + campo4).datepicker("setEndDate", perfin);
                        $('#' + campo4).datepicker();
                        break;
                    case 5:
                        val5 = $(this).children(".date-picker").val();
                        campo5 = $(this).children(".date-picker").attr("id");
                        if (val5 == '') {
                            $('#' + campo5).datepicker("setDate", periodo);
                        }
                        $('#' + campo5).datepicker("setStartDate", periodoini);
                        $('#' + campo5).datepicker("setEndDate", perfin);
                        $('#' + campo5).datepicker();
                        break;
                    case 6:
                        val6 = $(this).children(".date-picker").val();
                        campo6 = $(this).children(".date-picker").attr("id");
                        if (val6 == '') {
                            $('#' + campo6).datepicker("setDate", periodo);
                        }
                        $('#' + campo6).datepicker("setStartDate", periodoini);
                        $('#' + campo6).datepicker("setEndDate", perfin);
                        $('#' + campo6).datepicker();
                        break;                        
                    case 7:
                        val7 = $(this).children(".date-picker").val();
                        campo7 = $(this).children(".date-picker").attr("id");
                        if (val7 == '') {
                            $('#' + campo7).datepicker("setDate", periodo);
                        }
                        $('#' + campo7).datepicker("setStartDate", periodoini);
                        $('#' + campo7).datepicker("setEndDate", perfin);
                        $('#' + campo7).datepicker();
                        break;
                    case 8:
                        val8 = $(this).children(".date-picker").val();
                        campo8 = $(this).children(".date-picker").attr("id");
                        if (val8 == '') {
                            $('#' + campo8).datepicker("setDate", periodo);
                        }
                        $('#' + campo8).datepicker("setStartDate", periodoini);
                        $('#' + campo8).datepicker("setEndDate", perfin);
                        $('#' + campo8).datepicker();
                        break;
                    case 9:
                        val9 = $(this).children(".date-picker").val();
                        campo9 = $(this).children(".date-picker").attr("id");
                        if (val9 == '') {
                            $('#' + campo9).datepicker("setDate", periodo);
                        }
                        $('#' + campo9).datepicker("setStartDate", periodoini);
                        $('#' + campo9).datepicker("setEndDate", perfin);
                        $('#' + campo9).datepicker();
                        break;
                    case 10:
                        val10 = $(this).children(".date-picker").val();
                        campo10 = $(this).children(".date-picker").attr("id");
                        if (val10 == '') {
                            $('#' + campo10).datepicker("setDate", periodo);
                        }
                        $('#' + campo10).datepicker("setStartDate", periodoini);
                        $('#' + campo10).datepicker("setEndDate", perfin);
                        $('#' + campo10).datepicker();
                        break;
                    case 11:
                        val11 = $(this).children(".date-picker").val();
                        campo11 = $(this).children(".date-picker").attr("id");
                        if (val11 == '') {
                            $('#' + campo11).datepicker("setDate", periodo);
                        }
                        $('#' + campo11).datepicker("setStartDate", periodoini);
                        $('#' + campo11).datepicker("setEndDate", perfin);
                        $('#' + campo11).datepicker();
                        break;
                }

            });
        });

    }

    var asigfechasAsignaciones = function () {

        $('#tbAsignaciones tbody tr').each(function (index) {
            var campo;
            var val;
            $(this).children("td").each(function (index2) {
                switch (index2) {
                  
                    case 15:
                        val = $(this).children(".date-picker").val();
                        campo = $(this).children(".date-picker").attr("id");
                        $('#' + campo).datepicker();
                        break;
                }

            });
        });

    }

    var CargarAniosRegistrados = function () {
        var fecha = new Date();
        var anio_actual = fecha.getFullYear();
 
            $.ajax({
                type: "post",
                url: "vistas/nf/ajax/nflcrsu.ashx?opcion=3",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#cbAnioIni').empty();
                    $('#cboAnioFin').empty();
                    //$('#cbAnioIni').append('<option></option>');
                    //$('#cboAnioFin').append('<option></option>');
                    if (datos != null) {

                        for (var i = 0; i < datos.length; i++) {

                            $('#cbAnioIni').append('<option value="' + datos[i].ANIO + '">' + datos[i].ANIO + '</option>');
                            $('#cboAnioFin').append('<option value="' + datos[i].ANIO + '">' + datos[i].ANIO + '</option>');
                        }
                    }
                    $("#cbAnioIni").select2("val", anio_actual);
                    $("#cboAnioFin").select2("val", anio_actual);
                },
                error: function (msg) {
                    alert(msg);
                }
            });

    };

    var grabar = function () {
        var b = 0;
        var siguiente = true;
        Bloquear('ventana');
        $('#tblBandeja tbody tr').each(function (index) {

            var campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, periodo;

            $(this).children("td").each(function (index2) {


                switch (index2) {
                    case 0: periodo = $(this).text();
                        break;
                    case 1:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo1 = $(this).children(".date-picker").val();
                        } else {
                            campo1 = "";
                            siguiente = false;
                        }
                        break;
                    case 2:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo2 = $(this).children(".date-picker").val();
                        } else {
                            campo2 = "";
                            siguiente = false;
                        }

                        break;
                    case 3:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo3 = $(this).children(".date-picker").val();
                        } else {
                            campo3 = "";
                            siguiente = false;
                        }

                        break;
                    case 4:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo4 = $(this).children(".date-picker").val();
                        } else {
                            campo4 = "";
                            siguiente = false;
                        }

                        break;
                    case 5:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo5 = $(this).children(".date-picker").val();
                        } else {
                            campo5 = "";
                            siguiente = false;
                        }

                        break;
                    case 6:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo6 = $(this).children(".date-picker").val();
                        } else {
                            campo6 = "";
                            siguiente = false;
                        }

                        break;
                    case 7:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo7 = $(this).children(".date-picker").val();
                        } else {
                            campo7 = "";
                            siguiente = false;
                        }

                        break;
                    case 8:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo8 = $(this).children(".date-picker").val();
                        } else {
                            campo8 = "";
                            siguiente = false;

                        }

                        break;
                    case 9:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo9 = $(this).children(".date-picker").val();
                        } else {
                            campo9 = "";
                            siguiente = false;
                        }

                        break;
                    case 10:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo10 = $(this).children(".date-picker").val();
                        } else {
                            campo10 = "";
                            siguiente = false;
                        }

                        break;
                    case 11:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo11 = $(this).children(".date-picker").val();
                        } else {
                            campo11 = "";
                            siguiente = false;
                        }

                        break;
                }
            });

            var data = new FormData();
            data.append('periodo', periodo);
            data.append('dig0', campo1);
            data.append('dig1', campo2);
            data.append('dig2', campo3);
            data.append('dig3', campo4);
            data.append('dig4', campo5);
            data.append('dig5', campo6);
            data.append('dig6', campo7);
            data.append('dig7', campo8);
            data.append('dig8', campo9);
            data.append('dig9', campo10);
            data.append('dig10', campo11);

            if (siguiente) {
                $.ajax({
                    type: "POST",
                    url: "vistas/nf/ajax/nflcrsu.ashx?OPCION=2",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                })
                          .success(function (datos) {
                              Desbloquear("ventana");
                              if (datos != null && datos != "") {
                                  if (datos == 'OK') {
                                      b = 0;
                                  }
                              }
                              else {
                                  b = 1;
                                  noexito();
                              }
                          })
                          .error(function () {
                              noexito();
                              Desbloquear("ventana");
                              b = 1;
                              return false;
                          });

            }
            Desbloquear('ventana');
        });

        if (siguiente) {
            if (b == 0) {
                exito();
            }
        } else {
            infoCustom2("Ingrese Fechas Validas ...!");
        }
    }


    var CompletarCronograma = function () {
        var siguiente = true;
        var b = 0;
        Bloquear('ventana');
        $('#tblBandeja tbody tr').each(function (index) {

            var campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, periodo;

            $(this).children("td").each(function (index2) {


                switch (index2) {
                    case 0: periodo = $(this).text();
                        break;
                    case 1:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo1 = $(this).children(".date-picker").val();
                        } else {
                            campo1 = "";
                            siguiente = false;
                        }
                        break;
                    case 2:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo2 = $(this).children(".date-picker").val();
                        } else {
                            campo2 = "";
                            siguiente = false;
                        }

                        break;
                    case 3:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo3 = $(this).children(".date-picker").val();
                        } else {
                            campo3 = "";
                            siguiente = false;
                        }

                        break;
                    case 4:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo4 = $(this).children(".date-picker").val();
                        } else {
                            campo4 = "";
                            siguiente = false;
                        }

                        break;
                    case 5:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo5 = $(this).children(".date-picker").val();
                        } else {
                            campo5 = "";
                            siguiente = false;
                        }

                        break;
                    case 6:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo6 = $(this).children(".date-picker").val();
                        } else {
                            campo6 = "";
                            siguiente = false;
                        }

                        break;
                    case 7:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo7 = $(this).children(".date-picker").val();
                        } else {
                            campo7 = "";
                            siguiente = false;
                        }

                        break;
                    case 8:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo8 = $(this).children(".date-picker").val();
                        } else {
                            campo8 = "";
                            siguiente = false;

                        }

                        break;
                    case 9:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo9 = $(this).children(".date-picker").val();
                        } else {
                            campo9 = "";
                            siguiente = false;
                        }

                        break;
                    case 10:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo10 = $(this).children(".date-picker").val();
                        } else {
                            campo10 = "";
                            siguiente = false;
                        }

                        break;
                    case 11:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo11 = $(this).children(".date-picker").val();
                        } else {
                            campo11 = "";
                            siguiente = false;
                        }

                        break;
                }
            });

            var data = new FormData();
            data.append('periodo', periodo);
            data.append('dig0', campo1);
            data.append('dig1', campo2);
            data.append('dig2', campo3);
            data.append('dig3', campo4);
            data.append('dig4', campo5);
            data.append('dig5', campo6);
            data.append('dig6', campo7);
            data.append('dig7', campo8);
            data.append('dig8', campo9);
            data.append('dig9', campo10);
            data.append('dig10', campo11);

            if (siguiente) {
                $.ajax({
                    type: "POST",
                    url: "vistas/nf/ajax/nflcrsu.ashx?OPCION=4",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async:false
                }) .success(function (datos) {
                              Desbloquear("ventana");
                              if (datos != null && datos != "") {
                                  if (datos == 'OK') {
                                      b = 0;
                                  }
                              }
                              else {
                                  b = 1;
                                  noexito();
                              }
                          })
                  .error(function () {
                              noexito();
                              Desbloquear("ventana");
                              b = 1;
                              return false;
                          });

            }
            Desbloquear('ventana');
        });
       
        if (siguiente) {
            if (b == 0) {
               
                exito();
            }
        } else {
            infoCustom2("Ingrese Fechas Validas ...!");
        }

    }

    var CompletarAsignacionCronogramaEmpresas = function ()  {
        var siguiente = true;
        var b = 0;
        Bloquear('ventana');
        $('#tbAsignaciones tbody tr').each(function (index) {

            var campo1, campo2, campo3;

            $(this).children("td").each(function (index2) {


                switch (index2) {
                    case 0: campo1 = $(this).text();
                        break;
                    case 2:
                        campo2 = $(this).text();
                        break;
                    case 15:
                        if ($(this).children(".date-picker").val() != undefined & $(this).children(".date-picker").val() != "" & $(this).children(".date-picker").val() != "-") {

                            campo3 = $(this).children(".date-picker").val();
                        } else {
                            campo3 = "";
                            siguiente = false;
                        }

                        break;
                }
            });

            var data = new FormData();
            data.append('ctlg_code', campo1);
            data.append('panio', campo2);
            data.append('pfechaRenta', campo3);

            if (siguiente) {
                $.ajax({
                    type: "POST",
                    url: "vistas/nf/ajax/nflcrsu.ashx?OPCION=7",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async: false
                }).success(function (datos) {
                    Desbloquear("ventana");
                    if (datos != null && datos != "") {
                        if (datos == 'OK') {
                            b = 0;
                        }
                    }
                    else {
                        b = 1;
                        noexito();
                    }
                })
                  .error(function () {
                      noexito();
                      Desbloquear("ventana");
                      b = 1;
                      return false;
                  });

            }
            Desbloquear('ventana');
        });

        if (siguiente) {
            if (b == 0) {
                exito();
            }
        } else {
            infoCustom2("Ingrese Fechas Validas ...!");
        }

    }

    var CrearAsignacionCronogramaEmpresas = function () {
       
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/NFLCRSU.ashx?opcion=6&panio=" + $('#cbAnioIni').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
                }).success(function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        if (datos[0].RESPUESTA == 'EXITO') {
                            exito();
                            cargatablaAsignaciones();
                            asigfechasAsignaciones();
                            $('#divAsignaciones').css("display", "block");
                        } else {
                            $('#divAsignaciones').css("display", "none");
                            infoCustom2("Cronograma del año Seleccionado no está Completado ...!");
                        }
                        Desbloquear("ventana");
                    }
                    else {
                        b = 1;
                        noexito();
                        Desbloquear("ventana");
                    }
                })
                  .error(function () {
                      noexito();
                      Desbloquear("ventana");
                      b = 1;
                      return false;
                  });
    }

    function muestrafecini(periodo)
    {
        var anio = periodo.substring(0, 4);
        var mes = periodo.substring(4, 6);

        var fecha = '';

        if (mes < 12) {
            mes = parseInt(mes) + 1;

            if (mes <= 9)
            {
                mes = '0' + mes;
            }
            fecha = '01' + '/' + mes  + '/'+ anio;

            return fecha;
        }

        else {

            anio = parseInt(anio) + 1;
            fecha = '01/01/' + anio;
            return fecha
        }
    }


    function muestrafecfin(periodo)
    {
        var anio = periodo.substring(0, 4);
        var mes = periodo.substring(4, 6);
        var dia = '';
        var bisiesto = 0;
        var fecha = '';

        if (mes < 12) {
            mes = parseInt(mes) + 1;

            if (mes <= 9) {
                mes = '0' + mes;
            }

            switch (mes)
            {
                case '01': dia = '31';
                    break;
                case '02':
                    bisiesto = anio % 4;

                    if (bisiesto == 0)
                    { dia = '29'; }
                    else
                    { dia = '28'; }
                    
                    break
                case '03': dia = '31';
                    break
                case '04': dia = '30';
                    break
                case '05': dia = '31';
                    break
                case '06': dia = '30';
                    break
                case '07': dia = '31';
                    break
                case '08': dia = '31';
                    break
                case '09': dia = '30';
                    break
                case 10: dia = '31';
                    break
                case 11: dia = '30';
                    break
                case 12: dia = '31';
                    break
            }

            fecha = dia + '/' + mes + '/' + anio;

            return fecha;
        }

        else {

            anio = parseInt(anio) + 1;
            fecha = '31/01/' + anio;
            return fecha
        }

    }

    return {
         
        init: function () {
            
            cargainicial();
            plugins();
            
            
           
        }
    };
}();