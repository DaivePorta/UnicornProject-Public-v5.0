var CPMPASU = function () {
    var plugins = function () {
        $('#slcEmpresa').select2()
        $("#cbo_planilla_banc").select2()
        $("#cbo_planilla").select2()
        var date = new Date()
        var anio = date.getFullYear()
        var mes = date.getMonth() + 1
        if (parseInt(mes) <= 9) { mes = "0" + mes }
        var periodoini = "01/" + (mes-1) + "/" + anio
        $("#txt_fec_proceso").datepicker("setStartDate", periodoini);
        $("#txt_fec_proceso").datepicker("setEndDate", muestrafecfin(anio +""+ mes));
        $('#txt_ope').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); });
    }
    var  muestrafecfin =  function(periodo) {
        var anio = periodo.substring(0, 4);
        var mes = periodo.substring(4, 6);
        var dia = '';
        var bisiesto = 0;
        var fecha = '';
        if (mes < 12) {
            mes = parseInt(mes) ;
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
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();        
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#slcEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var fillCbo_Planilla_Sin_Pagar = function (ctlg_code) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcepl.ashx?OPCION=2&p_CTLG_CODE=" + ctlg_code + "&p_TIPO=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla').empty();
                $('#cbo_planilla').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {                   
                        $('#cbo_planilla').append('<option   mes_num="' + datos[i].MES_NUM + '" anio="' + datos[i].ANIO + '"   mes="' + datos[i].MES + '"     value="' + datos[i].CODIGO_PLANILLA + '">' + datos[i].DESC_PLANILLA + '</option>');
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
    var fillCboPlaBanc = function () {
        var ctlg_code = $('#slcEmpresa').val();
        var banc_code = '';
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmbapl.ashx?OPCION=3&CTLG_CODE=" + ctlg_code + "&BANC_CODE=" + banc_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla_banc').empty();
                $('#cbo_planilla_banc').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_planilla_banc').append('<option value="' + datos[i].CODE + '" banco="' + datos[i].BANC_DESC + '" nro_cta="' + datos[i].NRO_CUENTA + '" cuen_emp="' + datos[i].CUEN_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }               
                }
                else {                  
                   // alertCustom("No existen planillas Bancarias");
                }               
                $('#cbo_planilla_banc').select2('val', '').change();                
                Desbloquear("ventana")
            },
            error: function (msg) {              
                alertCustom("Error listar planillas bancarias");
                Desbloquear("ventana")
            }
        });
    }
    var fillBandeja = function () {
        var parms = {
            data: null,
            info: false,
            paging: false,
            ordering : false ,
            columns: [
                {
                    data: "N",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NRO_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {                  
                    }
                },
                 {
                     data: "BANC_ACRO",
                     createdCell: function (td, cellData, rowData, row, col) {                        
                     }
                 },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {                          
                    }
                },
                {
                    data: "DOC_IDEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "DESC_MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NETO_PAGAR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                        $(td).css('font-weight', 'bold')
                        $(td).html(formatoMiles(rowData.NETO_PAGAR));
                          
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.NETO_PAGAR != 0) {
                            $(td).html('<input onkeypress=" return ValidaDecimales(event,this,2)" type="text" id="txt' + rowData.DOC_IDEN + '" value="' + rowData.NETO_PAGAR + '"  class="Cimporte span12" style="color:blue;text-align:right;font-weight:bold"/>')
                        } else {
                            $(td).html("");
                        }
                    }
                }                      
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                //TOTAL PENDIENTE
                api.data().filter(function (e) {
                    y.push(parseFloat(e.NETO_PAGAR));
                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }                
                $("#total_pendiente").text(formatoMiles(v_total));
                $("#total_importe").text(formatoMiles(v_total));               
            }
        }
        oTable = iniciaTabla('tbl_planilla', parms);
        $('#tbl_planilla').removeAttr('style');
        $('#tbl_planilla tbody').on('keyup', ".Cimporte", function () {
            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var _tr = $(this).parent().parent();         
            var sum = 0;
            $(".Cimporte").each(function (u, p) {
                if ($(this).val() != "") {
                    sum += parseFloat($.trim($(this).val()));
                }
            });                    
            if (parseFloat($.trim($(this).val())) > parseFloat(row.NETO_PAGAR)) {              
                sum -= parseFloat($.trim($(this).val()));
                $(this).val("");               
            }
            $("#total_importe").text(formatoMiles(sum));
        });
    }
    var eventoComtroles = function () {
        $('#btn_limpiar').on('click', function () {
            $('#btn_limpiar').blur()
            $("#total_importe").text("0.00")
            $(".Cimporte ").val("")
        });
        $('#btn_consultar').on('click', function () {
            Bloquear("ventana")
            $("#btn_consultar").blur()
            if (vErrors(["slcEmpresa", "cbo_planilla_banc", "cbo_planilla"])) {
                setTimeout(function () {
                    lista_Detalle_Pago_Sueldo($("#cbo_planilla").val(), $("#cbo_planilla_banc").val());
                    $("#hfcod_pla").val($("#cbo_planilla").val());
                    $("#hfcod_pla_banc").val($("#cbo_planilla_banc").val());
                    $("#hfcod_ctlg").val($("#slcEmpresa").val());
                    $("#hfcod_cuen_emp").val($("#cbo_planilla_banc option:selected").attr("cuen_emp"));
                }, 1000);
            } else { Desbloquear("ventana") }
        });      
        $('#btn_aceptar').on('click', function () {            
            Bloquear("ventana")
            setTimeout(function () {
                $("#Confirm").modal("hide");
                Paga_Planilla(ArmaCadenaPagar());
            }, 2000);                   
        });
        $('#btn_pagar').on('click', function () {
            $("#btn_pagar").blur()
            if (vErrors(["txt_fec_proceso", "txt_ope"])) {
                var cad = ArmaCadenaPagar();
                if (cad != "}") {
                    $("#Confirm").modal("show");
                } else {
                    alertCustom("Al menos ingresa un importe para realizar el pago !")
                }
            }
        });
        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana")
                setTimeout(function () {
                    fillCboPlaBanc();
                    fillCbo_Planilla_Sin_Pagar($('#slcEmpresa').val());
                    emp_ant = $(this).val();
                }, 1000);
            } else { emp_ant = ""; }
        });

        $('#cbo_planilla_banc').on('change', function () {          
            if ( $('#cbo_planilla_banc').val() != "") {
                $("#sp_banc_desc").text($('#cbo_planilla_banc option:selected').attr("banco"))
                $("#sp_nro_cta").text($('#cbo_planilla_banc option:selected').attr("nro_cta"))
            }
            else {
                $("#sp_banc_desc").text("~")
                $("#sp_nro_cta").text("~")
            }                    
        });        
    }
    var ArmaCadenaPagar = function () {     
        var array = oTable.fnGetData();
        var array_aux = [];
        //elimino empleados cuyos sueldos pendiente = 0
        for (var i = 0 ; i < array.length ; i++) {
            if (parseFloat(array[i].NETO_PAGAR) != 0) {
                array_aux.push(array[i]);
            }
        }
        array = [];
        //elimino a los que tienen como importe 0 o vacio
        for (var i = 0 ; i < array_aux.length ; i++) {
            var valor = $("#txt" + array_aux[i].DOC_IDEN).val()
            if (!(parseFloat(valor) == 0 || valor == "")) {
                array.push(array_aux[i]);
            }
        }
        //ARMA CADENA
        var cadena = ""
        for (var i = 0 ; i < array.length ; i++) {            
            var valor = $("#txt" + array[i].DOC_IDEN).val()
            cadena += $("#hfcod_ctlg").val() + "," + array[i].CODIGO_FACAFPS + "," + array[i].COD_MONEDA + "," +
                        valor + "," + $("#ctl00_txtus").val() + "," +
                        array[i].COD_PLANILLA + "," + array[i].PIDM + "," + $("#txt_ope").val() + "," + array[i].NRO_CUENTA +
                        "," + $("#txt_fec_proceso").val().toString() +  "," + $("#hfcod_cuen_emp").val()  + "]"
        }
        cadena = cadena + "}"
        cadena = cadena.replace("]}", "")        
        console.log(cadena);
        return cadena;        
    }    
    var Paga_Planilla = function (p_detalle) {
        var data = new FormData();
        data.append("OPCION", "1");
        data.append("p_DETALLE", p_detalle);        
        $.ajax({
            url: "vistas/CP/ajax/CPMPASU.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })
        .success(function (datos) {
            if (datos != null && datos != "") {            
                switch (datos.split("/")[0]) {              
                    case "1":
                        lista_Detalle_Pago_Sueldo($("#hfcod_pla").val(), $("#hfcod_pla_banc").val());                  
                        if (datos.split("/")[1] == "S") {
                            $("#btn_pagar").remove();
                            $("#btn_consultar").remove();
                            $(".bloquear").attr("disabled", true)
                        }else{
                            $("#txt_fec_proceso").datepicker("setDate", "")
                            $("#txt_ope").val("");
                        }
                        $($("#txt_fec_proceso").parent().parent().parent()).removeClass("error")
                        $($("#txt_ope").parent().parent().parent()).removeClass("error")
                        $("[id*=correcto]").remove()
                        exito();
                        break;
                    case "2":
                        noexitoCustom("Error al realizar el pago de la Planilla!")
                        break;
                }
            } else { noexitoCustom("Error al realizar el pago de la Planilla!") }
            Desbloquear("ventana")
        })
        .error(function () {
           Desbloquear("ventana");
           noexitoCustom("Error al realizar el pago de la Planilla!")
        })
    }
    var lista_Detalle_Pago_Sueldo = function (planilla,pla_banc) {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPASU.ashx?OPCION=0" + "&COD_PLA_BANC=" + pla_banc +"&COD_PLANILLA=" + planilla,
            async: false,
            success: function (datos) {
                if (datos != null) {
                    oTable.fnClearTable();
                    oTable.fnAddData(datos);
                    $("#btn_limpiar").attr("disabled", false);
                }
                else {
                    oTable.fnClearTable();
                    $("#btn_limpiar").attr("disabled", true);
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }
    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCbo_Planilla_Sin_Pagar( $('#slcEmpresa').val());
            fillCboPlaBanc();
            fillBandeja();           
            eventoComtroles();
        }
    };
}();

var CPLPASU = function () { 
    var crearTablaVacia = function () {        
        var parms = {
            data: null,
            columns: [
                {
                    data: "EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESC_CTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "REF_DCTO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_PROCESO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_OPERACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "IMPORTE_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        $(td).css('text-align', 'right').text(rowData.SIMB_MONE + ' ' + formatoMiles(cellData));
                    }
                }
            ]            
        }
        oTable = iniciaTabla('tblBandeja', parms);               
    };
    var ListarPlanillas = function () {             
        var emp = $("#cboEmpresa").val();
        var aa = $("#txt_Anio").val();
        var mm = $("#txt_Mes").val();       

        switch (mm) {
            case "Enero":
                mes = "1";
                break;
            case "Febrero":
                mes = "2";
                break;
            case "Marzo":
                mes = "3";
                break;
            case "Abril":
                mes = "4";
                break;
            case "Mayo":
                mes = "5";
                break;
            case "Junio":
                mes = "6";
                break;
            case "Julio":
                mes = "7";
                break;
            case "Agosto":
                mes = "8";
                break;
            case "Septiembre":
                mes = "9";
                break;
            case "Octubre":
                mes = "10";
                break;
            case "Noviembre":
                mes = "11";
                break;
            case "Diciembre":
                mes = "12";
        }

                             
        $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMPASU.ASHX?OPCION=2&ANIO=" + aa + "&MES=" + mes + "&CTLG_CODE=" + emp,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) { 
                if (datos.length > 0) {
                    oTable.fnClearTable();
                    oTable.fnAddData(datos);
                    oTable.fnDraw();
                } else {                    
                    oTable.fnClearTable();
                    
                }
                
            },
            
            error: function (msg) {
                alert(msg);
            }
        });

    }
    var plugins = function () {        
        $('#cboEmpresa').select2();        

        $('#txt_Anio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '+1y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#txt_Mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());

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
    var eventoComtroles = function () {        
        $('#cboEmpresa').on('change', function () {
            ListarPlanillas();            
        });

        $("#txt_Mes").datepicker().on("changeDate", function () {
            ListarPlanillas();
        });

        $("#txt_Anio").datepicker().on("changeDate", function () {
            ListarPlanillas();
        });

    }
    return {
        init: function () {
            plugins();
            crearTablaVacia();
            fillCboEmpresa();
            ListarPlanillas();            
            eventoComtroles();
            
        }
    };
}();