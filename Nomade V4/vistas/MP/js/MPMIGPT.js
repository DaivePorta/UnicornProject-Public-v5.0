 MPMIGPT = function () {
     var codigoOrden = '';
     var codigoProd = '';
     var listaEncargados = null;
    var plugins = function () {

        $('#cboEmpresas,#cboAlmacen').select2();
        $('#cboEstablecimiento').select2();

        $('.fecha').datepicker();

        $('.fecha').datepicker("setDate", "now");

        $('#txtcant').inputmask({ mask: '9', repeat: 9, greedy: false });

    }
    function ValidaDecimales(e, field) {
        key = e.keyCode ? e.keyCode : e.which
        // backspace
        if (key == 8) return true

        // 0-9 a partir del .decimal 
        if (field.value != "") {
            if ((field.value.indexOf(".")) > 0) {
                //si tiene un punto valida dos digitos en la parte decimal
                if (key > 47 && key < 58) {
                    if (field.value == "") return true
                    //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                    regexp = /[0-9]{3}$/
                    return !(regexp.test(field.value))
                }
            }
        }
        // 0-9 
        if (key > 47 && key < 58) {
            if (field.value == "") return true
            regexp = /[0-9]{10}/
            return !(regexp.test(field.value))
        }
        // .
        if (key == 46) {
            if (field.value == "") return false
            regexp = /^[0-9]+$/
            return regexp.test(field.value)
        }
        // other key
        return false
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    //Iniciar valores con valores de login
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                    fillCboEstablecimiento();

                    listar();
                    ListarAlmacenes();
                    filltxtEmpleado('#txtsolicitante', '');
                    filltxtentregar('#txtentregar', '');
                    cargarCorrelativoInterno();

                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            //url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=2&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].ALMACEN + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
                //selectEst.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        $('#cboEstablecimiento').select2('destroy').select2();
    };

    var llenaTabla = function () {
        var parms = {
            data: null,
            //scrollX: true,
            order: [[1, 'desc']],
            columns: [

                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "NRO_ORDEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('align', 'center')
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_CIERRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CORE_IND",

                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('align', 'center')
                        $(td).attr('style', 'display:none')
                    }
                },

                {
                    data: "PROD_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                  {
                      data: "PRODUCTO",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  },

                {
                    data: "CANTIDAD_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },



                 {
                     data: "CODE_LOTE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "EMPRESA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "CODE_EMPRESA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('style', 'display:none')
                     }
                 },
                {
                    data: null,
                    //defaultContent: '<a  class="btn green cerrar"><i class="icon-off"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                      

                        if (rowData.CORE_IND == '2') {
                            $(td).html("<div id=D_"  + rowData.NRO_ORDEN + "><a id=btn_" + rowData.NRO_ORDEN + " class=' btn blue receta'>Registrar &nbsp;&nbsp;&nbsp;<i class='icon-save'></i></a></div>");
                        }
                        else {

                            if (rowData.CORE_IND == '3') {
                                $(td).html("<label id=btn_" + rowData.NRO_ORDEN + " class=' btn purple ' disabled='disabled'> Registrado <i class='icon-ok'></i></label>");
                            }
                           
                            
                            
                        }

                        $(td).children().children('.receta').click(function () {


                            //$("#modal-confirmar").modal("show");
                            codigoOrden = $(this).parent().parent().parent().children().eq(1).text()
                            codigoProd = $(this).parent().parent().parent().children().eq(4).text()
                            $('#txtProducto').val($(this).parent().parent().parent().children().eq(5).text())
                            $('#txtCantidad').val($(this).parent().parent().parent().children().eq(6).text())
                            cargarFormulacion(codigoProd, $(this).parent().parent().parent().children().eq(6).text())
                            //$('#modal-receta').modal('show');
                            $('#modal-receta').modal('show');
                        })

                    }
                   
                }
                ,

                {
                    data: null,
                    //defaultContent: '<a  class="btn green cerrar"><i class="icon-off"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                       

                        if (rowData.CORE_IND == '3') {
                            $(td).html("<a id=btnC_" + rowData.NRO_ORDEN + " class=' btn green cerrar'>Almacen &nbsp;<i class='icon-circle-arrow-right'></i></a>");
                        }
                        else {
                            $(td).html("<a id=btnC_" + rowData.NRO_ORDEN + " class=' btn green' disabled='disabled' >Almacen &nbsp;<i class='icon-circle-arrow-right'></i></a>");
                        }

                        $(td).children('.cerrar').click(function () {
                           
                            $('#txtnumdocOrigen_0').val($(this).parent().parent().children().eq(1).text());
                            cargarDetalleCierre($(this).parent().parent().children().eq(1).text());
                            $('#naminsa').modal('show');

                        })

                    }
                }

            ]

        }

        $('#tblingreso').dataTable().fnDestroy();

        oTable = iniciaTabla('tblingreso', parms);


      





    }


  
   
    var cargarCorrelativoInterno = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=CORR&CTLG_CODE=" + $('#cboEmpresas').val() + "&TIP_DCTO=" + '0051' + "&CORR=S&COD_ALMC=" + $('#cboAlmacen').val(),
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                correlativoInterno = datos;
                if (correlativoInterno !== null) {
                    for (var i = 0; i < correlativoInterno.length; i++) {
                        if (correlativoInterno[i].FORMATO == 'F') {
                            $('#hfCOD_AUT_INTERNO').val(correlativoInterno[i].CODIGO);
                            $('#txtSerieRegistroInterno').val(correlativoInterno[i].SERIE);
                            $('#txtNroRegistroInterno').val(correlativoInterno[i].VALOR_ACTUAL);
                            return;
                        }
                    }
                } else {
                    $('#txtSerieRegistroInterno, #txtNroRegistroInterno').val('');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar numeraciones de documentos comerciales internos.');
            }
        });
    };
    var llenaTablaDerivados = function () {
      
        var parms = {
            
            //scrollX: true,
            //order: [[0, 'desc']],
            paging: false,
            filter: false,
            data: null,
            info: false,
            columns: [

                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "DERIVADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('align', 'center')
                      
                    }
                },
                {
                    data: "CANTIDAD1",

                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('align', 'center')

                    }
                },
                {
                    data: "UNIDAD_MEDIDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                      
                    }
                },
                

                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html("<input id=txt_" + rowData.CODIGO + "  onkeypress='return ValidaDecimales(event,this)' tabindex=" + rowData.CODIGO + " class='cantidad'   />");
                        $("#txt_" + rowData.CODIGO + "").removeAttr('disabled');
                    }
                }

            ]

        }

        $('#tblDerivadoProducto').dataTable().fnDestroy();

        oTableDerivados = iniciaTabla('tblDerivadoProducto', parms);

    }

    var llenaTablaDetalle = function () {

        var parms = {

            //scrollX: true,
            //order: [[0, 'desc']],
            paging: false,
            filter: false,
            data: null,
            info: false,
            columns: [

                {
                    data: "PRODUCTO_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                 {
                     data: "PRODUCTO_CODE_ANTIGUO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('style', 'display:none')
                     }
                 },
                 
                 {
                     data: "UNIDAD_MEDIDAD",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('style', 'display:none')
                     }
                 },
                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "SALIENTE",

                    createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'center')

                    }
                },
                {
                    data: "PRODUCIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.TIPO == 'PROD. DERIVADO') {
                            $(td).parent().attr('style', 'background-color: antiquewhite')
                        }
                        else {
                            $(td).parent().attr('style', 'background-color: darkseagreen')
                        }
                        
                    }
                },
                {
                    data: "DETRACCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                }



            ]

        }

        $('#tblDetalle').dataTable().fnDestroy();

        oTableDetalle = iniciaTabla('tblDetalle', parms);

    }

    var cargarFormulacion = function (codigo,cantidad) {
       
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMIGPT.ashx?OPCION=1&CODIGO_producto=' + codigo + '&cantidad_orden=' + cantidad,
            async: false
        }).done(function (data) {
            if (data !== null && data != "" && data != "[{}]") {
                var json = $.parseJSON(data)
                oTableDerivados.fnClearTable()
                oTableDerivados.fnAddData(json)
            }
            else {

                oTableDerivados.fnClearTable()
            }
            Desbloquear('ventana');
        }).error(function (msg) {
            Desbloquear('ventana');
        });
        
    };


   
    function listar() {

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPMIGPT.ashx?OPCION=3&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val() + "&P_CODEFABR=" + '',
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[{}]") {

                    var json = $.parseJSON(datos)
                    oTable.fnClearTable()
                    oTable.fnAddData(json)

                }
                else {

                    oTable.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }
    var cargainicial     = function () {
        $('.alm').off('click');
        $('#txtOperacion').val('Entrada de Produccion')
        cargarParametrosSistema();
    }
     function ListarAlmacenes(ctlg) {
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cboEmpresas').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboAlmacen').empty();
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].SCSL_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboAlmacen').val(datos[0].CODIGO);
            }
        },
        error: function (msg) {
            alertCustom('Ocurrió un error al listar almacenes.');
        }
    });
    $('#cboAlmacen').select2('destroy').select2();
    
     }

     function filltxtEmpleado(v_ID, v_value) {
         var selectSolicitante = $(v_ID);
         $.ajax({
             type: "post",
             url: "vistas/na/ajax/naminsa.ashx?OPCION=3&CTLG_CODE=" + $('#cboEmpresas').val() + '&SCSL_CODE=' + $('#cboEstablecimiento').val(),
             cache: false,
             datatype: "json",
             async: false,
             success: function (datos) {
                 listaEncargados = datos;
                 if (datos !== null && datos !== '') {
                     selectSolicitante.typeahead({
                         source: function (query, process) {
                             arraySolicitante = [];
                             map = {};

                             var obj = "[";
                             for (var i = 0; i < datos.length; i++) {
                                 arraySolicitante.push(datos[i].NOMBRE_EMPLEADO);
                                 obj += '{';
                                 obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '","PIDM":"' + datos[i].PIDM + '", "USUA_ID":"' + datos[i].USUA_ID + '"';
                                 obj += '},';
                             }
                             obj += "{}";
                             obj = obj.replace(",{}", "");
                             obj += "]";
                             var json = $.parseJSON(obj);

                             $.each(json, function (i, objeto) {
                                 map[objeto.NOMBRE_EMPLEADO] = objeto;
                             });
                             process(arraySolicitante);
                         },
                         updater: function (item) {
                             $("#hfPIDM_EMPL1").val(map[item].PIDM);
                             $('#txtUsuaSolicitante').val(map[item].USUA_ID);
                             return item;
                         },
                     });
                 }
                 if (datos != null && $.trim(v_value).length > 0) {
                     selectSolicitante.val(v_value);
                 }
             },
             error: function (msg) {
                 alertCustom('Error al intentar consultar empleados.');
             }
         });

         selectSolicitante.keyup(function () {
             $(this).siblings("ul").css("width", $(this).css("width"));
             if ($(this).val().length == 0) {
                 $("#hfPIDM_EMPL1, #txtUsuaSolicitante").val('');
             }
         });
     }

    

    function ListarTipoMovimientoES(tipomov) {
        var select = $('#cboOperacion');
        select.html('<option></option>');
        var array;
        for (var i = 0; i < tipos_mov.length; i++) {
            array = tipos_mov[i].TIPO_MOV.split('');
            if (array.indexOf(tipomov) > -1 && tipos_mov[i].CODIGO !== '0021' && tipos_mov[i].CODIGO !== '0011') {
                select.append('<option value="' + tipos_mov[i].CODIGO + '" data-tipo-persona="' + tipos_mov[i].TIPO_PERSONA + '" data-origenes="' + tipos_mov[i].DOCS_ORIGEN + '" data-registros="' + tipos_mov[i].DOCS_REGISTRO + '">' + tipos_mov[i].DESCRIPCION + '</option>');
            }
        }
        select.select2('val', '').change();
    }

    function filltxtentregar(v_ID, v_value) {
        var selectReceptor = $(v_ID);
        //$.ajax({
        //    type: "post",
        //    url: "vistas/na/ajax/naminsa.ashx?OPCION=3&CTLG_CODE=" + $('#cboEmpresas').val() + '&SCSL_CODE=' + $('#cboEstablecimiento').val(),
        //    cache: false,
        //    datatype: "json",
        //    async: false,
        //    success: function (datos) {
        var datos = listaEncargados;
                if (datos !== null && datos !== '') {
                    selectReceptor.typeahead({
                        source: function (query, process) {
                            arrayRecepciona = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRecepciona.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '","PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_EMPLEADO] = objeto;
                            });
                            process(arrayRecepciona);
                        },
                        updater: function (item) {
                            $("#hfPIDM_EMPL2").val(map[item].PIDM);
                            return item;
                        },
                    });
                    selectReceptor.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($(this).val().length == 0) {
                            $("#hfPIDM_EMPL2").val('');
                        }
                    });
                }
                if (datos !== null && $.trim(v_value).length > 0) {
                    selectReceptor.val(v_value);
                }
        //    },
        //    error: function (msg) {
        //        alertCustom('Error al intentar consultar empleados.');
        //    }
        //});
    }
    var eventos = function () {

        $('#A2').click(function () {
            if (vErrors(['txtsolicitante', 'txtentregar'])) {
                if ($("#hfPIDM_EMPL2").val() == '') {
                    alertCustom('Ingrese un Receptor Correcto')
                }
                else {
                    if ($("#hfPIDM_EMPL1").val() == '') {
                        alertCustom('Ingrese un Solicitante Correcto')
                    }
                    else {
                        almacen();
                    }
                }
               
            }
           

        });
        $("#cboAlmacen").on('change', function () {
            cargarCorrelativoInterno();
        });
        $('#cboEmpresas').on('change', function () {
            fillCboEstablecimiento();
            listar();
            ListarAlmacenes();
            listaEncargados = null;
            filltxtEmpleado('#txtsolicitante', '');
            filltxtentregar('#txtentregar', '');
        });

        $('#cboEstablecimiento').on('change', function () {
            listar();
            listaEncargados = null;
            filltxtEmpleado('#txtsolicitante', '');
            filltxtentregar('#txtentregar', '');
        });

        $('#btnGuardar').click(function () {
            if ($('#txtCantidadPro').val() == "") {
                alertCustom('Ingrese Cant. Producidad');
                return;
            }
            else {
                if ($('.cantidad').val() == "") {
                    alertCustom('Ingrese Cant. Producidad de producto derivado');
                    return;
                }
                else {
                    //$('#txtProducto').val($(this).parent().parent().children().eq(5).text())
                    //$('#txtCantidad').val($(this).parent().parent().children().eq(6).text())

                    REGISTRAR();
                    
                }
            }
        });
      


    }
    function REGISTRAR() {
        var eviarDetalle = "";
        var detalle = datosTabla();

        if (oTableDerivados.fnGetData().length > 0) {
            eviarDetalle = detalle + '|' + codigoProd + ',' + $('#txtCantidad').val() + ',' + $('#txtCantidadPro').val() + ',' + codigoOrden + ','  + 'P';
        }
        else {

            eviarDetalle = codigoProd + ',' + $('#txtCantidad').val() + ',' + $('#txtCantidadPro').val() + ',' + codigoOrden + ',' + 'P';

        }
        
        //alert(eviarDetalle);
        var data = new FormData;

        
        data.append('p_detalle', eviarDetalle);

        

        Bloquear("modal-receta");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPMIGPT.ashx?OPCION=4&P_TEXT=" + eviarDetalle,
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {
                Desbloquear("modal-receta");
                if (datos == 'ok') {
                    exito();
                    $("#D_" + codigoOrden + "").children().remove();
                    $("#D_" + codigoOrden + "").html("<label  class=' btn purple ' disabled='disabled'> Registrado <i class='icon-ok'></i></label>")

                    $("#btnC_" + codigoOrden + "").addClass('cerrar');
                    $("#btnC_" + codigoOrden + "").removeAttr('disabled');

                    $("#btnC_" + codigoOrden + "").on('click', function () { Almacen2($(this).parent().parent().children().eq(1).text()) })

                    $('#modal-receta').modal('hide');
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
    function datosTabla() {

        var datos_tabla;
        var datos_fila = '';
        $('#tblDerivadoProducto tbody').children().each(function (i) {

            var P_CODE_PRODUCTO, CANTIDAD_SALIENTE, CANTIDAD_PRODUCIDAD;

            P_CODE_PRODUCTO = $(this).find('td').eq(0).text();
            CANTIDAD_SALIENTE = $(this).find('td').eq(2).text();
            CANTIDAD_PRODUCIDAD = $($(this).find('td').eq(4).children()).val();
           

            ITEMS = i + 1;

            datos_fila += P_CODE_PRODUCTO + ',' + CANTIDAD_SALIENTE + ',' + CANTIDAD_PRODUCIDAD + ',' + codigoOrden + ',' + 'S';
            datos_fila += '|';
        });
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    }
 
    return {
        init: function () {
            plugins();
            llenaTabla();
            fillCboEmpresa();
            eventos();
            cargainicial();
            llenaTablaDerivados();
            llenaTablaDetalle();
            
            
        }
    };

}();




 var Almacen2 = function (codigoOrde) {

     //alert(codigoOrde);
     $('#txtnumdocOrigen_0').val(codigoOrde);
     cargarDetalleCierre(codigoOrde);
     $('#naminsa').modal('show');

 }



 var cargarDetalleCierre = function (codigo) {

     Bloquear('ventana');
     $.ajax({
         type: 'post',
         url: 'vistas/MP/ajax/MPMIGPT.ashx?OPCION=5&P_CODE=' + codigo + '&ALMC_CODE=' + $('#cboAlmacen').val() + '&CTLG_CODE=' + $('#cboEmpresas').val(),
         async: false
     }).done(function (data) {
         if (data !== null && data != "" && data != "[{}]") {
             var json = $.parseJSON(data)
             oTableDetalle.fnClearTable()
             oTableDetalle.fnAddData(json)
         }
         else {

             oTableDetalle.fnClearTable()
         }
         Desbloquear('ventana');
     }).error(function (msg) {
         Desbloquear('ventana');
     });

 };
 var cargarParametrosSistema = function () {

     //OBTENER PARAMETRO DE REDONDEO
     $.ajax({
         type: "post",
         url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MOBA",
         contenttype: "application/json;",
         datatype: "json",
         async: false,
         success: function (datos) {
             if (datos != null) {
                 $('#hfMoneda').val(datos[0].VALOR);
             }
             else {
                 alertCustom("No se recuperó la moneda base");
                 $('#hfMoneda').val('0.00');
             }
         },
         error: function (msg) {
             alert(msg);
         }
     });
 }
 var almacen = function () {

     var tabla = datosTablaAlmacen();
    
     var data = new FormData();
     data.append('CTLG_CODE', $("#cboEmpresas").val());
     data.append('COD_ALMC', $('#cboAlmacen').val());
     data.append('FEC_EMISION', $("#txtfechaemision").val());
     data.append('FEC_TRANS', $("#txtfechatransaccion").val());
     data.append('DCTO_REG', $('#txtnumdocOrigen_0').val());
     data.append('PIDM_SOLICITANTE', $('#hfPIDM_EMPL1').val());
     data.append('SOLICITANTE', $('#txtsolicitante').val());
     data.append('DCTO_ORGN', $("#txtSerieRegistroInterno").val());
     data.append('DCTO_ORGN_SERIE', $("#txtSerieRegistroInterno").val());
     data.append('TIPO_MOV', 'I');
     data.append('PIDM_ENTREGAR_A', $('#hfPIDM_EMPL2').val());
     data.append('ENTREGAR_A', $('#txtentregar').val());
     data.append('TIPO_OPE', '0019');
     data.append('CMMNT_DCTO', 'Entrada de Produccion por Orden de Fabricacion Nro ' + $('#txtnumdocOrigen_0').val());
     data.append('USUA_ID', $('#ctl00_txtus').val());
     data.append('RAZON_TRANS', '');
     data.append('RAZON_DEST','');
     data.append('LIC_CONDUCIR', '');
     data.append('CHOFER', '');
     data.append('DIRE', '');
     data.append('CERTIFICADO','');
     data.append('PLACA', '');
     data.append('TIP_DCTO', $("#cboRegistro").val());
     data.append('SERIE_DCTO', 'NTS');
     data.append('TIP_DCTO_ORG', '0000');
     data.append('ALMC_DEST', '');
     data.append('p_NUM_SEQ_DOC', '1');
     data.append('TIPO_DOC_RAZON_DEST', '');
     data.append('MONEDA', $('#hfMoneda').val());
     data.append('ELECTRONICO', 'N');
     data.append('TIPO_TRANS','PUB');
     data.append('COD_AUT', '');
     data.append('DOCS_CODE',  $('#txtnumdocOrigen_0').val());
     data.append('TIPO_DCTO_INTERNO', '0051');
     data.append('COD_AUT_INTERNO', $('#hfCOD_AUT_INTERNO').val());
     data.append('TIPO_ENVIO', 'null');
     data.append('DIRECCION_TRANSPORTISTA', 'null');
     data.append('P_TEXT', tabla);

     
     Bloquear('naminsa');
     var jqxhr = $.ajax({
         type: "POST",
         url: "vistas/mp/ajax/MPMIGPT.ashx?OPCION=6",
         contentType: false,
         data: data,
         processData: false,
         cache: false
     }).success(function (datos) {
         if (datos[0].SUCCESS == "OK") {
             Desbloquear("naminsa");
             exito();
             var x = $("#tblingreso").dataTable().fnGetData();

             x.filter(function (d, e) {
                 if (d.NRO_ORDEN == $('#txtnumdocOrigen_0').val()) {
                     oTable.fnDeleteRow(e)
                     //x1.splice(e, 1)


                 }
             });

             $('#naminsa').modal('hide');

         }
         else {
             Desbloquear("naminsa");
             noexito();
         }
         //if (datos[0].SUCCESS == "OK") {
         //    if (datos[0].CODIGO == "") {
         //        alertCustom("Ocurrió un error en el servidor al registrar la Operación.");
         //    } else if (datos[0].CODIGO == "LIMITE") {
         //        alertCustom('Se ha comsumido por completo la numeración del Documento de Registro.');
         //    } else if (datos[0].CODIGO == "LIMITE INTERNO") {
         //        alertCustom('Se ha consumido por completo la numeración del Documento Interno de Registro.');
         //    } else {
         //        var nreg = datos[0].CORR_REG.split('-');
         //        var nregint = datos[0].CORR_REG_INT.split('-');
         //        $('#txtNumDctoAlmc').val(datos[0].CODIGO);
         //        $('#hfCOD_DCTO_ALMC').val(datos[0].CODIGO);
         //        $('#txtNumSerieDOcRegistro').val(nreg[0]);
         //        $('#txtNumDOcRegistro').val(nreg[1]);
         //        $('#txtSerieRegistroInterno').val(nregint[0]);
         //        $('#txtNroRegistroInterno').val(nregint[1]);
         //        $('#cboMoneda, #cboOperacion, #cboEmpresa, #cboAlmacen').prop('disabled', true);
         //        $('#grabar').html("<i class='icon-pencil'></i> Modificar");
         //        $("#grabar").attr("href", "javascript:Actualizar();");
         //        exito();
         //        $("#div_botones_detalle").css("display", "block");
         //        var val = parseInt($("#txtsecuencia").val());
         //        var seq = val + 1;
         //        $("#txtsecuencia").val(seq);
         //        $('#liDetalles').removeClass('hidden');
         //        ListaProdDetalle();
         //        $("#tabDetalleMov").click();
         //        $('.quitar, #btnOrigen').remove();
         //        $('#rbmovalmcEntrada, #rbmovalmcSalida, #rbmovalmcTranfE, #rbmovalmcTranfS').prop('disabled', true);
         //        filltxtcodprode('#txtcodprod', '');
         //        filltxtdescprode('#txtdescprod', '');
         //        window.history.pushState("Object", "ENTRADA SALIDA ALMACEN", "/Default.aspx?f=naminsa&codigo=" + datos[0].CODIGO);
         //        Desbloquear("generales");

         //        if ($('#txtCodigoDoc_0').val() !== '') { $('#txtcodprod, #txtdescprod, #txtcant').prop('disabled', true); }
         //        var origenesExternos = ($('#cboOrigen').val() === '0028') || ($('#cboOrigen').val() === '0052');
         //        origenesExternos = origenesExternos || (($('#cboOrigen').val() === '0001' || $('#cboOrigen').val() === '0003' || $('#cboOrigen').val() === '0012') && $('#cboOperacion').val() === '0001');
         //        origenesExternos = origenesExternos || ($('#cboOrigen').val() === '0001' && $('#cboOperacion').val() === '0002');
         //        origenesExternos = origenesExternos || ($('#cboOrigen').val() === '0009' && $('#cboOperacion').val() === '0021');
         //        origenesExternos = origenesExternos || ($('#cboOrigen').val() === '0026' && $('#cboOperacion').val() === '0002');
         //        if (origenesExternos) {
         //            listarDetallesOrigen(codigo_doc, NumserieDocOrigen, NumDocOrigen);
         //            $('#btnVerListaDetallesBS').removeClass('hidden');
         //        }
         //    }
         //}
         //else {
         //    alertCustom("Existen Documentos Repetidos (" + datos[0].NUMERO + ").");
         //    Desbloquear("generales");
         //}
     }).error(function () {
         noexito();
         Desbloquear("generales");
     });
 }

 function datosTablaAlmacen() {

     var datos_tabla;
     var datos_fila = '';
     $('#tblDetalle tbody').children().each(function (i) {

         var DCTO_ORGN, CODE_PROD, CODE_PROD_ANTIGUO, CODE_UME_BASE, CANT_BASE, CODE_UME, CANT;
         var TOTAL, GARANTIA, DCTO_REQ, REQC_NUM_SEQ_DOC, REQD_ITEM, USUA_ID, SERIE_PROD, MONTO;
         var IGV_IND, DESD_COMPRA_IND, TIPO_INSERT, RES, VAL_INI, VAL_FIN, CODE_CENTRO_COSTO, CODE_CECC;
         var APLIC_VALORES, MONEDA, DETRACCION, DETRACCION_RESULTADO;

         //P_CODE_PRODUCTO = $(this).find('td').eq(0).text();
         //CANTIDAD_SALIENTE = $(this).find('td').eq(2).text();
         //CANTIDAD_PRODUCIDAD = $($(this).find('td').eq(4).children()).val();

         DCTO_ORGN = $('#txtnumdocOrigen_0').val();
         CODE_PROD = $(this).find('td').eq(0).text();
         CODE_PROD_ANTIGUO = $(this).find('td').eq(1).text();
         CODE_UME_BASE = $(this).find('td').eq(2).text();
         CANT_BASE = $(this).find('td').eq(5).text();
         CODE_UME = $(this).find('td').eq(2).text();
         CANT = $(this).find('td').eq(5).text();
         TOTAL = $(this).find('td').eq(6).text();
         GARANTIA = '0';
         DCTO_REQ = 'NODATA';
         REQC_NUM_SEQ_DOC = '1';
         REQD_ITEM = '0';
         USUA_ID = $('#ctl00_txtus').val();
         SERIE_PROD = "NODATA";
         MONTO = (parseFloat($(this).find('td').eq(6).text()) / parseFloat($(this).find('td').eq(5).text()));
         IGV_IND = 'N';
         DESD_COMPRA_IND = 'N';
         TIPO_INSERT = 'N';
         RES = 'NODATA';
         VAL_INI = "NODATA";
         VAL_FIN = "NODATA";
         CODE_CENTRO_COSTO = "NODATA";
         CODE_CECC = "NODATA";
         APLIC_VALORES = 'E';
         MONEDA = 'NODATA';
         DETRACCION = parseFloat($(this).find('td').eq(8).text());

         if (DETRACCION > 0) {
             DETRACCION_RESULTADO = (parseFloat(TOTAL) * parseFloat(DETRACCION)) / 100;
         }
         else {
             DETRACCION_RESULTADO = 0;
         }

         datos_fila += DCTO_ORGN + ',' + CODE_PROD + ',' + CODE_PROD_ANTIGUO + ',' + CODE_UME_BASE + ',' + CANT_BASE + ',' + CODE_UME + ',' + CANT + ',' + TOTAL + ',' + GARANTIA + ',' + DCTO_REQ + ',';
         datos_fila += REQC_NUM_SEQ_DOC + ',' + REQD_ITEM + ',' + USUA_ID + ',' + SERIE_PROD + ',' + MONTO + ',' + IGV_IND + ',' + DESD_COMPRA_IND + ',' + TIPO_INSERT + ',' + RES + ',' + VAL_INI + ',' + VAL_FIN + ',' + CODE_CENTRO_COSTO + ',';
         datos_fila += CODE_CECC + ',' + APLIC_VALORES + ',' + MONEDA + ',' + DETRACCION_RESULTADO;
         datos_fila += '|';
     });
     datos_fila = datos_fila + '|';
     datos_tabla = datos_fila.replace('||', '');
     return datos_tabla;
 }