
var NBLCOBR= function () {

    var oTableCheques = [];

    var handlePlugins = function () {
        $(".combo").select2();
        $("#cbo_Empresa").select2();
        
    }

    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val($('#ctl00_hddctlg').val()).change();
    }

    var handleFillcboCuentas = function (pPidmEmp) {
        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/nbmcheq.ashx?flag=LCU" +
            "&pidm_cuenta=" + pPidmEmp + "&estado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                let oTipoCta = datos;
                $("#cbocta").html('<option value="">TODOS</option>');
                $.each(oTipoCta, function (key, value) {
                    $("#cbocta").append("<option value='" + value.CODE + "'>" + value.DESCRIPCION + "</option>");
                });

                $("#cbocta").val("").change();

            },
            error: function () {
                noexito();
            }
        });

    }

    var handleControls = function () {
        $("#cboEmpresa").on("change", function () {
            let pidmEmp = $("#cboEmpresa option:selected").attr('data-pidm');
            handleFillcboCuentas(pidmEmp);
        });

        $("#cbocta").on("change", function () {
            fnGetCheques();
        });

    }

    var handleTablaCheques = function () {

        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [
                {
                    data: "NUMERO_CHEQ", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NUMERO_CUENTA" },
                { data: "NEMPRESA" },
                { data: "NTIPO" },
                {
                    data: "FECHA_EMISION",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + $(td).html());

                    }
                },
                {
                    data: "FECHA_REGISTRO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "USUARIO" }
               
                
            ]
        }

        oTableCheques = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');



        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCheques.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCheques.fnGetPosition(this);
                var row = oTableCheques.fnGetData(pos);

                var pidm = row.CTA_PIDM;
                var cta = row.CTA_CODE;
                var t = row.TIPO;
                var n = row.NUMERO_CHEQ;
      
                window.open('?f=nbmcheq&pidm=' + pidm + '&cta=' + cta + '&t=' + t + '&n=' + n, '_blank');
            }

        });


        /*************FILTROSSS****************/


        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var min = parseInt($('#minfecha').val().split("/").reverse().join(""), 10);
                var max = parseInt($('#maxfecha').val().split("/").reverse().join(""), 10);
                var age = parseInt(data[6].split("/").reverse().join("")) || 0; // use data for the age column

                if ((isNaN(min) && isNaN(max)) ||
                    (isNaN(min) && age <= max) ||
                    (min <= age && isNaN(max)) ||
                    (min <= age && age <= max)) {
                    return true;
                }
                return false;
            }
        );

        inifechas('minfecha', 'maxfecha');

        $('#minfecha, #maxfecha').change(function () {
            oTableCheques.api(true).draw();
        });

        /*--------------------------------*/
        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });


    }


    var fnGetCheques = function () {
        let pidmEmpresa = $("#cboEmpresa option:selected").attr('data-pidm');
        let CodCta = $("#cbocta").val();

        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX?flag=LCHE&cuenta_bancaria=" + CodCta +
            "&pidm_cuenta=" + pidmEmpresa + 
            "&estado=C",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTableCheques.fnClearTable();
                    oTableCheques.fnAddData(datos);
                }
                else {
                    oTableCheques.fnClearTable();
                    Desbloquear('ventana');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de cheques.");
                oTableCheques.fnClearTable();
            }
        });

    }


    return {
        init: function () {
            handlePlugins();          
            handleTablaCheques();
            handleControls();
            handleFillcboEmpresa();
        }
    }
}();



var NBMCOBR = function () {

    var plugins = function () {
        $(".combo").select2();
        $("#cbo_Empresa").select2();

    }
    var fillCboEmpresa = function () {
        var select = $('#cbo_Empresa').select2('destroy');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNVMDOCV");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $(select).empty();
                    $(select).append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNVMDOCV", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $(select).append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '" data-pidm="' + datos[i].PIDM + '" direccion="' + datos[i].DIRECCION + '" ruc="' + datos[i].RUC + '" ruta="' + datos[i].RUTA_IMAGEN + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $(select).val($('#ctl00_hddctlg').val());
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente.");
                }
            });
        }
        else {
            $(select).empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $(select).append('<option value="' + dPermanente[i].CODIGO + '" agente-reten-ind="' + dPermanente[i].AGENTE_RETEN_IND + '" data-pidm="' + dPermanente[i].PIDM + '" direccion="' + dPermanente[i].DIRECCION + '" ruc="' + dPermanente[i].RUC + '" ruta="' + dPermanente[i].RUTA_IMAGEN + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
            $(select).val($('#ctl00_hddctlg').val());
        }
        $(select).select2();
    }

    var fillTablaMCobroCheque = function () {
        
        var parms = {
            data: null,
            columns: [
                {data: null,               
                       defaultContent: '  <input type="checkbox" class="aprobarChk" />',
                       createdCell: function (td, cellData, rowData, row, col) {
                       
                           $(td).attr('align', 'center');
                           $(td).children("input").attr("id", "chk_" + row);

                          
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
            codigos = $('#hddauxiliar').val();
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            var cta = row.NUMERO_CUENTA.CODIGO
            var pidm = row.NUMERO_CUENTA.PIDM;           
            var t = row.TIPO.CODIGO
            var n = row.NUMERO_CHEQ
            
                

            valor= cta + "," + pidm + "," + t + "," + n;

            if ($(this).is(":checked")) {
   
                    $(this)
                        .attr("checked", false)
                        .parent().removeClass("checked");

                    $(".aprobarChk").removeClass("activo");
                    $(this).addClass("activo");

                    CrearCobroEsp(valor);

                            
                     

               
            } else {
                if (codigos.indexOf(valor) >= 0) {
                    codigos = codigos.replace(codigos.substring(codigos.indexOf(valor) - 1, codigos.indexOf(valor) + valor.length + codigos.split(valor)[1].split("|")[0].length ), "");
                    $('#hddauxiliar').val(codigos);
                }
            }
           
        });

        $('#cbo_Empresa').on('change', function () {
            Cargar_tabla();
        });
    
    }

   

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillTablaMCobroCheque();
            funcionalidad();
          
           
        }
    }
}();


function Cargar_tabla() {
    $.ajax({
        type: "POST",
        url: "vistas/NB/ajax/NBMCOBR.ASHX?flag=3&empresa=" + $("#cbo_Empresa").val(),
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
                var json = datos;

                oTable.fnClearTable()

                if (json != null) { oTable.fnAddData(json); }               

                $("#filcta").each(function () {
                    var select = $('<select id="slcfilcta" class="span12" style="margin-bottom: 0px;"><option val="">Todo</option></select>')
                        .appendTo($(this).empty())
                         .on('change', function () {
                             oTable.fnFilter($("#slcfilcta :selected").html() == "Todo" ? "" : $("#slcfilcta :selected").html(), 2)
                         });

                    if (json != null) {
                        json.filter(function (a) { if (select.html().indexOf(a.NUMERO_CUENTA.NOMBRE) < 0) select.append('<option pidm="' + a.NUMERO_CUENTA.PIDM + '" value="' + a.NUMERO_CUENTA.CODIGO + '">' + a.NUMERO_CUENTA.NOMBRE + '</option>'); });
                    }
           

                    $("#slcfilcta").select2({
                        placeholder: "CUENTA",
                        allowclear: true

                    }).change();
                    $("#s2id_slcfilcta").attr("style", "margin-bottom: -10px;");

                });


                

            
        }
    });
 
}

function CrearCobro() {

    var p_codi = $('#hddauxiliar').val().substring(1);
    var p_user = $('#ctl00_lblusuario').html();

    var v_flag =  1;

        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMCOBR.ASHX", {
            flag: v_flag,
            codigo: p_codi,           
            usuario: p_user

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    Cargar_tabla();
                    $('#hddauxiliar').val("");
                } else {
                    noexito();
                }
            });
    
}

v_existe = false;

function CrearCobroEsp(val0r) {


    var bodyER = "<div class='row-fluid'>" +
                "<div class='span2' style='width: 40%;'><b>OFICINA:</b></div><div class='span4'><div class='control-group'><div class='controls'>" +
                '<input type="text" id="txt_oficina" maxlength="50" class="span12 obligatorio" />' +
                "</div></div></div> </div>" +
               "<div class='row-fluid'>" +
                "<div class='span2' style='width: 40%;'><b>FECHA:</b></div><div class='span3'><div class='control-group'><div class='controls'>" +
                '<input type="text" id="txt_fecha" maxlength="10" class="span12 obligatorio" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"/>' +
                "</div></div></div> </div>" +
                "<div class='row-fluid'>" +
                "<div class='span2' style='width: 40%;'><b>NRO OPERACION:</b></div><div class='span3'><div class='control-group'><div class='controls'>" +
                '<input type="text" id="txt_numero_op" maxlength="10" class="span12 obligatorio" />' +
                "</div></div></div> </div>"
                 ;
    var footerER =
        '<button id="btngrDetalle" type="button" class="btn blue"><i class="icon-ok"></i> Aceptar</button>' +
        '<button class="btn" type="button" data-dismiss="modal"><i class="icon-remove"></i> Cancelar</button>';

    codigoss = $('#hddauxiliar').val();
    codigoss += ("|" + val0r);

    if (!v_existe) {
        crearmodal("modalCrearCobro", "Datos de Registro de Cobro", bodyER, footerER);
        $("#txt_fecha").datepicker();
        $("#txt_numero_op").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 10, "greedy": false }); })
        $("#btngrDetalle").click(function () {

            if (!vErrorBodyAnyElement(".obligatorio")) {
                
                var fecha_adicional = $("#txt_fecha").val().split("/").reverse().join("-");
                var oficina = $("#txt_oficina").val();
                var nro_operacion = $("#txt_numero_op").val();

                $(".aprobarChk.activo")
                                    .attr("checked", true)
                                    .parent().addClass("checked");

                  // SE ASIGNA EL VALOR

                $('#hddauxiliar').val(codigoss + "," + fecha_adicional +"," + oficina + "," + nro_operacion);

                $("#modalCrearCobro").modal("hide");

                $("#txt_fecha, #txt_oficina, #txt_numero_op").val("");

            } else {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
            }
          });
        
        v_existe |= true;
    }
    $("#modalCrearCobro").modal("show");
        
    



}




