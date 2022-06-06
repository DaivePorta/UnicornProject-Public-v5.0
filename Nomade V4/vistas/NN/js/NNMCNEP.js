var array = [];
var seleccionados = [];
var NNLCNEP = function () {

    var plugins = function () {

        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
        $('#cbo_concepto').select2();
        $('#cbo_tipla').select2();
        $("#btn_eliminar").attr("disabled", true);
    }


    var fillBandejaAsignaciones = function () {


        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRES" },
                {
                    data: "CONCEPTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "DESC_TIPLA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "MONTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "NESTADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                      {
                          data: null,
                         // defaultContent: '<a class="btn red" style="border-radius: 4px !important;"><i class="icon-trash"></i></a>',
                          createdCell: function (td, cellData, rowData, row, col) {

                              $(td).attr('style', 'text-align:center')
                              $(td).html('<input type="checkbox" class="check_"  style="height:25px!important;width:25px!important;"/>')
                          }
                      }
                      

            ]

        }

        oTableAsig = iniciaTabla('tbl_asig_conp_empl', parms);
        $('#tbl_asig_conp_empl').removeAttr('style');
        $('#tbl_asig_conp_empl tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableAsig.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableAsig.fnGetPosition(this);
                var row = oTableAsig.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=nnmcnep&codigo=' + CODIGO;
            }
        });


        $('#tbl_asig_conp_empl tbody').on('click', '.check_', function () {

            $($(this).parents("tr")).addClass('selected');


            var pos = oTableAsig.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableAsig.fnGetData(pos);



            if ($(this).is(":checked")) {

           
                $($(this).parents("tr")).addClass('selected2');
                seleccionados.push(row.CODIGO);


            } else {

               
                $($(this).parents("tr")).removeClass('selected2');
                seleccionados.filter(function (e, f) {
                    if (e == row.CODIGO) { seleccionados.splice(f, 1); }
                });
            }

            if (seleccionados.length > 0) {

                $("#btn_eliminar").attr("disabled", false);
            } else {
                $("#btn_eliminar").attr("disabled", true);
            }


      
        });
 
    }

    var eventoControles = function () {


        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {


            if (emp_ant != $(this).val()) {

                ListarSucursales($('#slcEmpresa').val());
                emp_ant = $(this).val();
                //ListaAsigConpEmpleado();
            } else { emp_ant = ""; }
        });

        var tipo_ant = ""
        $('#cbo_tipla').on('change', function () {


            if (tipo_ant != $(this).val()) {
                ListarConceptos($(this).val());
                tipo_ant = $(this).val();
            } else { tipo_ant = ""; }
        });
 

    


        $('#rb_avanzada').on('click', function () {
            if ($("#rb_avanzada").is(':checked')) {

                $("#busq_avanz").slideDown();

            }
        });

        $('#rb_todos').on('click', function () {
            if ($("#rb_todos").is(':checked')) {

                $("#busq_avanz").slideUp();
                reset();
            }
        });


        //EVENTOS CHECKS
        $('#chkemp').on('click', function () {
            if ($("#chkemp").is(':checked')) {

                $('#uniform-chkemp span').removeClass().addClass("checked");
                $('#chkemp').attr('checked', true);
                $('#chkscsl').attr('disabled', false);
                MuestraOculta("empresa", true);
                array.push("slcEmpresa");
            } else {

                $('#uniform-chkemp span').removeClass();
                $('#chkemp').attr('checked', false);
                MuestraOculta("empresa", false);
                $('#chkscsl').attr('disabled', true);
                array.splice(array.indexOf("slcEmpresa"), 1);
                $("#slcEmpresa").parent().parent().attr("class", "control-group")

                //desbilito sucursal tbn
                $('#uniform-chkscsl span').removeClass();
                $('#chkscsl').attr('checked', false);
                MuestraOculta("sucursal", false);
                array.splice(array.indexOf("slcSucural"), 1);
                $("#slcSucural").parent().parent().attr("class", "control-group")
            }
        });


        $('#chkscsl').on('click', function () {
            if ($("#chkscsl").is(':checked')) {

                $('#uniform-chkscsl span').removeClass().addClass("checked");
                $('#chkscsl').attr('checked', true);
                MuestraOculta("sucursal", true);
                array.push("slcSucural");
            } else {

                $('#uniform-chkscsl span').removeClass();
                $('#chkscsl').attr('checked', false);
                MuestraOculta("sucursal", false);
                array.splice(array.indexOf("slcSucural"), 1);
                $("#slcSucural").parent().parent().attr("class", "control-group")

            }
        });


        $('#chktipla').on('click', function () {
            if ($("#chktipla").is(':checked')) {

                $('#uniform-chktipla span').removeClass().addClass("checked");
                $('#chktipla').attr('checked', true);
                $('#chkConcepto').attr('disabled', false);
                MuestraOculta("tipo_pla", true);
                array.push("cbo_tipla");
            } else {

                $('#uniform-chktipla span').removeClass();
                $('#chktipla').attr('checked', false);
                $('#chkConcepto').attr('disabled', true);
                MuestraOculta("tipo_pla", false);
                array.splice(array.indexOf("cbo_tipla"), 1);
                $("#cbo_tipla").parent().parent().attr("class", "control-group")

                //desabilito
                $('#uniform-chkConcepto span').removeClass();
                $('#chkConcepto').attr('checked', false);
                MuestraOculta("concepto", false);
                array.splice(array.indexOf("cbo_concepto"), 1);
                $("#cbo_concepto").parent().parent().attr("class", "control-group");

            }
        });

        $('#chkConcepto').on('click', function () {
            if ($("#chkConcepto").is(':checked')) {

                $('#uniform-chkConcepto span').removeClass().addClass("checked");
                $('#chkConcepto').attr('checked', true);
                MuestraOculta("concepto", true);
                array.push("cbo_concepto");
            } else {

                $('#uniform-chkConcepto span').removeClass();
                $('#chkConcepto').attr('checked', false);
                MuestraOculta("concepto", false);
                array.splice(array.indexOf("cbo_concepto"), 1);
                $("#cbo_concepto").parent().parent().attr("class", "control-group");
            }
        });


        $('#btn_filtrar').on('click', function () {

            if ($("#rb_avanzada").is(':checked')) {

                if (vErrors(array)) {

                    var emp = '';
                    var scsl = 'T';
                    var tipla = '';
                    var conp = '';

                    if ($("#chkemp").is(':checked')) { emp = $("#slcEmpresa").val(); }
                    if ($("#chkscsl").is(':checked')) { scsl = $("#slcSucural").val(); }
                    if ($("#chktipla").is(':checked')) { tipla = $("#cbo_tipla").val(); }
                    if ($("#chkConcepto").is(':checked')) {conp =  $("#cbo_concepto").val(); }


                    ListaAsigConpEmpleado(emp, scsl, tipla, conp);
                }
            }

            if ($("#rb_todos").is(':checked')) {
                ListaAsigConpEmpleado("","","","");
            }

          
        });

        $('#btn_eliminar').on('click', function () {
            //Bloquear("ventana")
            //setTimeout(function () {
            $("#Confirm").modal("show");
            //}, 1000);


        });



        $('#btn_aceptar').on('click', function () {

            $('#btn_aceptar').blur();

            Bloquear("ventana");
              
                setTimeout(function () {



                    var data = new FormData();

                    data.append("OPCION", "E");
                    data.append("p_DETALLE", seleccionados.toString());


                    $.ajax({
                        url: "vistas/NN/ajax/NNMCNEP.ASHX",
                        type: "POST",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false,
                    })


                        .success(function (datos) {
                            if (datos == "OK" ) {

                                $('#btn_filtrar').click().click()
                                seleccionados = [];
                                exito();
                            } else {

                                noexitoCustom("Error al eliminar!")

                            }
                            $("#Confirm").modal("hide");

                            Desbloquear("ventana");

                        })
                       .error(function () {
                           Desbloquear("ventana");
                           noexitoCustom("Error al Registrar!")
                       })


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
    var fillCboTipoPlanilla = function () {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcnep.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipla').empty();
                $('#cbo_tipla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipla').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipla").select2("val", "").change();
            },
            error: function (msg) {
                alertCustom("Error Listado Tipo Planilla")
            }
        });
    }
    var reset = function () {

        $('#uniform-chkemp span').removeClass();
        $('#chkemp').attr('checked', false);
        $('#uniform-chkscsl span').removeClass();
        $('#chkscsl').attr('checked', false);
        $('#chkscsl').attr('disabled', true);
        $('#uniform-chktipla span').removeClass();
        $('#chktipla').attr('checked', false);
        $('#uniform-chkConcepto span').removeClass();
        $('#chkConcepto').attr('checked', false);
        $('#chkConcepto').attr('disabled', true);
       
        if ($("#ctl00_hddctlg").val() == "") { $("#slcEmpresa").select2("val", ""); }
        else { $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()); }
        if ($("#ctl00_hddestablecimiento").val() == "") { $("#slcSucural").select2("val", ""); }
        else { $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val()); }
        $("#cbo_tipla").select2("val", "");
        $("#cbo_concepto").select2("val", "");



        MuestraOculta("empresa", false);
        MuestraOculta("sucursal", false);
        MuestraOculta("tipo_pla", false);
        MuestraOculta("concepto", false);


    }


    var MuestraOculta = function (v_ID, bool) {

        if (bool) {
            $("#" + v_ID).attr("style", "display:block")
        }
        else {
            $("#" + v_ID).attr("style", "display:none")
        }


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

                        $("#slcSucural").select2("val", "T").change();
                    }


                }
                else {
                    noexito();
                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListaAsigConpEmpleado = function (emp,scsl,tipla,conp) {

         
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcnep.ashx?OPCION=2&CTLG_CODE=" + emp + "&SCSL_CODE=" + scsl + "&p_CONCEPTO_CODE=" + conp + "&p_TIPLA_CODE=" + tipla,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    
                    oTableAsig.fnClearTable();
                    oTableAsig.fnAddData(datos);


                }
                else {
                    
                    oTableAsig.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }
    var ListarConceptos = function (tipla) {
        Bloquear("div_concepto");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcnep.ashx?OPCION=4&p_TIPLA_CODE=" + tipla,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_concepto').empty();
                $('#cbo_concepto').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_concepto').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');

                    }

                    $('#cbo_concepto').select2("val", "").change();

                }
                else {
                    //noexitoCustom("No existen Conceptos")
                }

                Desbloquear("div_concepto");

            },
            error: function (msg) {
                noexitoCustom("Error listado conceptos!!")
                Desbloquear("div_concepto");
            }
        });
    }

    return {
        init: function () {
            plugins();
           
            fillCboEmpresa();
            fillCboTipoPlanilla();
            ListarSucursales($('#slcEmpresa').val());
            eventoControles();
            fillBandejaAsignaciones();
            ListaAsigConpEmpleado("", "", "", "");
            $('#uniform-chkemp span').removeClass();
            $('#chkemp').attr('checked', false);
            $('#uniform-chkscsl span').removeClass();
            $('#chkscsl').attr('checked', false);
            $('#chkscsl').attr('disabled', true);

            $('#uniform-chktipla span').removeClass();
            $('#chktipla').attr('checked', false);
            $('#uniform-chkConcepto span').removeClass();
            $('#chkConcepto').attr('checked', false);
            $('#chkConcepto').attr('disabled', true);
        }
    };

}();














var NNMCNEP = function () {

    var plugins = function () {

        $("#cbo_tipo_concepto").select2();
        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $('#cbo_concepto').select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setStartDate', 'y').keydown(function () { return false; });
        //datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });



        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {

            return false;
        }).datepicker("setStartDate", new Date());
        $('#optmes').datepicker("setDate", new Date());

        $('#txt_anho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker().keydown(function () { return false; });
        $("#txt_anho").datepicker('setStartDate', new Date());
        $('#txt_mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker();
        
        $('#cbo_tipo_planilla').select2();
    }


    var fillBandejaEmpleados = function () {


        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "scrollY": "280px",
            columns: [
                {
                    data: "EMPLEADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "PIDM",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('style', 'display:none')

                    }
                },
                {
                    data: "CTLG_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('style', 'display:none')

                    }
                },
                {
                    data: "SCSL_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('style', 'display:none')

                    }
                },

                      {
                          data: null,
                          defaultContent: '<a class="btn red" style="border-radius: 4px !important;"><i class="icon-trash"></i></a>',
                          createdCell: function (td, cellData, rowData, row, col) {

                              $(td).attr('style', 'text-align:center')

                          }
                      }

            ]

        }

        oTable = iniciaTabla('tblconp_planilla', parms);
        $('#tblconp_planilla').removeAttr('style');


     
    }

    var eventoControles = function () {


        $("#optanho").datepicker().on("changeDate", function () {
            var date = new Date();
            var year = date.getFullYear();
            var monthAct = date.getMonth() + 1;
            var yearSelect = this.value;

            if (yearSelect > year) {
                $('#optmes').datepicker("setStartDate", "");
                $('#optmes').datepicker("setDate", "");
                
              
               
            }

            if (yearSelect == year) {
            
               // $('#optmes').datepicker("setStartDate", new Date());
                $('#optmes').datepicker("setDate", new Date());
            }

            $("#txt_anho").datepicker('setStartDate', yearSelect);

        });



        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
           

            if (emp_ant != $(this).val()) {
                Bloquear("divadd_empl");
                ListarSucursales($('#slcEmpresa').val());
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });


        var slc_ant = ""
        $('#slcSucural').on('change', function () {


            if (slc_ant != $(this).val()) {
                Bloquear("divadd_empl");
                $("#input_empl").children().remove();
                $("#input_empl").html("<input id='txt_empleado' class='m-wrap span12' type='text' placeholder='Empleado' />")
                filltxtEmpleado('#txt_empleado', '');
                slc_ant = $(this).val();
            } else { slc_ant = ""; }
        });



        var tipo_ant = ""
        $('#cbo_tipo_planilla').on('change', function () {


            if (tipo_ant != $(this).val()) {
                Bloquear("div_concepto");
                ListarConceptos($(this).val());
                tipo_ant = $(this).val();
            } else { tipo_ant = ""; }
        });

        $('#txt_concepto').on('focus', function () {
            $('#txt_concepto').inputmask({ "mask": "l", "repeat": 100, "greedy": false });

        });

        $('#txt_descripcion').on('focus', function () {
            $('#txt_descripcion').inputmask({ "mask": "l", "repeat": 100, "greedy": false });

        });


        $('#chkactivo').on('click', function () {
            oTable.fnClearTable();
            if ($("#chkactivo").is(':checked')) {

                $('#uniform-chkactivo span').removeClass().addClass("checked");
                $('#chkactivo').attr('checked', true);
                $("#tabla").attr("style", " border: none;padding: 2px;background-color: #000; opacity: 0.05;")
                $("#txt_empleado").attr("disabled", true);    
                $("#add").attr("style", "border-radius: 5px!important; margin-left: -11px;display:none;");
                $("#add").attr("disabled", true);

            } else {

                $('#uniform-chkactivo span').removeClass();
                $('#chkactivo').attr('checked', false);
                $("#tabla").removeAttr("style");
                $("#txt_empleado").attr("disabled", false);
                $("#add").attr("style", "border-radius: 5px!important; margin-left: -11px;");
                $("#add").attr("disabled", false);
            }

            $("#txt_empleado").val("");
            $("#hfpidm").val("");
            $("#hfnombre").val("");
            $("#hfctlg_code").val("");
            $("#hfscsl_code").val("");
            $("#hfcn_planilla").val("");
        });
        

        $('#chkestado').on('click', function () {
           
            if ($("#chkestado").is(':checked')) {

                $('#uniform-chkestado span').removeClass().addClass("checked");
                $('#chkestado').attr('checked', true);
              

            } else {

                $('#uniform-chkestado span').removeClass();
                $('#chkestado').attr('checked', false);

            }


        });


        $('#tblconp_planilla tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = oTable.api(true).row($(this).parent().parent()).index();
            oTable.fnDeleteRow(pos);







        });

        $('#add').on('click', function () {

            if ($("#hfpidm").val() != "") {

                var conceptos = "";
                var existe = false;
                if ($("#hfcn_planilla").val() != "") {
                    conceptos = $("#hfcn_planilla").val().split(",");
                    for (var i = 0 ; i < conceptos.length ; i++) {
                        if (conceptos[i] == $("#cbo_concepto").val()) {
                            existe = true;
                        }
                    }
                } 


                if (!existe) {
                    var array = oTable.fnGetData();
                    var bool = false;

                    for (var i = 0 ; i < array.length; i++) {

                        if (array[i].PIDM == $("#hfpidm").val() && array[i].CTLG_CODE == $("#hfctlg_code").val() && array[i].SCSL_CODE == $("#hfscsl_code").val()) {
                            bool = true;
                        }


                    }

                    if (!bool) {
                        oTable.fnAddData([{ EMPLEADO: '' + $("#hfnombre").val() + '', PIDM: '' + $("#hfpidm").val() + '', CTLG_CODE: '' + $("#hfctlg_code").val() + '', SCSL_CODE: '' + $("#hfscsl_code").val() + '' }])

                    } else {
                        alertCustom("El empleado ya fue agregado...");
                    }
                    $("#txt_empleado").val("");
                    $("#hfpidm").val("");
                    $("#hfnombre").val("");
                    $("#hfctlg_code").val("");
                    $("#hfscsl_code").val("");
                    $("#hfcn_planilla").val("");
                } else { infoCustom2("Empleado ya se ecuentra asiganado para este concepto por favor eliga otro ...")  }
             
            }
            else {
                infoCustom2("Empleado no valido, seleccione uno por favor..")
            }
        });

        $('#btn_sgt_paso').on('click', function () {

            array = ["cbo_concepto", "txt_monto", "optmes", "optanho"];
            var oM = 0
            var oA = 0
            var oM_1 = 1
            var oA_2 = 1
            var Suma = 0;
            var Suma_1 = 0;
           
            if ($("#rbtipo_rango").is(':checked')) {
                array.push("txt_mes");
                array.push("txt_anho");

                var oM = ($("#optmes").datepicker('getDate').getMonth() + 1).toString(); 
                var oA = $("#optanho").val();
                var oM_1 = ($("#txt_mes").datepicker('getDate').getMonth() + 1).toString();
                var oA_2 = $("#txt_anho").val();

               
            }
         
            Suma = parseInt(oM) + parseInt(oA);
            Suma_1 = parseInt(oM_1) + parseInt(oA_2);
            
           
            if ($("#txt_mes").val() != "" && $("#txt_anho").val() == "") { array.push("txt_anho") }
            if ($("#txt_anho").val() != "" && $("#txt_mes").val() == "") { array.push("txt_mes") }

           
            if (vErrors(array)) {
                if (Suma != Suma_1) {
                    if (Suma < Suma_1) {
                    $("#cbo_concepto").attr("disabled", true);
                    $("#txt_monto").attr("disabled", true);
                    $("#optmes").attr("disabled", true);
                    $("#optanho").attr("disabled", true);
                    $("#txt_mes").attr("disabled", true);
                    $("#txt_anho").attr("disabled", true);
                    $("#btn_sgt_paso").attr("disabled", true);
                    $("#add").attr("style", "border-radius: 5px!important; margin-left: -11px;");
                    $('#chkestado').attr("disabled", true);
                    $('#btn_limpia_fecfin').attr("disabled", true);
                    $('#btn_limpia_fecini').attr("disabled", true);
                    $('#cbo_tipo_planilla').attr("disabled", true);
                    $(".radio").attr("disabled", true)

                    //HABILITO SEGUNDO DIV
                    $('#slcSucural').attr("disabled", false);
                    $('#slcEmpresa').attr("disabled", false);
                    $('#txt_empleado').attr("disabled", false);
                    $('#chkactivo').attr("disabled", false);
                    $('#add').attr("disabled", false);
                    $("#add").attr("style", "border-radius: 5px!important; margin-left: -11px;");
                    $('#btn_regresar').attr("disabled", false);
                    $("#tabla").attr("style", "")
                    } else { infoCustom2("Fecha INICIO no debe ser mayor a la fecha FIN") }
                } else { infoCustom2("Fecha INICIO no debe ser igual a la fecha FIN") }
              }
          
           
        });

        $('#btn_regresar').on('click', function () {

            //HABILITO PRIMER DIV
            $("#cbo_concepto").attr("disabled", false);
            $('#cbo_tipo_planilla').attr("disabled", false);
            $("#txt_monto").attr("disabled", false);
            $("#optmes").attr("disabled", false);
            $("#optanho").attr("disabled", false);
            $("#txt_mes").attr("disabled", false);
            $("#txt_anho").attr("disabled", false);
            $("#btn_sgt_paso").attr("disabled", false);
            $('#chkestado').attr("disabled", false);
            $('#btn_limpia_fecfin').attr("disabled", false);
            $('#btn_limpia_fecini').attr("disabled", false);
            $(".radio").attr("disabled", false)
           
            $('#slcSucural').attr("disabled", true);
            $('#slcEmpresa').attr("disabled", true);
            $('#txt_empleado').attr("disabled", true);
            $('#chkactivo').attr("disabled", true);
            $('#add').attr("disabled", true);
            $("#add").attr("style", "border-radius: 5px!important; margin-left: -11px;display:none;");
            $('#btn_regresar').attr("disabled", true);
            $("#tabla").attr("style", " border: none;padding: 2px;background-color: #000; opacity: 0.05;");
            $('#uniform-chkactivo span').removeClass();
            //$('#chkactivo').attr('checked', false);
            //$("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            //$("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
            $("#txt_empleado").val("");
            $("#hfpidm").val("");
            $("#hfnombre").val("");
            $("#hfctlg_code").val("");
            $("#hfscsl_code").val("");
            $("#hfcn_planilla").val("");
            //oTable.fnClearTable();

        });
        

        $('#txt_monto').on('blur', function () {

            $("#txt_monto").val(formatoMiles($("#txt_monto").val()));
        });

        $('#txt_monto').on('focus', function () {

            $("#txt_monto").val("");
        });


        $('#btn_limpia_fecini').on('click', function () {
            $("#optmes").datepicker("setDate", "");
            $("#optanho").datepicker("setDate", "");

            if ($("#rbtipo_mes").is(':checked')) {
                $("#txt_mes").datepicker("setDate", "");
                $("#txt_anho").datepicker("setDate", "");

            }
            
        });

        $('#btn_limpia_fecfin').on('click', function () {
            $("#txt_mes").datepicker("setDate", "");
            $("#txt_anho").datepicker("setDate", "");
            $("#txt_anho").parent().parent().attr("class", "control-group");
            $("#txt_mes").parent().parent().attr("class", "control-group");
        });


        $('#rbtipo_mes').on('click', function () {
            if ($("#rbtipo_mes").is(':checked')) {

                //$("#busq_avanz").slideDown();
                $("#btn_limpia_fecfin").click().click();
                $("#txt_mes").attr("disabled", true);
                $("#txt_anho").attr("disabled", true);
                $("#btn_limpia_fecfin").attr("disabled", true);
                $("#txt_anho").parent().parent().attr("class", "control-group");
                $("#txt_mes").parent().parent().attr("class", "control-group");

                var oMes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
                var oAnho = $("#optanho").val();
                if (oMes == "NaN") { oMes = ""; }
                $("#txt_mes").datepicker("setDate", oMes);
                $("#txt_anho").datepicker("setDate", oAnho);
                $("#div_fin_fecha").slideUp();
                $('#optmes').on('change', function () {
                    var oMes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
                    if (oMes == "NaN") { oMes = "";}

                    $("#txt_mes").datepicker("setDate", oMes);

                });

                $('#optanho').on('change', function () {

                    var oAnho = $("#optanho").val();

                    $("#txt_anho").datepicker("setDate", oAnho);
                });
            }
        });


        $('#rbtipo_rango').on('click', function () {
            if ($("#rbtipo_rango").is(':checked')) {
                $("#btn_limpia_fecfin").click().click();
                $("#txt_mes").attr("disabled", false);
                $("#txt_anho").attr("disabled", false);
                $("#btn_limpia_fecfin").attr("disabled", false);
                $("#txt_anho").parent().parent().attr("class", "control-group");
                $("#txt_mes").parent().parent().attr("class", "control-group");
                $("#div_fin_fecha").slideDown();
            }
        });


        $('#rbtipo_indefinido').on('click', function () {
            if ($("#rbtipo_indefinido").is(':checked')) {
            $("#btn_limpia_fecfin").click().click();
            $("#txt_mes").attr("disabled", true);
            $("#txt_anho").attr("disabled", true);
            $("#btn_limpia_fecfin").attr("disabled", true);
            $("#txt_anho").parent().parent().attr("class", "control-group");
            $("#txt_mes").parent().parent().attr("class", "control-group");
            $("#div_fin_fecha").slideUp();
            $('#optmes').off("change");
            $('#optanho').off("change");
            }
        });

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
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
            async: true,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option value="">TODOS</option>');
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
                    $("#input_empl").html("<input id='txt_empleado' class='span12' type='text' placeholder='Empleado' disabled='disabled'/>")
                    filltxtEmpleado('#txt_empleado', '');

                }
                else {
                    noexito();
                }

                Desbloquear("divadd_empl");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("divadd_empl");
            }
        });
    }

    var ListarConceptos = function (tipla) {
        Bloquear("div_concepto");

        setTimeout(
                  $.ajax({
                      type: "post",
                      url: "vistas/nn/ajax/nnmcnep.ashx?OPCION=4&p_TIPLA_CODE="+ tipla,
                      contenttype: "application/json;",
                      datatype: "json",
                      async: false,
                      success: function (datos) {
                          $('#cbo_concepto').empty();
                          $('#cbo_concepto').append('<option></option>');
                          if (datos != null) {

                              for (var i = 0; i < datos.length; i++) {

                                  $('#cbo_concepto').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                      
                              }
                   
                              $('#cbo_concepto').select2("val", "").change();

                          }
                          else {
                              noexitoCustom("No existen Conceptos");
                              $("#cbo_concepto").select2("val", "").change();
                          }

                          Desbloquear("div_concepto");

                      },
                      error: function (msg) {
                          noexitoCustom("Error listado conceptos!!")
                          Desbloquear("div_concepto");
                      }
                  })
            , 1000);

  
    }



    function filltxtEmpleado  (v_ID, v_value) {
        var selectSolicitante = $(v_ID);

        //selectSolicitante.typeahead({
        //    minLength: 3,
        //    source: function (query, process) {
        //        arrayEmpleados = [];
        //        map = {};
        //        $.ajax({
        //            type: 'post',
        //            url: "vistas/nn/ajax/NNMCNEP.ashx?OPCION=1&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val(),
        //            data: { type: 'keyword', q: query },
        //            cache: false,
        //            async: true,
        //            dataType: 'json',
        //            success: function (datos) {
        //                if (datos != null) {
        //                    var obj = "[";
        //                    for (var i = 0; i < datos.length; i++) {
        //                        arrayEmpleados.push(datos[i].NOMBRE_EMPLEADO);
        //                        obj += '{';
        //                        obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '",';
        //                        obj += '"SCSL_CODE":"' + datos[i].SCSL_CODE + '",';
        //                        obj += '"CTLG_CODE":"' + datos[i].CTLG_CODE + '",';
        //                        obj += '"CONCEPTOS_PLANILLA":"' + datos[i].CONCEPTOS_PLANILLA + '",';
        //                        obj += '"PIDM":"' + datos[i].PIDM + '"';
        //                        obj += '},';
        //                    }
        //                    obj += "{}";
        //                    obj = obj.replace(",{}", "");
        //                    obj += "]";
        //                    var json = $.parseJSON(obj);

        //                    $.each(json, function (i, objeto) {
        //                        map[objeto.NOMBRE_EMPLEADO] = objeto;
        //                    });
        //                    return process(arrayEmpleados);
        //                }
        //            }
        //        });
        //    },
        //    updater: function (item) {
        //        $("#hfpidm").val(map[item].PIDM);
        //        $("#hfnombre").val(map[item].NOMBRE_EMPLEADO);
        //        $("#hfctlg_code").val(map[item].CTLG_CODE);
        //        $("#hfscsl_code").val(map[item].SCSL_CODE);
        //        $("#hfcn_planilla").val(map[item].CONCEPTOS_PLANILLA);
        //        return item;
        //    },

        //});


        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMCNEP.ashx?OPCION=1&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val(),
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
                                obj += '"SCSL_CODE":"' + datos[i].SCSL_CODE + '",';
                                obj += '"CTLG_CODE":"' + datos[i].CTLG_CODE + '",';
                                obj += '"CONCEPTOS_PLANILLA":"' + datos[i].CONCEPTOS_PLANILLA + '",';
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
                            Desbloquear("divadd_empl");
                        },
                        updater: function (item) {
                            $("#hfpidm").val(map[item].PIDM);
                            $("#hfnombre").val(map[item].NOMBRE_EMPLEADO);
                            $("#hfctlg_code").val(map[item].CTLG_CODE);
                            $("#hfscsl_code").val(map[item].SCSL_CODE);
                            $("#hfcn_planilla").val(map[item].CONCEPTOS_PLANILLA);
                            return item;
                        },
                    });

                   
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectSolicitante.val(v_value);
                    Desbloquear("divadd_empl");
                }
                Desbloquear("divadd_empl");
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar empleados.');
                Desbloquear("divadd_empl");
            }
        });




        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_empleado").val().length <= 0) {
               
                $("#hfpidm").val("");
                $("#hfnombre").val("");
                $("#hfctlg_code").val("");
                $("#hfscsl_code").val("");
                $("#hfcn_planilla").val("");
            }
        });

    }


    var fillCboTipoPlanilla = function () {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcnep.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_planilla').empty();
                $('#cbo_tipo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_planilla').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipo_planilla").select2("val", "").change();
            },
            error: function (msg) {
                alertCustom("Error Listado Tipo Planilla")
            }
        });
    }

    var cargaInicial = function () {


        $('#slcSucural').attr("disabled",true);
        $('#slcEmpresa').attr("disabled", true);
        $('#txt_empleado').attr("disabled", true);
        $('#chkactivo').attr("disabled", true);
        $('#add').attr("disabled", true);
        $("#add").attr("style", "border-radius: 5px!important; margin-left: -11px;display:none;");
        $('#btn_regresar').attr("disabled", true);
        $("#tabla").attr("style", " border: none;padding: 2px;background-color: #000; opacity: 0.05;");
        $("#rbtipo_rango").click().click();

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {
            Bloquear("ventana");
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");
            $("#divadd_empl").slideUp();
            $("#div_concepto").attr("class", "span12");
            $("#btn_sgt_paso").remove();
            $($("#div_concepto").children().children()[0]).html("<h4>Modificar Concepto Empleado</h4>");
            $("#div_empleado_carg_inicial").html("<div class='span3'>" +
                                                  "<div class='control-group'>" +
                                                    "<label class='control-label' for='txt_monto'>" +
                                                     "Empleado</label>" +
                                                   "</div>" +
                                                 "</div>" +
                                   "<div class='span5'>" +
                                       "<div class='control-group'>" +
                                           "<div class='controls'>" +
                                               "<input id='txt_empleado' class='m-wrap span12' type='text'>" +
                                           "</div>" +
                                       "</div>" +
                                   "</div>");
            $("#txt_empleado").attr("disabled", true)

            //$("#rbtipo_mes").attr('checked', false)
            //$("#rbtipo_indefinido").attr('checked', false)
            //$("#rbtipo_rango").attr('checked', false)
            //$("#rbtipo_mes").parent().removeAttr("checked");
            //$("#rbtipo_indefinido").parent().removeAttr("checked");
            //$("#rbtipo_rango").parent().removeAttr("checked");

            var data = new FormData();

            data.append('OPCION', '2');
            data.append('p_CODE_ASIGNACION', CODE);

            $.ajax({

                url: "vistas/nn/ajax/nnmcnep.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async:false,
                success:
                function (datos) {
                    if (datos != null) {

                        $("#rbtipo_indefinido").click().click();
                        if (datos[0].INDICADOR == 'M') {
                            $("#rbtipo_mes").click().click();
                        }
                        if (datos[0].INDICADOR == 'I') {
                            $("#rbtipo_indefinido").click().click()
                        }
                        if (datos[0].INDICADOR == 'R') {
                            $("#rbtipo_rango").click().click()
                        }
                        $('#hfcodigo_asig').val(datos[0].CODIGO);
                        $('#cbo_tipo_planilla').select2("val", datos[0].CODIGO_TIPLA).change();
                        $('#cbo_tipo_planilla').attr("disabled", true);
                     
                        $('#txt_monto').val(datos[0].MONTO);
                        $("#txt_empleado").val(datos[0].NOMBRES);
                        $("#hfpidm").val(datos[0].PIDM);
                        $("#hfctlg_code").val(datos[0].CTLG_CODE);
                        $("#hfscsl_code").val(datos[0].SCSL_CODE);
                        $('#cbo_concepto').select2("val", datos[0].CONCEPTO_CODIGO);
                        $('#cbo_concepto').attr("disabled", true);
                        var fec_inicio = datos[0].FECHA_INICIO;

                        $('#optmes').datepicker("setStartDate", "");
                        $('#optanho').datepicker("setStartDate", "");
                        $("#optmes").datepicker("setDate", fec_inicio.split("%")[0]);
                        $("#optanho").datepicker("setDate", fec_inicio.split("%")[1]);
                        var fec_fin = datos[0].FECHA_FIN;
                        if (fec_fin != "") {
                            $("#txt_mes").datepicker("setDate", fec_fin.split("%")[0]);
                            $("#txt_anho").datepicker("setDate", fec_fin.split("%")[1]);
                            
                            
                        }


                        if (datos[0].ESTADO == 'A') {
                            $('#uniform-chkestado span').removeClass().addClass("checked");
                            $('#chkestado').attr('checked', true);

                        }
                        else {
                            $('#uniform-chkestado span').removeClass();
                            $('#chkestado').attr('checked', false);

                        }

                      

                    }
                    else { noexitoCustom("Error carga inicial") }
                    Desbloquear("ventana");
                }

            });


        }
    }
    return {
        init: function () {
            plugins();
            fillCboTipoPlanilla();
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            filltxtEmpleado('#txt_empleado', '');
            cargaInicial();
            fillBandejaEmpleados();
            $('.dataTables_scrollBody').attr("style", "overflow: auto;max-height:280px;width:100%");
      
        }
    };

}();


var Grabar = function () {

    var CTLG_CODE = '';
    var SCSL_CODE = '';
    var p_EMPLEADOS = '';
    var p_IND_TODOS = '';
    var p_CONCEPTO_CODE = '';
    var p_MONTO = '';
    var p_FECHA_INICIO = '';
    var p_FECHA_FIN = '';
    var p_USUA_ID = '';
    var p_ESTADO = '';
    var p_TIPLA = '';
    var fec_f = ($("#txt_mes").datepicker('getDate').getMonth() + 1).toString();
   


    CTLG_CODE = $.trim($('#slcEmpresa').val());
    SCSL_CODE = $.trim($('#slcSucural').val());
    p_IND_TODOS = $("#chkactivo").is(':checked') ? 'S' : 'N';
    p_CONCEPTO_CODE = $.trim($('#cbo_concepto').val());
    p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));
    p_FECHA_INICIO = ($("#optmes").datepicker('getDate').getMonth() + 1).toString() + '%' + $.trim($('#optanho').val());
    if (fec_f != "NaN" && $("#txt_anho").val() != "") {
        p_FECHA_FIN = fec_f + '%' + $("#txt_anho").val();
    }
    p_USUA_ID = $.trim($('#ctl00_txtus').val());
    p_ESTADO = $("#chkestado").is(':checked') ? 'A' : 'I';
   
    p_TIPLA = $.trim($('#cbo_tipo_planilla').val());

    if (p_IND_TODOS == 'N') {
     p_EMPLEADOS = ArmaString();
    }



    var data = new FormData();

    data.append("OPCION", "G");
    data.append("CTLG_CODE", CTLG_CODE);
    data.append("SCSL_CODE", SCSL_CODE);
    data.append("p_EMPLEADOS", p_EMPLEADOS);
    data.append("p_IND_TODOS", p_IND_TODOS);
    data.append("p_CONCEPTO_CODE", p_CONCEPTO_CODE);
    data.append("p_MONTO", p_MONTO);
    data.append("p_FECHA_INICIO", p_FECHA_INICIO);
    data.append("p_FECHA_FIN", p_FECHA_FIN);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_ESTADO", p_ESTADO);
    data.append("p_TIPLA", p_TIPLA);

    if ($("#chkactivo").is(':checked')) {
        Bloquear("ventana");

        $.ajax({
            url: "vistas/NN/ajax/NNMCNEP.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos == "OK") {

                    exito();
                    window.location.href = '?f=nnlcnep';
                } else { if (datos == "EXISTE") { infoCustom2("Todos los empleados para este concepto Y Tipo PLanilla ya fueron registrados anteriormente...") } }

            },
            error: function (msg) {

                alert(msg);
            }
        });


    } else {

        if (oTable.fnGetData().length > 0) {
                Bloquear("ventana");

                $.ajax({
                    url: "vistas/NN/ajax/NNMCNEP.ASHX",
                    type: "post",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos == "OK") {

                          
                            exito();
                            window.location.href = '?f=nnlcnep';

                        } else { noexito(); }

                    },
                    error: function (msg) {

                        alert(msg);
                    }
                });

        } else { infoCustom2("No hay empleados en la lista, por favor agrega almenos uno..");}


    }





}


var Modificar = function () {

   
   
    
    var p_MONTO = '';
    var p_FECHA_INICIO = '';
    var p_FECHA_FIN = '';
    var p_USUA_ID = '';
    var p_ESTADO = '';
    var p_TIPO_UPDATE = '';
    var p_CODE_ASIGNACION = '';
    var fec_f = ($("#txt_mes").datepicker('getDate').getMonth() + 1).toString();
    var oM = 0
    var oA = 0
    var oM_1 = 1
    var oA_2 = 1
    var Suma = 0;
    var Suma_1 = 0;

    p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));
    p_FECHA_INICIO = ($("#optmes").datepicker('getDate').getMonth() + 1).toString() + '%' + $.trim($('#optanho').val());
    if (fec_f != "NaN" && $("#txt_anho").val() != "") {
        p_FECHA_FIN = fec_f + '%' + $("#txt_anho").val();
    }
    p_USUA_ID = $.trim($('#ctl00_txtus').val());
    p_ESTADO = $("#chkestado").is(':checked') ? 'A' : 'I';
    p_TIPO_UPDATE = 'NORMAL';
    p_CODE_ASIGNACION = $.trim($('#hfcodigo_asig').val());

    var data = new FormData();

    data.append("OPCION", "A");
    data.append("p_MONTO", p_MONTO);
    data.append("p_FECHA_INICIO", p_FECHA_INICIO);
    data.append("p_FECHA_FIN", p_FECHA_FIN);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_ESTADO", p_ESTADO);
    data.append("p_TIPO_UPDATE", p_TIPO_UPDATE);
    data.append("p_CODE_ASIGNACION", p_CODE_ASIGNACION);

    array = ["optmes", "optanho", "txt_monto", "cbo_concepto"];


    if ($("#rbtipo_rango").is(':checked')) {
        array.push("txt_mes");
        array.push("txt_anho");

        var oM = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
        var oA = $("#optanho").val();
        var oM_1 = ($("#txt_mes").datepicker('getDate').getMonth() + 1).toString();
        var oA_2 = $("#txt_anho").val();


    }

    Suma = parseInt(oM) + parseInt(oA);
    Suma_1 = parseInt(oM_1) + parseInt(oA_2);

    if ($("#txt_mes").val() != "" && $("#txt_anho").val() == "") { array.push("txt_anho") }
    if ($("#txt_anho").val() != "" && $("#txt_mes").val() == "") { array.push("txt_mes") }

   
             if (vErrors(array)) {
                 if (Suma != Suma_1) {
                     if (Suma < Suma_1) {
                        Bloquear("ventana");

                        $.ajax({
                            url: "vistas/NN/ajax/NNMCNEP.ASHX",
                            type: "post",
                            contentType: false,
                            data: data,
                            processData: false,
                            cache: false,
                            success: function (datos) {
                                Desbloquear("ventana");
                                if (datos = ! null && datos == "OK") {
                                    exito();

                                } else { noexito(); }

                            },
                            error: function (msg) {

                                alert(msg);
                            }
                        });
                     } else { infoCustom2("Fecha INICIO no debe ser mayor a la fecha FIN") }
                 } else { infoCustom2("Fecha INICIO no debe ser igual a la fecha FIN") }

              }
       




}



function ArmaString() {

    var string = '';
    var empl = oTable.fnGetData()

    for (var i = 0 ; i < empl.length ; i++) {

        string += empl[i].CTLG_CODE + ','
        string += empl[i].SCSL_CODE + ','
        string += empl[i].PIDM + ';'

    }

    string += ')';
    string = string.replace(";)", "");


    return string;

}

function ReplaceTotal(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}




