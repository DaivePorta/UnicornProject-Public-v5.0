
var NMLEQUN = function () {

    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {

            data: json,
            columns: [
                 {
                     data: "EQUIVALENCIA", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "UNIDAD_MEDIDA.NOMBRE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "UNIDAD_MEDIDA_EQ.NOMBRE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }


        var table = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.UNIDAD_MEDIDA.CODIGO;
                var code_eq = row.UNIDAD_MEDIDA_EQ.CODIGO;

                window.location.href = '?f=nmmequn&codigo=' + code+'&codigo_eq='+code_eq;

            }

        });

   

    }

    return {
        init: function () {
            datatable();
        }
    };
}();


var NMMEQUN = function () {



    var fillcboUnidadBase = function () {

        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmunme.ashx?flag=6&estado=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcbase').empty();
                $('#slcbase').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcbase').append('<option value="' + datos[i].CODIGO + '" tipo="' + datos[i].COD_TIPO_UNIDAD + '">' + datos[i].DESCRIPCION + '</option>');
                      //  $("#cbounme").append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
              
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillcboEquivalencia = function () {

        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmunme.ashx?flag=6&estado=A&tipo_uni=" + $("#slcbase :selected").attr("tipo"),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcequivalente').empty();
                $('#slcequivalente').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcequivalente').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
                        $('#slcequivalente').change();
                    }
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    var eventos = function () {

        //$.ajaxSetup({ async: false });
        //$.post("vistas/NM/ajax/NMMEQUN.ASHX", { flag: 5 },
        //   function (res) {
        //       $("#slcbase").html(res);
        //       $("#slcbase").select2({
        //           allowclear: true
        //       });
        //      $("#slcequivalente").html(res);
        //       $("#slcequivalente").select2({
        //           allowclear: true
        //       });
        //       $("#cbounme").val(res);
        //   });
        //$.ajaxSetup({ async: true });


        $('#slcbase').on('change', function () {
            $("#nbase").html($("#slcbase option[value=" + $(this).val() + "]").html());
            $("#hdbase").val($(this).val());
            fillcboEquivalencia();
        });


        $('#slcequivalente').on('change', function () {
            $("#nequi").html($("#slcequivalente option[value=" + $(this).val() + "]").html()); $("#equi").removeAttr("style");
            $("#hdequi").val($(this).val());
        });
       
        
        $("#txtequivalencia").change(function () {
            var basefinal = "";
            for (var i = 0; i < $("#txtequivalencia").val().split(".")[0].length; i += 3) {
                basefinal += $("#txtequivalencia").val().split(".")[0].split("").reverse().join("").substring(i, i + 3) + ",";
            }
            basefinal = basefinal.split("").reverse().join("").substring(1);

            if ($("#txtequivalencia").val().split(".")[1] != undefined) {
                basefinal += "." + $("#txtequivalencia").val().split(".")[1];
            }
            
            $("#base").html(basefinal);
        });
       
    }

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");
        var cod_eq = ObtenerQueryString("codigo_eq");
       
        if (cod != null && cod != "" && cod_eq != null && cod_eq != "") {
            $("#slcbase").attr("disabled", "disabled");
            $("#slcequivalente").attr("disabled", "disabled");

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMEQUN.ASHX?flag=4&codi=" + cod + "&coeq=" + cod_eq,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#slcbase").select2("val", datos[0].CODIGO).change();
                    $("#hdbase").val(datos[0].CODIGO);
                    $("#slcequivalente").select2("val", datos[0].CODIGO_EQUI).change();
                    $("#hdequi").val(datos[0].CODIGO_EQUI);
                    $("#txtequivalencia").val(datos[0].EQUIVALENCIA).change();



                },
                error: function (msg) {

                    alert(msg);
                }
            });

        } else {
           // var cboval = $("#cbounme").val();
           
      
            $("#slcbase").click(function () {
            if (flag) {
                
                //$("#slcequivalente").html(cboval);
                $("#slcequivalente option[value=" + $(this).val() + "]").remove();
            }
            });
            $("#slcequivalente").click(function () {
                if (flag) {

                    //$("#slcbase").html(cboval);
                    $("#slcbase option[value=" + $(this).val() + "]").remove();

                }
            });

           

        }
    }


    var plugins = function () {
        
        $("#txtequivalencia").focus(function () { $(this).inputmask({ "mask": "M", "repeat": 16, "greedy": false }); })
        $('#slcbase').select2();
        $('#slcequivalente').select2();
    }

    return {
        init: function () {

            plugins();
            fillcboUnidadBase();
            eventos();
            cargainicial();

        }
    };

}();

var flag = true;

function Actualizar() {
    flag = false;
    var p_codi =     $("#hdbase").val();
    var p_codiequi =  $("#hdequi").val();
    var p_equi = $("#txtequivalencia").val();
    var p_user = $('#ctl00_lblusuario').html();

    if ($("#slcequivalente").val() == "") { $("#slcequivalente").select2("val", p_codiequi); }
    if ($("#slcbase").val() == "") { $("#slcbase").select2("val", p_codi); }

    if (vErrors(["slcequivalente", "slcbase", "txtequivalencia"]) ) {

        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMEQUN.ASHX",
            {
                flag: 2,
                codi: p_codi,
                coeq: p_codiequi,
                user: p_user,
                equi: p_equi
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res != "" && res != null) {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
}

function Crear() {
    flag = false;

    var p_codi = $("#hdbase").val();
    var p_codiequi = $("#hdequi").val();
    var p_equi = $("#txtequivalencia").val();
    var p_user = $('#ctl00_lblusuario').html();
    if ($("#slcequivalente").val() == "") { $("#slcequivalente").select2("val", p_codiequi); }
    if ($("#slcbase").val() == "") { $("#slcbase").select2("val", p_codi); }


    if (vErrors(["slcequivalente", "slcbase", "txtequivalencia"]) && verificarexistencia()) {
        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMEQUN.ASHX",
            {
                flag: 1,
                codi: p_codi,
                coeq: p_codiequi,
                user: p_user,
                equi: p_equi

            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res != "" && res != null) {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                    $("#slcbase").attr("disabled", "disabled");
                    $("#slcequivalente").attr("disabled", "disabled");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function verificarexistencia() {
    var flag2 = true;
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMEQUN.ASHX?flag=4&codi=" + $("#hdbase").val() + "&coeq=" + $("#hdequi").val(),
        contentType: "application/json;",
        dataType: "json",
        async:false,
        success: function (datos) {

            if (datos != "" && datos != null) {
                alertCustom("Ésta equivalencia ya se encuentra registrada!");
                flag2 = false;
            }


        },
        error: function (msg) {

            //alert(msg);
        }
    });
    return flag2;
}


