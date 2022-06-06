var NPLMAIL = function () {

    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJSON').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
               
                { data: "TIPO" },
                { data: "NOMBRE" },
                { data: "ETAPA" }
                
            ]

        }
        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                               
                window.location.href = '?f=npmmail&codigo=' + codigo;
            }

        });

    }

    return {

        init: function () {
           
            datatable();
        }
    }

}();


var NPMMAIL = function () {

    var json_cargo = null;
    var json_emp = null;

    var plugins = function () {

        $('#cboetapa').select2();
    }

    var cargainicial = function () {
        cargaetapas();
        cargacargos();
        cargaempleado();

        $('#filtro').html('<div class="control-group"><div class="controls"><div id="input_desc_rangos"><input id="txtrango" class="span12" type="text" /> </div></div></div>');
        filltxtcargo('#txtrango', '', '', '');
        plugins();


        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/np/ajax/NPMMAIL.ashx?opcion=L&codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    if (datos[0].TIPO == "EM") {
                        $("#chkempleado").click().click();
                        $('#txtempleado').val(datos[0].NOMBRE_COND).attr("valor", datos[0].CODIGO_COND);
                        
                    } else {
                        $("#chkRangos").click();
                        $("#txtrango").val(datos[0].NOMBRE_COND).attr("valor", datos[0].CODIGO_COND);
                    }
                                       
                   
                    $('#txtglosa').val(datos[0].GLOSA);
                    $('#cboetapa').select2("val", datos[0].ETAPA);
          
                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
    }

    var cargaempleado = function () {

        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMMAIL.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: false,
            success: function (datos) {

                json_emp = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargacargos = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMMAIL.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: false,
            success: function (datos) {

                json_cargo = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargaetapas = function () {

        $.ajax({
            type: "post",
            url: "vistas/np/ajax/npmmail.ashx?opcion=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboetapa').empty();
                //$('#cboEmpresa').append('<option value ="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboetapa').append('<option value="' + datos[i].codigo + '">' + datos[i].descripcion + '</option>');
                    }
                    $("#cboetapa").select2('val', datos[0].codigo);
                    

                } else {
                    $('#cboetapa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var eventos = function ()
    {
        var script = '';
        $('#chkempleado').click(function() {
            script = '<div class="control-group"><div class="controls"><div id="input_desc_empleado"><input id="txtempleado" class="span12 obligatorio" type="text" /> </div></div></div>';
            $('#filtro').html(script);
            filltxtempleado('#txtempleado', '', '', '');
            plugins();
        });

        $('#chkRangos').click(function () {
            script = '<div class="control-group"><div class="controls"><div id="input_desc_rangos"><input id="txtrango" class="span12 obligatorio" type="text" /> </div></div></div>';
            $('#filtro').html(script);
            filltxtcargo('#txtrango', '', '', '');
            plugins();
        });
    }


    function filltxtcargo(v_ID, v_value, SERVICIO, TEXTI) {
        var json = json_cargo;
        var obj =  new Array();
        if (json != null) {
            json.filter(function (e) {
                obj.push(e.DESCRIPCION);
            });
        }

        $(v_ID).typeahead({ source: obj }, { highlight: true, hint: true });

        $(v_ID).keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"))

            }).change(function () {
                var actual = $(this);
                var encontrado = false;
                json.filter(function (d) {
                    if (d.DESCRIPCION == actual.val()) {
                        actual.attr("valor", d.CODIGO);
                        encontrado = true;

                    }
                    if (!encontrado) {
                        actual.removeAttr("valor");
                    }
                });
                if (actual.val() == "") { actual.removeAttr("valor"); }
            });
        
    }

    function filltxtempleado(v_ID, v_value, SERVICIO, TEXTI) {

        var json = json_emp;
        var obj = new Array();
        if (json != null) {
            json.filter(function (e) {
                obj.push(e.NOMBRE_EMPLEADO);
            });
        }

        $(v_ID).typeahead({ source: obj }, { highlight: true, hint: true });

        $(v_ID).keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))

        }).change(function () {
            var actual = $(this);
            var encontrado = false;
            json.filter(function (d) {
                if (d.NOMBRE_EMPLEADO == actual.val()) {
                    actual.attr("valor", d.PIDM);
                    encontrado = true;

                }
                if (!encontrado) {
                    actual.removeAttr("valor");
                }
            });
            if (actual.val() == "") { actual.removeAttr("valor"); }
        });

    }


    return {

        init: function () {
            plugins();
            cargainicial();
            eventos();
        }
    }

}();


function Actualizar() {
    var tipo = $("#chkempleado").is(':checked') ? 'EM' : 'CA';
    var cargo = $("#txtrango").attr("valor") == undefined ? "" : $("#txtrango").attr("valor");
    var pidm = $('#txtempleado').attr("valor") == undefined ? "" : $('#txtempleado').attr("valor");
    var glosa = $('#txtglosa').val();
    var etapa = $('#cboetapa').val();
    var codigo = $("#txtcodigo").val();

    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/np/ajax/NPMMAIL.ashx", {
            opcion: 5,
            tipo: tipo,
            cargo: cargo,
            pidm: pidm,
            glosa: glosa,
            etapa: etapa,
            codigo: codigo
        },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}

function Crear() {
    var tipo = $("#chkempleado").is(':checked') ? 'EM' : 'CA';
    var cargo = $("#txtrango").attr("valor")==undefined?"":$("#txtrango").attr("valor");
    var pidm = $('#txtempleado').attr("valor") == undefined ? "" : $('#txtempleado').attr("valor");
    var glosa = $('#txtglosa').val();
    var etapa = $('#cboetapa').val();
    
    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/np/ajax/NPMMAIL.ashx", {
            opcion: 4,
            tipo: tipo,
            cargo: cargo,
            pidm: pidm,
            glosa: glosa,
            etapa: etapa
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
   
                } else {
                    noexito();
                }
            });
    }
}
