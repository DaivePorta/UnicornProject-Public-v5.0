var seleccionados = [];
var NSLJUST = function () {

    var plugins = function () {
        $("#cbo_tip_just").select2();
        $("#cbo_estado").select2();
        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
        $("#btn_editar").attr("disabled", true);
        $("#cbo_tipo_motivo").select2();
        $("#cbo_tipo_justificacion").select2();
    }

    var eventos = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                $("#input_empl").parent().attr("class", "control-group")
                Bloquear("ventana");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

    
        var est_ant = ""
        $('#cbo_tip_just').on('change', function () {
            if (est_ant != $(this).val()) {
                $("#cbo_estado").attr("disabled", false);
                $("#cbo_estado").select2("val","S")
                if ($(this).val() == "1") {
                    $("#cbo_estado").select2("val", "C")
                    $("#cbo_estado").attr("disabled", true);

                }

                est_ant = $(this).val();
            } else { est_ant = ""; }
        });






        $('#btn_imprime').on('click', function () {
            imprimirDiv("tblJustigicacion")
        });


        
        $('#btn_listar').on('click', function () {
           Bloquear("ventana")
            setTimeout(function () {
                Listar();
            }, 1000);


        });

        $('#btn_editar').on('click', function () {
            //Bloquear("ventana")
            //setTimeout(function () {
            $("#Modal_edit").modal("show");
            //}, 1000);


        });


        $('#btn_modificar').on('click', function () {

            $('#btn_modificar').blur();
            if (vErrorsNotMessage(["cbo_tipo_motivo", "cbo_tipo_justificacion", "txt_motivo"])) {

                Bloquear("Modal_edit")
                setTimeout(function () {
                   


                    var data = new FormData();

                    data.append("OPCION", "99");
                    data.append("p_MOTIVO", $("#txt_motivo").val());
                    data.append("p_TIPO_JUST", $("#cbo_tipo_justificacion").val());
                    data.append("p_TIPO_MOTIVO", $("#cbo_tipo_motivo").val());
                    data.append("p_DETALLE", seleccionados.toString());

                    
                        $.ajax({
                            url: "vistas/NS/ajax/NSLJUST.ASHX",
                            type: "POST",
                            contentType: false,
                            data: data,
                            processData: false,
                            cache: false,
                        })
         

                            .success( function (datos) {
                                if (datos == "OK" && datos != "undefined") {

                                    $(".check_").attr("checked", false)
                                    $(".selected2").removeClass('selected2')
                                    seleccionados = [];

                                   
                                    $("#cbo_tipo_motivo").select2("val", "");
                                    $("#cbo_tipo_justificacion").select2("val", "");
                                    $("#txt_motivo").val("");
                                    $("[id*=correcto]").remove();

                                    $("#Modal_edit").modal("hide");
                                    exito();

                                    Bloquear("ventana")
                                    setTimeout(function () {
                                        Listar();
                                    }, 1000);

                                   
                                    $('#check_todos').parent().removeClass('checked');
                                    $('#check_todos').attr("checked", false)
                                } else {

                                    noexitoCustom("Error al Registrar!")
                                
                                }
               
               
                                Desbloquear("Modal_edit");

                            })
                           .error(function () {
                               Desbloquear("Modal_edit");
                               noexitoCustom("Error al Registrar!")
                           })


                }, 1000);
            }
           


        });
        
        var filas;
        $('#check_todos').on('click', function () {

           

            var checked = $(this).is(':checked');
            if (checked) {
                $(".check_").attr("checked", true)
                $('#tblJustigicacion tbody tr').addClass('selected2');
                 filas = $('#tblJustigicacion').DataTable().rows('.selected2').data().toArray();
                for (var i = 0 ; i < filas.length ; i++) {
                    var bool = false;

                    if(seleccionados.length > 0){
                        for (var j = 0 ; j < seleccionados.length ; j++) {
                            if (seleccionados[j] == filas[i]["CODIGO"]) {
                                bool = true;
                            }
                        }
                    }

                    if(!bool){
                        seleccionados.push(filas[i]["CODIGO"]);
                    }
                    
                }
                if (seleccionados.length > 0) {

                    $("#btn_editar").attr("disabled", false);
                } else {
                    $("#btn_editar").attr("disabled", true);
                }

            } else {

               
                $(".check_").attr("checked", false)
                
    
                $('#tblJustigicacion tbody tr').removeClass('selected2');
                for (var i = 0 ; i < filas.length ; i++) {
                    seleccionados.filter(function (e, f) {
                        if (e == filas[i]["CODIGO"]) { seleccionados.splice(f, 1); }
                    });
                }
                

                if (seleccionados.length > 0) {

                    $("#btn_editar").attr("disabled", false);
                } else {
                    $("#btn_editar").attr("disabled", true);
                }
            }

        })
     
    }

    var fillCboTipo_Justificacion = function () {
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMJUST.ASHX?Opcion=P",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_justificacion').empty();
                $('#cbo_tipo_justificacion').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_justificacion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipo_justificacion").select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error listar tipo de justificaciones");
            }
        });
    }


    var fillCboTipo_Motivo_Just = function () {
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMJUST.ASHX?Opcion=22",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_motivo').empty();
                $('#cbo_tipo_motivo').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_motivo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipo_motivo").select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error listar tipo motivo de justificaciones");
            }
        });
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option value="T">TODOS</option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());

                    } else {

                        $("#slcSucural").select2("val", "");
                    }
                  

                }
                else {
                   alertCustom("Error listar sucursales")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }

    var fillBandeja = function () {


        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('align', 'center')
                        //$(td).css('display', 'block')
                    }
                },
                {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "DESC_MOTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DINICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DFIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "HINCIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "HFIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     //data: null,
                     //defaultContent: '<input type="checkbox" class="check_"  style="height:25px!important;width:25px!important;"/>',
                     //createdCell: function (td, cellData, rowData, row, col) {

                     //    $(td).attr('align', 'center')

                     //}
                     data: null,
                     createdCell: function (td, cellData, rowData, row, col) {

                         if (rowData.IND_PLANILLA != "C") {
                               $(td).html('<input type="checkbox" class="check_"  style="height:25px!important;width:25px!important;"/>')
                             //$(td).html('<div class="checker"><span class=""><input type="checkbox" class="check_" style="opacity: 0;height:25px!important;width:25px!important;"></span></div>')
                         } else {
                             $(td).html("");
                         }
                         $(td).css('text-align', 'center')
                     }
                 },
            ]

        }

        oTable = iniciaTabla('tblJustigicacion', parms);

        $('#tblJustigicacion').removeAttr('style');





        $('#tblJustigicacion tbody').on('click', 'tr', function () {



            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                //$(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                //window.location.href = '?f=NSMJUST?Opcion=D&codigo=' + codigo + "&fe=" + fe + "&Emp=" + emp;
                var aa = $("#optanho").val();
                var mm = $("#optmes").val();
                var Peri = mm + " " + aa;
                Peri = Peri.toUpperCase();
                var Emp = row.CTLG_CODE;

                if (Peri == $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hffecha").val()) {
                    // window.location.href = '?f=NSMJUST&Opcion=D&codigo=' + codigo + "&Peri=" + Peri + "&Emp=" + Emp + "&v=" + "t";
                 window.open('?f=NSMJUST&Opcion=D&codigo=' + codigo + "&Peri=" + Peri + "&Emp=" + Emp + "&v=" + "t", '_blank');
                } else {
                     // window.location.href = '?f=NSMJUST&Opcion=D&codigo=' + codigo + "&Peri=" + Peri + "&Emp=" + Emp + "&v=" + "f";
                    window.open('?f=NSMJUST&Opcion=D&codigo=' + codigo + "&Peri=" + Peri + "&Emp=" + Emp + "&v=" + "f", '_blank');
                }
            }

        });


      
        $('#tblJustigicacion tbody').on('click', '.check_', function () {

            $($(this).parents("tr")).addClass('selected');

           
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);
           


            if ($(this).is(":checked")) {

                //  $(this).parent().parent().addClass('selected');
                $($(this).parents("tr")).addClass('selected2');
                seleccionados.push(row.CODIGO);


            } else {

                // $(this).parent().parent().removeClass('selected');
                $($(this).parents("tr")).removeClass('selected2');
                seleccionados.filter(function (e, f) {
                    if (e == row.CODIGO) { seleccionados.splice(f, 1); }
                });
            }

            if (seleccionados.length > 0) {

                $("#btn_editar").attr("disabled", false);
            } else {
                $("#btn_editar").attr("disabled", true);
            }


            //var pos = oTable.fnGetPosition(this);
            //var row = oTable.fnGetData(pos);
            //var codigo = row.CODIGO;

            //array.push(codigo)

            //$("#btn_editar").attr("disabled", true);





           // $($(this).parents("tr")[0]).addClass('selected');
            //var pidm = $($(this).parents("tr")[0]).attr("id");
            //var empresa = $("#txtcodigo").val();

            //Bloquear("ventana");
            //$.ajaxSetup({ async: false });
            //$.post("vistas/NC/ajax/NCEMPR.ASHX", { flag: 6, pidm: pidm, empresa: empresa },
            //    function (res) {
            //        Desbloquear("ventana");
            //        if (res == "OK") {
            //            exito();
            //            tabacc(empresa);
            //        }

            //    });

            //$.ajaxSetup({ async: true });
        });

    }


    var Listar = function () {
      //  $('#tblJustigicacion').dataTable().fnDestroy()
        var Emp = $("#slcEmpresa").val();
        var Suc = $('#slcSucural').val();
        var p_ESTADO_IND = $('#cbo_estado').val();
  
        var p_TIPO_FALTA = $('#cbo_tip_just').val();

        if($('#cbo_tip_just').val() == "S"){
            p_TIPO_FALTA = "";
        }



        var p_TODOS_IND = "N";
        if ($('#cbo_estado').val() == "S") {
            p_TODOS_IND = "S";

        } 

        //var p_ESTADO_IND = $("#chkEstado").is(':checked') ? 'C' : 'I';
        //var p_TODOS_IND = $("#chkTodos").is(':checked') ? 'S' : 'N';
        var aa = $("#optanho").val();
        var mm = $("#optmes").datepicker("getDate").getMonth() + 1
        var Peri = mm + " " + aa;
        Peri = Peri.toUpperCase();
        //ValidarPeriodo();


        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSLJUST.ashx?Opcion=L&Emp=" + Emp + "&Suc=" + Suc + "&anho=" + aa + "&mes=" + mm + "&p_ESTADO_IND=" + p_ESTADO_IND + "&p_TODOS_IND=" + p_TODOS_IND + "&p_TIPO_FALTA=" + p_TIPO_FALTA,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos.length > 0 && datos != null ) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);

                  

                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");



            },
            error: function (msg) {
               alertCustom("error listar permisos")
                Desbloquear("ventana")
            }
        });

    }

    return {
        init: function () {

            plugins();
            $('#cbo_estado').select2('val', 'S');
            $('#cbo_tip_just').select2('val', 'S');
            eventos();
            fillBandeja();
            fillCboTipo_Justificacion();
            fillCboTipo_Motivo_Just();
            fillCboEmpresa();
            ListarSucursales($("#slcEmpresa").val());
          
            Listar();
        
          
        }
    };















  









}();




var NSMJUST = function () {

    var muestrafecfin = function (periodo) {
        var anio = periodo.substring(0, 4);
        var mes = periodo.substring(4, 6);
        var dia = '';
        var bisiesto = 0;
        var fecha = '';

        if (mes < 12) {
            mes = parseInt(mes);

            if (mes <= 9) {
                mes = '0' + mes;
            }

            switch (mes) {
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


    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $("#cbo_tipo_motivo").select2();
        $("#cbo_tipo_justificacion").select2();
        //$("#txt_fec_inicio").datepicker();
        //$("#txt_fec_fin").datepicker();


        $('#txt_fec_inicio').datepicker().change(function () {
            $('#txt_fec_fin').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txt_fec_fin').val().split("/").reverse().join(""))) ? "" : $('#txt_fec_fin').val());
            $('#txt_fec_fin').datepicker('setStartDate', $(this).val());
            var periodo = $('#txt_fec_inicio').val().split("/").reverse().join("")
            $("#txt_fec_fin").datepicker("setEndDate", muestrafecfin(periodo.substr(0, 6)));
            $('#txt_fec_fin').val("");
        });

        //$('#txt_fec_fin').datepicker().on("change", function () {
        //    if ($('#txt_fec_inicio').val() != "") {
        //        $('#txt_fec_inicio').datepicker('setStartDate', $('#txt_fec_fin').val());
        //    }
        //});




        $("#txt_hora_inicio").focus(function () { $(this).inputmask("H:0") });
        $("#txt_hora_inicio").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
        $("#txt_hora_fin").focus(function () { $(this).inputmask("H:0") });
        $("#txt_hora_fin").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
        $('#rb_dias').attr('checked', true);
        $("#rb_dias").click()
    }

    var fillBandejaHorarios = function () {


        var parms = {
            data: null,
            //"sDom": "t",
            "paging": false,
            "searching": false,
            "info": false,
            ordering: false,

            columns: [
                {
                    data: "HORA_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "HORA_FIN",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "SEQ",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('style', 'display:none')

                    }
                }


            ]

        }

        oTable_horario = $('#tbl_horario').dataTable(parms);
        $('#tbl_horario').removeAttr('style');


    }

    var fillBandejaMarcaciones = function () {


        var parms = {
            data: null,
            //"sDom": "t",
            "paging": false,
            "searching": false,
            "info": false,
            ordering: false,
            columns: [
                {
                    data: "MARCACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                //,
                //{
                //    data: "PIDM",
                //    createdCell: function (td, cellData, rowData, row, col) {

                //        $(td).attr('style', 'display:none')

                //    }
                //}


            ]

        }

        oTable_marcaciones = $('tbl_marcaciones').dataTable(parms);
        $('#tbl_marcaciones').removeAttr('style');


    }

    var eventoControles = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                $("#input_empl").parent().attr("class", "control-group")
                Bloquear("ventana");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        var slc_ant = "";
        var estado = "";
        $('#slcSucural').on('change', function () {


            if (slc_ant != $(this).val()) {
                Bloquear("ventana");
                $("#input_empl").parent().attr("class", "control-group")

                setTimeout(function () {
                    $("#input_empl").children().remove();
                    $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")
                    if ($("#chk_todos").is(':checked')) {
                        $("#txt_empleado").val("").attr("disabled", true)
                    } else {
                        $("#txt_empleado").val("").attr("disabled", false)
                    }
                    if ($("#rb_activo").is(':checked')) {
                        estado = "A"
                    } else {
                        if ($("#rb_inactivo").is(':checked')) {
                            estado = "I"
                        }
                    }
                    filltxtEmpleado('#txt_empleado', '', estado);

                }, 1000);



                slc_ant = $(this).val();
            } else { slc_ant = ""; }
        });

        $('#rb_dias').on('change', function () {
            if ($("#rb_dias").is(':checked')) {
                $("#div_fec_fin").attr("style", "display:block");
                $("#txt_fec_fin").val("");
                $("#txt_fec_inicio").val("");
                $("#txt_fec_fin").datepicker("setDate", "");
                $("#txt_fec_inicio").datepicker("setDate", "");
                $("#txt_fec_fin").attr("disabled", false);
                $("#lbl_fec_inicio").html("Desde")
                $("#msg").attr("style", "display:none");
                $("#body_msg").html("");
                /***********horas****************/
                $("#txt_hora_inicio").val("");
                $("#txt_hora_fin").val("");
                $("#txt_hora_inicio").attr("disabled", true);
                $("#txt_hora_fin").attr("disabled", true);
                $("#div_rang_horas").attr("style", "display:none");
                $("#div_horario").attr("style", "display:none")
                $("#div_marcacion").attr("style", "display:none")
                oTable_marcaciones.fnClearTable();
                oTable_horario.fnClearTable();

                if ($($("#txt_empleado").parent().parent()).hasClass("error"))
                {
                    $($("#txt_empleado").parent().parent()).attr("class", "control-group");
                    $("#msg").attr("style", "display:none");
                }

            } 
        });


        $('#rb_horas').on('change', function () {
            if ($("#rb_horas").is(':checked')) {


                $("#div_fec_fin").attr("style", "display:none");
                $("#txt_fec_fin").val("");
                $("#txt_fec_inicio").val("");
                $("#txt_fec_fin").datepicker("setDate", "");
                $("#txt_fec_inicio").datepicker("setDate", "");
                $("#txt_fec_fin").attr("disabled",true);
                $("#lbl_fec_inicio").html("Día")
                $("#msg").attr("style", "display:none");
                $("#body_msg").html("");
                /***********horas****************/
                $("#txt_hora_inicio").val("");
                $("#txt_hora_fin").val("");
                $("#div_rang_horas").attr("style", "display:block");
            } else {
               
            }
        });

        $("#txt_fec_inicio").keyup(function () {
            if ($("#rb_horas").is(':checked')) {
                if ($(this).val().length <= 0 || $(this).val().length < 10) {

                    oTable_marcaciones.fnClearTable();
                    oTable_horario.fnClearTable();
                    $("#txt_hora_inicio").attr("disabled", true);
                    $("#txt_hora_fin").attr("disabled", true);
                }

            }
        });

        $("#txt_fec_inicio").datepicker().on("changeDate", function (e) {
            Bloquear("ventana");
            var fecha = $("#txt_fec_inicio").val();
            setTimeout(function () {

                if ($("#txt_fec_inicio").val() != "" && $("#txt_fec_inicio").val().length == 10) {

                    /*************HORAS******************/
                    if ($("#rb_horas").is(':checked')) {
                        if ($("#hfpidm").val() == "") {
                            $($("#txt_empleado").parent().parent()).attr("class", "control-group error")
                            $("#head_msg").html("Alerta!")
                            $("#body_msg").html("Por favor, para poder ingresar las horas debes seleccionar primero un empleado.")
                            $("#msg").attr("style", "display:block");
                            $("#txt_hora_inicio").val("");
                            $("#txt_hora_fin").val("");
                            $("#txt_hora_inicio").attr("disabled", true);
                            $("#txt_hora_fin").attr("disabled", true);
                            $("#div_marcacion").attr("style", "display:none")
                            $("#div_horario").attr("style", "display:none")
                            Desbloquear("ventana")
                        }
                        else {
                            //alert($(this).val());
                            //$("#txt_hora_inicio").val("");
                            //$("#txt_hora_fin").val("");
                            $("#txt_hora_inicio").attr("disabled", false);
                            $("#txt_hora_fin").attr("disabled", false);
                            $("#div_horario").attr("style", "display:block")
                            $("#div_marcacion").attr("style", "display:block")
                            Get_Horarios($("#txt_fec_inicio").val(), $("#hfpidm").val());
                            // Lista_Marcaciones($("#hfpidm").val(), "A", $(this).val(), $(this).val(), $('#slcEmpresa').val(), $('#slcSucural').val())
                        }
                    }
                    else {
                        $($("#txt_empleado").parent().parent()).attr("class", "control-group")
                        $("#msg").attr("style", "display:none");
                        Desbloquear("ventana")

                    }
                    /*************HORAS******************/

                } else {
                    oTable_marcaciones.fnClearTable();
                    oTable_horario.fnClearTable();
                    $("#txt_hora_inicio").attr("disabled", true);
                    $("#txt_hora_fin").attr("disabled", true);
                   $("#txt_hora_inicio").val("");
                    $("#txt_hora_fin").val("");
                    Desbloquear("ventana")
                }


            }, 300);


         

        });


        $('#chkEstado').on('click', function () {
            if ($("#chkEstado").is(':checked')) {

                $('#uniform-chkEstado span').removeClass().addClass("checked");
                $('#chkEstado').attr('checked', true);

            } else {

                $('#uniform-chkEstado span').removeClass();
                $('#chkEstado').attr('checked', false);
               
            }
        });


    


        $('#brn_get_Marcaciones').on('click', function () {

            Bloquear("ventana")
            setTimeout(function () {

                Crear_Marcaciones();

            }, 1000);
       

        });
    }


    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                //$('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());

                    } else {

                        $("#slcSucural").select2("val", "");
                    }
                    $("#input_empl").children().remove();
                    $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")           
                    filltxtEmpleado('#txt_empleado', '', 'A');
                   

                }
                else {
                    noexito();
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }

    var Get_Horarios = function (fecha, pidm) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=2&FECHA=" + fecha + "&PIDM=" + pidm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oTable_horario.fnClearTable()
                oTable_horario.fnDraw();
                if (datos != null) {

                    oTable_horario.fnAddData(datos);
                    $("#txt_hora_inicio").attr("disabled", false);
                    $("#txt_hora_fin").attr("disabled", false);

                } else {
                    $("#txt_hora_inicio").attr("disabled", true);
                    $("#txt_hora_fin").attr("disabled", true);
                }

                Desbloquear("ventana")
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana")
            }
        });

    }
    function filltxtEmpleado(v_ID, v_value, estado_ind) {
        var selectSolicitante = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/ns/ajax/NSMJUST.ashx?OPCION=10&Emp=" + $("#slcEmpresa").val() + "&Suc=" + $('#slcSucural').val(),
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null && datos !== '') {
                    selectSolicitante.typeahead({
                        source: function (query, process) {
                            arrayEmpleados = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayEmpleados.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '",';
                                obj += '"PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_EMPLEADO] = objeto;
                            });
                            process(arrayEmpleados);
                            Desbloquear("ventana");
                        },
                        updater: function (item) {
                            $("#hfpidm").val(map[item].PIDM);
                            if ($($("#txt_empleado").parent().parent()).hasClass("error")) {
                                $($("#txt_empleado").parent().parent()).attr("class", "control-group");
                                $("#msg").attr("style", "display:none");
                                if ($("#txt_fec_inicio").val() != "")
                                {
                                    $("#div_horario").attr("style", "display:block")
                                    $("#div_marcacion").attr("style", "display:block")
                                    Bloquear("ventana")
                                    setTimeout(function () {

                                        Get_Horarios($("#txt_fec_inicio").val(), $("#hfpidm").val());


                                    }, 1000);


                                  
                                   // Lista_Marcaciones($("#hfpidm").val(), "A", $("#txt_fec_inicio").val(), $("#txt_fec_inicio").val(), $('#slcEmpresa').val(), $('#slcSucural').val())
                                    }
                              
                            }
                            return item;
                        },
                    });


                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectSolicitante.val(v_value);
                    Desbloquear("ventana");
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar empleados.');
                Desbloquear("ventana");
            }
        });




        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_empleado").val().length <= 0) {

                $("#hfpidm").val("");
                if ($("#rb_horas").is(':checked')) {
                    if ($("#hfpidm").val() == "") {
                        $($("#txt_empleado").parent().parent()).attr("class", "control-group error")
                        $("#head_msg").html("Alerta!")
                        $("#body_msg").html("Por favor, para poder ingresar las horas debes seleccionar primero un empleado.")
                        $("#msg").attr("style", "display:block");
                        $("#txt_hora_inicio").val("");
                        $("#txt_hora_fin").val("");
                        $("#txt_hora_inicio").attr("disabled", true);
                        $("#txt_hora_fin").attr("disabled", true);
                        oTable_horario.fnClearTable()
                        oTable_marcaciones.fnClearTable()
                        $("#div_horario").attr("style", "display:none")
                        $("#div_marcacion").attr("style", "display:none")
                    }
                }
            }
        });

    }

    var fillCboTipo_Justificacion = function () {
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMJUST.ASHX?Opcion=P",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_justificacion').empty();
                $('#cbo_tipo_justificacion').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_justificacion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipo_justificacion").select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error listar tipo de justificaciones");
            }
        });
    }


    var fillCboTipo_Motivo_Just = function () {
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMJUST.ASHX?Opcion=22",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_motivo').empty();
                $('#cbo_tipo_motivo').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_motivo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipo_motivo").select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error listar tipo motivo de justificaciones");
            }
        });
    }




    var Lista_Marcaciones = function (pidm, ind_activo, fecha_desde, fecha_hasta, ctlg, scsl) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnllima.ashx?OPCION=1&FECHA_DESDE=" + fecha_desde + "&FECHA_HASTA=" + fecha_hasta + "&IND_ACTIVO=" + ind_activo + "&PIDM=" + pidm + "&CTLG_CODE=" + ctlg + "&SCSL_CODE=" + scsl,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTable_marcaciones.fnClearTable();
                    oTable_marcaciones.fnAddData(datos);
                    oTable_marcaciones.fnDraw();

                }
                else {

                    oTable_marcaciones.fnClearTable();

                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }
    var CargaInicial = function () {

       
        
        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            //var IND_MODIFICACION = "";
            var IND_PLANILLA = "";
            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSLJUST.ashx?Opcion=X&codigo=" + CODE,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {


                    if (datos[0].RHFATAR_TIPO_FALTA == "1") {
                        $("#rb_dias").click().click()
                        $("#rb_horas").attr("disabled", true);

                        $("#txt_fec_inicio").datepicker("setDate", datos[0].RHFATAR_DIA_INICIO)
                        $("#txt_fec_fin").datepicker("setDate", datos[0].RHFATAR_DIA_FIN)

                    }

                    if (datos[0].RHFATAR_TIPO_FALTA == "2") {
                        $("#rb_horas").click().click()
                        $("#rb_dias").attr("disabled", true);
                        $("#txt_fec_inicio").datepicker("setDate", datos[0].RHFATAR_DIA_INICIO)

                    }
                 

                    $("#txt_codigo").val(datos[0].CODIGO);
                    $("#hfpidm").val(datos[0].PIDM);
                    $("#slcEmpresa").select2("val", datos[0].CTLG_CODE);
                    $("#slcSucural").select2("val", datos[0].SCSL_CODE);

                    $("#slcEmpresa").attr("disabled", true);
                    $("#slcSucural").attr("disabled", true);
                    
                    
                    $("#txt_empleado").val(datos[0].NOMBRE);
                    $("#txt_empleado").attr("disabled", true);
                    
                    $("#cbo_tipo_motivo").select2("val", datos[0].TIPO_MOTIVO);
                    $("#cbo_tipo_justificacion").select2("val", datos[0].TIPO_JUST);
                    $("#hftipo_justif").val(datos[0].TIPO_JUST);
                    $("#txt_motivo").val(datos[0].RHFATAR_MOTIVO);

                    IND_PLANILLA = datos[0].IND_PLANILLA;
                    
                    if (datos[0].TIPO_JUST == "TJU1" || datos[0].TIPO_JUST == "TJU2") {
                    
                        $('#DivSeparador').css({ 'display': 'block' });
                        $('#DivDetalle').css({ 'display': 'block' });

                       

                    }

                    if (datos[0].RHFATAR_ESTADO_IND == "A") {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    if (datos[0].RHFATAR_ESTADO_IND == "I") {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }

                   

                    

                    if (datos[0].IND_COMPLETADO == "C") {

                        $("#txt_hora_inicio").val(datos[0].RHFATAR_DESDE_HORA)
                        $("#txt_hora_fin").val(datos[0].RHFATAR_HASTA_HORA)
                    }

                    if (datos[0].IND_COMPLETADO == "I") {

                        $("#txt_hora_inicio").val(datos[0].RHFATAR_DESDE_HORA)
                       
                    }
               



                },
                error: function (msg) {
                    alert(msg);
                }
            });

        
            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSLJUST.ashx?Opcion=I&codigo=" + CODE,
                async: false,
                success: function (datos) {
                    $('#tblImagenes tbody').html(datos);
                 

                    if (IND_PLANILLA != "C") {
                        $("#acciones").attr("style", "display:block")
                        $("#acciones").html('<a id="grabar" class="btn blue" href="javascript:ModificarJustificacion();"><i class="icon-pencil"></i>&nbsp;Modificar</a>&nbsp;<a class="btn" href="?f=NSMJUST"><i class="icon-remove"></i>&nbsp;Cancelar</a>')
                    }
                    if (IND_PLANILLA == "C") {
                        $('.Eliminar').attr({ 'disabled': 'disabled' });
                        $('.Eliminar').removeAttr('href');
                        $('#btnAgregar').attr({ 'disabled': 'disabled' });
                        $('#btnAgregar').removeAttr('href');
                        $('#btnAgregar').attr({ 'disabled': 'disabled' });
                        $('#txtDescripcion').attr({ 'disabled': 'disabled' });
                        $('#fuArchivo').attr({ 'disabled': 'disabled' });
                        $(".bloquear").attr({ 'disabled': 'disabled' });
                    }

                    $('#tblImagenes').dataTable({
                        "paging": false,
                        "info": false,
                        "searching": false,
                        "sorting": false
                    });

                },
                error: function (msg) {
                    alert(msg);
                }
            });


        } else {
            $("#txt_hora_inicio").attr("disabled", true);
            $("#txt_hora_fin").attr("disabled", true);


            $("#acciones").attr("style", "display:block")
            $("#acciones").html('<a id="grabar" class="btn blue" href="javascript:Save();"><i class="icon-save"></i>&nbsp;Grabar</a>&nbsp;<a class="btn" href="?f=NSMJUST"><i class="icon-remove"></i>&nbsp;Cancelar</a>')
        }
    }

    return {
        init: function () {
          
            plugins();
            fillBandejaHorarios();
            fillCboTipo_Justificacion();
            fillCboTipo_Motivo_Just();
            fillBandejaMarcaciones();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            eventoControles();
            CargaInicial();

        }
    };


   
    
}();


function Validar_Formulario() {
    var bool = false;
    if ($("#rb_dias").is(':checked')) {
        var arraY = ["slcEmpresa",
                     "slcSucural",
                     "cbo_tipo_motivo",
                     "cbo_tipo_justificacion",
                     "txt_motivo",
                     "txt_empleado",
                     "txt_fec_inicio",
                     "txt_fec_fin"
                     ];
    }
    if ($("#rb_horas").is(':checked')) {
        var arraY = ["slcEmpresa",
                     "slcSucural",
                     "cbo_tipo_motivo",
                     "cbo_tipo_justificacion",
                     "txt_motivo",
                     "txt_empleado",
                     "txt_fec_inicio",
                     "txt_hora_inicio"
                    ];
    }


    var v_Errors = true;
    var v_message = "";

 


  

    if ($('#txt_hora_inicio').val().indexOf('_') != -1) {
        $('#txt_hora_inicio').val('');
        if (!vErrorsNotMessage(["txt_hora_inicio"])) {
                v_message += "* Hora Inicio." + "<br>";
                v_Errors = false;
               // $('#txtHoraInicio').val(v_HoraInicoOrigen);
            }
        }

    if ($('#txt_hora_fin').val().indexOf('_') != -1) {
        $('#txt_hora_fin').val('');
        if (!vErrorsNotMessage(["txt_hora_fin"])) {
                v_message += "* Hora Fin." + "<br>";
                v_Errors = false;
               // $('#txtHoraFin').val(v_HoraFinOrigen);
            }
        }

        if (v_Errors) {
            if (vErrors(arraY)) {
                Bloquear("ventana")

                bool = true;
            }
        } else {

            alertCustom(v_message);

        }


    

    return bool;
    
}


function Save() {
   
    var p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    var p_SCSL_CODE = $.trim($('#slcSucural').val());
    var p_PIDM = $('#hfpidm').val();
    

    var p_DIA_INICIO = $("#txt_fec_inicio").val();
    var p_DIA_FIN = $("#txt_fec_fin").val();
    
    var p_HORA_INICIO = $.trim($('#txt_hora_inicio').val());
    var p_HORA_FIN = $.trim($('#txt_hora_fin').val());
    var p_MOTIVO = $.trim($('#txt_motivo').val());

    
    var p_EST_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var p_TIPO_JUST = $.trim($('#cbo_tipo_justificacion').val());
    var p_TIPO_MOTIVO = $.trim($('#cbo_tipo_motivo').val());
    var p_USUA_ID = $('#ctl00_txtus').val();


    if ($("#rb_dias").is(':checked')) {
        var p_TIPO_X_DIA_HORA = "D";
        var p_TIPO_FALTA = "1"
            }
    if ($("#rb_horas").is(':checked')) {
        var p_TIPO_X_DIA_HORA = "H";
        var p_TIPO_FALTA = "2"
    }

    var data = new FormData();

    data.append("OPCION", "R");
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_PIDM", p_PIDM);
    data.append("p_TIPO_FALTA", p_TIPO_FALTA);
    data.append("p_TIPO_X_DIA_HORA", p_TIPO_X_DIA_HORA);
    data.append("p_DIA_INICIO", p_DIA_INICIO);
    data.append("p_DIA_FIN", p_DIA_FIN);
    data.append("p_HORA_INICIO", p_HORA_INICIO);
    data.append("p_HORA_FIN", p_HORA_FIN);
    data.append("p_MOTIVO", Enter_MYSQL(p_MOTIVO));
    data.append("p_EST_IND", p_EST_IND);

    data.append("p_TIPO_JUST", p_TIPO_JUST);
    data.append("p_TIPO_MOTIVO", p_TIPO_MOTIVO);
    data.append("p_USUA_ID", p_USUA_ID);


    var bool = Validar_Formulario()

    if (bool) {
        $.ajax({
            url: "vistas/NS/ajax/NSMJUST.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })
         

            .success( function (datos) {
                if (datos.split(",")[1] == "OK" && datos.split(",")[1] != "undefined") {
                                exito()
                                $("#txt_codigo").val(datos.split(",")[0])
                                $("#msg").attr("style", "display:none")
                                $("#body_msg").html("");

                                $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                                $("#grabar").attr("href", "javascript:ModificarJustificacion();");

                                if ($("#rb_horas").is(':checked')) {
                                    $('#uniform-rb_dias span').removeClass();
                                    $('#rb_dias').attr('checked', false);
                                    $('#rb_dias').attr('disabled', true);
                                }

                                if ($("#rb_dias").is(':checked')) {
                                    $('#uniform-rb_horas span').removeClass();
                                    $('#rb_horas').attr('checked', false);
                                    $('#rb_horas').attr('disabled', true);
                                }

                                $("#slcEmpresa").attr("disabled", true);
                                $("#slcSucural").attr("disabled", true);
                                $("#txt_empleado").attr("disabled", true);
                          

                                if ($("#cbo_tipo_justificacion").val() == "TJU1" || $("#cbo_tipo_justificacion").val() == "TJU2") {
                                    $('#DivSeparador').css({ 'display': 'block' });
                                    $('#DivDetalle').css({ 'display': 'block' });
                                    $('#div_jqx').css({ 'display': 'block' });
                                    $('#div_jqx2').css({ 'display': 'block' });
                                }
                            } else {

                    if (datos == "E") {

                        alertCustom("Error al crear la justificacion.")
                    } else {

                        $("#msg").attr("style", "display:block")
                        $("#body_msg").html("<strong>Alerta!  </strong>" + datos);
                    }
                                
                }
               
               
                            Desbloquear("ventana")

            })
           .error(function () {
                Desbloquear("ventana");
                noexitoCustom("Error al Registrar!")
           })
       


    }


}

function ModificarJustificacion() {

    var p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    var p_CODIGO = $.trim($('#txt_codigo').val());
    var p_HFTIPO_JUST = $("#hftipo_justif").val();
    var p_PIDM = $('#hfpidm').val();

    var p_DIA_INICIO = $("#txt_fec_inicio").val();
    var p_DIA_FIN = $("#txt_fec_fin").val();

    var p_HORA_INICIO = $.trim($('#txt_hora_inicio').val());
    var p_HORA_FIN = $.trim($('#txt_hora_fin').val());
    var p_MOTIVO = $.trim($('#txt_motivo').val());


    var p_EST_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var p_TIPO_JUST = $.trim($('#cbo_tipo_justificacion').val());
    var p_TIPO_MOTIVO = $.trim($('#cbo_tipo_motivo').val());
    var p_USUA_ID = $('#ctl00_txtus').val();


    if ($("#rb_dias").is(':checked')) {
        var p_TIPO_X_DIA_HORA = "D";
        var p_TIPO_FALTA = "1"
    }
    if ($("#rb_horas").is(':checked')) {
        var p_TIPO_X_DIA_HORA = "H";
        var p_TIPO_FALTA = "2"
    }

    var data = new FormData();

    data.append("OPCION", "M");

    data.append("p_CODIGO", p_CODIGO);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_SCSL_CODE", $("#slcSucural").val());
    data.append("p_TIPO_FALTA", p_TIPO_FALTA);
    data.append("p_TIPO_X_DIA_HORA", p_TIPO_X_DIA_HORA);
    data.append("p_DIA_INICIO", p_DIA_INICIO);
    data.append("p_DIA_FIN", p_DIA_FIN);
    data.append("p_HORA_INICIO", p_HORA_INICIO);
    data.append("p_HORA_FIN", p_HORA_FIN);
    data.append("p_MOTIVO", Enter_MYSQL(p_MOTIVO));
    data.append("p_EST_IND", p_EST_IND);

    data.append("p_TIPO_JUST", p_TIPO_JUST);
    data.append("p_HFTIPO_JUST", p_HFTIPO_JUST);
    data.append("p_TIPO_MOTIVO", p_TIPO_MOTIVO);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_PIDM", p_PIDM);

    var bool = Validar_Formulario()


    if (p_EST_IND  == "I") {
    
        bool = true;
    }

    if (bool) {
        $.ajax({
            url: "vistas/NS/ajax/NSMJUST.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })


            .success(function (datos) {


                if (datos == "OK"){
                    exito();
                    if ($.trim($('#cbo_tipo_justificacion').val()) == "TJU3") {

                        $('#DivSeparador').css({ 'display': 'none' });
                        $('#DivDetalle').css({ 'display': 'none' });
                        $('#div_jqx').css({ 'display': 'none' });
                        $('#div_jqx2').css({ 'display': 'none' });
                    } else {
                        $('#DivSeparador').css({ 'display': 'block' });
                        $('#DivDetalle').css({ 'display': 'block' });
                        $('#div_jqx').css({ 'display': 'block' });
                        $('#div_jqx2').css({ 'display': 'block' });

                    }

                }

                if (datos == "NO") {
                    noexitoCustom("Error al Actualizar!")
                }

                if (datos != "OK" && datos != "NO") {

                    $("#msg").attr("style", "display:block")
                    $("#body_msg").html("Alerta! " + datos);
                }
                else {
                    $("#msg").attr("style", "display:none")
                    $("#body_msg").html("");
                }
                    


                

              
                Desbloquear("ventana")

            })
           .error(function () {
               Desbloquear("ventana");
               noexitoCustom("Error al Actualizar!")
           })

    }
}

    var Visualizar = function (Ruta) {
        $("#pic").removeAttr('src');
        $("#pic").attr({ 'src': Ruta });
    }

    var ListarEmpleado = function () {
        var Emp = $("#ctl00_hddctlg").val();
        var Suc = $('#ctl00_hddestablecimiento').val();
        var us = $('#ctl00_txtus').val();
        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMJUST.ashx?Opcion=L&Emp=" + Emp + "&Suc=" + Suc,
            success: function (res) {
                $('#cboEmpleado').append(res);
                $('#cboEmpleado').change();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    function AgregarImagen() {




        var v_Errors = true;


        if ($('#txt_codigo').val() == "") {
            alertCustom('Primero registre la justificación antes de añadir las imágenes.');
            return false;
        }

        v_Errors = ValidarImagen();
        if (v_Errors == false) {
            return false;
        }





        var Ruta = $("#fuArchivo")[0].files[0];
        var Cod = $("#txt_codigo").val();
        var Des = $("#txtDescripcion").val();

        var data = new FormData();
        data.append('Cod', Cod);
        data.append('Ruta', Ruta);
        data.append('Des', Des);
        data.append('img', $("#fuArchivo")[0].files[0]);



        $.ajax({

            url: "vistas/NS/ajax/NSMJUST.ashx?Opcion=I",
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false,

            success: function (res) {

                if (res != "") {
                    exito();
                    var array = res.split(',');
                    $('#fuArchivo').val('');
                    $('#txtDescripcion').val('');
                    var Faltante = "<td  align='center'><a class='btn red Eliminar' href=javascript:Eliminar('" + array[2] + "');><i class='icon-minus'></i></a></td>";

                    var contenido = $('#tblImagenes tbody tr td').text();
                    if (contenido == "No hay información disponible") {
                        $('#tblImagenes tbody').html("<tr> <td style='display:none;'>" + array[1] + "</td> <td><a href=javaScript:Visualizar('" + array[0] + "')" + ">" + Des + "</a></td>" + Faltante + " </tr>");
                    } else {
                        $('#tblImagenes').append("<tr> <td style='display:none;'>" + array[1] + "</td> <td><a href=javaScript:Visualizar('" + array[0] + "')" + ">" + Des + "</a></td>" + Faltante + " </tr>");
                    }


                    $('#tblImagenes').dataTable().fnDestroy()
                    $('#tblImagenes').dataTable({
                        "paging": false,
                        "info": false,
                        "searching": false,
                        "sorting": false
                    });
                }
                else {
                    noexito();
                }
            }
        });
    }
    function ValidarCheked() {
        $('#rbDia').on('change', function () {
            if ($("#rbDia").is(':checked')) {
                //$('#txtfechfin').attr('placeholder', '');
                $('#lblDesde').text('Desde');
                $('#DivlblHasta').css({ display: 'block' });
                $('#DivtxtHasta').css({ display: 'block' });
                $('#DivHora').css({ display: 'none' });
                $('#txtHoraInicio').val('');
                $('#txtHoraFin').val('');
                //$('#txtfechfin').attr("disabled", true);
                //$('#txtfechfin').val('');
                //offObjectEvents('txtfechfin');
                //alert('Si');
            } else {
                //$('#txtfechfin').attr('placeholder', 'dd/mm/yyyy');
                //$('#txtfechfin').attr("disabled", false);
                //alert('No');
            }
        });
        $('#tbHora').on('change', function () {
            if ($("#tbHora").is(':checked')) {
                $('#lblDesde').text('Día');
                $('#DivlblHasta').css({ display: 'none' });
                $('#DivtxtHasta').css({ display: 'none' });
                $('#DivHora').css({ display: 'block' });
                $('#txtHasta').val('');

                //$('#txtfechfin').attr('placeholder', '');
                //$('#txtfechfin').attr("disabled", true);
                //$('#txtfechfin').val('');
                //offObjectEvents('txtfechfin');
                //alert('Si');
            } else {
                //$('#txtfechfin').attr('placeholder', 'dd/mm/yyyy');
                //$('#txtfechfin').attr("disabled", false);
                //alert('No');
            }
        });

    }
    function CargaInicialCheckes() {
        $('#lblDesde').text('Desde');
        $('#DivlblHasta').css({ display: 'block' });
        $('#DivtxtHasta').css({ display: 'block' });
        $('#DivHora').css({ display: 'none' });
    }


    function Eliminar(id) {

        Bloquear("ventana");

        $.post("vistas/NS/ajax/NSMJUST.ashx",
            {
                opcion: 'E', id: id
            },
            function (res) {
                Desbloquear("ventana");
                if (res == 'OK') {

                    var Cod = $("#txt_codigo").val();



                    $.ajax({
                        type: "POST",
                        url: "vistas/NS/ajax/NSLJUST.ashx?Opcion=I&codigo=" + Cod,
                        //contentType: "application/json;",
                        //dataType: "json",
                        success: function (datos) {

                            $('#tblImagenes tbody').html(datos);
                            $("#pic").attr("src", "");


                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });







                    //$('#txtCodigo').val(res);
                    exito();
                    //$("#grabar").html("<i class='icon-pencil'></i> modificar");
                    //$("#grabar").attr("href", "javascript:ModificarJustificacion()");
                } else {

                }
            });
        //}
    }

    function ValidarGeneral(Tipo) {
        var v_Errors = true;


        if (Tipo == "Dia") {
            if (!vErrorsNotMessage(["cboEmpleado", "txtDesde", "txtHasta", "cboTipo", "txtMotivo"])) {
                v_Errors = false;
            }
        }
        if (Tipo == "Hora") {
            if (!vErrorsNotMessage(["cboEmpleado", "txtDesde", "txtHoraInicio", "txtHoraFin", "cboTipo", "txtMotivo"])) {
                v_Errors = false;
            }
        }


        if (!v_Errors) {
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
        }

        return v_Errors;

        $('#FechaUno').addClass('span4');
        $('#FechaDos').addClass('span4');
        $('#HoraUno').addClass('span3');
        $('#HoraDos').addClass('span3');
    }
    function ValidarImagen() {
        var v_Errors = true;



        if (!vErrorsNotMessage(["fuArchivo", "txtDescripcion"])) {
            v_Errors = false;
        }

        if (!v_Errors) {
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
        }

        return v_Errors;
    }






    //function ValidarPeriodo() {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/NS/ajax/NSLJUST.ashx?Opcion=0",
    //        async: false,
    //        success: function (datos) {
    //            if (datos != null) {
    //                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hffecha").val(datos);
    //            }
    //        },
    //        error: function (msg) {
    //            alert(msg.d);
    //        }
    //    });
    //};




    function ValidarHora() {
        var v_message = "";
        if ($('#txtHoraInicio').val().indexOf('_') != -1) {
            $('#txtHoraInicio').val('');
            if (vErrors(["txtHoraInicio"])) {
                v_message += "* Hora Inicio." + "<br>";
                //$('#txtHoraInicio').val(v_HoraInicoOrigen);
            }
        }

        if ($('#txtHoraFin').val().indexOf('_') != -1) {
            $('#txtHoraFin').val('');
            if (vErrors(["txtHoraFin"])) {
                v_message += "* Hora Inicio." + "<br>";

            }
        }

        var Inicio = $('#txtHoraInicio').val().split(':');
        var Fin = $('#txtHoraFin').val().split(':');

        var v_HoraInicioUno = Inicio[0];
        var v_HoraInicioDos = Inicio[1];
        var v_HoraFinUno = Fin[0];
        var v_HoraFinDos = Fin[1];

        var v_HoraInicio = v_HoraInicioUno.toString() + v_HoraInicioDos.toString();
        var v_HoraFin = v_HoraFinUno.toString() + v_HoraFinDos.toString();

        if (parseInt(v_HoraInicio) >= parseInt(v_HoraFin)) {
            //$('#txtHoraFin').val('');
            v_message += "* Hora Inicio debe ser menor a Hora Fin." + "<br>";
            //if (vErrors(["txtHoraFin"])) {

            //    //$('#txtHoraInicio').val(v_HoraInicoOrigen);
            //}
            $('#FechaUno').addClass('span4');
            $('#FechaDos').addClass('span4');
            $('#HoraUno').addClass('span3');
            $('#HoraDos').addClass('span3');
        }
        if (v_message != "") {
            alertCustom(v_message);
            return false;
        }
        return true;
    }



    function Listar_Tipo_Justificacion() {
        $('#cbo_tipo_justificacion').html('');
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMJUST.ASHX?Opcion=P",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_justificacion').append(datos);
                $('#cbo_tipo_justificacion').select2();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };



    var Crear_Marcaciones = function () {
        var oFecha = $("#txt_fec_inicio").val();
        var v_Errors = true;
        var v_message = '';

        if ($('#txt_fec_inicio').val().length != 10) {
            $('#txt_fec_inicio').val('');
            if (!vErrorsNotMessage(["txt_fec_inicio"])) {
                v_message += "* Formato Fecha Incorrecto" + "<br>";
                v_Errors = false;
                // $('#txtHoraInicio').val(v_HoraInicoOrigen);
            }
        }

        if (v_Errors) {
            $.ajax({
                type: "post",
                url: "vistas/nn/ajax/nnmrefe.ashx?OPCION=2&p_FECHA=" + oFecha,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos == "OK") {

                        //LSITA MARCACIONES
                        Get_Marcacion_Real_Biometrico($("#hfpidm").val(), oFecha);

                    }
                    if (datos != "E" && datos != "OK") {

                        alertCustom(datos);

                    }
                    if (datos == "E") {


                        alertCustom("Error crear marcaciones");
                      
                    }

                    if (datos == "") {


                        alertCustom("Error crear marcaciones");
                       
                    }
                    Desbloquear("ventana");

                },
                error: function (msg) {
                    alertCustom("Error crear marcaciones");
                    Desbloquear("ventana");
                }

            });
        }
     

    }


    var Get_Marcacion_Real_Biometrico = function (pidm, fecha) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=4&PIDM=" + pidm + "&FECHA=" + fecha,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTable_marcaciones.fnClearTable();
                    oTable_marcaciones.fnAddData(datos);


                }
                else {

                    oTable_marcaciones.fnClearTable();

                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }