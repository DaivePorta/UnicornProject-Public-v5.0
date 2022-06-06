var BBLCOSP = function () {

    function ListarValidacionConfiguracion() {
        var emp = $("#ctl00_hddctlg").val();

        var aa = $("#optanho").val();
        var mm = $("#optmes").val();
        var cm = mm + " " + aa;


  
        $.ajax({
            type: "post",
            //url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=CONFIGURACION&emp=" + emp + "&cm=" + cm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#hfValidacionConfiguracion').val(datos);
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var Listar_Padre = function () {
        var emp = $("#ctl00_hddctlg").val();

        var aa = $("#optanho").val();
        var mm = $("#optmes").val();


        var cm = mm + " " + aa;
       


        $.ajax({
            type: "post",
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=P&emp=" + emp + "&cm=" + cm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPadre').val(datos);
             //   CrearSistemaPension();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };


    

    var ListarValidacion = function () {     
        var emp = $("#ctl00_hddctlg").val();

        $.ajax({
            type: "post",
            //url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=V&emp=" + emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#hfValidacion').val(datos);
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

 


    var ListarComision= function () {
        var emp = $("#ctl00_hddctlg").val();
        
        
        $.ajax({
            type: "POST",
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=0&emp=" + emp ,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                var combo = "";
                var parms = {
                    data: datos,
                    columns: [
                         {
                             data: "CODIGO",                            
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).attr('align', 'center')
                                 if (cellData!= "") {
                                     $(td).html('<a class="btn green cambiarbt" href="javascript:Modificar();"><i class="icon-refresh"></i></a>')
                                 } else {
                                     $(td).html('<a class="btn blue cambiarbt" href="javascript:Crear();"><i class="icon-ok"></i></a>')
                                 }
                             }
                        },
                        {
                            data: "CODIGO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                                $(td).css('display', 'none')
                            }                           
                        },
                        {
                            data: "COD",
                            //defaultContent: combo,
                            createdCell: function (td, cellData, rowData, row, col) {
                                var combo = ListarCombo(cellData);
                                $(td).html(combo)
                                $(td).attr('align', 'center')
                                $(td).attr('width', '10%;')
                                $('#cboSistema' + cellData).val(cellData)
                            }
                        },
                        {
                            data: "COMISION_FIJA",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtComisionFija" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "COMISION_FIJA_MENSAUAL",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtComisionFijaMensual" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "MIXTO_COMISION_BRUTA_MENSUAL",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtComisionBrutaMensual" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "PRIMA_SEGURO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtPrimaSeguro" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "COMISION_ANULA_SALDO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtComisionanualSaldo" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "PORCENTAJE_OBLIGATORIO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtProcentajeObligatorio" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "REMUNERACION_MAXIMA_ASEGURABLE",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).html('<input type="text" onkeypress=" return ValidaDecimales(event,this)" id="txtRemuneracionMaximaAsegurable" value="' + cellData + '"  style="width:70%;" />')
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "COD",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('display', 'none')
                                //$(th).css('display', 'none')
                            }
                        }
                    ]

                }

                oTableRegimen = iniciaTabla('tblComision', parms);
                //$('#tblComision').dataTable({
                //    data: datos,
                //    columns: [
                //        { data: "CODIGO" },
                //        { data: "COMISION_FIJA" },
                //        { data: "COMISION_FIJA_MENSAUAL" },
                //        { data: "MIXTO_COMISION_BRUTA_MENSUAL" },
                //        { data: "PRIMA_SEGURO" },
                //        { data: "COMISION_ANULA_SALDO" },
                //        { data: "PORCENTAJE_OBLIGATORIO" },
                //        { data: "COD" }
                //    ]

                //});
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }
    var ListarCombo = function (Codigo) {
        var id
        id = id + 1
        var Opcion = "<select id='cboSistema" + Codigo + "'>";
        var emp = $("#ctl00_hddctlg").val();        
        $.ajax({
            type: "POST",
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=C&emp=" + emp,
            contentType: "application/json;",
            dataType: "json",
            async:false,
            success: function (datos) {
                //Opcion = Opcion + '<option selected value="">' + 'Seleccione...' + '</option>';
                for (i = 0; i < datos.length; i++) {

                    if (datos[i].CODIGO == Codigo) {
                        Opcion = Opcion + '<option selected value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>';
                    } else {
                        Opcion = Opcion + '<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>';
                    }

                }
              
            },
            error: function (msg) {
                alert(msg);
            }
        });
        Opcion = Opcion + "</select>";
        
        return Opcion;
    }

    
    return {
        init: function () {
           
            

            $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
            $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());

            ListarValidacion();
            ListarValidacionConfiguracion();
            Listar_Padre();
            ListarCabecera();
  

        }
    };

    function GrabarPension() {

        var v_Errors = true;

        v_Errors = validarRegimen();

        if (v_Errors) {

            //var p_FCOSIPE_CODE =  = $('#txtCodigoSunat').val();
            //var p_FCOSIPE_COM_FI =
            //var p_FCOSIPE_R_B_M =
            //var p_FCOSIPE_M_R_B_M =
            //var p_FCOSIPE_COM_AN_SAL =
            //var p_FCOSIPE_PRIM_SEG =
            //var p_FCOSIPE_P_O_F_P =
            //var p_FCOSIPE_REM_MAX_ASE =
            //var p_FCOSIPE_USUA_ID =
            //var p_FCOSIPE_FTVREPE_CODE =
            //var p_SALIDA =
            //var p_FCOSIPE_CTLG_CODE =

            //var cod_sunat = $('#txtCodigoSunat').val();
            //var pension = $('#txtPension').val();
            //var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
            //var fecha_ini = $('#txtfechi').val();
            //var fecha_fin = $('#txtfechfin').val();
            //var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();
            //var tipo = $('#cboTipo').val();
            //var PDIM = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPDIM').val();

            Bloquear("ventana");

            $.post("vistas/NC/ajax/NCMREPE.ASHX",
                {
                    opcion: 'N', cod_sunat: cod_sunat, pension: pension, estado: estado, fecha_ini: fecha_ini, fecha_fin: fecha_fin,
                    usuario: usuario, tipo: tipo, PDIM: PDIM
                },
                function (res) {
                    Desbloquear("ventana");
                    if (res != 'EXIS' && res.length == 4) {
                        $('#txtCodigo').val(res);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> modificar");
                        $("#grabar").attr("href", "javascript:Modificar()");
                    } else {


                        switch (res) {
                            //SI ESTA SIENDO USADO EL CODIGO DE SUNAT
                            case 'EXIS':
                                existeCod(cod_sunat);
                                break;
                                //SI ESTA SIENDO USADO LA DESCRIPCIÓN
                            case 'DUP':
                                duplicidadCod(pension);
                                break;
                                // SI ESTA SIENDO USADO EL CÓDIGO DE SUNAT Y LA DESCRIPCIÓN 
                            case 'CSN':
                                CodDescDup(cod_sunat, pension);
                                break;
                        }
                    }
                });
        }
    }



}();














function ValidarCombo(fila,codigo) {
    var sonA = JSON.parse($('#hfValidacion').val());

    var sonB = JSON.parse($('#hfValidacionConfiguracion').val());

    var Columna = JSON.parse($('#hf').val());
    
    var cboSistema = $("#cboSistema" + fila + "_0").val();

    $('#hfValidacionControles').val('');

    var controles='';
    

    codigo = cboSistema;

    for (i = 0; i < sonA.length; i++) {
        //alert(son[i].NOMBRE);
        if (sonA[i].CODIGO == codigo) {
            if (sonA[i].TIPO == "1") {
                for (x = 0; x < Columna; x++) {
                    var txtid = "txtColummna" + fila + "_" + (x + 1);
                    if (sonB[x].AFP == "1") {
                        //$('#' + txtid).val("");
                        $('#' + txtid).removeAttr("disabled");
                        controles = controles + txtid + ",";
                    } else {
                        $('#' + txtid).val("");
                        $('#' + txtid).attr("disabled", "disabled");
                        $('#' + txtid).css('border', '1px solid #ccc');
                    }
                    //var valor = $('#' + txtid).val();
                    //alert(valor);
                }
            }
            if (sonA[i].TIPO == "2") {
                for (x = 0; x < Columna; x++) {
                    var txtid = "txtColummna" + fila + "_" + (x + 1);
                    if (sonB[x].ONP == "1") {
                        //$('#' + txtid).val("");
                        $('#' + txtid).removeAttr("disabled");
                        controles = controles + txtid + ",";

                    } else {
                        $('#' + txtid).val("");
                        $('#' + txtid).attr("disabled", "disabled");
                        $('#' + txtid).css('border', '1px solid #ccc');
                    }
                }
            }
            controles = controles + "_";
            controles=controles.replace(",_", "");
            //for (x = 0; x < Columna; x++) {
            $('#hfValidacionControles').val(controles);
            //}
        }
    }
    //alert('');
}



var ListarCabecera = function () {
    var emp = $("#ctl00_hddctlg").val();

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var cm = mm + " " + aa;




    var fe = $("#hffecha").val();
    
    if (!vErrorsNotMessage(["optanho", "optmes"])) {
                v_Errors = false;
    }

    $.ajax({
        type: "POST",
        url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=X&emp=" + emp + "&cm=" + cm + "&fe=" + "04/01/2016",
        //contentType: "application/json;",
        //dataType: "json",
        success: function (res) {
            $('#TablaDiv').html(res);
            $('#TablaComision').dataTable({
                "scrollX": true,
                //"scrollY": true,
                "paging": false,
                "info": false,
                "searching":false,
                "sorting": false
            });
        },
        error: function (msg) {
            alert(msg);
        }
    });

}
function Limpiar(fila,Limit) {
    for (var i = 1; i <= Limit; i++) {
        var txtid = "txtColummna" + fila + "_" + i;
        $('#' + txtid).val("") ;
    }
}

var CrearSistemaPension = function (fila) {
    
    var emp = $("#ctl00_hddctlg").val();
    var Limit = $('#hf').val();
    var Column = $('#hfC').val();
    var Usuario = $('#ctl00_txtus').val();
    var Cbo = $('#cboSistema0_0').val();

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var Peri = mm + " " + aa;

    var padres = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPadre').val();

    var Cbo = $('#cboSistema0_0').val();

    if (Cbo !="0") {

    } else {
        alert('Seleccione un sistema de pensiones.');
        return false;
    }  

    var bSi;
    var cTexto="";
    for (var i = 1; i <= Limit; i++) {
        var txtid = "txtColummna" + fila + "_" + i;

            var valor = $('#' + txtid).val();
            bSi = true;
            if (cTexto == "") {
                if (valor == "") {
                    cTexto =cTexto+ ":" + ",";
                } else {
                    cTexto = valor + ",";
                }
                
            } else {
                if (valor == "") {
                    cTexto = cTexto + ":" + ",";
                } else {
                    cTexto = cTexto + valor + ",";
                }
                
            }
   
    }
    cTexto = cTexto + "_";
    cTexto = cTexto.replace(',_', '');
    cTexto = cTexto.replace(',:,_','');
    if (vErrorFila($('#hfValidacionControles').val())) {
        bSi = true;
    } else {
        return false;
    }

    if (bSi == true) {
        $.ajax({
            type: "POST",
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=N&emp=" + emp + "&u=" + Usuario + "&c=" + Column + "&d=" + cTexto + "&cb=" + Cbo + "&p=" + Peri + "&padres=" + padres,
            success: function (res) {
                Bloquear("ventana");
                Limpiar(fila,Limit);
                exito();
                ListarCabecera();
                Desbloquear("ventana");
        
            },
            error: function (msg) {
                alert(msg);
            }
        });
       
    }
   
}










function Modificar(fila, Codigo) {
    var emp = $("#ctl00_hddctlg").val();

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var Peri = mm + " " + aa;


   
    var Limit = $('#hf').val();
    var Column = $('#hfC').val();
    var Usuario = $('#ctl00_txtus').val();
    var Cbo = $('#cboSistema' + fila + '_0').val();
   

    //Limit = 7;
    var bSi;
    var cTexto = "";
    var cControl_Validar = "";
    for (var i = 1; i <= Limit; i++) {
        var txtid = "txtColummna" + fila + "_" + i;

        ////////    if (vErrors(txtid)) {
        var valor = $('#' + txtid).val();
        bSi = true;
        if (cTexto == "") {
            if (valor == "") {
                cTexto = cTexto + ":" + ",";
            } else {
                cTexto = valor + ",";
            }

        } else {
            if (valor == "") {
                cTexto = cTexto + ":" + ",";
            } else {
                cTexto = cTexto + valor + ",";
            }

        }
        ////////} else {
        ////////    return false;
        ////////}     

        if ($('#' + txtid).attr('disabled')) {
            //alert('Si');            
        } else {
            //alert('No');
            if (i == Limit) {
                cControl_Validar = cControl_Validar + txtid + "";
            } else {
                cControl_Validar = cControl_Validar + txtid + ",";
            }
        }

        
    }
    $('#hfValidacionControles').val(cControl_Validar);
    cTexto = cTexto + "_";
    //cTexto = cTexto.replace(',:,_', '');
    cTexto = cTexto.replace(',_', '');
    cTexto = cTexto.replace(',:,_', '');
    if (vErrorFila($('#hfValidacionControles').val())) {
        bSi = true;
    } else {
        return false;
    }
    if (bSi == true) {
        $.ajax({
            type: "POST",
            url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=M&emp=" + emp + "&u=" + Usuario + "&c=" + Column + "&d=" + cTexto + "&cb=" + Cbo + "&p=" + Peri + "&codigo=" + Codigo,
            success: function (res) {
                exito();
        
              //  ListarCabecera();
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }
}









//lee el combo
var Listarcbo = function (fila) {
    var Dibuja;
    
    $("#cboSistema4_0 option").each(function () {
        console.log($(this).val());
    })
    return Dibuja;
}
function DibujaCombo(fila, Cbo,id) {
    var Dibuja;
    var emp = $("#ctl00_hddctlg").val();

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var Peri = mm + " " + aa;

    $.ajax({
        type: "POST",
        async: false,
        url: "vistas/BB/ajax/BBLCOSP.ASHX?Opcion=CBO" + "&f=" + fila + "&cb=" + Cbo + "&p=" + Peri + "&emp=" + emp + "&id=" + id,
        //contentType: "application/json;",
        //dataType: "json",
        success: function (res) {
            var Replace;
            Replace='cboSistema' + fila + '0';
            Dibuja = res;
            Dibuja.replace('cboSistema0', Replace);
        },
        error: function (msg) {
            alert(msg);
        }
    });
    return Dibuja;
}






