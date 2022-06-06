
//var NBLFIRM= function () {


//    var fillTablaFirmaCheque = function () {


//        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJSON').val());
//        var parms = {
//            data: json,
//            columns: [
//                {
//                    data: "NUMERO_CHEQ", createdCell: function (td, cellData, rowData, row, col) {
//                        $(td).attr('align', 'center')
//                    }
//                },
//                { data: "NUMERO_CUENTA.NOMBRE" },
//                { data: "EMPRESA.NOMBRE" },
//                { data: "TIPO.NOMBRE" },
//                 {
//                     data: { _: "FECHA_EMISION.display", sort: parseInt("FECHA_EMISION.order") },
//                     createdCell: function (td, cellData, rowData, row, col) {
//                         $(td).attr('align', 'center')
//                     }
//                 },
//                {
//                    data: { _: "FECHA_REGISTRO.display", sort: parseInt("FECHA_REGISTRO.order") },
//                    createdCell: function (td, cellData, rowData, row, col) {
//                        $(td).attr('align', 'center')
//                    }
//                },               
//                {
//                    data: { _: "FECHA.display", sort: parseInt("FECHA.order") },
//                    createdCell: function (td, cellData, rowData, row, col) {
//                        $(td).attr('align', 'center')
//                    }
//                },
//                { data: "USUARIO" }
               
//            ],
//            stateSave: false

//        }



//        oTable = iniciaTabla('tblBandeja', parms);
//        $('#tblBandeja').removeAttr('style');



//        $('#tblBandeja tbody').on('click', 'tr', function () {

//            if ($(this).hasClass('selected')) {
//                $(this).removeClass('selected');
//            }
//            else {
//                oTable.$('tr.selected').removeClass('selected');
//                $(this).addClass('selected');

//                var pos = oTable.fnGetPosition(this);
//                var row = oTable.fnGetData(pos);
                
//                var pidm = row.NUMERO_CUENTA.PIDM;
//                var cta = row.NUMERO_CUENTA.CODIGO
//                var t = row.TIPO.CODIGO
//                var n = row.NUMERO_CHEQ
//                // var code = $('#cod' + $(this).attr("id")).html();/****!?***/
//                window.open('?f=nbmcheq&pidm=' + pidm + '&cta=' + cta + '&t=' + t + '&n=' + n, '_blank');
//            }

//        });


//        /*************FILTROSSS****************/


//        $.fn.dataTable.ext.search.push(
//            function (settings, data, dataIndex) {
//                var min = parseInt($('#minfecha').val().split("/").reverse().join(""), 10);
//                var max = parseInt($('#maxfecha').val().split("/").reverse().join(""), 10);
//                var age = parseInt(data[6].split("/").reverse().join("")) || 0; // use data for the age column

//                if ((isNaN(min) && isNaN(max)) ||
//                     (isNaN(min) && age <= max) ||
//                     (min <= age && isNaN(max)) ||
//                     (min <= age && age <= max)) {
//                    return true;
//                }
//                return false;
//            }
//        );

//        inifechas('minfecha','maxfecha');

//        $('#minfecha, #maxfecha').change(function () {
//            oTable.api(true).draw();
//        });

//        /*--------------------------------*/
//        $('input.column_filter').on('keyup click', function () {
//            filterColumn($(this).parents('tr').attr('data-column'));
//        });





//        $("#filemp").each(function () {
//            var select = $('<select id="slcfilempr" class="span12 empresa" style="margin-bottom: 0px;"><option></option><option value="">Todo</option></select>')
//                .appendTo($(this).empty())
//                 .on('change', function () {
//                       oTable.fnFilter($("#slcfilempr :selected").html() == "Todo" ? "" : $("#slcfilempr :selected").html(), 2)
                           
//                });
//            if (json != null) {
//                json.filter(function (a) { if (select.html().indexOf(a.EMPRESA.NOMBRE) < 0) select.append('<option value="' + a.EMPRESA.CODIGO + '">' + a.EMPRESA.NOMBRE + '</option>'); })
//            }
//            $("#slcfilempr").select2({
//                placeholder: "EMPRESA",
//                allowclear: true

//            });
//            $("#s2id_slcfilempr").attr("style", "margin-bottom: -10px;");

//        });


 

//        $("#filcta").each(function () {
//            var select = $('<select id="slcfilcta" class="span12 empresa" style="margin-bottom: 0px;"><option value="">Todo</option></select>')
//                .appendTo($(this).empty())
//                 .on('change', function () {
//                     oTable.fnFilter($("#slcfilcta :selected").html() == "Todo" ? "" : $("#slcfilcta :selected").html(), 1)
//                 });

//            //json.filter(function (a) { if (select.html().indexOf(a.EMPRESA.NOMBRE) < 0) select.append('<option value="' + a.EMPRESA.CODIGO + '">' + a.EMPRESA.NOMBRE + '</option>'); })

//            $('#tblBandeja').DataTable().column(1).data().unique().sort().each(function (d, j) {
//                select.append('<option value="' + d + '">' + d + '</option>')
//            });

//            $("#slcfilcta").select2({
//                placeholder: "CUENTA",
//                allowclear: true

//            });
//            $("#s2id_slcfilcta").attr("style", "margin-bottom: -10px;");

//        });

//    }


//    return {
//        init: function () {
//            fillTablaFirmaCheque();
//        }
//    }
//}();



var NBMFIRM = function () {

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slcCuenta').select2();
    }

    var fillTablaMFirmaCheque = function () {
        
        var parms = {
            data: null,
            columns: [
                {data: null,               
                       defaultContent: '  <input type="checkbox" class="aprobarChk" />',
                       createdCell: function (td, cellData, rowData, row, col) {
                       
                           $(td).attr('align', 'center')
                       
                       }
                },
                { data: "NUMERO_CHEQ" },
                { data: "NUMERO_CUENTA.NOMBRE" },
                { data: "EMPRESA.NOMBRE" },
                { data: "TIPO.NOMBRE" },
                { data: "NGIRADOA"},
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + $(td).html());

                    }
                },
                {
                    data: { _: "FECHA_EMISION.display", sort: parseInt("FECHA_EMISION.order") },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }

            ],
            stateSave: false

        }



        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style').css("border-collapse","collapse");

        Cargar_tabla();

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
                // var code = $('#cod' + $(this).attr("id")).html();
              //  window.open('?f=nbmletr&codigo=' + codigo, '_blank');
            }

        });

       
    }

    var funcionalidad = function(){
       
        $('#tblBandeja tbody').on('click', '.aprobarChk', function () {
            var codigos = $('#hddauxiliar').val();
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            var cta = row.NUMERO_CUENTA.CODIGO
            var pidm = row.NUMERO_CUENTA.PIDM;           
            var t = row.TIPO.CODIGO
            var n = row.NUMERO_CHEQ
            
            var valor= cta + "," + pidm + "," + t + "," + n;

            if ($(this).is(":checked")) {
                

                codigos += ("|" + valor);

               
            } else {
                if (codigos.indexOf(valor) >= 0) {
                    codigos = codigos.replace(codigos.substring(codigos.indexOf(valor) - 1, codigos.indexOf(valor) + valor.length), "");
                }
            }
            $('#hddauxiliar').val(codigos);
        });
    
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMFIRM.ASHX?flag=4&usuario=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '"'+ ' pidm="'+ datos[i].PIDM +'">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2();
                
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
     
    var ListarCuentas = function (ctlg_pidm) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMFIRM.ASHX?flag=5&ctlg_code="+ctlg_pidm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcCuenta').empty();
                $('#slcCuenta').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcCuenta').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#hf_cuenta").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcCuenta").select2("val", $("#hf_cuenta").val());
                    } else {

                        $("#slcCuenta").select2("val", "");
                    }


                }
                else {
                    infoCustom2("No hay Cuentas Registradas..!")
                    $("#slcCuenta").select2();
                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventos = function () {
        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana");
                setTimeout(function () {
                    ListarCuentas($('#slcEmpresa').val());
                }, 1000);
                emp_ant = $(this).val();
                Desbloquear("ventana");
            } else { emp_ant = ""; Desbloquear("ventana"); }
        });

        $('#btn_Filtrar').click(function (e) {
            Cargar_tabla($("#slcCuenta").val(), $("#slcEmpresa :selected").attr("pidm"));
        });
    }

    return {
        init: function () {
            plugins();
            fillTablaMFirmaCheque();
            funcionalidad();
            fillCboEmpresa();
           
            eventos();
            $("#slcEmpresa").val($("#ctl00_hddctlg").val()).change();
           
        }
    }
}();



function Cargar_tabla(cuenta_code,pidm_cuenta) {
    $.ajax({
        type: "POST",
        url: "vistas/NB/ajax/NBMFIRM.ASHX?flag=3&cuenta_code=" + cuenta_code + "&pidm_cue=" + pidm_cuenta,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
                var json = datos;

                oTable.fnClearTable()

                if (json != null) { oTable.fnAddData(json); }

                //$("#filemp").each(function () {
                //    var select = $('<select id="slcfilempr" class="span12 empresa" style="margin-bottom: 0px;"></select>')
                //        .appendTo($(this).empty())
                //        .on('change', function () {
                //            oTable.fnFilter($("#slcfilempr :selected").html() == "Todo" ? "" : $("#slcfilempr :selected").html(), 3)
                //        });

                //    if (json != null) {
                //        json.filter(function (a) { if (select.html().indexOf(a.EMPRESA.NOMBRE) < 0) select.append('<option value="' + a.EMPRESA.CODIGO + '">' + a.EMPRESA.NOMBRE + '</option>'); });
                //    }

                //    $("#slcfilempr").select2({
                //        placeholder: "EMPRESA",
                //        allowclear: true

                //    });
                //    $("#s2id_slcfilempr").attr("style", "margin-bottom: -10px;");

                //});

                //$("#filcta").each(function () {
                //    var select = $('<select id="slcfilcta" class="span12" style="margin-bottom: 0px;"></select>')
                //        .appendTo($(this).empty())
                //         .on('change', function () {
                //             oTable.fnFilter($("#slcfilcta :selected").html() == "Todo" ? "" : $("#slcfilcta :selected").html(), 2)
                //         });

                //    if (json != null) {
                //        json.filter(function (a) { if (select.html().indexOf(a.NUMERO_CUENTA.NOMBRE) < 0) select.append('<option pidm="' + a.NUMERO_CUENTA.PIDM + '" value="' + a.NUMERO_CUENTA.CODIGO + '">' + a.NUMERO_CUENTA.NOMBRE + '</option>'); });
                //    }
           

                //    $("#slcfilcta").select2({
                //        placeholder: "CUENTA",
                //        allowclear: true

                //    }).change();
                //    $("#s2id_slcfilcta").attr("style", "margin-bottom: -10px;");

                //});



            
        }
    });
 
}

function CrearAprobacion(funcion) {

    var p_codi = $('#hddauxiliar').val().substring(1);
    var p_user = $('#ctl00_lblusuario').html();

    var v_flag = funcion == 'A' ? 1 : 2;

        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMFIRM.ASHX", {
            flag: v_flag,
            codigo: p_codi,           
            usuario: p_user

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $('#btn_Filtrar').click();
                    $('#hddauxiliar').val("");
                } else {
                    noexito();
                }
            });
    
}