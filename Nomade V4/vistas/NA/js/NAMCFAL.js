var NAMCFAL = function () {

    var cargaInicial = function () {

       $('#chkactivo').on('change', function () {
            if ($("#chkactivo").is(':checked')) {

               $('#txtfechat').attr("disabled", true);
                $('#txtfechat').val('');
            } else {

               $('#txtfechat').attr("disabled", false);
            }
        });

       

        var code = ObtenerQueryString("codigo");
        
        var codempr = ObtenerQueryString("codempr");

        if (typeof (code) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:actualizar();");
            $("#slcEmpresa").attr("disabled", "disabled");
            $("#slcscsl").attr("disabled", "disabled");
            $.ajax({
                type: "post",
                url: "vistas/NA/ajax/namcfal.ashx?opcion=3&code=" + code + "&codempr=" + codempr,
                contenttype: "application/json;",
                datatype: "json",
                async: false,

                success: function (datos) {

                    $("#txtcodigo").val(datos[0].code);
                    $("#slcEmpresa").val(datos[0].EMPRESA);
                    $("#slcEmpresa").trigger("change", [datos[0].SUCURSAL, datos[0].ENCARGADO_ALMACEN]);
                   
                    $("#slcscsl").val(datos[0].SUCURSAL);
                    $("#txtalmacen").val(datos[0].DESCRIPCION);
                    $("#slcencargado").select2("val", datos[0].ENCARGADO_ALMACEN);
                    cargadescripcion(datos[0].TIPO_ALMACEN);
                    $("#slctipoalmacen").select2("val", datos[0].TIPO_ALMACEN);
                    $("#txtdireccion").val(datos[0].DIRECCION);
                    $("#txtubigeo").val(datos[0].DISTRITO);
                    $("#txttelefono").val(datos[0].TELEFONO);
                    $("#txtanexo").val(datos[0].ANEXO);
                    $("#txtfechai").val(datos[0].FECHA_INICIO);
                    $("#txtfechat").val(datos[0].FECHA_TERMINO);
                    $("#slcimpr").select2("val", datos[0].IMPRESORA);

                    //var codDistritoUbig = datos[0].DISTRITO + "%" + datos[0].UBIGEO;
                    $("#slcpais").select2("val", datos[0].PAIS).change();
                    $("#slcdepa").select2("val", datos[0].DEPARTAMENTO).change();
                    $("#slcprov").select2("val", datos[0].PROVINCIA).change();
                    $("#slcdist").select2("val", datos[0].DISTRITO).change();
                    $("#txtUrba").val(datos[0].URBAN);
                    $("#slcpais").attr("disabled", true);
                    $("#slcdepa").attr("disabled", true);
                    $("#slcprov").attr("disabled", true);
                    $("#slcdist").attr("disabled", true);

                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
    }
 
    var fnEventControles = function () {
        $('#slcpais').on('change', function () {
            if ($(this).val() != "") {
                fnFillcboDepa($(this).val());
            }
            
        });
        $('#slcdepa').on('change', function () {
            if ($(this).val() != "") {
                fnFillcboProv($(this).val());
            }

        });
        $('#slcprov').on('change', function () {
            if ($(this).val() != "") {
                fnFillcboDist($(this).val());
            }

        });
        $('#slcdist').on('change', function () {
            if ($(this).val() != "") {
                $("#txtubigeo").val($(this).val());
            }

        });
    };

    var cargacombos = function () {
        $("#slcimpr").select2();

        $.ajaxSetup({ async: false });
        $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 17 },
             function (res) {
                 if (res != "error") {
                     $("#slcimpr").html(res);

                     //$("#slcimpr").change(function () {
                     //    var valor = $(this).val()
                         
                     //});

                 }
             });

        $.ajaxSetup({ async: true });

        $("#slctipoalmacen").select2();

        $.ajaxSetup({ async: false });
        $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 15 },
             function (res) {
                 if (res != "error") {
                     $("#slctipoalmacen").html(res);

                     $("#slctipoalmacen").change(function () {
                         var valor= $(this).val()
                         if (valor != "") {
                            
                             cargadescripcion(valor);
                         }
                     });
                   
                 }
             });
        
        $.ajaxSetup({ async: true });

        $("#slcscsl").select2();
        $("#slcEmpresa").select2();
        $("#slcencargado").select2();
        $.ajaxSetup({ async: false });
        $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 9, usua: $("#ctl00_txtus").val() },
             function (res) {
                 $("#slcEmpresa").html(res);


                 $("#slcEmpresa").change(function (event, p_sucursal, p_encargado) {

                     $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 11, codempr: $("#slcEmpresa").val() },
                         function (res) {
                             if (res != "error") {
                                 $("#slcencargado").attr("disabled", false);
                                 $("#slcencargado").html(res);

                                 $("#slcencargado").change(function (event, parenc) {
                                     $("#BuscaDetalle").removeAttr("style");
                                     $("#slcencargado").parent().parent().attr("class", "control-group");

                                     if (parenc != null) {//selecciona el departamento que se quiere cargar en el select

                                         var parenc_v = parenc;
                                         $("#slcencargado").select2("val", parenc_v);

                                     } else {//setea p_distrito a null para q no avancen los trigger con  valores no existentes

                                         var sucursal = $("#slcencargado").val();

                                     }

                                 });

                             } else {
                                 deshabilitacombos("slcencargado");
                             }
                         });

                     $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 10, codempr: $("#slcEmpresa").val() },
                           function (res) {
                               if (res == "error") {
                                   deshabilitacombos("slcscsl");
                               }

                               else {
                                   $("#slcscsl").attr("disabled", true);//mod 03/12/2014

                                   $("#slcscsl").html(res);
                                   //offObjectEvents("slcscsl");
                                   //vErrorsCG("slcscsl");
                                   $("#slcscsl").change(function (event, paramsuc) {
                                       $("#slcscsl").parent().parent().attr("class", "control-group");

                                       if (paramsuc != null) {//selecciona el departamento que se quiere cargar en el select

                                           var sucursal = paramsuc;
                                           $("#slcscsl").select2("val", sucursal);

                                       } else {//setea p_distrito a null para q no avancen los trigger con  valores no existentes

                                           var sucursal = $("#slcscsl").val();

                                       }

                                   });
                                   if (p_sucursal != null) {
                                       $("#slcscsl").trigger("change", p_sucursal);
                                   }
                                   if (p_encargado != null) {
                                       $("#slcencargado").trigger("change", p_encargado);
                                   }
                               }
                           });

                 });



             });
       
    }

    var fnFillcboPais = function () {
        
        Bloquear("ventana");
            $.ajax({
                type: "post",
                url: "vistas/na/ajax/namcfal.ashx?opcion=18",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        $('#slcpais').empty();
                        $('#slcpais').append('<option value=""></option>');
                        for (var i = 0; i < datos.length; i++) {
                            $('#slcpais').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                        }
                    }
                    $('#slcpais').select2('val', '');
                    $('#slcpais').attr("disabled", false);
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    alertCustom("Empresas no se listaron correctamente");
                }
            });

       
    };
    
    var fnFillcboDepa = function (sCodPais) {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=19&p_Code_Pais=" + sCodPais,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#slcdepa').empty();
                    $('#slcdepa').append('<option value=""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcdepa').append('<option value="' + datos[i].UBIG_DEPARTAMENTO + '">' + datos[i].DEPARTAMENTO + '</option>');
                    }
                }
                $('#slcdepa').select2('val', '');
                $('#slcdepa').attr("disabled", false);
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };

    var fnFillcboProv = function (sCodDep) {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=20&p_Code_Depa=" + sCodDep,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#slcprov').empty();
                    $('#slcprov').append('<option value=""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcprov').append('<option value="' + datos[i].UBIG_PROVINCIA + '">' + datos[i].PROVINCIA + '</option>');
                    }
                }
                $('#slcprov').select2('val', '');
                $('#slcprov').attr("disabled", false);
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };
    
    var fnFillcboDist = function (sCodProv) {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namcfal.ashx?opcion=21&p_Code_Prov=" + sCodProv,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                Desbloquear("ventana");

                if (datos != null) {
                    $('#slcdist').empty();
                    $('#slcdist').append('<option value=""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcdist').append('<option value="' + datos[i].UBIG_DISTRITO + '"codigoub="' + datos[i].CODE_UBIGEO +'">' + datos[i].DISTRITO + '</option>');
                    }
                }
                $('#slcdist').select2('val', '');
                $('#slcdist').attr("disabled", false);
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Empresas no se listaron correctamente");
            }
        });


    };

    var plugins = function () {
        aMayuscula(":input");

        //    $("#txtCodSunat").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 6, "greedy": false }); })

        //    $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "k", "repeat": 50, "greedy": false }); })

        $("#txtalmacen").focus(function () { $(this).inputmask({ "mask": "R", "repeat": 50, "greedy": false }); })

        $("#txtanexo").focus(function () { $(this).inputmask({ "mask": "M", "repeat": 5, "greedy": false }); })
        inifechas("txtfechai", "txtfechat");

        $('#txtdireccion').focus(function () { $(this).inputmask({ "mask": "R", "repeat": 100, "greedy": false }); })

        $('#txttelefono').focus(function () { $(this).inputmask({ "mask": "M", "repeat": 20, "greedy": false }); })

        $(".combo").select2();

    }

    var funccionalidad = function () {
        $("#BuscaDetalle").click(function () {
           
            //  var nombre = $("#slcencargado option[value="+$("#slcencargado").val()+"]").html();
            // $("#myModalLabel").html("Datos De Empleado " + nombre);

            var code = $("#slcencargado").val();
            BuscarEmpleado(code);
           

        });
    }

    return {
        init: function () {
            plugins();
            funccionalidad();
            fnEventControles();
            cargacombos();
            fnFillcboPais();
            cargaInicial();
        }
    };
}();

function deshabilitacombos(id) {
    var auxiliar = new Array();

    if (!(Object.prototype.toString.call(id) == "[object Array]")) {

        auxiliar[0] = id;

    } else { auxiliar = id; }

    for (var i = 0; i < auxiliar.length; i++) {
        $("#" + auxiliar[i]).attr("disabled", "disabled");
        $("#" + auxiliar[i]).select2("val", "");
        //  $("#s2id_" + auxiliar[i] + " a .select2-chosen").html('');
    }

}

function actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';

    var p_empresa = $("#slcEmpresa").val();
    var p_sucursal = $('#slcscsl').val();
    var p_dire = $('#txtdireccion').val();
    var p_TIPO_ALMC = $('#slctipoalmacen').val();
    var p_almacen = $("#txtalmacen").val();
    var p_telef = $('#txttelefono').val();
    var p_pais = $("#slcpais").val();
    var p_ubigeo = $("#slcdist option:selected").attr("codigoub");
    var p_urban = $("#txtUrba").val();
    var p_fechai = $('#txtfechai').val();
    var p_fechat = $('#txtfechat').val();
    var p_IMPR_CODE = $('#slcimpr').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_codigo = $('#txtcodigo').val();
    var p_encargado = $("#slcencargado").val();
    var p_anexo = $("#txtanexo").val();


    if (vErrors(["slcscsl", "slcEmpresa", "slcpais", "txtubigeo", "txtfechai", "txtalmacen", "slctipoalmacen"])) {
        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMCFAL.ASHX", {
            opcion: 2,
            CODIGO: p_codigo,
            EMPRESA: p_empresa,
            SUCURSAL: p_sucursal,
            DESCRIPCION: p_almacen,
            TIPO_ALMACEN: p_TIPO_ALMC,
            ENCARGADO: p_encargado,
            DIRECCION: p_dire,
            PAIS: p_pais,
            UBIGEO: p_ubigeo,
            URBAN: p_urban,
            TELEFONO: p_telef,
            ANEXO: p_anexo,
            FECHAINI: p_fechai,
            FECHATER: p_fechat,
            IMPRESORA: p_IMPR_CODE,
            ESTADO: p_acti,
            USUARIO: p_user
        },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error") == -1 && res == "OK") {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");

                } else {
                    noexito();
                }
            });
    }
}

function crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';

    var p_empresa = $("#slcEmpresa").val();
    var p_sucursal = $('#slcscsl').val();
    var p_TIPO_ALMC = $('#slctipoalmacen').val();
    var p_dire = $('#txtdireccion').val();
    var p_almacen = $("#txtalmacen").val();
    var p_telef = $('#txttelefono').val();
    var p_pais = $("#slcpais").val();
    var p_ubigeo = $("#slcdist option:selected").attr("codigoub");
    var p_urban = $("#txtUrba").val();
    var p_fechai = $('#txtfechai').val();
    var p_fechat = $('#txtfechat').val();
    var p_IMPR_CODE = $('#slcimpr').val();
    var p_user = $('#ctl00_lblusuario').html();

    var p_encargado = $("#slcencargado").val();
    var p_anexo = $("#txtanexo").val();

    if (vErrors(["slcscsl", "slcEmpresa", "slcpais", "txtubigeo", "txtfechai", "txtalmacen", "slctipoalmacen"])) {
        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMCFAL.ASHX", {
            opcion: 1,
            EMPRESA: p_empresa,
            SUCURSAL: p_sucursal,
            DESCRIPCION: p_almacen,
            TIPO_ALMACEN: p_TIPO_ALMC,
            ENCARGADO: p_encargado,
            DIRECCION: p_dire,
            PAIS: p_pais,
            UBIGEO: p_ubigeo,
            URBAN: p_urban,
            TELEFONO: p_telef,
            ANEXO: p_anexo,
            FECHAINI: p_fechai,
            FECHATER: p_fechat,
            IMPRESORA:p_IMPR_CODE,
            ESTADO: p_acti,
            USUARIO: p_user

        },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error") == -1 && res != "" && res != null) {
                    exito();
                    $("#txtcodigo").val(res);
                    $("#grabar").html("<i class='icon-pencil'></i> modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");
                    $("#slcEmpresa").attr("disabled", "disabled");
                    $("#slcscsl").attr("disabled", "disabled");

                } else {
                    noexito();
                }
            });
    }
}

var NALCFAL = function () {

    var fillBandejaAlmacenes = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjAlmacenes').val());
        var parms = {
            "dom": '<"top"i>rt<"bottom"flp><"clear">',
            data: json,
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                { data: "SUCURSAL" },
                { data: "EMPRESA.NOMBRE" },
                { data: "TIPO_ALMACEN" },
                { data: "DIRECCION" },
                { data: "TELEFONO" },

                //{ data: "ENCARGADO_ALMACEN" },
                //{ data: "PAIS" }, 
                //{ data: "UBIGEO" },                 
                //{ data: "ANEXO" }, 
                //{ data: "FECHA_INICIO" }, 
                //{ data: "FECHA_TERMINO" }, 
                //{ data: "DEPARTAMENTO" }, 
                //{ data: "PROVINCIA" }, 
                //{ data: "DISTRITO" }, 

                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }



        oTableAlmacenes = iniciaTabla('tblAlmacen', parms);
        //$('#tblAlmacen').removeAttr('style');

        $($("#tblAlmacen_filter").children()[0]).hide();

        function filterColumn() {
            $('#tblAlmacen').DataTable().column(0).search(
                $('#filcod').val()
            ).draw();
        }
        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });


        $("#filemp").each(function () {
            var select = $('<select id="slcfilempr" class="span12" style="margin-bottom: 0px;"><option></option><option value="">Todo</option></select>')
                .appendTo($(this).empty())
                .on('change', function () {
                    $('#tblAlmacen').DataTable().column(3)
                        .search($(this).val())
                        .draw();
                });

            $('#tblAlmacen').DataTable().column(3).data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            $("#slcfilempr").select2({
                placeholder: "EMPRESA",
                allowclear: true

            });
            $("#s2id_slcfilempr").attr("style", "margin-bottom: -10px;");

        });







        $('#tblAlmacen tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableAlmacenes.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableAlmacenes.fnGetPosition(this);
                var row = oTableAlmacenes.fnGetData(pos);
                var codigo = row.CODIGO;
                var empr = row.EMPRESA.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=namcfal&codigo=' + codigo + "&codempr=" + empr;
            }

        });



        $('#tblAlmacen tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableAlmacenes.api(true).row($(this).parent().parent()).index();
            var row = oTableAlmacenes.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 'E', code: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableAlmacenes.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableAlmacenes);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });




    }

    return {
        init: function () {

            fillBandejaAlmacenes();
        }
    };

}();

function cargadescripcion(valor) {
    $.post("vistas/NA/ajax/NAMCFAL.ASHX", { opcion: 16, code: valor },
      function (res2) {
          showInfo("tipo_info", $("#slctipoalmacen option[value=" + valor + "]").html(), res2.toString());
      });
}